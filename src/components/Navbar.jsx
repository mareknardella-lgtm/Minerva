import React from 'react';
import { 
  BrainCircuit, 
  FlaskConical, 
  Rocket, 
  FileText, 
  VolumeX, 
  Eye, 
  Sun, 
  Moon, 
  Contrast, 
  BookOpen, 
  Maximize2, 
  Minimize2
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  fontMode,
  setFontMode,
  bionicReading,
  setBionicReading,
  focusMode,
  setFocusMode,
  isSpeaking,
  onStopSpeech
}) {
  return (
    <header className="sticky top-0 z-50 border-b transition-colors duration-150 backdrop-blur-md"
      style={{
        backgroundColor: theme === 'high-contrast' ? '#000000' : theme === 'warm-paper' ? 'rgba(249, 246, 240, 0.94)' : 'rgba(9, 10, 15, 0.85)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-100 shadow-sm">
              <BrainCircuit className="w-4 h-4 text-indigo-400" />
            </div>
            
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-semibold tracking-tight text-zinc-100 font-['Outfit']">
                Minerva
              </span>
              <span className="text-[11px] font-medium text-zinc-400 bg-zinc-900 border border-white/[0.08] px-2 py-0.5 rounded-md hidden sm:inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                ML Challenge 2026
              </span>
            </div>
          </div>

          {/* Center: Segmented Navigation Bar */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-zinc-900/80 border border-white/[0.08]" role="tablist">
            <button
              onClick={() => setActiveTab('tutor')}
              role="tab"
              aria-selected={activeTab === 'tutor'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'tutor'
                  ? 'bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Socratic Tutor</span>
            </button>

            <button
              onClick={() => setActiveTab('labs')}
              role="tab"
              aria-selected={activeTab === 'labs'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'labs'
                  ? 'bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Interactive Labs</span>
            </button>

            <button
              onClick={() => setActiveTab('launchpad')}
              role="tab"
              aria-selected={activeTab === 'launchpad'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'launchpad'
                  ? 'bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Impact Launchpad</span>
            </button>

            <button
              onClick={() => setActiveTab('devpost')}
              role="tab"
              aria-selected={activeTab === 'devpost'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'devpost'
                  ? 'bg-indigo-600/90 text-white shadow-sm font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Devpost Pitch</span>
            </button>
          </nav>

          {/* Right: Refined Sensory & Accessibility Toolbar */}
          <div className="flex items-center gap-1.5">
            
            {/* Audio Speech Active Indicator */}
            {isSpeaking && (
              <button
                onClick={onStopSpeech}
                title="Stop Audio Narration"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium cursor-pointer"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Stop Audio</span>
              </button>
            )}

            <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block"></div>

            {/* Bionic Reading Toggle */}
            <button
              onClick={() => setBionicReading(!bionicReading)}
              title={bionicReading ? 'Bionic Reading Active' : 'Toggle Bionic Reading'}
              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                bionicReading 
                  ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300' 
                  : 'bg-zinc-900/60 border-white/[0.08] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {/* Dyslexic / Focus Font */}
            <button
              onClick={() => {
                if (fontMode === 'dyslexic') setFontMode('standard');
                else setFontMode('dyslexic');
              }}
              title={fontMode === 'dyslexic' ? 'Dyslexia Typography Active' : 'Toggle Dyslexia Optimization'}
              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                fontMode === 'dyslexic'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300' 
                  : 'bg-zinc-900/60 border-white/[0.08] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>

            {/* Theme Selector */}
            <button
              onClick={() => {
                if (theme === 'lavender') setTheme('high-contrast');
                else if (theme === 'high-contrast') setTheme('warm-paper');
                else setTheme('lavender');
              }}
              title={`Theme: ${theme}`}
              className="p-1.5 rounded-lg bg-zinc-900/60 border border-white/[0.08] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              {theme === 'lavender' && <Moon className="w-3.5 h-3.5 text-zinc-300" />}
              {theme === 'high-contrast' && <Contrast className="w-3.5 h-3.5 text-zinc-100" />}
              {theme === 'warm-paper' && <Sun className="w-3.5 h-3.5 text-amber-500" />}
            </button>

            {/* ADHD Clutter-Free Focus Mode */}
            <button
              onClick={() => setFocusMode(!focusMode)}
              title={focusMode ? 'Exit Focus Mode' : 'Focus Mode (Clutter Reduction)'}
              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                focusMode 
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                  : 'bg-zinc-900/60 border-white/[0.08] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-white/[0.06]">
          <button
            onClick={() => setActiveTab('tutor')}
            className={`text-xs font-medium py-1 px-2 rounded-md ${activeTab === 'tutor' ? 'text-indigo-400 font-semibold' : 'text-zinc-400'}`}
          >
            Tutor
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`text-xs font-medium py-1 px-2 rounded-md ${activeTab === 'labs' ? 'text-indigo-400 font-semibold' : 'text-zinc-400'}`}
          >
            Labs
          </button>
          <button
            onClick={() => setActiveTab('launchpad')}
            className={`text-xs font-medium py-1 px-2 rounded-md ${activeTab === 'launchpad' ? 'text-indigo-400 font-semibold' : 'text-zinc-400'}`}
          >
            Launchpad
          </button>
          <button
            onClick={() => setActiveTab('devpost')}
            className={`text-xs font-medium py-1 px-2 rounded-md ${activeTab === 'devpost' ? 'text-indigo-400 font-semibold' : 'text-zinc-400'}`}
          >
            Devpost
          </button>
        </div>
      </div>
    </header>
  );
}
