// Utility for Bionic Reading formatting and Speech Synthesis

export function renderBionicText(text, enabled = false) {
  if (!enabled || !text) return text;
  
  const words = text.split(' ');
  return words.map((word, wIdx) => {
    if (word.length <= 1) return word + ' ';
    const midPoint = Math.ceil(word.length / 2);
    const boldPart = word.slice(0, midPoint);
    const restPart = word.slice(midPoint);

    return (
      <span key={wIdx} className="inline-block mr-1">
        <strong className="font-semibold text-indigo-300">{boldPart}</strong>
        <span>{restPart}</span>
      </span>
    );
  });
}

// Text-to-Speech Web Speech API
export class SpeechController {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
  }

  speak(text, onEnd = null) {
    if (!this.synth) return;
    this.stop();

    // Clean markdown and special symbols before speech
    const cleanText = text
      .replace(/[*#`_~]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\{.*?\}/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95; // Slightly slower, calm cadence for ADHD/neurodivergent comprehension
    utterance.pitch = 1.0;

    // Pick natural English voice if available
    const voices = this.synth.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (naturalVoice) utterance.voice = naturalVoice;

    if (onEnd) utterance.onend = onEnd;
    utterance.onerror = () => { if (onEnd) onEnd(); };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  isSpeaking() {
    return this.synth ? this.synth.speaking : false;
  }
}

export const speechService = new SpeechController();
