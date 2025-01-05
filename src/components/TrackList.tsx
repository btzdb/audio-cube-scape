import React from 'react';
import { useAudioContext } from '@/hooks/useAudioContext';
import { Play, Pause } from 'lucide-react';

const DEMO_TRACKS = [
  { id: 1, title: 'Summer Vibes', duration: '2:45', bpm: 128, price: '$29.99' },
  { id: 2, title: 'Dark Knight', duration: '3:15', bpm: 140, price: '$34.99' },
  { id: 3, title: 'Ocean Waves', duration: '2:30', bpm: 95, price: '$24.99' },
  // Add more demo tracks as needed
];

const TrackList = () => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudioContext();

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
          {DEMO_TRACKS.map((track) => (
            <tr
              key={track.id}
              className="track-row border-b border-white/5"
            >
              <td className="py-4 px-4">
                <button
                  onClick={() => isPlaying ? pauseTrack() : playTrack(track)}
                  className="p-2 hover:bg-primary/20 rounded-full transition-colors"
                >
                  {isPlaying && currentTrack?.id === track.id ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
              </td>
              <td className="py-4 px-4">{track.title}</td>
              <td className="py-4 px-4">{track.duration}</td>
              <td className="py-4 px-4">{track.bpm}</td>
              <td className="py-4 px-4">{track.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackList;