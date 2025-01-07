import React from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../integrations/supabase/client';

const TrackList = () => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudioStore();
  const [tracks, setTracks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTracks = async () => {
      try {
        setError(null);
        const { data: storageData, error: storageError } = await supabase
          .storage
          .from('beats')
          .list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
          });

        if (storageError) {
          console.error('Storage error:', storageError);
          throw new Error('Failed to load tracks. Please try again later.');
        }

        if (!storageData) {
          throw new Error('No tracks found');
        }

        const formattedTracks = storageData
          .filter(file => file.name.endsWith('.mp3'))
          .map(file => {
            const { data: { publicUrl } } = supabase
              .storage
              .from('beats')
              .getPublicUrl(file.name);

            return {
              id: file.id,
              title: file.name.replace('.mp3', '').replace(/%20/g, ' '),
              audio_url: publicUrl,
              duration: '0:00',
              bpm: 128,
              price: 29.99
            };
          });

        setTracks(formattedTracks);
        console.log('Loaded tracks:', formattedTracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse text-white/60">Loading tracks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-white/60">No tracks available</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4"></th>
            <th className="text-left py-4 px-4">Title</th>
            <th className="text-left py-4 px-4">Duration</th>
            <th className="text-left py-4 px-4">BPM</th>
            <th className="text-left py-4 px-4">Price</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <motion.tr
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="track-row border-b border-white/5"
            >
              <td className="py-4 px-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => isPlaying && currentTrack?.id === track.id ? pauseTrack() : playTrack(track)}
                  className="p-2 hover:bg-primary/20 rounded-full transition-colors"
                >
                  {isPlaying && currentTrack?.id === track.id ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </motion.button>
              </td>
              <td className="py-4 px-4">{track.title}</td>
              <td className="py-4 px-4">{track.duration}</td>
              <td className="py-4 px-4">{track.bpm} BPM</td>
              <td className="py-4 px-4">${track.price}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackList;