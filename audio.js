// ============================================================================
// ATW WEB FLOW Audio Engine - 100% Procedural Web Audio API (No External Audio Files)
// Playful, cheerful, and responsive sound effects & cartoon voice synthesis
// ============================================================================

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.speechEnabled = true;
        this.isSpeaking = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Cute bubble pop / button click
    playPop(freq = 600) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.8, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
    }

    // Rocket launch swoosh
    playRocket() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        // White noise + bandpass filter swoosh
        const bufferSize = this.ctx.sampleRate * 0.6;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(3000, this.ctx.currentTime + 0.3);
        filter.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.6);
        filter.Q.value = 3.0;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
    }

    // DNS Calculation Beeps
    playBeeps() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

            gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + idx * 0.06);
            osc.stop(this.ctx.currentTime + idx * 0.06 + 0.09);
        });
    }

    // Server Cooking & Processing Hum
    playServerBrum() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(220, this.ctx.currentTime + 0.4);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
    }

    // Success Chime / Arpeggio Fanfare
    playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const chord = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A major magic
        chord.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.07);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime + i * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.07 + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + i * 0.07);
            osc.stop(this.ctx.currentTime + i * 0.07 + 0.36);
        });
    }

    // Level up / Quiz fanfare
    playFanfare() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const sequence = [
            { f: 523.25, t: 0.0, d: 0.12 }, // C
            { f: 659.25, t: 0.12, d: 0.12 }, // E
            { f: 783.99, t: 0.24, d: 0.12 }, // G
            { f: 1046.5, t: 0.36, d: 0.4 }   // High C
        ];

        sequence.forEach(item => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(item.f, this.ctx.currentTime + item.t);
            gain.gain.setValueAtTime(0.25, this.ctx.currentTime + item.t);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + item.t + item.d);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + item.t);
            osc.stop(this.ctx.currentTime + item.t + item.d + 0.05);
        });
    }

    // Cute Kitten Meow Sound Synthesizer
    playMeow() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';

        // Pitch inflection: 480Hz -> 650Hz -> 420Hz
        const t0 = this.ctx.currentTime;
        osc.frequency.setValueAtTime(450, t0);
        osc.frequency.linearRampToValueAtTime(680, t0 + 0.12);
        osc.frequency.exponentialRampToValueAtTime(400, t0 + 0.35);

        gain.gain.setValueAtTime(0.01, t0);
        gain.gain.linearRampToValueAtTime(0.22, t0 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.38);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t0);
        osc.stop(t0 + 0.4);
    }

    // API Drone Delivery Handshake Chime
    playDroneDelivery() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const notes = [659.25, 880, 1174.66]; // E5, A5, D6
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const t = this.ctx.currentTime + idx * 0.08;
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.26);
        });
    }

    // Time Warp / Rewind Sound
    playTimeWarp() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.25);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.26);
    }

    // Cute voice speech synthesis for kids
    speak(text, onEnd) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Stop any pending speech

        if (!this.speechEnabled) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05; // Slightly lively rate
        utterance.pitch = 1.35; // Cheerful, friendly robot/kid mentor pitch

        // Try to pick an English voice
        const voices = window.speechSynthesis.getVoices();
        const friendlyVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Zira')));
        if (friendlyVoice) {
            utterance.voice = friendlyVoice;
        }

        utterance.onstart = () => {
            this.isSpeaking = true;
            document.body.classList.add('professor-talking');
        };

        utterance.onend = () => {
            this.isSpeaking = false;
            document.body.classList.remove('professor-talking');
            if (onEnd) onEnd();
        };

        utterance.onerror = () => {
            this.isSpeaking = false;
            document.body.classList.remove('professor-talking');
        };

        window.speechSynthesis.speak(utterance);
    }

    // In-Page 3D Evolution & Devolution Sound
    playEvolutionSound(isEvolve = true) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = isEvolve ? [261.63, 329.63, 392.00, 523.25, 659.25, 783.99] : [783.99, 659.25, 523.25, 392.00, 329.63, 261.63];
        freqs.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = isEvolve ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.07);

            gain.gain.setValueAtTime(0, now + i * 0.07);
            gain.gain.linearRampToValueAtTime(0.25, now + i * 0.07 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + i * 0.07);
            osc.stop(now + i * 0.07 + 0.28);
        });
    }
}

window.soundEngine = new SoundEngine();
