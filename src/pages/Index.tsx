import { AudioProvider } from '@/hooks/useAudioContext';
import BeatStore from '@/components/BeatStore';

const Index = () => {
  return (
    <AudioProvider>
      <BeatStore />
    </AudioProvider>
  );
};

export default Index;