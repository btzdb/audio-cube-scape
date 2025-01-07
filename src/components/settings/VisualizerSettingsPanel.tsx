import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Box, Image, Music2, Sliders } from 'lucide-react';
import { useVisualizerStore } from '@/store/useVisualizerStore';
import { cn } from '@/utils/cn';

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'scene', label: 'Scene', icon: Box },
  { id: 'faces', label: 'Faces', icon: Image },
  { id: 'audio', label: 'Audio', icon: Music2 },
  { id: 'effects', label: 'Effects', icon: Sliders },
];

export function VisualizerSettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('scene');
  const { settings, updateSettings } = useVisualizerStore();

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-3 bg-black/20 backdrop-blur-lg rounded-lg hover:bg-black/30 transition-colors z-50"
        aria-label="Open Settings"
      >
        <Settings size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed right-4 top-4 w-96 max-h-[calc(100vh-2rem)] bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-lg font-medium">Visualizer Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex border-b border-white/10">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-1 p-3 hover:bg-white/5 transition-colors",
                        activeTab === tab.id && "bg-white/10"
                      )}
                    >
                      <Icon size={20} />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Scene Settings */}
                    {activeTab === 'scene' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Camera FOV
                          </label>
                          <input
                            type="range"
                            min="60"
                            max="90"
                            value={75}
                            onChange={(e) => {
                              // Update camera FOV
                            }}
                            className="w-full accent-purple-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Face Settings */}
                    {activeTab === 'faces' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Text Size
                          </label>
                          <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={1}
                            onChange={(e) => {
                              // Update text size
                            }}
                            className="w-full accent-purple-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Audio Settings */}
                    {activeTab === 'audio' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Bass Sensitivity
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={settings.bassBumpIntensity}
                            onChange={(e) => updateSettings({
                              bassBumpIntensity: Number(e.target.value)
                            })}
                            className="w-full accent-purple-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Effects Settings */}
                    {activeTab === 'effects' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Bloom Strength
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={1.5}
                            onChange={(e) => {
                              // Update bloom strength
                            }}
                            className="w-full accent-purple-500"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}