import React, { useRef, useEffect } from 'react';
import { useAudioStore } from '@/store/useAudioStore';
import { useAudioContext } from '@/contexts/AudioContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { createAudioSource } = useAudioContext();
  const sourceCreated = useRef(false);
  
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    setPlaying,
    setVolume,
    setCurrentTime,
    setDuration
  } = useAudioStore();

  useEffect(() => {
    if (!audioRef.current || sourceCreated.current) return;
    
    const initializeAudio = async () => {
      try {
        await createAudioSource(audioRef.current!);
        sourceCreated.current = true;
      } catch (error) {
        console.error('Failed to initialize audio:', error);
      }
    };

    initializeAudio();
  }, [createAudioSource]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setCurrentTime, setDuration, setPlaying, volume]);

  const handlePlayPause = async () => {
    if (!audioRef.current || !currentTrack) return;
    
    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">{currentTrack?.title}</span>
            <span className="text-sm text-muted">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div className="h-1 bg-white/10 rounded-full">
            <motion.div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <SkipBack size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="p-4 bg-primary hover:bg-primary/80 rounded-full transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <SkipForward size={20} />
          </motion.button>

          <div className="flex items-center gap-2">
            <Volume2 size={20} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 accent-primary"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Settings size={20} />
          </motion.button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack?.audio_url}
        preload="auto"
      />
    </div>
  );
}