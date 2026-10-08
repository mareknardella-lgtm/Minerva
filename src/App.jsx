import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SocraticMentor from './components/SocraticMentor';
import InteractiveLabs from './components/InteractiveLabs';
import EmpowermentLaunchpad from './components/EmpowermentLaunchpad';
import DevpostPitch from './components/DevpostPitch';
import { speechService } from './utils/textUtils';
import { Sparkles, Trophy, HeartHandshake, Code2, ExternalLink } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('tutor');
  const [theme, setTheme] = useState('lavender');
  const [fontMode, setFontMode] = useState('dyslexic');
  const [bionicReading, setBionicReading] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync theme and font classes to <body>
  useEffect(() => {
    document.body.className = `theme-${theme} font-${fontMode}`;
  }, [theme, fontMode]);

  const handleStopSpeech = () => {
    speechService.stop();
    setIsSpeaking(false);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      
      {/* Top Navbar & Sensory Toolbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        fontMode={fontMode}
        setFontMode={setFontMode}
        bionicReading={bionicReading}
        setBionicReading={setBionicReading}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        isSpeaking={isSpeaking}
        onStopSpeech={handleStopSpeech}
      />

      {/* Main Container */}
      <main className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ${
        focusMode ? 'max-w-4xl' : ''
      }`}>
        
        {/* Active Tab View */}
        {activeTab === 'tutor' && (
          <SocraticMentor
            bionicReading={bionicReading}
            isSpeaking={isSpeaking}
            setIsSpeaking={setIsSpeaking}
          />
        )}

        {activeTab === 'labs' && (
          <InteractiveLabs />
        )}

        {activeTab === 'launchpad' && (
          <EmpowermentLaunchpad
            bionicReading={bionicReading}
          />
        )}

        {activeTab === 'devpost' && (
          <DevpostPitch />
        )}

      </main>

      {/* Footer */}
      {!focusMode && (
        <footer className="border-t border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500 bg-slate-950/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-violet-400 font-['Outfit']">MINERVA AI</span>
              <span>— Costruito per il</span>
              <span className="text-slate-300 font-medium">ML Empowerment Build Challenge</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1 text-[11px]">
                <HeartHandshake className="w-3.5 h-3.5 text-pink-400" /> Open Education & Neurodiversity
              </span>
              <span className="flex items-center gap-1 text-[11px]">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Devpost Submission Ready
              </span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}

export default App;
