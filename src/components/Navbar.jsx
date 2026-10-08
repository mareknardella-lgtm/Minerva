import React from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  FlaskConical, 
  Rocket, 
  FileText, 
  Volume2, 
  VolumeX, 
  Eye, 
  Sun, 
  Moon, 
  Contrast, 
  BookOpen, 
  Maximize2, 
  Minimize2,
  Award
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
    <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200"
      style={{
        backgroundColor: theme === 'high-contrast' ? '#000000' : theme === 'warm-paper' ? 'rgba(253, 246, 226, 0.92)' : 'rgba(13, 15, 24, 0.85)',
        borderColor: 'var(--border-color)'
      }}
    >
      {/* Hackathon Top Bar Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
        <Award className="w-3.5 h-3.5 animate-pulse" />
        <span>ML Empowerment Build Challenge 2026 • AI For Social Good & Accessible Education</span>
        <span className="hidden md:inline-block bg-white/20 px-2 py-0.5 rounded-full text-[10px] tracking-wide uppercase font-bold">
          Global Initiative
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 p-0.5 shadow-lg shadow-violet-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-violet-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent font-['Outfit']">
                  MINERVA
                </span>
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-muted hidden sm:block leading-none">
                Multimodal AI & Neurodiversity Companion
              </p>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/40 border border-violet-500/15" role="tablist">
            <button
              onClick={() => setActiveTab('tutor')}
              role="tab"
              aria-selected={activeTab === 'tutor'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                activeTab === 'tutor'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              Socratic AI Tutor
            </button>

            <button
              onClick={() => setActiveTab('labs')}
              role="tab"
              aria-selected={activeTab === 'labs'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                activeTab === 'labs'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Interactive ML Labs
            </button>

            <button
              onClick={() => setActiveTab('launchpad')}
              role="tab"
              aria-selected={activeTab === 'launchpad'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                activeTab === 'launchpad'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              Empowerment Launchpad
            </button>

            <button
              onClick={() => setActiveTab('devpost')}
              role="tab"
              aria-selected={activeTab === 'devpost'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                activeTab === 'devpost'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/20'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Devpost Pitch
            </button>
          </nav>

          {/* Neurodiversity & Sensory Accessibility Controls Bar */}
          <div className="flex items-center gap-2">
            
            {/* Audio Speech Status / Stop */}
            {isSpeaking && (
              <button
                onClick={onStopSpeech}
                title="Stop Audio Narration"
                aria-label="Stop Audio Narration"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs animate-pulse cursor-pointer"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Stop Audio</span>
              </button>
            )}

            {/* Bionic Reading Toggle */}
            <button
              onClick={() => setBionicReading(!bionicReading)}
              title={bionicReading ? 'Disable Bionic Reading' : 'Enable Bionic Reading (ADHD Eye Guidance)'}
              aria-label="Toggle Bionic Reading"
              className={`p-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                bionicReading 
                  ? 'bg-violet-500/20 border-violet-400 text-violet-300' 
                  : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Font Mode Selector (Dyslexia / Lexend / Standard) */}
            <button
              onClick={() => {
                if (fontMode === 'dyslexic') setFontMode('standard');
                else setFontMode('dyslexic');
              }}
              title={fontMode === 'dyslexic' ? 'Dyslexia Font Active (Click for standard)' : 'Enable Dyslexic Reading Optimization'}
              aria-label="Toggle Dyslexic Font"
              className={`p-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                fontMode === 'dyslexic'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                  : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </button>

            {/* Theme Selector (Sensory Lavender, High Contrast, Warm Paper) */}
            <div className="relative group">
              <button
                onClick={() => {
                  if (theme === 'lavender') setTheme('high-contrast');
                  else if (theme === 'high-contrast') setTheme('warm-paper');
                  else setTheme('lavender');
                }}
                title={`Current Theme: ${theme}. Click to cycle themes.`}
                aria-label="Change Theme"
                className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {theme === 'lavender' && <Moon className="w-4 h-4 text-violet-400" />}
                {theme === 'high-contrast' && <Contrast className="w-4 h-4 text-yellow-400" />}
                {theme === 'warm-paper' && <Sun className="w-4 h-4 text-amber-600" />}
              </button>
            </div>

            {/* Focus Mode (ADHD Clutter Reduction) */}
            <button
              onClick={() => setFocusMode(!focusMode)}
              title={focusMode ? 'Exit ADHD Focus Mode' : 'Enter ADHD Focus Mode (Minimizes distractions)'}
              aria-label="Toggle Focus Mode"
              className={`p-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                focusMode 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                  : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('tutor')}
            className={`p-2 rounded-lg text-xs flex flex-col items-center gap-1 ${activeTab === 'tutor' ? 'text-violet-400' : 'text-slate-400'}`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Tutor</span>
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`p-2 rounded-lg text-xs flex flex-col items-center gap-1 ${activeTab === 'labs' ? 'text-violet-400' : 'text-slate-400'}`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Labs</span>
          </button>
          <button
            onClick={() => setActiveTab('launchpad')}
            className={`p-2 rounded-lg text-xs flex flex-col items-center gap-1 ${activeTab === 'launchpad' ? 'text-violet-400' : 'text-slate-400'}`}
          >
            <Rocket className="w-4 h-4" />
            <span>Launchpad</span>
          </button>
          <button
            onClick={() => setActiveTab('devpost')}
            className={`p-2 rounded-lg text-xs flex flex-col items-center gap-1 ${activeTab === 'devpost' ? 'text-emerald-400' : 'text-slate-400'}`}
          >
            <FileText className="w-4 h-4" />
            <span>Devpost</span>
          </button>
        </div>
      </div>
    </header>
  );
}
