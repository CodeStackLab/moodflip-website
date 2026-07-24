import { isSupabaseConfigured, moodService } from './lib/supabase.js';

// Elements
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const moodGrid = document.getElementById('mood-grid');
const flipBtn = document.getElementById('flip-btn');
const flipResult = document.getElementById('flip-result');
const targetMoodTitle = document.getElementById('target-mood-title');
const targetMoodAction = document.getElementById('target-mood-action');

// Breathing timer elements
const breathCircle = document.getElementById('breath-circle');
const breathLabel = document.getElementById('breath-label');
const breathTimer = document.getElementById('breath-timer');
const startBreathBtn = document.getElementById('start-breath-btn');

// Journal & Log elements
const journalInput = document.getElementById('journal-input');
const saveLogBtn = document.getElementById('save-log-btn');
const logContainer = document.getElementById('log-container');

// State
let selectedMood = null;
let isBreathingRunning = false;
let breathingInterval = null;
let activeAudioNodes = {};

// 1. Initialize Supabase Status Indicator
if (isSupabaseConfigured) {
  statusDot.className = 'status-dot active';
  statusText.textContent = 'Supabase Connected (Live DB)';
} else {
  statusDot.className = 'status-dot offline';
  statusText.textContent = 'Local Storage Mode (Add credentials to connect Supabase)';
}

// 2. Mood Flip Mapping Engine
const moodFlips = {
  anxious: {
    target: 'Calm & Grounded 🧘',
    action: 'Take 3 deep breaths with our 4-7-8 breathing timer below. Remind yourself: "This feeling is temporary, and I am safe in this present moment."'
  },
  stressed: {
    target: 'Focused & Serene 🌊',
    action: 'Unclench your jaw, drop your shoulders, and listen to the Ocean Soundscape. Focus only on your next immediate 5-minute task.'
  },
  low_energy: {
    target: 'Recharged & Vitalized ⚡',
    action: 'Drink a glass of water, step outside for 2 minutes of sunlight, and try the Deep Harmony tone below to awaken your mind.'
  },
  sad: {
    target: 'Self-Compassionate 🌸',
    action: 'Acknowledge your emotion without judgment. Write down 1 small thing you appreciate today in the Gratitude Journal below.'
  },
  overwhelmed: {
    target: 'Clear & Empowered 🎯',
    action: 'Break your challenge into 3 simple micro-steps. Write down step #1 and ignore everything else for now.'
  }
};

// Handle Mood Selection
moodGrid.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    moodGrid.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMood = btn.dataset.mood;
    flipBtn.disabled = false;
  });
});

flipBtn.addEventListener('click', () => {
  if (!selectedMood) return;
  const flip = moodFlips[selectedMood] || moodFlips.anxious;
  targetMoodTitle.textContent = `Shift to: ${flip.target}`;
  targetMoodAction.textContent = flip.action;
  flipResult.classList.add('active');

  // Automatically save mood flip event
  moodService.saveMoodLog({
    mood: selectedMood,
    action_target: flip.target,
    note: 'Mood flip triggered'
  }).then(() => renderLogList());
});

// 3. 4-7-8 Breathing Guide Engine
let breathPhase = 'ready'; // ready, inhale, hold, exhale
let secondsLeft = 4;

startBreathBtn.addEventListener('click', () => {
  if (isBreathingRunning) {
    stopBreathing();
  } else {
    startBreathing();
  }
});

function startBreathing() {
  isBreathingRunning = true;
  startBreathBtn.textContent = 'Pause Breathing';
  runBreathCycle();
}

function stopBreathing() {
  isBreathingRunning = false;
  clearInterval(breathingInterval);
  breathCircle.className = 'breath-circle';
  breathLabel.textContent = 'Ready';
  breathTimer.textContent = '4-7-8';
  startBreathBtn.textContent = 'Start 4-7-8 Breathing';
}

function runBreathCycle() {
  if (!isBreathingRunning) return;

  // Inhale Phase (4 seconds)
  breathCircle.className = 'breath-circle inhale';
  breathLabel.textContent = 'Inhale...';
  secondsLeft = 4;
  breathTimer.textContent = secondsLeft;

  breathingInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft > 0) {
      breathTimer.textContent = secondsLeft;
    } else {
      clearInterval(breathingInterval);
      // Hold Phase (7 seconds)
      breathCircle.className = 'breath-circle hold';
      breathLabel.textContent = 'Hold Breath...';
      secondsLeft = 7;
      breathTimer.textContent = secondsLeft;

      breathingInterval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft > 0) {
          breathTimer.textContent = secondsLeft;
        } else {
          clearInterval(breathingInterval);
          // Exhale Phase (8 seconds)
          breathCircle.className = 'breath-circle exhale';
          breathLabel.textContent = 'Exhale Slowly...';
          secondsLeft = 8;
          breathTimer.textContent = secondsLeft;

          breathingInterval = setInterval(() => {
            secondsLeft--;
            if (secondsLeft > 0) {
              breathTimer.textContent = secondsLeft;
            } else {
              clearInterval(breathingInterval);
              if (isBreathingRunning) runBreathCycle(); // Loop
            }
          }, 1000);
        }
      }, 1000);
    }
  }, 1000);
}

// 4. Web Audio API Synthesized Ambient Soundscapes
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

document.querySelectorAll('.play-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.currentTarget.closest('.sound-card');
    const soundType = card.dataset.sound;
    const isPlaying = card.classList.contains('playing');

    if (isPlaying) {
      stopSound(soundType);
      card.classList.remove('playing');
      btn.textContent = '▶';
    } else {
      playSound(soundType);
      card.classList.add('playing');
      btn.textContent = '⏸';
    }
  });
});

function playSound(type) {
  const ctx = getAudioContext();
  stopSound(type); // Clean previous instance if any

  if (type === 'rain' || type === 'ocean') {
    // Generate pink/white noise buffer for rain or ocean waves
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = type === 'rain' ? 800 : 400;

    const gain = ctx.createGain();
    gain.gain.value = type === 'rain' ? 0.15 : 0.25;

    if (type === 'ocean') {
      // LFO modulation for waves
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15; // wave cycle speed
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 200;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      activeAudioNodes[`${type}_lfo`] = lfo;
    }

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    activeAudioNodes[type] = { noise, gain };
  } else if (type === 'harmony') {
    // Calming 432Hz Ambient Sine Tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(216, ctx.currentTime); // Harmonic A 432hz octave

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    activeAudioNodes[type] = { osc, gain };
  }
}

function stopSound(type) {
  if (activeAudioNodes[type]) {
    if (activeAudioNodes[type].noise) activeAudioNodes[type].noise.stop();
    if (activeAudioNodes[type].osc) activeAudioNodes[type].osc.stop();
    delete activeAudioNodes[type];
  }
  if (activeAudioNodes[`${type}_lfo`]) {
    activeAudioNodes[`${type}_lfo`].stop();
    delete activeAudioNodes[`${type}_lfo`];
  }
}

// 5. Gratitude & Reflection Logger
saveLogBtn.addEventListener('click', async () => {
  const text = journalInput.value.trim();
  if (!text) return;

  saveLogBtn.disabled = true;
  saveLogBtn.textContent = 'Saving...';

  await moodService.saveMoodLog({
    mood: selectedMood || 'general',
    action_target: 'Reflection Journal',
    note: text
  });

  journalInput.value = '';
  saveLogBtn.disabled = false;
  saveLogBtn.textContent = 'Save Reflection Entry';
  renderLogList();
});

async function renderLogList() {
  const { data, isRemote } = await moodService.getMoodLogs();
  if (!data || data.length === 0) {
    logContainer.innerHTML = '<p class="log-meta">No reflections logged yet. Start by writing one above!</p>';
    return;
  }

  logContainer.innerHTML = data.map(item => `
    <div class="log-item">
      <div class="log-meta">
        <span>${new Date(item.created_at || Date.now()).toLocaleDateString()} ${new Date(item.created_at || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        <span style="color: ${isRemote ? '#10b981' : '#f59e0b'}">${isRemote ? '☁️ Supabase DB' : '💾 Local Storage'}</span>
      </div>
      <div><strong>${item.mood ? item.mood.toUpperCase() : 'NOTE'}:</strong> ${item.note || item.action_target}</div>
    </div>
  `).join('');
}

// Initial render
renderLogList();
