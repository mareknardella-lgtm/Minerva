export const SOCIAL_IMPACT_PROJECTS = [
  {
    id: 'neuro-read',
    title: 'NeuroRead: Adaptive Cognitive-Load Text Reformer',
    sdg: 'SDG 4: Quality Education',
    sdgColor: 'from-amber-500 to-orange-500',
    targetUsers: 'Students with ADHD, Dyslexia, and Executive Dysfunction',
    problem: 'Standard academic articles, coding documentation, and textbooks are visually dense and text-heavy, triggering sensory overload, reading fatigue, and executive dysfunction paralysis.',
    solution: 'An AI-powered Chrome/Web extension that automatically parses dense paragraphs, extracts semantic core ideas, transforms sentences into high-retention micro-bullets with bionic emphasis, and generates interactive mindmaps.',
    aiTechnique: 'NLP & LLM Structured Distillation (Token Chunking + Bionic Transformer Scaffolding)',
    architecture: `[Web / Document Input]
       ↓
[DOM Sanitizer & Tokenizer]
       ↓
[Fast DistilBERT / T5 Summarization & Chunking Pipeline]
       ↓
[Cognitive Formatter (Lexend Font, Spacing, Visual Anchors)]
       ↓
[Interactive Accessible UI Output with Web Speech TTS]`,
    starterCodePython: `import re
from transformers import pipeline

# Load lightweight open-source distillation model
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def neuro_format_chunk(text, max_tokens=60):
    """Chunks text into high-readability cognitive micro-bullets for ADHD/Dyslexia."""
    sentences = re.split(r'(?<=[.!?]) +', text.strip())
    formatted_bullets = []
    
    for sent in sentences:
        if len(sent.split()) > 15:
            # Condense verbose sentences
            summary = summarizer(sent, max_length=20, min_length=5, do_sample=False)[0]['summary_text']
            formatted_bullets.append(f"• ⚡ {summary}")
        else:
            formatted_bullets.append(f"• {sent}")
            
    return "\\n".join(formatted_bullets)

sample_text = "Neural networks represent computational constructs inspired by biological brains..."
print(neuro_format_chunk(sample_text))`,
    recommendedDatasets: [
      { name: 'Simple English Wikipedia Corpus', url: 'https://huggingface.co/datasets/wikipedia', desc: 'Ideal for training text simplification and accessible readability models.' },
      { name: 'Dyslexic Readability Assessment Dataset', url: 'https://archive.ics.uci.edu', desc: 'Eye-tracking and reading latency metrics across typographic layouts.' }
    ],
    pitchHook: 'Over 20% of learners struggle with traditional text density. NeuroRead leverages AI to democratize learning materials so neurodivergent minds can excel without burnout.'
  },
  {
    id: 'eco-sort',
    title: 'EcoSort Vision: Edge-Optimized Circular Waste Classifier',
    sdg: 'SDG 12: Responsible Consumption & Production',
    sdgColor: 'from-emerald-500 to-teal-500',
    targetUsers: 'Schools, Municipalities, and Local Communities',
    problem: 'Over 40% of recyclable materials are rejected and sent to landfills due to consumer confusion and contamination at public recycling points.',
    solution: 'A camera-enabled edge web application that gives instant real-time recycling instructions (Compost, Plastic #1-7, Paper, Hazardous) by running a lightweight MobileNet vision model directly in the browser.',
    aiTechnique: 'Computer Vision & Edge Transfer Learning (MobileNetV3 / YOLOv8-nano)',
    architecture: `[Device Camera Stream]
       ↓
[Canvas Frame Grabber (224x224 RGB)]
       ↓
[Quantized ONNX / TensorFlow.js MobileNet Classifier]
       ↓
[Disposal Rule Engine (Local Municipal Mapping)]
       ↓
[Real-time Visual AR Bounding Box & Disposal Instructions]`,
    starterCodePython: `import torch
import torchvision.transforms as transforms
from PIL import Image

# Setup lightweight MobileNetV3 for edge deployment
model = torch.hub.load('pytorch/vision:v0.10.0', 'mobilenet_v3_small', pretrained=True)
model.eval()

transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def classify_recyclable(image_path):
    img = Image.open(image_path).convert('RGB')
    input_tensor = transform(img).unsqueeze(0)
    with torch.no_grad():
        output = model(input_tensor)
    predicted_idx = torch.argmax(output, dim=1).item()
    return f"Material Class ID: {predicted_idx}"`,
    recommendedDatasets: [
      { name: 'TrashNet Dataset', url: 'https://github.com/garythung/trashnet', desc: '2,500+ labeled images of glass, paper, cardboard, plastic, metal, and trash.' },
      { name: 'TACO (Trash Annotations in Context)', url: 'http://tacodataset.org', desc: 'Open image dataset of litter in the wild with fine-grained segmentation.' }
    ],
    pitchHook: 'Recycling fails when humans have to guess. EcoSort Vision puts instant computer vision guidance into every student\'s smartphone to stop landfill contamination at the source.'
  },
  {
    id: 'aquasafe',
    title: 'AquaSafe: Predictive Community Water Quality Sentinel',
    sdg: 'SDG 6: Clean Water & Sanitation',
    sdgColor: 'from-cyan-500 to-blue-500',
    targetUsers: 'Rural Communities, Relief Organizations, Environmental Activists',
    problem: 'More than 2 billion people drink contaminated water. Laboratory water testing takes 48-72 hours, leaving communities vulnerable to waterborne disease outbreaks in the critical initial window.',
    solution: 'A low-cost sensory anomaly detection model that ingests basic probe metrics (pH, turbidity, conductivity, temperature) and outputs a real-time Potability Confidence Index using Gradient Boosted Decision Trees.',
    aiTechnique: 'Tabular Predictive Machine Learning (XGBoost / Random Forest Classifier)',
    architecture: `[Low-Cost IoT Water Probes (pH, Turbidity, TDS)]
       ↓
[Microcontroller / Web Bluetooth Gateway]
       ↓
[Feature Normalizer & Missing Value Imputer]
       ↓
[Trained XGBoost / LightGBM Classifier]
       ↓
[Early Warning Alert & Community SMS / Dashboard]`,
    starterCodePython: `import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Features: [pH, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic_carbon, Trihalomethanes, Turbidity]
def train_water_sentinel(data_path):
    df = pd.read_csv(data_path).dropna()
    X = df.drop(columns=['Potability'])
    y = df['Potability']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    clf = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)
    clf.fit(X_train, y_train)
    
    predictions = clf.predict(X_test)
    print(classification_report(y_test, predictions))
    return clf`,
    recommendedDatasets: [
      { name: 'Kaggle Water Quality Potability Dataset', url: 'https://www.kaggle.com/datasets/adityakadiwal/water-potability', desc: '3,276 water samples evaluating metrics against safe human consumption standards.' },
      { name: 'WHO Global Water Quality Portal', url: 'https://www.who.int', desc: 'International baseline water quality metrics.' }
    ],
    pitchHook: 'Clean water is a human right. AquaSafe transforms cheap \$15 sensors into predictive laboratory sentinels to save lives before waterborne epidemics take hold.'
  },
  {
    id: 'agricare',
    title: 'AgriCare Plant Doctor: Offline Crop Pathology Assistant',
    sdg: 'SDG 2: Zero Hunger',
    sdgColor: 'from-lime-500 to-green-600',
    targetUsers: 'Smallholder Farmers in Developing Regions with Limited Internet',
    problem: 'Pests and plant diseases wipe out 20-40% of agricultural harvests worldwide, yet smallholder farmers lack agronomic experts in remote fields.',
    solution: 'An offline-capable Progressive Web App with an embedded quantized CNN that diagnoses crop diseases (e.g. cassava blight, tomato late blight) from a single photo and gives organic treatment recipes in local dialects.',
    aiTechnique: 'Quantized Mobile Vision (TensorFlow Lite / EfficientNet-B0)',
    architecture: `[Offline PWA Camera Interface]
       ↓
[Quantized TFLite Model Execution (Local Cache)]
       ↓
[Confidence-Calibrated Diagnosis]
       ↓
[Localized Organic Treatment Guidance (Offline SQLite)]`,
    starterCodePython: `import tensorflow as tf

# Convert trained Keras plant disease model to ultra-compact TFLite for offline edge use
def export_quantized_model(keras_model_path, output_tflite_path):
    converter = tf.lite.TFLiteConverter.from_saved_model(keras_model_path)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    tflite_quant_model = converter.convert()
    
    with open(output_tflite_path, 'wb') as f:
        f.write(tflite_quant_model)
    print(f"Quantized offline model exported to {output_tflite_path}")`,
    recommendedDatasets: [
      { name: 'PlantVillage Open Dataset', url: 'https://github.com/spMohanty/PlantVillage-Dataset', desc: '54,306 images of healthy and diseased plant leaves categorized across 38 classes.' },
      { name: 'CropLife International Pest Archive', url: 'https://croplife.org', desc: 'Diagnostic imagery for global staple crops.' }
    ],
    pitchHook: 'By bringing expert crop diagnostics directly into farmers\' pockets without needing cellular data, AgriCare protects family yields and strengthens regional food security.'
  }
];
