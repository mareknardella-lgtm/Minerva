import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  BrainCircuit, 
  Layers, 
  Grid3X3, 
  Pause,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveLabs() {
  const [activeLab, setActiveLab] = useState('perceptron'); // 'perceptron' | 'attention' | 'vision'

  /* =========================================================================
     LAB 1: PERCEPTRON & DECISION BOUNDARY STATE
     ========================================================================= */
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([
    // Class 0 (Electric Blue, label 0)
    { x: 70, y: 80, label: 0 },
    { x: 100, y: 120, label: 0 },
    { x: 130, y: 70, label: 0 },
    { x: 90, y: 160, label: 0 },
    { x: 150, y: 140, label: 0 },
    // Class 1 (Rose/Crimson, label 1)
    { x: 230, y: 230, label: 1 },
    { x: 270, y: 260, label: 1 },
    { x: 290, y: 200, label: 1 },
    { x: 250, y: 290, label: 1 },
    { x: 310, y: 250, label: 1 }
  ]);
  const [currentClass, setCurrentClass] = useState(0);
  const [weights, setWeights] = useState({ w1: 0.12, w2: -0.18, bias: 0.04 });
  const [learningRate, setLearningRate] = useState(0.06);
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [loss, setLoss] = useState(0);

  const predictPerceptron = (pt, w) => {
    const nx = (pt.x - 180) / 180;
    const ny = (pt.y - 180) / 180;
    const z = w.w1 * nx + w.w2 * ny + w.bias;
    return z >= 0 ? 1 : 0;
  };

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

  useEffect(() => {
    if (activeLab !== 'perceptron') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Crisp high-DPI rendering
    ctx.clearRect(0, 0, width, height);

    // Subtle coordinate grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
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

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Decision Boundary Line: w1*nx + w2*ny + b = 0
    if (Math.abs(weights.w2) > 0.001) {
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 2.5;
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
    }

    // Points
    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2);
      if (p.label === 0) {
        ctx.fillStyle = '#38bdf8';
        ctx.strokeStyle = '#0284c7';
      } else {
        ctx.fillStyle = '#f43f5e';
        ctx.strokeStyle = '#be123c';
      }
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    const metrics = evaluateModel(weights, points);
    setAccuracy(metrics.acc);
    setLoss(metrics.l);
  }, [points, weights, activeLab]);

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
  };

  useEffect(() => {
    let interval;
    if (isTraining) {
      interval = setInterval(() => {
        setEpoch(curr => {
          if (curr >= 50 || accuracy === 100) {
            setIsTraining(false);
            return curr;
          }
          trainStep();
          return curr + 1;
        });
      }, 70);
    }
    return () => clearInterval(interval);
  }, [isTraining, accuracy, weights, points, learningRate]);

  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(15, Math.min(345, e.clientX - rect.left));
    const y = Math.max(15, Math.min(345, e.clientY - rect.top));
    setPoints(prev => [...prev, { x, y, label: currentClass }]);
  };

  const resetPerceptron = () => {
    setWeights({ w1: (Math.random() - 0.5) * 0.3, w2: (Math.random() - 0.5) * 0.3, bias: (Math.random() - 0.5) * 0.2 });
    setEpoch(0);
    setIsTraining(false);
  };

  /* =========================================================================
     LAB 2: TRANSFORMER TOKEN ATTENTION STATE
     ========================================================================= */
  const [sentence, setSentence] = useState('Minerva empowers students with accessible AI education');
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(1);

  const sampleSentences = [
    'Minerva empowers students with accessible AI education',
    'Historical human datasets often introduce unfair bias',
    'Clean drinking water transforms community public health'
  ];

  const tokens = sentence.split(' ').filter(t => t.length > 0);

  const getAttentionWeights = (sourceIdx) => {
    return tokens.map((_, targetIdx) => {
      if (sourceIdx === targetIdx) return 0.95;
      const dist = Math.abs(sourceIdx - targetIdx);
      const base = Math.max(0.12, 0.85 - dist * 0.18);
      return Math.min(0.9, base + (sourceIdx % 2 === 0 ? 0.05 : -0.05));
    });
  };

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
     LAB 3: COMPUTER VISION & CONVOLUTION STATE
     ========================================================================= */
  const GRID_SIZE = 10;
  const [pixelGrid, setPixelGrid] = useState(() => {
    const g = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
    for (let i = 2; i < 8; i++) {
      g[i][i] = 1;
      g[i][9 - i] = 1;
    }
    return g;
  });

  const [activeKernelName, setActiveKernelName] = useState('sobel-h');

  const KERNELS = {
    'sobel-h': {
      name: 'Sobel Horizontal (Bordi Orizzontali)',
      matrix: [
        [-1, -2, -1],
        [ 0,  0,  0],
        [ 1,  2,  1]
      ],
      desc: 'Estrae gradienti d\'intensità verticale evidenziando i margini orizzontali.'
    },
    'sobel-v': {
      name: 'Sobel Vertical (Bordi Verticali)',
      matrix: [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
      ],
      desc: 'Estrae gradienti d\'intensità orizzontale evidenziando contorni e linee verticali.'
    },
    'sharpen': {
      name: 'Sharpening (Enfasi Contrasto)',
      matrix: [
        [ 0, -1,  0],
        [-1,  5, -1],
        [ 0, -1,  0]
      ],
      desc: 'Amplifica le alte frequenze spaziali e i passaggi netti di luminosità.'
    },
    'blur': {
      name: 'Gaussian Approximation (Smoothing)',
      matrix: [
        [0.11, 0.11, 0.11],
        [0.11, 0.11, 0.11],
        [0.11, 0.11, 0.11]
      ],
      desc: 'Filtro passa-basso per l\'attenuazione del rumore pixel ad alta frequenza.'
    }
  };

  const activeKernel = KERNELS[activeKernelName];

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
      
      {/* Lab Module Selector (Segmented Bar) */}
      <div className="ui-panel p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-white/[0.06]">
          <div>
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block">
              Ambiente di Esecuzione Locale
            </span>
            <h1 className="text-xl font-bold tracking-tight text-zinc-100 font-['Outfit']">
              Laboratori Algoritmici Interattivi
            </h1>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">
            Zero latenza cloud · Esecuzione WebAssembly & Canvas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setActiveLab('perceptron')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              activeLab === 'perceptron'
                ? 'bg-zinc-800 text-white border-white/10 shadow-sm'
                : 'bg-zinc-900/40 border-white/[0.06] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-semibold">1. Perceptron 2D</span>
            </div>
            <p className="text-[11px] text-zinc-500 line-clamp-1">
              Iperpiano di separazione e convergenza loss.
            </p>
          </button>

          <button
            onClick={() => setActiveLab('attention')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              activeLab === 'attention'
                ? 'bg-zinc-800 text-white border-white/10 shadow-sm'
                : 'bg-zinc-900/40 border-white/[0.06] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-semibold">2. Transformer Attention</span>
            </div>
            <p className="text-[11px] text-zinc-500 line-clamp-1">
              Pesi di auto-attenzione e analisi di valenza semantica.
            </p>
          </button>

          <button
            onClick={() => setActiveLab('vision')}
            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
              activeLab === 'vision'
                ? 'bg-zinc-800 text-white border-white/10 shadow-sm'
                : 'bg-zinc-900/40 border-white/[0.06] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Grid3X3 className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs font-semibold">3. Kernel Convoluzionali</span>
            </div>
            <p className="text-[11px] text-zinc-500 line-clamp-1">
              Filtri 3x3 spaziali e feature map tensoriale.
            </p>
          </button>
        </div>
      </div>

      {/* =====================================================================
          LAB 1: PERCEPTRON PLAYGROUND
          ===================================================================== */}
      {activeLab === 'perceptron' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Canvas Section */}
          <div className="lg:col-span-7 ui-panel p-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="text-zinc-300 font-medium">
                Piano Feature 2D <span className="text-zinc-500 font-mono text-[11px]">(Click per campionare)</span>
              </span>

              <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-zinc-900 border border-white/[0.06]">
                <button
                  onClick={() => setCurrentClass(0)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                    currentClass === 0
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Classe 0 (Sky)
                </button>
                <button
                  onClick={() => setCurrentClass(1)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                    currentClass === 1
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Classe 1 (Rose)
                </button>
              </div>
            </div>

            <div className="relative border border-white/[0.08] rounded-xl overflow-hidden bg-[#07080c] shadow-inner cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={360}
                height={360}
                onClick={handleCanvasClick}
                className="block"
              />
            </div>

            <div className="w-full flex items-center justify-between text-[11px] text-zinc-500 mt-3 pt-2.5 border-t border-white/[0.06] font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400 inline-block"></span> y = 0
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span> y = 1
                </span>
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <span className="w-3 h-0.5 bg-indigo-400 inline-block"></span> wᵀx + b = 0
                </span>
              </div>
              <button
                onClick={() => setPoints([])}
                className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Pulisci
              </button>
            </div>
          </div>

          {/* Diagnostics & Control Section */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Real-time Metrics */}
            <div className="ui-panel p-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Diagnostica del Modello
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.06] text-center">
                  <span className="text-[10px] text-zinc-500 block uppercase font-mono">Accuratezza</span>
                  <span className="text-xl font-bold font-mono text-zinc-100">
                    {accuracy}%
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.06] text-center">
                  <span className="text-[10px] text-zinc-500 block uppercase font-mono">Loss (BCE)</span>
                  <span className="text-xl font-bold font-mono text-amber-400">
                    {loss}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.06] text-center">
                  <span className="text-[10px] text-zinc-500 block uppercase font-mono">Epoca</span>
                  <span className="text-xl font-bold font-mono text-indigo-400">
                    {epoch}
                  </span>
                </div>
              </div>

              <div className="mt-3 p-3 rounded-lg bg-zinc-950 border border-white/[0.06] font-mono text-xs text-zinc-300">
                <div className="text-zinc-500 text-[10px] uppercase mb-1">Stato Pesi Sinaptici:</div>
                <div>{weights.w1.toFixed(3)}·x₁ + {weights.w2.toFixed(3)}·x₂ + {weights.bias.toFixed(3)} = 0</div>
              </div>
            </div>

            {/* Hyperparameters & Actions */}
            <div className="ui-panel p-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-1.5">
                  <span>Learning Rate (η):</span>
                  <span className="font-mono text-indigo-400">{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsTraining(!isTraining)}
                  className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isTraining
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-zinc-100 hover:bg-white text-zinc-950'
                  }`}
                >
                  {isTraining ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isTraining ? 'Pausa Training' : 'Addestra Modello'}</span>
                </button>

                <button
                  onClick={trainStep}
                  disabled={isTraining}
                  className="px-3 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-zinc-300 text-xs font-mono border border-white/[0.08] cursor-pointer"
                >
                  +1 Epoca
                </button>

                <button
                  onClick={resetPerceptron}
                  className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/[0.08] cursor-pointer"
                  title="Reimposta pesi"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-white/[0.06] text-xs text-zinc-400 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                Il confine decisionale ruota minimizzando l'errore per ciascun campione tramite la derivata prima della Binary Cross Entropy.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* =====================================================================
          LAB 2: TRANSFORMER TOKEN ATTENTION
          ===================================================================== */}
      {activeLab === 'attention' && (
        <div className="space-y-4">
          <div className="ui-panel p-5">
            <div className="text-xs font-medium text-zinc-300 mb-2">
              Frase di Test per l'Inferenza Contestuale:
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                className="flex-1 bg-zinc-950 border border-white/[0.08] rounded-lg px-3.5 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
              <div className="flex gap-1 flex-wrap">
                {sampleSentences.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSentence(s);
                      setSelectedTokenIdx(1);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[11px] text-zinc-400 border border-white/[0.06] cursor-pointer"
                  >
                    Preset {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Attention Matrix */}
            <div className="lg:col-span-8 ui-panel p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">
                    Pesi di Auto-Attenzione (Self-Attention Head)
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    Seleziona un token sorgente per calcolare la proiezione softmax sulle altre posizioni.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                  Target: "{tokens[selectedTokenIdx] || ''}"
                </span>
              </div>

              {/* Token Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tokens.map((token, idx) => {
                  const isSelected = idx === selectedTokenIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTokenIdx(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-100 text-zinc-950 font-semibold border-white shadow-sm'
                          : 'bg-zinc-900 text-zinc-400 border-white/[0.06] hover:border-white/10'
                      }`}
                    >
                      <span className="text-[9px] text-zinc-500 block">pos:{idx}</span>
                      {token}
                    </button>
                  );
                })}
              </div>

              {/* Weight Distribution Bars */}
              <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                {tokens.map((tok, tIdx) => {
                  const weights = getAttentionWeights(selectedTokenIdx);
                  const weightVal = weights[tIdx] || 0.1;
                  const pct = Math.round(weightVal * 100);

                  return (
                    <div key={tIdx} className="flex items-center gap-3 text-xs">
                      <span className="w-20 text-right font-mono text-zinc-400 truncate">
                        {tok}
                      </span>
                      <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-200 ${
                            tIdx === selectedTokenIdx ? 'bg-sky-400' : 'bg-indigo-500/70'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-8 font-mono text-[11px] text-zinc-400 text-right">
                        {weightVal.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sentiment Meter */}
            <div className="lg:col-span-4 ui-panel p-5 flex flex-col justify-between text-center">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-4">
                  Valenza Semantica Stimata
                </span>

                <div className="inline-flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900/60 border border-white/[0.06] my-2">
                  <span className={`text-3xl font-bold font-mono ${
                    sentimentScore > 0.1 ? 'text-emerald-400' : sentimentScore < -0.1 ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {sentimentScore.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider mt-1 text-zinc-500">
                    {sentimentScore > 0.1 ? 'Orientamento Positivo' : sentimentScore < -0.1 ? 'Critico / Negativo' : 'Neutrale'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 leading-normal mt-4">
                Ponderazione degli embeddings contestuali per la classificazione di valenza affettiva.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* =====================================================================
          LAB 3: VISION CONVOLUTION
          ===================================================================== */}
      {activeLab === 'vision' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Drawing Canvas 10x10 */}
          <div className="lg:col-span-5 ui-panel p-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="text-zinc-300 font-medium">
                Matrice Input (10x10)
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPresetGrid('cross')}
                  className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400 hover:text-zinc-200 border border-white/[0.06] cursor-pointer"
                >
                  Croce
                </button>
                <button
                  onClick={() => setPresetGrid('box')}
                  className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400 hover:text-zinc-200 border border-white/[0.06] cursor-pointer"
                >
                  Box
                </button>
                <button
                  onClick={() => setPresetGrid('diagonal')}
                  className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400 hover:text-zinc-200 border border-white/[0.06] cursor-pointer"
                >
                  Diag
                </button>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-1 p-2 bg-[#07080c] rounded-xl border border-white/[0.08]">
              {pixelGrid.map((row, r) =>
                row.map((val, c) => (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => togglePixel(r, c)}
                    className={`w-6 h-6 rounded transition-colors cursor-pointer ${
                      val === 1 ? 'bg-zinc-100' : 'bg-zinc-900/80 hover:bg-zinc-800'
                    }`}
                  />
                ))
              )}
            </div>

            <button
              onClick={() => setPixelGrid(Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0)))}
              className="mt-3 text-[11px] text-zinc-500 hover:text-zinc-300 cursor-pointer font-mono"
            >
              Azzera matrice
            </button>
          </div>

          {/* Kernel & Output */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Filter Selector */}
            <div className="ui-panel p-5 space-y-3">
              <div className="text-xs font-medium text-zinc-300">
                Seleziona Kernel di Convoluzione (3x3):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(KERNELS).map(([kKey, kVal]) => (
                  <button
                    key={kKey}
                    onClick={() => setActiveKernelName(kKey)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      activeKernelName === kKey
                        ? 'bg-zinc-800 text-white border-white/10 shadow-sm font-semibold'
                        : 'bg-zinc-900/40 text-zinc-400 border-white/[0.06] hover:text-zinc-200'
                    }`}
                  >
                    <div className="text-[11px] font-semibold truncate">{kVal.name.split(' ')[0]}</div>
                    <div className="text-[9px] font-mono text-zinc-500">{kKey}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-400 leading-normal bg-zinc-900/40 p-2.5 rounded-lg border border-white/[0.06]">
                {activeKernel.desc}
              </p>
            </div>

            {/* Convolution Calculation */}
            <div className="ui-panel p-5 flex flex-col sm:flex-row items-center gap-6">
              
              {/* Kernel Matrix */}
              <div className="text-center">
                <span className="text-[11px] font-mono text-zinc-500 block mb-1.5">Kernel W (3x3)</span>
                <div className="grid grid-cols-3 gap-1 p-2 bg-[#07080c] rounded-lg border border-white/[0.08] font-mono text-[10px]">
                  {activeKernel.matrix.map((row, r) =>
                    row.map((val, c) => (
                      <div key={`${r}-${c}`} className="w-6 h-6 flex items-center justify-center text-zinc-300 font-semibold">
                        {typeof val === 'number' && val < 1 && val > 0 ? '0.1' : val}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="text-zinc-600 text-xs font-mono">⊗</div>

              {/* Feature Map */}
              <div className="flex-1 flex flex-col items-center">
                <span className="text-[11px] font-mono text-zinc-400 block mb-1.5">
                  Mappa Attivazione Risultante
                </span>
                <div className="grid grid-cols-10 gap-1 p-2 bg-[#07080c] rounded-xl border border-white/[0.08]">
                  {featureMap.map((row, r) =>
                    row.map((val, c) => (
                      <div
                        key={`fm-${r}-${c}`}
                        className="w-5 h-5 rounded transition-all"
                        style={{
                          backgroundColor: val > 0.05 ? `rgba(255, 255, 255, ${Math.min(1, val * 1.3)})` : '#12141c'
                        }}
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
