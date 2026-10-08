export const AI_CONCEPTS = [
  {
    id: 'neural-networks',
    title: 'Neural Networks & Deep Learning',
    category: 'Foundations',
    tag: 'Visual & Intuitive',
    difficulty: 'Beginner Friendly',
    summary: 'How artificial neurons connect in layers to recognize patterns, similar to the human brain.',
    metaphor: {
      title: 'The Kitchen Brigade Analogy',
      story: 'Imagine a busy restaurant kitchen. The commis chefs (Input Layer) chop vegetables and prepare raw ingredients. The sous-chefs (Hidden Layers) taste, season, and combine flavors, adjusting spices based on feedback. The head chef (Output Layer) decides if the dish is ready to serve. If a customer sends a dish back (Error Loss), the head chef tells the sous-chefs to adjust their recipe weights next time (Backpropagation)!'
    },
    microSteps: [
      { step: 1, title: 'Inputs & Features', desc: 'Raw data (pixels, sound waves, or numbers) is fed into the first layer.' },
      { step: 2, title: 'Weights & Biases', desc: 'Each connection has an importance knob (weight) that amplifies or dampens the signal.' },
      { step: 3, title: 'Activation Function', desc: 'Decides whether a neuron "fires" or stays silent (like a light switch with a threshold, e.g., ReLU or Sigmoid).' },
      { step: 4, title: 'Loss & Backpropagation', desc: 'The network checks its mistake, calculates the gradient, and adjusts every weight backward.' }
    ],
    explainLike5: 'Imagine teaching a puppy to recognize a ball. At first, it thinks round fruits and rocks are balls too. Every time you say "No, that is an orange!" or "Good boy, that is a tennis ball!", the puppy learns the difference. A neural network is like that puppy: it makes guesses, gets gentle corrections, and gets smarter every time!',
    deepDive: `Mathematical Formulation:
Output = Activation( Σ(w_i * x_i) + b )
Where x_i are input features, w_i are learnable synaptic weights, b is the bias parameter, and Activation is a non-linear transfer function (e.g., ReLU f(x) = max(0, x)). Backpropagation utilizes the chain rule of calculus to compute ∂Loss/∂w_i for gradient descent optimization.`,
    socraticQuestions: [
      'Why do you think neural networks need non-linear activations instead of just simple addition?',
      'If you give a network photos of cats only taken indoors, what might happen when it sees a cat outside?'
    ]
  },
  {
    id: 'transformers-llms',
    title: 'Transformers & Large Language Models',
    category: 'Natural Language Processing',
    tag: 'Self-Attention Magic',
    difficulty: 'Intermediate',
    summary: 'The breakthrough architecture powering ChatGPT, Gemini, and modern generative AI via Self-Attention.',
    metaphor: {
      title: 'The Cocktail Party Attention Analogy',
      story: 'In a loud room with 50 people talking, your brain does not listen to every sound equally. When someone says "bank", your ears immediately look around for context clues like "river" (nature bank) or "money" (financial bank). The Transformer\'s "Self-Attention" mechanism does exactly this: every word in a sentence looks at every other word to understand what it truly means in context.'
    },
    microSteps: [
      { step: 1, title: 'Tokenization', desc: 'Text is chopped into puzzle pieces called tokens (words or sub-words) and converted into numerical vectors.' },
      { step: 2, title: 'Positional Encoding', desc: 'Since Transformers process all words at once, timestamp tags are stamped on each token so word order is preserved.' },
      { step: 3, title: 'Multi-Head Attention', desc: 'Multiple "spotlights" analyze grammar, emotional tone, and factual relations simultaneously.' },
      { step: 4, title: 'Next Token Prediction', desc: 'The model calculates probability distributions over vocabulary to predict the most coherent next piece of text.' }
    ],
    explainLike5: 'Imagine writing a story where your best friend has a magical crystal ball. Before writing the next word, your friend checks the whole page in a split second to make sure the story makes complete sense! That is how LLMs write.',
    deepDive: `Self-Attention Formula:
Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V
Queries (Q), Keys (K), and Values (V) are projections of token embeddings. The dot-product computes relevance scores scaled by sqrt(d_k) to prevent vanishing gradients during softmax evaluation.`,
    socraticQuestions: [
      'If an LLM only predicts the next most likely token, why does it appear to "reason"?',
      'What happens when the training text contains historical human stereotypes?'
    ]
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision & Convolution (CNNs)',
    category: 'Perception',
    tag: 'Visual Filters',
    difficulty: 'Beginner Friendly',
    summary: 'Teaching computers to interpret and understand visual information from the world using filters and spatial features.',
    metaphor: {
      title: 'The Stencil & Magnifying Glass Analogy',
      story: 'Imagine holding a tiny sliding magnifying glass with an etched grid (a kernel) across a giant photo. First, you look only for sharp horizontal and vertical lines. Then, passing through another lens, you combine lines into curves, corners, and circles. Finally, you combine circles and curves into eyes, noses, or bicycle wheels!'
    },
    microSteps: [
      { step: 1, title: 'Pixel Matrix', desc: 'Images are 2D/3D grids of numbers representing Red, Green, and Blue brightness (0 to 255).' },
      { step: 2, title: 'Convolution Kernels', desc: 'Small matrix filters slide across the image, computing dot products to highlight edges and textures.' },
      { step: 3, title: 'Pooling & Downsampling', desc: 'Shrinks spatial size while keeping the most dominant features, making recognition invariant to slight shifts.' },
      { step: 4, title: 'Feature Hierarchy', desc: 'Low layers detect edges -> Middle layers detect shapes -> Deep layers identify full objects.' }
    ],
    explainLike5: 'A computer cannot see pictures like you do; it only sees a grid of numbers! So it slides tiny magic filters across the numbers to find lines, colors, and shapes until it figures out: "Aha! That is a cute dog!"',
    deepDive: `Convolution Operator:
S(i, j) = (I * K)(i, j) = Σ_m Σ_n I(i - m, j - n) * K(m, n)
Where I is the input image tensor and K is the learnable kernel matrix. Max-pooling extracts max(patch), introducing translation invariance and computational compression.`,
    socraticQuestions: [
      'Why is sliding a small 3x3 filter across an image better than connecting every single pixel to a separate neuron?',
      'How could a self-driving car vision system be fooled by heavy fog or reflections?'
    ]
  },
  {
    id: 'ai-ethics-fairness',
    title: 'AI Ethics, Bias & Algorithmic Fairness',
    category: 'Social Impact',
    tag: 'Crucial for Society',
    difficulty: 'All Levels',
    summary: 'Ensuring artificial intelligence systems are equitable, accountable, transparent, and do not reinforce systemic harm.',
    metaphor: {
      title: 'The Distorted Mirror Analogy',
      story: 'An AI model is not a divine oracle; it is a mirror reflecting the data it was fed. If you train a hiring AI on resume data from the past 50 years where 90% of executives were men, the AI will learn: "To be an executive, you must be a man." The AI did not create the bias, but it automates and scales historical injustice unless we actively correct it!'
    },
    microSteps: [
      { step: 1, title: 'Dataset Representation', desc: 'If marginalized communities are underrepresented in training datasets, models will fail when serving them.' },
      { step: 2, title: 'Proxy Variables', desc: 'Even if sensitive traits (like race or gender) are removed, zip codes or school names can act as biased proxies.' },
      { step: 3, title: 'Algorithmic Auditing', desc: 'Testing model performance across different demographic groups for disparate error rates.' },
      { step: 4, title: 'Human-in-the-Loop', desc: 'Maintaining human oversight, explainability, and recourse for automated high-stakes decisions.' }
    ],
    explainLike5: 'If you only show a robot drawings made by boys who love dinosaurs, the robot might think girls do not like drawing or that other animals do not exist! We must make sure robots learn from everyone so they are fair and kind to all people.',
    deepDive: `Fairness Metrics:
1. Demographic Parity: P(Y_hat = 1 | A = 0) = P(Y_hat = 1 | A = 1)
2. Equalized Odds: Equal True Positive Rate and False Positive Rate across protected groups A.
Mathematical trade-off: Kleinberg's theorem proves you cannot simultaneously satisfy calibration and equalized odds unless base rates are identical.`,
    socraticQuestions: [
      'Can an AI algorithm ever be 100% "objective" or "neutral"? Why or why not?',
      'Who should be held legally responsible if an autonomous medical diagnostic AI makes a fatal mistake?'
    ]
  }
];
