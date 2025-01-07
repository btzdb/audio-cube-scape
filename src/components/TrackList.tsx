import React from 'react';
import { useAudioStore } from '@/store/useAudioStore';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const TrackList = () => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudioStore();
  const [tracks, setTracks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTracks = async () => {
      try {
        const { data, error } = await supabase
          .from('beats')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTracks(data || []);
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
              <td className="py-4 px-4">{track.duration}s</td>
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