# Minerva — Multimodal AI Education & Neurodiversity Empowerment Companion

> **Devpost Submission Story for the ML Empowerment Build Challenge 2026**  
> *Track: AI for Social Good & Accessible Education*

---

## 💡 Inspiration

More than **15% to 20% of the world’s population is neurodivergent**, spanning ADHD, Dyslexia, Autism Spectrum conditions, and executive dysfunction. Yet, as the artificial intelligence revolution accelerates, traditional educational materials remain deeply exclusionary. 

Aspiring learners are routinely confronted with walls of dense, impenetrable text, raw terminal configuration errors, and abstract mathematical equations presented with zero physical or visual intuition. For students with ADHD, this frequently triggers **executive dysfunction paralysis**; for learners with dyslexia, reading fatigue cuts study sessions short before the core concept can take root.

We asked ourselves:  
*What if learning machine learning didn’t require memorizing static equations from textbooks, but could instead be felt, manipulated, heard, and visualized in real time?*

That question gave birth to **Minerva** (named after the Roman goddess of wisdom, intellect, and practical crafts)—a multimodal companion designed to dismantle cognitive barriers and empower every student, regardless of cognitive profile or background, to not only master artificial intelligence but immediately apply it to solve real-world community challenges aligned with the United Nations Sustainable Development Goals (SDGs).

---

## ⚙️ What It Does

Minerva is a zero-install, browser-native AI learning companion and social-impact launchpad structured across four pillars:

### 1. 🎓 Socratic Multimodal AI Tutor
Rather than forcing a one-size-fits-all explanation, Minerva translates fundamental machine learning topics (Neural Networks, Transformers & LLMs, Computer Vision, and Algorithmic Fairness) across **five adaptive cognitive lenses**:
- **Visual Analogy:** Anchors abstract ideas into physical intuition (e.g., the *Kitchen Brigade* metaphor for neural layer backpropagation, or the *Cocktail Party* metaphor for Transformer self-attention).
- **Executive Micro-Steps:** Deconstructs multi-stage workflows into chunked, actionable milestones with interactive progress tracking to defeat ADHD paralysis.
- **ELI5 Simplification:** Distills core mechanics into plain, conversational language free of unnecessary jargon.
- **Formal Deep Dive:** Provides mathematically rigorous formulations, tensor calculus, and algorithmic proofs for academic depth.
- **Socratic Dialogue:** Minerva poses active-recall challenges and evaluates the student’s reasoning in real time with constructive pedagogical guidance.
- **Audio Narration (TTS):** Integrated Web Speech synthesis calibrated to a calm, measured cadence for auditory learners and individuals experiencing reading fatigue.

### 2. 🧪 Interactive Client-Side ML Laboratories
Real algorithmic experimentation executing 100% locally in the browser with zero cloud compute requirements:
- **2D Perceptron Sandbox:** An interactive Cartesian coordinate plane where learners plot discrete data classes, trigger training loops, and watch the decision boundary hyperplane rotate and converge to 100% accuracy in real time alongside live Loss and Epoch counters.
- **Transformer Self-Attention Studio:** An interactive token attention matrix where selecting any word visualizes its attention weights ($\text{Softmax}$ projections) across the sentence, paired with an estimated semantic polarity gauge.
- **3D Convolution Kernel Studio:** A tactile $10 \times 10$ pixel drawing grid where learners apply spatial filter kernels (Sobel horizontal/vertical, Sharpening, Gaussian smoothing) to observe feature map extraction.

### 3. 🚀 UN SDG Empowerment Launchpad
Directly bridges student learning into social impact by offering pre-architected blueprints for community solutions:
- **NeuroRead AI (SDG 4: Quality Education):** Adaptive cognitive-load text reformer for neurodivergent learners.
- **EcoSort Vision (SDG 12: Responsible Consumption):** Edge computer vision model for municipal recycling classification.
- **AquaSafe (SDG 6: Clean Water & Sanitation):** Anomaly detection sentinel predicting microbial contamination in local water sources.
- **AgriCare Plant Doctor (SDG 2: Zero Hunger):** Quantized mobile offline model diagnosing crop pathology for smallholder farmers.
- *Includes runnable Python pipelines, ASCII system architecture graphs, and direct links to curated open-source datasets.*

### 4. 🎛️ Sensory & Neurodiversity Accessibility Bar
A dedicated top toolbar enabling instantaneous switching between **Bionic Reading** fixation anchors, **Lexend / Dyslexia-optimized typography**, **ADHD Clutter-Free Focus Mode**, and four contrast-calibrated sensory themes (*Calm Obsidian*, *Cyber Dark*, *High Contrast WCAG AAA*, and *Warm Paper Sepia*).

---

## 🛠️ How We Built It

Minerva was engineered from the ground up as a high-performance, client-side web application prioritizing accessibility, sub-millisecond tactile responsiveness, and aesthetic craftsmanship:

- **Frontend Core:** Built with **React 19** and **Vite 8** for instant hot-module reloading and optimized static bundle generation ($<320\text{ kB}$ total client runtime).
- **Styling Architecture:** Implemented via **Tailwind CSS v4** utilizing an obsidian neutral design system with custom sub-pixel border tokens (`border-white/[0.08]`) and restrained indigo accents, deliberately rejecting generic "AI slop" gradients in favor of a clean Linear/Vercel design language.
- **Mathematical Visual Computing:**
  - In the **Perceptron Laboratory**, the decision boundary hyperplane is rendered via the **HTML5 Canvas API**. The neuron computes a weighted combination:
    $$z = \mathbf{w}^T \mathbf{x} + b = w_1 x_1 + w_2 x_2 + b$$
    Passing through the activation function $\hat{y} = \sigma(z) = \frac{1}{1 + e^{-z}}$, the empirical loss is evaluated via Binary Cross-Entropy:
    $$\mathcal{L}_{\text{BCE}}(\mathbf{w}, b) = -\frac{1}{N} \sum_{i=1}^N \left[ y^{(i)} \log \hat{y}^{(i)} + (1 - y^{(i)}) \log (1 - \hat{y}^{(i)}) \right]$$
    With gradient weight updates applied per epoch:
    $$w_j \leftarrow w_j + \eta \cdot (y^{(i)} - \hat{y}^{(i)}) \cdot x_j^{(i)}$$
  - In the **Attention Laboratory**, multi-token contextual relevance is modeled via scaled dot-product attention:
    $$\text{Attention}(Q, K, V) = \text{softmax}\left( \frac{Q K^T}{\sqrt{d_k}} \right) V$$
  - In the **Vision Laboratory**, 2D spatial feature extraction slides a $3 \times 3$ kernel matrix $K$ across input pixel tensor $I$:
    $$S(i, j) = (I * K)(i, j) = \sum_{m=-1}^{1} \sum_{n=-1}^{1} I(i + m, j + n) \cdot K(m + 1, n + 1)$$
- **Assistive Technologies:** Native **Web Speech API** (`window.speechSynthesis`) integration for client-side text-to-speech with speed normalization ($0.95\times$) for cognitive processing.
- **Media & Demonstration Pipeline:** Headless Playwright orchestration coupled with **FFmpeg 9.0** for high-definition 1080p automated video capture and MP4 transcoding.

---

## 🧗 Challenges We Ran Into

1. **Eliminating "AI Slop" Visual Tropes:** Early iterations had the generic hackathon look—oversaturated neon purples, glowing cards, and cluttered badges. We stripped down the entire interface, establishing a disciplined obsidian palette with monochromatic typography, clean segmented controls, and subtle micro-borders inspired by Linear and Stripe.
2. **Smooth Real-Time Canvas Rendering on Constrained Devices:** Calculating decision boundary slopes, coordinates normalization (converting canvas space $[0, 360]$ to feature space $[-1, 1]$), and maintaining 60 FPS while updating Loss and Epoch state required fine-tuning the `requestAnimationFrame` and interval state synchronizations in React 19.
3. **Balancing Pedagogical Rigor with Cognitive Accessibility:** Finding the sweet spot between scientific accuracy and cognitive accessibility was challenging. If an explanation is too casual, learners cannot progress to real ML engineering; if it is too dense, executive dysfunction takes over. Designing the 5-lens cognitive matrix resolved this by letting learners self-select their cognitive altitude.
4. **Offline Client-Side Capability:** Ensuring that all interactive laboratories run purely in the browser without backend API keys or cloud dependencies was vital to making the tool accessible to students in low-bandwidth regions worldwide.

---

## 🏆 Accomplishments That We're Proud Of

- **Zero-Latency Interactive Machine Learning:** Students can literally see backpropagation and gradient descent work in real time on a 2D plane without touching a terminal.
- **Genuine WCAG AAA Accessibility:** Providing Lexend typography, Bionic Reading, High Contrast modes, and voice synthesis out of the box.
- **Complete UN SDG Launchpad:** We didn’t stop at teaching theory; we built tangible blueprints with real starter code and dataset links so students can launch their own hackathon projects for clean water, agriculture, and recycling.
- **Sub-Second Build & Lightweight Footprint:** The entire production bundle builds in $719\text{ ms}$, delivering a production-ready application weighing just $307\text{ kB}$ of JavaScript.
- **Full Media Suite:** High-definition 16:9 thumbnail, 1080p screenshots, and an automated 33-second MP4 demo video recorded directly from user interactions.

---

## 🧠 What We Learned

Building Minerva reinforced a profound truth: **neurodiversity is not a cognitive deficit—it is a cognitive difference that thrives when given tactile, multimodal interfaces.** 

When learners who previously felt alienated by mathematical equations were able to manipulate a decision boundary with their mouse and observe the loss decrease in real time, the core concepts clicked in seconds. Intuition must precede formal notation, not the other way around.

---

## 🔮 What's Next for Minerva

- **Local WebGPU Model Execution:** Integrating **ONNX Runtime Web** and **WebGPU** to run quantized 1B/3B parameter LLMs directly in the browser with 100% data privacy and offline capability.
- **Expanded Laboratory Suite:** Adding tactile visual sandboxes for **Diffusion Models** (denoising step-by-step visualizer) and **Reinforcement Learning** (Gridworld Q-learning agent).
- **Classroom & Educator Workspace:** Enabling teachers to craft custom Socratic inquiry tracks and export student milestone progress reports.
- **Global Accessibility Partnerships:** Collaborating with open-source communities and inclusive education non-profits to translate Minerva into multiple languages and bring tactile AI education to underserved schools globally.
