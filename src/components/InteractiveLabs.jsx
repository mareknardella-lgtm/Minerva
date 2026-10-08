import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  BrainCircuit, 
  Layers, 
  Grid3X3, 
  Gauge, 
  Plus, 
  Sliders, 
  Eye, 
  Cpu, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveLabs() {
  const [activeLab, setActiveLab] = useState('perceptron'); // 'perceptron' | 'attention' | 'vision'

  /* =========================================================================
     LAB 1: PERCEPTRON & DECISION BOUNDARY STATE
     ========================================================================= */
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([
    // Class 0 (Cyan, label 0)
    { x: 60, y: 70, label: 0 },
    { x: 90, y: 110, label: 0 },
    { x: 120, y: 60, label: 0 },
    { x: 80, y: 150, label: 0 },
    { x: 140, y: 130, label: 0 },
    // Class 1 (Purple, label 1)
    { x: 220, y: 220, label: 1 },
    { x: 260, y: 250, label: 1 },
    { x: 280, y: 190, label: 1 },
    { x: 240, y: 280, label: 1 },
    { x: 300, y: 240, label: 1 }
  ]);
  const [currentClass, setCurrentClass] = useState(0);
  const [weights, setWeights] = useState({ w1: 0.1, w2: -0.2, bias: 0.05 });
  const [learningRate, setLearningRate] = useState(0.05);
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [loss, setLoss] = useState(0);

  // Compute Perceptron Prediction
  const predictPerceptron = (pt, w) => {
    // Normalize coordinates 0..360 to -1..1
    const nx = (pt.x - 180) / 180;
    const ny = (pt.y - 180) / 180;
    const z = w.w1 * nx + w.w2 * ny + w.bias;
    return z >= 0 ? 1 : 0;
  };

  // Evaluate accuracy and loss
  const evaluateModel = (w, pts) => {
    if (pts.length === 0) return { acc: 0, l: 0 };
    let correct = 0;
    let totalLoss = 0;
    pts.forEach(p => {
      const pred = predictPerceptron(p, w);
      if (pred === p.label) correct++;
      const nx = (p.x - 180) / 180;
      const ny = (p.y - 180) / 180;
      const z = w.w1 * nx + w.w2 * ny + w.bias;
      const prob = 1 / (1 + Math.exp(-z));
      const target = p.label;
      const error = - (target * Math.log(Math.max(prob, 1e-7)) + (1 - target) * Math.log(Math.max(1 - prob, 1e-7)));
      totalLoss += error;
    });
    return {
      acc: Math.round((correct / pts.length) * 100),
      l: (totalLoss / pts.length).toFixed(3)
    };
  };

  // Draw Perceptron Canvas
  useEffect(() => {
    if (activeLab !== 'perceptron') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Decision Boundary Line: w1*nx + w2*ny + b = 0
    // ny = (-w1*nx - b) / w2
    if (Math.abs(weights.w2) > 0.001) {
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const getCanvasY = (canvasX) => {
        const nx = (canvasX - 180) / 180;
        const ny = (-weights.w1 * nx - weights.bias) / weights.w2;
        return ny * 180 + 180;
      };

      const y0 = getCanvasY(0);
      const yEnd = getCanvasY(width);
      ctx.moveTo(0, y0);
      ctx.lineTo(width, yEnd);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw points
    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      if (p.label === 0) {
        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
      } else {
        ctx.fillStyle = '#ec4899';
        ctx.shadowColor = 'rgba(236, 72, 153, 0.8)';
      }
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    const metrics = evaluateModel(weights, points);
    setAccuracy(metrics.acc);
    setLoss(metrics.l);
  }, [points, weights, activeLab]);

  // Train one step
  const trainStep = () => {
    let newW1 = weights.w1;
    let newW2 = weights.w2;
    let newBias = weights.bias;

    points.forEach((p) => {
      const pred = predictPerceptron(p, { w1: newW1, w2: newW2, bias: newBias });
      const error = p.label - pred;
      if (error !== 0) {
        const nx = (p.x - 180) / 180;
        const ny = (p.y - 180) / 180;
        newW1 += learningRate * error * nx;
        newW2 += learningRate * error * ny;
        newBias += learningRate * error;
      }
    });

    const updated = { w1: newW1, w2: newW2, bias: newBias };
    setWeights(updated);
    setEpoch(prev => prev + 1);

    const metrics = evaluateModel(updated, points);
    if (metrics.acc === 100) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  // Continuous Training Loop
  useEffect(() => {
    let interval;
    if (isTraining) {
      interval = setInterval(() => {
        setEpoch(curr => {
          if (curr >= 60 || accuracy === 100) {
            setIsTraining(false);
            return curr;
          }
          trainStep();
          return curr + 1;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isTraining, accuracy, weights, points, learningRate]);

  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(10, Math.min(350, e.clientX - rect.left));
    const y = Math.max(10, Math.min(350, e.clientY - rect.top));
    setPoints(prev => [...prev, { x, y, label: currentClass }]);
  };

  const resetPerceptron = () => {
    setWeights({ w1: (Math.random() - 0.5) * 0.4, w2: (Math.random() - 0.5) * 0.4, bias: (Math.random() - 0.5) * 0.2 });
    setEpoch(0);
    setIsTraining(false);
  };

  /* =========================================================================
     LAB 2: TRANSFORMER TOKEN ATTENTION & SENTIMENT STATE
     ========================================================================= */
  const [sentence, setSentence] = useState('Minerva empowers students with accessible AI education');
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(1); // Default to 'empowers'

  const sampleSentences = [
    'Minerva empowers students with accessible AI education',
    'Historical human datasets often introduce unfair bias',
    'Clean drinking water transforms community public health'
  ];

  const tokens = sentence.split(' ').filter(t => t.length > 0);

  // Compute simulated self-attention weights based on semantic distance
  const getAttentionWeights = (sourceIdx) => {
    return tokens.map((_, targetIdx) => {
      if (sourceIdx === targetIdx) return 0.95;
      const dist = Math.abs(sourceIdx - targetIdx);
      // Higher weight to neighboring or key terms
      const base = Math.max(0.15, 0.85 - dist * 0.18);
      return Math.min(0.9, base + (sourceIdx % 2 === 0 ? 0.05 : -0.05));
    });
  };

  // Compute sentiment polarity score
  const getSentiment = (txt) => {
    const positiveWords = ['empowers', 'accessible', 'clean', 'transforms', 'health', 'education', 'smart', 'good'];
    const negativeWords = ['bias', 'unfair', 'harmful', 'bad', 'poor', 'danger', 'failure'];
    let score = 0;
    const lower = txt.toLowerCase();
    positiveWords.forEach(w => { if (lower.includes(w)) score += 0.35; });
    negativeWords.forEach(w => { if (lower.includes(w)) score -= 0.35; });
    return Math.max(-1, Math.min(1, score));
  };

  const sentimentScore = getSentiment(sentence);

  /* =========================================================================
     LAB 3: COMPUTER VISION & CONVOLUTION FILTER STATE
     ========================================================================= */
  const GRID_SIZE = 10;
  const [pixelGrid, setPixelGrid] = useState(() => {
    const g = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
    // Draw default 'X' pattern
    for (let i = 2; i < 8; i++) {
      g[i][i] = 1;
      g[i][9 - i] = 1;
    }
    return g;
  });

  const [activeKernelName, setActiveKernelName] = useState('sobel-h');

  const KERNELS = {
    'sobel-h': {
      name: 'Rilevatore Bordi Orizzontali (Sobel H)',
      matrix: [
        [-1, -2, -1],
        [ 0,  0,  0],
        [ 1,  2,  1]
      ],
      desc: 'Enfatizza transizioni e linee orizzontali azzerando sfondi piatti.'
    },
    'sobel-v': {
      name: 'Rilevatore Bordi Verticali (Sobel V)',
      matrix: [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
      ],
      desc: 'Rileva bordi e contorni verticali (essenziale per riconoscimento sagome).'
    },
    'sharpen': {
      name: 'Filtro Nitidezza (Sharpening)',
      matrix: [
        [ 0, -1,  0],
        [-1,  5, -1],
        [ 0, -1,  0]
      ],
      desc: 'Amplifica i gradienti di contrasto tra pixel adiacenti.'
    },
    'blur': {
      name: 'Sfocatura Gaussiana (Noise Reduction)',
      matrix: [
        [1/9, 1/9, 1/9],
        [1/9, 1/9, 1/9],
        [1/9, 1/9, 1/9]
      ],
      desc: 'Media i pixel circostanti per eliminare rumore e variazioni microscopiche.'
    }
  };

  const activeKernel = KERNELS[activeKernelName];

  // Compute 2D Convolution Output Feature Map
  const computeConvolution = () => {
    const k = activeKernel.matrix;
    const out = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
    for (let r = 1; r < GRID_SIZE - 1; r++) {
      for (let c = 1; c < GRID_SIZE - 1; c++) {
        let sum = 0;
        for (let kr = -1; kr <= 1; kr++) {
          for (let kc = -1; kc <= 1; kc++) {
            sum += pixelGrid[r + kr][c + kc] * k[kr + 1][kc + 1];
          }
        }
        // Normalize between 0 and 1
        out[r][c] = Math.max(0, Math.min(1, Math.abs(sum) / 2));
      }
    }
    return out;
  };

  const featureMap = computeConvolution();

  const togglePixel = (r, c) => {
    setPixelGrid(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = next[r][c] === 1 ? 0 : 1;
      return next;
    });
  };

  const setPresetGrid = (type) => {
    const g = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
    if (type === 'cross') {
      for (let i = 1; i < 9; i++) {
        g[i][5] = 1;
        g[5][i] = 1;
      }
    } else if (type === 'box') {
      for (let i = 2; i <= 7; i++) {
        g[2][i] = 1;
        g[7][i] = 1;
        g[i][2] = 1;
        g[i][7] = 1;
      }
    } else if (type === 'diagonal') {
      for (let i = 1; i < 9; i++) g[i][i] = 1;
    }
    setPixelGrid(g);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Lab Mode Switcher */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Micro-Laboratori Interattivi Browser-Native</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sperimenta l'Intelligenza Artificiale dal Vivo
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Zero installazioni. Tocca gli algoritmi con mano e osserva la matematica prendere vita in tempo reale.
            </p>
          </div>
        </div>

        {/* Lab Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-700/50">
          <button
            onClick={() => setActiveLab('perceptron')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeLab === 'perceptron'
                ? 'bg-gradient-to-br from-violet-600/30 to-indigo-600/20 border-violet-400 shadow-lg shadow-violet-500/15'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <BrainCircuit className="w-4 h-4 text-violet-400" />
              <h2 className="text-xs font-bold text-white">Lab 1: Perceptron 2D</h2>
            </div>
            <p className="text-[11px] text-slate-400">
              Disegna classi di punti, allena il neurone e visualizza il confine decisionale.
            </p>
          </button>

          <button
            onClick={() => setActiveLab('attention')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeLab === 'attention'
                ? 'bg-gradient-to-br from-cyan-600/30 to-blue-600/20 border-cyan-400 shadow-lg shadow-cyan-500/15'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold text-white">Lab 2: Transformer Attention</h2>
            </div>
            <p className="text-[11px] text-slate-400">
              Esplora i pesi di Self-Attention tra token e mappa termica del sentiment.
            </p>
          </button>

          <button
            onClick={() => setActiveLab('vision')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeLab === 'vision'
                ? 'bg-gradient-to-br from-pink-600/30 to-rose-600/20 border-pink-400 shadow-lg shadow-pink-500/15'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Grid3X3 className="w-4 h-4 text-pink-400" />
              <h2 className="text-xs font-bold text-white">Lab 3: Vision Convoluzione</h2>
            </div>
            <p className="text-[11px] text-slate-400">
              Disegna pixel e applica filtri kernel 3x3 (Sobel, Sharpen, Blur) in tempo reale.
            </p>
          </button>
        </div>
      </div>

      {/* =====================================================================
          LAB 1 CONTENT: PERCEPTRON PLAYGROUND
          ===================================================================== */}
      {activeLab === 'perceptron' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Canvas Interactive Section */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">Piano Cartesiano Feature</span>
                <span className="text-[10px] text-slate-500">(Clicca per aggiungere punti)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentClass(0)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    currentClass === 0
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-800/40 border-slate-700 text-slate-400'
                  }`}
                >
                  Classe A (Ciano)
                </button>
                <button
                  onClick={() => setCurrentClass(1)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    currentClass === 1
                      ? 'bg-pink-500/20 border-pink-400 text-pink-300'
                      : 'bg-slate-800/40 border-slate-700 text-slate-400'
                  }`}
                >
                  Classe B (Magenta)
                </button>
              </div>
            </div>

            <div className="relative border border-slate-700/80 rounded-2xl overflow-hidden bg-slate-950 shadow-inner cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={360}
                height={360}
                onClick={handleCanvasClick}
                className="block"
              />
            </div>

            {/* Canvas Legend */}
            <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span> Classe 0
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block"></span> Classe 1
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-4 h-0.5 bg-purple-500 inline-block"></span> Confine Decisionale
                </span>
              </div>
              <button
                onClick={() => setPoints([])}
                className="text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                Pulisci Punti
              </button>
            </div>
          </div>

          {/* Model Controls & Metrics */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Real-time Metrics Card */}
            <div className="glass-panel rounded-2xl p-5">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Metriche Neurone in Tempo Reale
              </h2>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Accuratezza</span>
                  <span className={`text-xl font-black ${accuracy === 100 ? 'text-emerald-400' : 'text-violet-400'}`}>
                    {accuracy}%
                  </span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Perdita (Loss)</span>
                  <span className="text-xl font-black text-amber-400">{loss}</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Epoca</span>
                  <span className="text-xl font-black text-cyan-400">{epoch}</span>
                </div>
              </div>

              {/* Formula & Synaptic Weights */}
              <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl font-mono text-[11px] text-slate-300">
                <div className="text-violet-400 font-bold mb-1">Equazione Iperpiano:</div>
                <div>{weights.w1.toFixed(3)}·x + {weights.w2.toFixed(3)}·y + {weights.bias.toFixed(3)} = 0</div>
              </div>
            </div>

            {/* Training Controls */}
            <div className="glass-panel rounded-2xl p-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Learning Rate (Tasso di Apprendimento):</span>
                  <span className="text-violet-400">{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsTraining(!isTraining)}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                    isTraining
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isTraining ? 'Metti in Pausa' : 'Avvia Training Automatico'}</span>
                </button>

                <button
                  onClick={trainStep}
                  disabled={isTraining}
                  title="Fai avanzare 1 epoca singola"
                  className="px-3.5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 disabled:opacity-40 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                >
                  +1 Epoca
                </button>

                <button
                  onClick={resetPerceptron}
                  title="Reimposta Pesi Casuali"
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cognitive Tip */}
            <div className="p-3.5 bg-violet-950/20 border border-violet-500/20 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <span>
                <strong>Cosa stai osservando:</strong> Quando premi "Avvia Training", il neurone valuta ogni punto. Se sbaglia, applica la regola del gradiente muovendo la linea viola verso la soluzione ottimale!
              </span>
            </div>

          </div>

        </div>
      )}

      {/* =====================================================================
          LAB 2 CONTENT: TRANSFORMER ATTENTION & SENTIMENT
          ===================================================================== */}
      {activeLab === 'attention' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              Inserisci o Scegli una Frase di Input:
            </h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                placeholder="Scrivi una frase in inglese o italiano..."
                className="flex-1 bg-slate-900/70 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <div className="flex gap-1.5 flex-wrap">
                {sampleSentences.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSentence(s);
                      setSelectedTokenIdx(1);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  >
                    Esempio {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Interactive Token Attention Matrix */}
            <div className="lg:col-span-8 glass-panel rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Meccanismo di Self-Attention tra Token
                  </h3>
                  <p className="text-xs text-slate-400">
                    Clicca su un token per vedere a quali altre parole rivolge la sua attenzione contestuale.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Token Selezionato: "{tokens[selectedTokenIdx] || ''}"
                </span>
              </div>

              {/* Token Chips */}
              <div className="flex flex-wrap gap-2.5 py-2">
                {tokens.map((token, idx) => {
                  const isSelected = idx === selectedTokenIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTokenIdx(idx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/30 scale-105'
                          : 'bg-slate-900/80 text-slate-200 border-slate-700/80 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 block font-sans">id:{idx}</span>
                      {token}
                    </button>
                  );
                })}
              </div>

              {/* Attention Weight Distribution Bars */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-400">
                  Distribuzione Pesi di Attenzione (Softmax Scores):
                </span>
                <div className="space-y-2">
                  {tokens.map((tok, tIdx) => {
                    const weights = getAttentionWeights(selectedTokenIdx);
                    const weightVal = weights[tIdx] || 0.1;
                    const pct = Math.round(weightVal * 100);

                    return (
                      <div key={tIdx} className="flex items-center gap-3 text-xs">
                        <span className="w-24 text-right font-mono text-slate-300 truncate">
                          {tok}
                        </span>
                        <div className="flex-1 h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              tIdx === selectedTokenIdx
                                ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                                : 'bg-gradient-to-r from-violet-500 to-indigo-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-10 font-mono text-[11px] text-cyan-300 text-right">
                          {weightVal.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sentiment & Valence Meter */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass-panel rounded-2xl p-6 text-center space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Valenza Sentiment & Polarity
                </h3>

                <div className="relative inline-flex items-center justify-center p-6">
                  <div className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center shadow-lg transition-colors ${
                    sentimentScore > 0.1
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : sentimentScore < -0.1
                      ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                      : 'border-amber-500 bg-amber-500/10 text-amber-400'
                  }`}>
                    <span className="text-2xl font-black">{sentimentScore.toFixed(2)}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">
                      {sentimentScore > 0.1 ? 'Positivo' : sentimentScore < -0.1 ? 'Critico/Negativo' : 'Neutrale'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300">
                  Il Transformer pondera le parole chiave del testo per dedurne orientamento emotivo e intenzione semantica.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =====================================================================
          LAB 3 CONTENT: VISION CONVOLUTION STUDIO
          ===================================================================== */}
      {activeLab === 'vision' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Drawing Canvas 10x10 */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Matrice Pixel Input (10x10)
                </h3>
                <span className="text-[10px] text-slate-400">Clicca i quadratini per disegnare</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setPresetGrid('cross')}
                  className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Croce
                </button>
                <button
                  onClick={() => setPresetGrid('box')}
                  className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Riquadro
                </button>
                <button
                  onClick={() => setPresetGrid('diagonal')}
                  className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Diagonale
                </button>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-1 p-2 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
              {pixelGrid.map((row, r) =>
                row.map((val, c) => (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => togglePixel(r, c)}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded transition-colors cursor-pointer ${
                      val === 1
                        ? 'bg-pink-500 shadow-sm shadow-pink-500/50'
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  />
                ))
              )}
            </div>
            
            <button
              onClick={() => setPixelGrid(Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0)))}
              className="mt-3 text-[11px] text-slate-400 hover:text-rose-400 cursor-pointer transition-colors"
            >
              Azzera Disegno
            </button>
          </div>

          {/* Kernel Filter Selection & Convolution Output */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Kernel Selector */}
            <div className="glass-panel rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Seleziona Kernel di Convoluzione (Filtro 3x3):
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(KERNELS).map(([kKey, kVal]) => (
                  <button
                    key={kKey}
                    onClick={() => setActiveKernelName(kKey)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      activeKernelName === kKey
                        ? 'bg-pink-600/20 border-pink-400 text-pink-300 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[11px] font-bold block truncate">{kVal.name.split(' ')[0]}</span>
                    <span className="text-[9px] text-slate-500">{kKey}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-300 italic bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                "{activeKernel.desc}"
              </p>
            </div>

            {/* Feature Map Display */}
            <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6">
              
              {/* Kernel Matrix View */}
              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Kernel 3x3</span>
                <div className="grid grid-cols-3 gap-1 p-1.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[10px]">
                  {activeKernel.matrix.map((row, r) =>
                    row.map((val, c) => (
                      <div key={`${r}-${c}`} className="w-6 h-6 flex items-center justify-center text-pink-400 font-bold">
                        {typeof val === 'number' && val < 1 && val > 0 ? '0.1' : val}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div className="text-slate-500 font-bold text-sm">➔</div>

              {/* Output Feature Map Grid */}
              <div className="flex-1 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-300 block mb-1.5">
                  Mappa delle Feature Risultante (Convoluzione)
                </span>
                <div className="grid grid-cols-10 gap-1 p-2 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
                  {featureMap.map((row, r) =>
                    row.map((val, c) => (
                      <div
                        key={`fm-${r}-${c}`}
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded transition-all"
                        style={{
                          backgroundColor: val > 0.05 ? `rgba(236, 72, 153, ${Math.min(1, val * 1.5)})` : '#0f172a'
                        }}
                        title={`Attivazione: ${val.toFixed(2)}`}
                      />
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
