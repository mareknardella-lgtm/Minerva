import React, { useState } from 'react';
import { 
  Lightbulb, 
  CheckCircle2, 
  Circle, 
  Code2, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Send, 
  Bot, 
  Check, 
  BookOpen
} from 'lucide-react';
import { AI_CONCEPTS } from '../data/concepts';
import { renderBionicText, speechService } from '../utils/textUtils';

export default function SocraticMentor({ bionicReading, isSpeaking, setIsSpeaking }) {
  const [selectedConceptId, setSelectedConceptId] = useState('neural-networks');
  const [activeLens, setActiveLens] = useState('metaphor'); // 'metaphor' | 'steps' | 'eli5' | 'deepdive' | 'socratic'
  const [completedSteps, setCompletedSteps] = useState({});
  const [userResponse, setUserResponse] = useState('');
  const [socraticFeedback, setSocraticFeedback] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const concept = AI_CONCEPTS.find(c => c.id === selectedConceptId) || AI_CONCEPTS[0];

  const handleToggleStep = (stepNumber) => {
    const key = `${concept.id}-${stepNumber}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAudioPlay = (textToRead) => {
    if (speechService.isSpeaking()) {
      speechService.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechService.speak(textToRead, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleSocraticSubmit = (e) => {
    e.preventDefault();
    if (!userResponse.trim()) return;

    setIsThinking(true);
    setTimeout(() => {
      const length = userResponse.trim().length;
      let reply = '';
      if (length < 25) {
        reply = `Thought-provoking initial intuition! Consider this: in a real-world deployment, what happens if the testing distribution diverges from the training distribution (Distribution Shift)? How would the model adapt?`;
      } else {
        reply = `Precise analysis! You have captured the essential mechanism: artificial representations converge through error feedback minimization. Mathematically, this maps directly to empirical risk minimization and gradient descent on the loss landscape.`;
      }
      setSocraticFeedback(reply);
      setIsThinking(false);
    }, 450);
  };

  const getCurrentTextForAudio = () => {
    if (activeLens === 'metaphor') return `${concept.metaphor.title}. ${concept.metaphor.story}`;
    if (activeLens === 'eli5') return concept.explainLike5;
    if (activeLens === 'deepdive') return concept.deepDive;
    if (activeLens === 'steps') return concept.microSteps.map(s => `${s.title}: ${s.desc}`).join('. ');
    return concept.summary;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Curriculum Modules */}
      <div className="ui-panel p-4">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Modular Curriculum
            </span>
            <span className="text-[11px] text-zinc-500">· 4 Core Foundations</span>
          </div>
          
          <button
            onClick={() => handleAudioPlay(getCurrentTextForAudio())}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-zinc-900 border-white/[0.08] text-zinc-300 hover:text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeaking ? 'Stop Audio' : 'Listen with Audio TTS'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {AI_CONCEPTS.map((item) => {
            const isSelected = item.id === selectedConceptId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedConceptId(item.id);
                  setSocraticFeedback(null);
                  setUserResponse('');
                  speechService.stop();
                  setIsSpeaking(false);
                }}
                className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-800/90 border-indigo-500/50 shadow-sm text-white'
                    : 'bg-zinc-900/40 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/70'
                }`}
              >
                <div className="text-[10px] text-zinc-500 mb-0.5 uppercase tracking-wider font-mono">
                  {item.category}
                </div>
                <div className="text-xs font-semibold truncate text-zinc-200">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Study Desk */}
      <div className="ui-panel p-6 space-y-5">
        
        {/* Module Title & Overview */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
              {concept.category}
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              Level: {concept.difficulty}
            </span>
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 font-['Outfit']">
            {concept.title}
          </h1>
          
          <p className="text-sm text-zinc-400 mt-1.5 max-w-3xl leading-relaxed">
            {renderBionicText(concept.summary, bionicReading)}
          </p>
        </div>

        {/* Cognitive Framework Tabs (Segmented Controller) */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-white/[0.08]">
          <button
            onClick={() => setActiveLens('metaphor')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeLens === 'metaphor'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Visual Analogy</span>
          </button>

          <button
            onClick={() => setActiveLens('steps')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeLens === 'steps'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Executive Micro-Steps</span>
          </button>

          <button
            onClick={() => setActiveLens('eli5')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeLens === 'eli5'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>ELI5 Simplification</span>
          </button>

          <button
            onClick={() => setActiveLens('deepdive')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeLens === 'deepdive'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Formal Deep Dive</span>
          </button>

          <button
            onClick={() => setActiveLens('socratic')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeLens === 'socratic'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/10 font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
            <span>Socratic Dialogue</span>
          </button>
        </div>

        {/* Content Viewer */}
        <div className="pt-2">
          
          {/* 1. Visual Analogy */}
          {activeLens === 'metaphor' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-200">
                <span className="text-sm font-semibold text-zinc-100">
                  {concept.metaphor.title}
                </span>
              </div>
              <div className="ui-panel-elevated p-5 text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {renderBionicText(concept.metaphor.story, bionicReading)}
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Analog cognitive framework: anchors abstract mathematical constructs to tangible real-world processes.
              </p>
            </div>
          )}

          {/* 2. Executive Steps */}
          {activeLens === 'steps' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Cognitive decompression checklist:</span>
                <span className="font-mono text-[11px] text-zinc-500">4 sequential milestones</span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {concept.microSteps.map((s) => {
                  const key = `${concept.id}-${s.step}`;
                  const isDone = !!completedSteps[key];

                  return (
                    <div
                      key={s.step}
                      onClick={() => handleToggleStep(s.step)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isDone
                          ? 'bg-zinc-900/40 border-emerald-500/30'
                          : 'bg-zinc-900/60 border-white/[0.06] hover:border-white/10'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isDone ? (
                          <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <Circle className="w-4 h-4 text-zinc-600" />
                        )}
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${isDone ? 'text-zinc-400 line-through' : 'text-zinc-200'}`}>
                          {s.step}. {s.title}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                          {renderBionicText(s.desc, bionicReading)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Intuitive Simplification (ELI5) */}
          {activeLens === 'eli5' && (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-zinc-200">
                High-Retention Intuitive Explanation
              </div>
              <div className="ui-panel-elevated p-5 text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {renderBionicText(concept.explainLike5, bionicReading)}
              </div>
            </div>
          )}

          {/* 4. Mathematical Deep Dive */}
          {activeLens === 'deepdive' && (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-zinc-200">
                Rigorous Architecture & Formulation
              </div>
              <pre className="code-block p-4 text-zinc-300 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {concept.deepDive}
              </pre>
            </div>
          )}

          {/* 5. Socratic Inquiry */}
          {activeLens === 'socratic' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-900/70 border border-white/[0.08] space-y-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">
                  Active-Recall Conceptual Challenge:
                </div>
                <div className="text-xs sm:text-sm font-medium text-zinc-200">
                  "{concept.socraticQuestions[0]}"
                </div>
              </div>

              <form onSubmit={handleSocraticSubmit} className="space-y-2.5">
                <textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Formulate your hypothesis or intuitive reasoning..."
                  rows={3}
                  className="w-full bg-zinc-950 border border-white/[0.08] rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Instant AI evaluation for pedagogical guidance
                  </span>
                  <button
                    type="submit"
                    disabled={isThinking || !userResponse.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs disabled:opacity-40 transition-all cursor-pointer"
                  >
                    {isThinking ? (
                      <span>Analyzing reflection...</span>
                    ) : (
                      <>
                        <Send className="w-3 h-3" />
                        <span>Submit Reflection</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {socraticFeedback && (
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/[0.1] text-xs leading-relaxed space-y-1">
                  <div className="font-semibold text-indigo-400 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Minerva Mentor Feedback:</span>
                  </div>
                  <p className="text-zinc-300">
                    {socraticFeedback}
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
