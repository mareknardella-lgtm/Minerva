import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Layers, 
  Users, 
  Code2, 
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DevpostPitch() {
  const [copiedSection, setCopiedSection] = useState(null);
  const [teamName, setTeamName] = useState('Team Minerva');
  const [teamMembers, setTeamMembers] = useState('Marek (AI Engineer & Lead Architect)');

  const submissionData = {
    title: 'Minerva — Multimodal AI Education & Neurodiversity Empowerment Companion',
    tagline: 'Empowering neurodivergent and underserved learners to master artificial intelligence and build real-world social impact solutions through tactile sandboxes and adaptive cognitive pacing.',
    problemStatement: `Over 15-20% of the world's population is neurodivergent (ADHD, Dyslexia, Autism, Executive Dysfunction). In addition, millions of aspiring students in underrepresented regions face severe barriers when trying to learn artificial intelligence. 

Traditional AI education relies on high-density mathematical notation, wall-of-text academic papers, and intimidating code configurations. For neurodivergent minds, this causes severe cognitive overload, reading fatigue, and executive dysfunction paralysis—locking out brilliant minds from participating in the AI revolution. Furthermore, students often learn theory in isolation without an accessible pathway to apply Machine Learning to solve real-world community challenges.`,
    
    solutionOverview: `Minerva is an accessible, multimodal AI education platform and social-impact launchpad designed specifically around cognitive diversity and hands-on tactile learning. 

Rather than passive lectures, Minerva transforms complex AI foundations (Neural Networks, Transformers, Computer Vision, AI Ethics) into:
1. Multimodal Cognitive Lenses: Instant translation between visual metaphors, ADHD-friendly micro-milestones, 5-year-old intuitive breakdowns, and mathematical deep dives.
2. Zero-Install Browser-Native ML Labs: Tactile interactive sandboxes where learners train real perceptrons on 2D planes, inspect Transformer attention matrices, and slide 3x3 convolution kernels across pixel grids in real time.
3. The Empowerment Launchpad: A guided bridge connecting AI theory directly to UN Sustainable Development Goals (SDGs)—generating complete system architectures, starter code, and dataset pipelines for projects in education, clean water, waste recycling, and agriculture.`,

    keyFeatures: [
      {
        title: 'Cognitive Diversity & Sensory Pacing Engine',
        desc: 'Built-in support for Lexend/OpenDyslexic typography, Bionic Reading eye guidance, ADHD Clutter-Reduction Focus Mode, High Contrast (WCAG AAA), and calm color schemes.'
      },
      {
        title: 'Socratic Multimodal AI Tutor',
        desc: 'Interactive mentor delivering explanations tailored to diverse learning styles, featuring Web Speech API text-to-speech for auditory learners and active-recall challenges.'
      },
      {
        title: 'Tactile Browser-Native ML Sandboxes',
        desc: 'Real-time 2D Perceptron trainer with live decision-boundary hyperplane adjustment, Transformer Self-Attention matrix visualizer, and Computer Vision convolution filter studio.'
      },
      {
        title: 'UN SDG Empowerment Launchpad',
        desc: 'Pre-architected blueprints for social-impact AI projects (NeuroRead, EcoSort Vision, AquaSafe, AgriCare) with runnable Python code and open-source datasets.'
      },
      {
        title: 'Gamified Dopamine Reinforcement',
        desc: 'Celebratory milestone feedback and micro-checklists that bust ADHD executive paralysis and sustain intrinsic motivation.'
      }
    ],

    technologiesUsed: [
      'React 19 & Vite 8: High-performance, responsive clientside architecture',
      'Tailwind CSS v4: Responsive design tokens, accessible color scales, and glassmorphism UI',
      'HTML5 Canvas API: Real-time 2D coordinate plane and neural decision boundary rendering',
      'Web Speech API (SpeechSynthesis): Native text-to-speech with neurodiversity-calibrated cadence',
      'Canvas Confetti: Gamified milestone micro-rewards',
      'PyTorch, Transformers, ONNX, Scikit-Learn: Algorithmic reference pipelines provided in Launchpad blueprints'
    ],

    targetUsers: `• Neurodivergent learners (ADHD, Dyslexia, Autism spectrum) seeking intuitive, low-glare, sensory-friendly education.
• K-12 and university students with zero prior Machine Learning experience who want to learn by doing.
• Educators and hackathon participants looking for structured, accessible templates to build AI for Social Good.
• Global learners in low-bandwidth regions benefiting from lightweight, browser-native client-side ML tools.`,

    whatWeLearned: `During this challenge, we discovered that neurodiversity is not a limitation—it is a superpower when paired with the right cognitive interfaces. When AI concepts are broken down into visual, tactile, and Socratic experiences, students grasp complex principles like backpropagation and self-attention in minutes rather than weeks.`,

    whatsNext: `We plan to integrate WebGPU/ONNX Runtime Web to run local quantized LLMs directly inside Minerva for full offline edge capabilities, expand our laboratory suite to Diffusion and Reinforcement Learning, and partner with inclusive education programs globally.`
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });
  };

  const generateFullMarkdown = () => {
    return `# Project Title: ${submissionData.title}

## Tagline
${submissionData.tagline}

## Team Details
- **Team:** ${teamName}
- **Members:** ${teamMembers}

---

## 1. Problem Statement
${submissionData.problemStatement}

## 2. Solution Overview
${submissionData.solutionOverview}

## 3. Key Features
${submissionData.keyFeatures.map((f, i) => `${i + 1}. **${f.title}**: ${f.desc}`).join('\n')}

## 4. Technologies Used
${submissionData.technologiesUsed.map(t => `- ${t}`).join('\n')}

## 5. Target Users
${submissionData.targetUsers}

## 6. What We Learned
${submissionData.whatWeLearned}

## 7. What's Next for Minerva
${submissionData.whatsNext}
`;
  };

  const handleDownloadMarkdown = () => {
    const md = generateFullMarkdown();
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devpost-minerva-submission.md';
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Devpost Ready Pitch Submission</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Scheda di Presentazione per i Giudici
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Tutti i requisiti ufficiali del bando organizzati e pronti per la candidatura su Devpost. Copia l'intero testo o le singole sezioni con un clic.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={() => handleCopy(generateFullMarkdown(), 'all')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
            >
              {copiedSection === 'all' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSection === 'all' ? 'Tutto Copiato!' : 'Copia Tutto per Devpost'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Scarica .md</span>
            </button>
          </div>
        </div>

        {/* Team Customization Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Nome Team (opzionale):</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-400"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Membri del Team & Ruoli:</label>
            <input
              type="text"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              className="w-full bg-slate-900/70 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-400"
            />
          </div>
        </div>
      </div>

      {/* Structured Sections matching Devpost requirements */}
      <div className="space-y-4">
        
        {/* Title & Tagline Card */}
        <div className="glass-panel rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
              Project Title & Tagline
            </span>
            <button
              onClick={() => handleCopy(`${submissionData.title}\n${submissionData.tagline}`, 'title')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 cursor-pointer"
            >
              {copiedSection === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">
            {submissionData.title}
          </h2>
          <p className="text-xs text-slate-300 italic">
            "{submissionData.tagline}"
          </p>
        </div>

        {/* Problem Statement Card */}
        <div className="glass-panel rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              1. Problem Statement
            </span>
            <button
              onClick={() => handleCopy(submissionData.problemStatement, 'problem')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 cursor-pointer"
            >
              {copiedSection === 'problem' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
            {submissionData.problemStatement}
          </p>
        </div>

        {/* Solution Overview Card */}
        <div className="glass-panel rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              2. Solution Overview
            </span>
            <button
              onClick={() => handleCopy(submissionData.solutionOverview, 'solution')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 cursor-pointer"
            >
              {copiedSection === 'solution' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
            {submissionData.solutionOverview}
          </p>
        </div>

        {/* Key Features Card */}
        <div className="glass-panel rounded-2xl p-6 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              3. Key Features
            </span>
            <button
              onClick={() => handleCopy(submissionData.keyFeatures.map((f, i) => `${i + 1}. ${f.title}: ${f.desc}`).join('\n'), 'features')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 cursor-pointer"
            >
              {copiedSection === 'features' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {submissionData.keyFeatures.map((f, i) => (
              <div key={i} className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <span className="text-xs font-bold text-white block mb-1">
                  ✓ {f.title}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Target Users */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                4. Technologies Used
              </span>
              <button
                onClick={() => handleCopy(submissionData.technologiesUsed.join('\n'), 'tech')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 cursor-pointer"
              >
                {copiedSection === 'tech' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {submissionData.technologiesUsed.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                5. Target Users
              </span>
              <button
                onClick={() => handleCopy(submissionData.targetUsers, 'users')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 cursor-pointer"
              >
                {copiedSection === 'users' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {submissionData.targetUsers}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
