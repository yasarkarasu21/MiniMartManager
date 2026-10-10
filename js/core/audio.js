const AudioSys = {
    ctx: null,
    enabled: true,
    globalVol: localStorage.getItem('mm_vol') !== null ? parseFloat(localStorage.getItem('mm_vol')) : 1.0,
    
    init: function() {
        if (!this.ctx) {
            try {
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioContext();
            } catch(e) {
                this.enabled = false;
            }
        }
        if(this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    playTone: function(freq, type, duration, vol=0.1) {
        if(!this.enabled || this.globalVol === 0) return;
        try {
            this.init();
            let osc = this.ctx.createOscillator();
            let gain = this.ctx.createGain();
            
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            
            let finalVol = vol * this.globalVol;
            if(finalVol < 0.001) finalVol = 0.001;
            gain.gain.setValueAtTime(finalVol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch(e) {}
    },

    click: function() { this.playTone(600, 'sine', 0.1, 0.05); },
    tap: function() { this.playTone(800, 'sine', 0.05, 0.02); },
    error: function() { 
        this.playTone(150, 'sawtooth', 0.3, 0.08); 
        setTimeout(() => this.playTone(100, 'sawtooth', 0.3, 0.08), 150);
    },
    buy: function() { 
        this.playTone(800, 'square', 0.1, 0.03); 
        setTimeout(() => this.playTone(1200, 'square', 0.15, 0.03), 100); 
    },
    cash: function() { 
        this.playTone(1000, 'sine', 0.1, 0.08); 
        setTimeout(() => this.playTone(1500, 'sine', 0.3, 0.08), 80); 
    },
    success: function() {
        this.playTone(400, 'square', 0.1, 0.05);
        setTimeout(() => this.playTone(500, 'square', 0.1, 0.05), 100);
        setTimeout(() => this.playTone(600, 'square', 0.3, 0.05), 200);
    },
    endDay: function() {
        this.playTone(300, 'triangle', 0.2, 0.1);
        setTimeout(() => this.playTone(400, 'triangle', 0.2, 0.1), 150);
        setTimeout(() => this.playTone(500, 'triangle', 0.4, 0.1), 300);
    },
    police: function() {
        for(let i=0; i<5; i++) {
            setTimeout(() => this.playTone(800, 'square', 0.2, 0.1), i*400);
            setTimeout(() => this.playTone(600, 'square', 0.2, 0.1), i*400 + 200);
        }
    }
};

document.addEventListener('click', (e) => {
    let target = e.target.closest('button, select, .nav-btn, .slot-card');
    if(target) { AudioSys.tap(); }
});
