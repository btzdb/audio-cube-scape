import React from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../integrations/supabase/client';

const TrackList = () => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudioStore();
  const [tracks, setTracks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTracks = async () => {
      try {
        // First, get the list of files from the beats bucket
        const { data: storageData, error: storageError } = await supabase
          .storage
          .from('beats')
          .list();

        if (storageError) throw storageError;

        // Transform storage data into track format
        const formattedTracks = storageData
          .filter(file => file.name.endsWith('.mp3'))
          .map(file => ({
            id: file.id,
            title: file.name.replace('.mp3', '').replace(/%20/g, ' '),
            audio_url: `${supabase.supabaseUrl}/storage/v1/object/public/beats/${file.name}`,
            duration: '0:00', // We'll update this when audio loads
            bpm: 128, // Default BPM
            price: 29.99 // Default price
          }));

        setTracks(formattedTracks);
        console.log('Loaded tracks:', formattedTracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
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