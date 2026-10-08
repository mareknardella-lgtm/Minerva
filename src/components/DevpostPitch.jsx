import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Users, 
  Code2
} from 'lucide-react';

export default function DevpostPitch() {
  const [copiedSection, setCopiedSection] = useState(null);
  const [teamName, setTeamName] = useState('Team Minerva');
  const [teamMembers, setTeamMembers] = useState('Marek (Lead AI Engineer & Accessibility Architect)');

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
        desc: 'Native support for Lexend/OpenDyslexic typography, Bionic Reading eye guidance, ADHD Clutter-Reduction Focus Mode, High Contrast (WCAG AAA), and calm color schemes.'
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
        desc: 'Milestone checklists and feedback designed to bust ADHD executive paralysis and sustain intrinsic motivation.'
      }
    ],

    technologiesUsed: [
      'React 19 & Vite 8: High-performance, responsive clientside architecture',
      'Tailwind CSS v4: Responsive design tokens, accessible color scales, and refined UI',
      'HTML5 Canvas API: Real-time 2D coordinate plane and neural decision boundary rendering',
      'Web Speech API (SpeechSynthesis): Native text-to-speech with neurodiversity-calibrated cadence',
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
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="ui-panel p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 pb-3 border-b border-white/[0.06]">
          <div>
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block">
              Official Hackathon Submission Dossier
            </span>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100 font-['Outfit']">
              Devpost Pitch Submission
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => handleCopy(generateFullMarkdown(), 'all')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors cursor-pointer"
            >
              {copiedSection === 'all' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'all' ? 'All Copied' : 'Copy Full Submission (.md)'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-xs border border-white/[0.08] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Team Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-mono text-zinc-400 block mb-1">Team Name:</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full bg-zinc-950 border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono text-zinc-400 block mb-1">Members & Roles:</label>
            <input
              type="text"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              className="w-full bg-zinc-950 border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Structured Sections */}
      <div className="space-y-4">
        
        {/* Title & Tagline */}
        <div className="ui-panel p-5 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">
              Project Title & Tagline
            </span>
            <button
              onClick={() => handleCopy(`${submissionData.title}\n${submissionData.tagline}`, 'title')}
              className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/[0.06] cursor-pointer"
            >
              {copiedSection === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <h2 className="text-base font-bold text-zinc-100 mb-1">
            {submissionData.title}
          </h2>
          <p className="text-xs text-zinc-400 italic">
            "{submissionData.tagline}"
          </p>
        </div>

        {/* Problem Statement */}
        <div className="ui-panel p-5 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              1. Problem Statement
            </span>
            <button
              onClick={() => handleCopy(submissionData.problemStatement, 'problem')}
              className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/[0.06] cursor-pointer"
            >
              {copiedSection === 'problem' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
            {submissionData.problemStatement}
          </p>
        </div>

        {/* Solution Overview */}
        <div className="ui-panel p-5 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
              2. Solution Overview
            </span>
            <button
              onClick={() => handleCopy(submissionData.solutionOverview, 'solution')}
              className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/[0.06] cursor-pointer"
            >
              {copiedSection === 'solution' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
            {submissionData.solutionOverview}
          </p>
        </div>

        {/* Key Features */}
        <div className="ui-panel p-5 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400">
              3. Key Features
            </span>
            <button
              onClick={() => handleCopy(submissionData.keyFeatures.map((f, i) => `${i + 1}. ${f.title}: ${f.desc}`).join('\n'), 'features')}
              className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/[0.06] cursor-pointer"
            >
              {copiedSection === 'features' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {submissionData.keyFeatures.map((f, i) => (
              <div key={i} className="ui-panel-elevated p-3.5">
                <span className="text-xs font-semibold text-zinc-200 block mb-1">
                  {f.title}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Target Users */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="ui-panel p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                4. Technologies Used
              </span>
              <button
                onClick={() => handleCopy(submissionData.technologiesUsed.join('\n'), 'tech')}
                className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/[0.06] cursor-pointer"
              >
                {copiedSection === 'tech' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
              {submissionData.technologiesUsed.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-zinc-500">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ui-panel p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-300">
                5. Target Beneficiaries
              </span>
              <button
                onClick={() => handleCopy(submissionData.targetUsers, 'users')}
                className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/[0.06] cursor-pointer"
              >
                {copiedSection === 'users' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
              {submissionData.targetUsers}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
