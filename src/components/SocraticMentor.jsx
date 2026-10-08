import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  Circle, 
  Baby, 
  Code2, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Send, 
  Bot, 
  Check, 
  ChevronRight,
  BookmarkCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
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
    const nextState = !completedSteps[key];
    setCompletedSteps(prev => ({ ...prev, [key]: nextState }));

    if (nextState) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#8b5cf6', '#06b6d4', '#10b981']
      });
    }
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
      // Dynamic Socratic evaluation
      const length = userResponse.trim().length;
      let reply = '';
      if (length < 20) {
        reply = `Intrigante riflessione! Prova a considerare anche: in che modo questa dinamica impatta la generalizzazione del modello quando incontra dati insoliti fuori dalla distribuzione iniziale?`;
      } else {
        reply = `Brillante intuizione! Hai colto esattamente il principio cardine: le rappresentazioni artificiali apprendono attraverso il contrasto e la retroazione degli errori. Nel modello reale, questo si traduce direttamente nella minimizzazione della funzione di perdita (Loss Function).`;
      }
      setSocraticFeedback(reply);
      setIsThinking(false);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 600);
  };

  // Get active text for audio synthesis
  const getCurrentTextForAudio = () => {
    if (activeLens === 'metaphor') return `${concept.metaphor.title}. ${concept.metaphor.story}`;
    if (activeLens === 'eli5') return concept.explainLike5;
    if (activeLens === 'deepdive') return concept.deepDive;
    if (activeLens === 'steps') return concept.microSteps.map(s => `${s.title}: ${s.desc}`).join('. ');
    return concept.summary;
  };

  return (
    <div className="space-y-6">
      
      {/* Concept Header & Topic Selector */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Socratic Multimodal Tutor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {concept.title}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              {renderBionicText(concept.summary, bionicReading)}
            </p>
          </div>

          {/* Quick Action: Audio Narration */}
          <button
            onClick={() => handleAudioPlay(getCurrentTextForAudio())}
            className={`self-start md:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all cursor-pointer shadow-md ${
              isSpeaking
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-violet-600/30 hover:bg-violet-600/50 border-violet-500/50 text-violet-200'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Ferma Voce' : 'Ascolta con Voce Calma'}</span>
          </button>
        </div>

        {/* Concept Pill Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-700/50">
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
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-violet-600/30 to-indigo-600/20 border-violet-400 shadow-lg shadow-violet-500/15'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-violet-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {item.difficulty}
                  </span>
                </div>
                <h2 className="text-xs font-bold text-slate-100 truncate">
                  {item.title}
                </h2>
              </button>
            );
          })}
        </div>
      </div>

      {/* Multimodal Cognitive Lenses Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800">
        
        <button
          onClick={() => setActiveLens('metaphor')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeLens === 'metaphor'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Metafora & Storia</span>
        </button>

        <button
          onClick={() => setActiveLens('steps')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeLens === 'steps'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Micro-Step ADHD</span>
        </button>

        <button
          onClick={() => setActiveLens('eli5')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeLens === 'eli5'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Baby className="w-4 h-4 text-cyan-400" />
          <span>Spiega a 5 Anni</span>
        </button>

        <button
          onClick={() => setActiveLens('deepdive')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeLens === 'deepdive'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Code2 className="w-4 h-4 text-pink-400" />
          <span>Formula & Deep Dive</span>
        </button>

        <button
          onClick={() => setActiveLens('socratic')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeLens === 'socratic'
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-teal-400" />
          <span>Dialogo Socratico</span>
        </button>

      </div>

      {/* Lens Content Display */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        
        {/* Metaphor & Story Lens */}
        {activeLens === 'metaphor' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-amber-400">
              <Lightbulb className="w-5 h-5" />
              <h2 className="text-lg font-bold text-white">
                {concept.metaphor.title}
              </h2>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 text-slate-200 text-sm leading-relaxed">
              {renderBionicText(concept.metaphor.story, bionicReading)}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
              <span>
                <strong>Perché funziona per la mente neurodivergente:</strong> Le metafore visive attivano il pensiero analogico e la memoria a lungo termine, bypassando il sovraccarico di gergo tecnico astratto.
              </span>
            </div>
          </div>
        )}

        {/* ADHD Micro-Steps Lens */}
        {activeLens === 'steps' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h2 className="text-lg font-bold text-white">
                  Micro-Pietre Miliari (Sblocca Dopamina)
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Clicca ogni passo per confermare la comprensione
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {concept.microSteps.map((s) => {
                const key = `${concept.id}-${s.step}`;
                const isDone = !!completedSteps[key];

                return (
                  <div
                    key={s.step}
                    onClick={() => handleToggleStep(s.step)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isDone
                        ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isDone ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-xs font-bold ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                        Passo {s.step}: {s.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {renderBionicText(s.desc, bionicReading)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Explain Like I'm 5 Lens */}
        {activeLens === 'eli5' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-cyan-400">
              <Baby className="w-5 h-5" />
              <h2 className="text-lg font-bold text-white">
                Spiegazione Semplice & Intuitiva (ELI5)
              </h2>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-5 text-slate-200 text-base leading-relaxed">
              {renderBionicText(concept.explainLike5, bionicReading)}
            </div>
          </div>
        )}

        {/* Deep Dive & Math Lens */}
        {activeLens === 'deepdive' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-pink-400">
              <Code2 className="w-5 h-5" />
              <h2 className="text-lg font-bold text-white">
                Formulazione Matematica & Architettura
              </h2>
            </div>
            <pre className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 text-pink-300 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {concept.deepDive}
            </pre>
          </div>
        )}

        {/* Socratic Discussion Lens */}
        {activeLens === 'socratic' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 text-teal-400">
              <HelpCircle className="w-5 h-5" />
              <h2 className="text-lg font-bold text-white">
                Riflessione & Richiamo Attivo con Minerva
              </h2>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Domanda Sfidante di Minerva:
              </span>
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4 text-teal-200 text-sm font-medium">
                "{concept.socraticQuestions[0]}"
              </div>
            </div>

            <form onSubmit={handleSocraticSubmit} className="space-y-3">
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder="Scrivi qui la tua intuizione o risposta (Minerva analizzerà il tuo ragionamento)..."
                rows={3}
                className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isThinking || !userResponse.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {isThinking ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Minerva sta riflettendo...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Invia Risposta a Minerva</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {socraticFeedback && (
              <div className="bg-slate-900/80 border border-teal-500/40 rounded-xl p-4 flex items-start gap-3 text-xs leading-relaxed animate-fade-in">
                <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="text-slate-200">
                  <span className="font-bold text-teal-300 block mb-1">Feedback del Mentore Minerva:</span>
                  {socraticFeedback}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
