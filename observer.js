/* ============================================
   Observer Pattern — Grand Prix Motors
   Interactive F1 Race Control Demo
   ============================================ */

// ─── OBSERVER PATTERN IMPLEMENTATION ────────────────────────────────

/**
 * EventSubject — the Subject (Observable) base class.
 * Maintains a map of event-type → Set<callback> observers.
 * Any object can subscribe/unsubscribe to specific event types.
 */
class EventSubject {
    constructor(name) {
        this._name = name;
        this._observers = new Map();   // eventType → Set<{id, name, callback}>
    }

    /** Subscribe an observer for a given event type */
    subscribe(eventType, observer) {
        if (!this._observers.has(eventType)) {
            this._observers.set(eventType, new Set());
        }
        this._observers.get(eventType).add(observer);
    }

    /** Unsubscribe an observer from a given event type */
    unsubscribe(eventType, observer) {
        if (this._observers.has(eventType)) {
            this._observers.get(eventType).delete(observer);
        }
    }

    /** Notify all observers subscribed to a given event type */
    notify(eventType, data) {
        if (!this._observers.has(eventType)) return;
        for (const observer of this._observers.get(eventType)) {
            observer.update(eventType, data);
        }
    }

    /** Get count of observers for a given event type */
    getObserverCount(eventType) {
        return this._observers.has(eventType) ? this._observers.get(eventType).size : 0;
    }

    /** Get all event types */
    getEventTypes() {
        return [...this._observers.keys()];
    }
}

/**
 * RaceControl — Concrete Subject.
 * Represents the F1 Race Director who emits events:
 *   "flag"    — track flag changes (green, yellow, red, checkered)
 *   "weather" — weather updates (dry, rain, mixed)
 *   "safety"  — safety car / VSC deployment
 *   "message" — general messages
 */
class RaceControl extends EventSubject {
    constructor() {
        super('Race Control');
        this._currentFlag = 'green';
        this._currentWeather = 'dry';
        this._safetyCar = false;
        this._lap = 1;
        this._maxLaps = 57;
    }

    setFlag(flag) {
        this._currentFlag = flag;
        this.notify('flag', { flag, lap: this._lap });
    }

    setWeather(weather) {
        this._currentWeather = weather;
        this.notify('weather', { weather, lap: this._lap });
    }

    deploySafetyCar(active) {
        this._safetyCar = active;
        this.notify('safety', { active, lap: this._lap });
    }

    sendMessage(text) {
        this.notify('message', { text, lap: this._lap });
    }

    advanceLap() {
        if (this._lap < this._maxLaps) {
            this._lap++;
        }
        return this._lap;
    }

    get lap() { return this._lap; }
    get maxLaps() { return this._maxLaps; }
}

/**
 * Observer interface — every observer must implement update(eventType, data).
 */

/** TeamRadio — reacts to flag, safety, message events (team strategy calls) */
class TeamRadio {
    constructor(teamName) {
        this.id = 'radio-' + teamName.toLowerCase().replace(/\s+/g, '-');
        this.name = teamName + ' Radio';
        this.icon = '';
        this.color = '#6366f1';
        this.logs = [];
    }
    update(eventType, data) {
        let msg = '';
        switch (eventType) {
            case 'flag':
                msg = `[Lap ${data.lap}] Race Control: ${data.flag.toUpperCase()} FLAG! ${this._flagAdvice(data.flag)}`;
                break;
            case 'safety':
                msg = data.active
                    ? `[Lap ${data.lap}] Safety Car deployed! Box this lap for fresh tyres!`
                    : `[Lap ${data.lap}] Safety Car coming in. Push push push!`;
                break;
            case 'message':
                msg = `[Lap ${data.lap}] Control says: "${data.text}"`;
                break;
        }
        if (msg) this.logs.push({ time: Date.now(), msg, eventType });
    }
    _flagAdvice(flag) {
        const advice = {
            green: 'All clear, push!',
            yellow: 'Caution! Slow down in sector.',
            red: 'SESSION STOPPED. Return to pits!',
            checkered: 'FINISH! Great race!'
        };
        return advice[flag] || '';
    }
}

/** PitWall — reacts to all events (strategic planning) */
class PitWall {
    constructor(teamName) {
        this.id = 'pitwall-' + teamName.toLowerCase().replace(/\s+/g, '-');
        this.name = teamName + ' Pit Wall';
        this.icon = '';
        this.color = '#3b82f6';
        this.logs = [];
    }
    update(eventType, data) {
        let msg = '';
        switch (eventType) {
            case 'flag':
                msg = `[Lap ${data.lap}] Flag: ${data.flag.toUpperCase()} — Recalculating strategy...`;
                break;
            case 'weather':
                msg = `[Lap ${data.lap}] Weather → ${data.weather.toUpperCase()} — ${this._tyreRec(data.weather)}`;
                break;
            case 'safety':
                msg = data.active
                    ? `[Lap ${data.lap}] SC DEPLOYED — Window for free pit stop!`
                    : `[Lap ${data.lap}] SC IN — Recalculate gap to car ahead.`;
                break;
            case 'message':
                msg = `[Lap ${data.lap}] Control: "${data.text}"`;
                break;
        }
        if (msg) this.logs.push({ time: Date.now(), msg, eventType });
    }
    _tyreRec(weather) {
        const rec = { dry: 'Stay on Mediums (C3)', rain: 'Switch to Full Wets!', mixed: 'Intermediates recommended.' };
        return rec[weather] || 'Monitor conditions.';
    }
}

/** TVBroadcast — reacts to flag, weather, safety (viewer information) */
class TVBroadcast {
    constructor() {
        this.id = 'tv-broadcast';
        this.name = 'TV Broadcast';
        this.icon = '';
        this.color = '#ef4444';
        this.logs = [];
    }
    update(eventType, data) {
        let msg = '';
        switch (eventType) {
            case 'flag':
                msg = `[Lap ${data.lap}]  ${data.flag.toUpperCase()} FLAG shown to all drivers.`;
                break;
            case 'weather':
                msg = `[Lap ${data.lap}]  Weather update: Conditions now ${data.weather.toUpperCase()}.`;
                break;
            case 'safety':
                msg = data.active
                    ? `[Lap ${data.lap}]  SAFETY CAR on track!`
                    : `[Lap ${data.lap}]  Safety Car returning to pit lane.`;
                break;
        }
        if (msg) this.logs.push({ time: Date.now(), msg, eventType });
    }
}

/** MarshalPost — reacts to flag events only (track marshals) */
class MarshalPost {
    constructor(sector) {
        this.id = 'marshal-sector-' + sector;
        this.name = 'Marshal Post S' + sector;
        this.icon = '';
        this.color = '#f59e0b';
        this.logs = [];
    }
    update(eventType, data) {
        if (eventType === 'flag') {
            this.logs.push({
                time: Date.now(),
                msg: `[Lap ${data.lap}] Sector flag → ${data.flag.toUpperCase()}. Marshals on standby.`,
                eventType
            });
        }
    }
}


// ─── DEMO CONTROLLER ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const raceControl = new RaceControl();

    // Create observers
    const teamRadio     = new TeamRadio('Ferrari');
    const pitWall       = new PitWall('Ferrari');
    const tvBroadcast   = new TVBroadcast();
    const marshalPost   = new MarshalPost(1);

    // Subscribe observers
    const allObservers = [
        { obs: teamRadio,   events: ['flag', 'safety', 'message'] },
        { obs: pitWall,     events: ['flag', 'weather', 'safety', 'message'] },
        { obs: tvBroadcast, events: ['flag', 'weather', 'safety'] },
        { obs: marshalPost, events: ['flag'] },
    ];

    allObservers.forEach(({ obs, events }) => {
        events.forEach(evt => raceControl.subscribe(evt, obs));
    });

    // ── UI References ──
    const logContainer = document.getElementById('observerLogs');
    const lapDisplay   = document.getElementById('lapCounter');
    const subPanel     = document.getElementById('subscriptionPanel');

    // Render subscription checkboxes
    renderSubscriptions();

    function renderSubscriptions() {
        if (!subPanel) return;
        subPanel.innerHTML = '';
        allObservers.forEach(({ obs, events }) => {
            const card = document.createElement('div');
            card.className = 'sub-card';
            card.innerHTML = `<div class="sub-card-header"><span class="sub-icon">${obs.icon}</span> <strong>${obs.name}</strong></div>`;
            const checks = document.createElement('div');
            checks.className = 'sub-checks';
            ['flag', 'weather', 'safety', 'message'].forEach(evt => {
                const label = document.createElement('label');
                label.className = 'sub-check-label';
                const cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = events.includes(evt);
                cb.addEventListener('change', () => {
                    if (cb.checked) {
                        raceControl.subscribe(evt, obs);
                        if (!events.includes(evt)) events.push(evt);
                    } else {
                        raceControl.unsubscribe(evt, obs);
                        const idx = events.indexOf(evt);
                        if (idx > -1) events.splice(idx, 1);
                    }
                    updateCountBadges();
                    flashCard(card);
                });
                label.appendChild(cb);
                label.appendChild(document.createTextNode(' ' + evt));
                checks.appendChild(label);
            });
            card.appendChild(checks);
            subPanel.appendChild(card);
        });
        updateCountBadges();
    }

    function updateCountBadges() {
        document.querySelectorAll('.event-btn').forEach(btn => {
            const evt = btn.getAttribute('data-event');
            const badge = btn.querySelector('.count-badge');
            if (badge && evt) {
                badge.textContent = raceControl.getObserverCount(evt);
            }
        });
    }

    function flashCard(card) {
        card.classList.add('flash');
        setTimeout(() => card.classList.remove('flash'), 400);
    }

    // ── Event Buttons ──
    // Flag buttons
    document.querySelectorAll('[data-flag]').forEach(btn => {
        btn.addEventListener('click', () => {
            const flag = btn.getAttribute('data-flag');
            raceControl.setFlag(flag);
            updateUI();
            highlightActive(btn, '.flag-btn');
        });
    });

    // Weather buttons
    document.querySelectorAll('[data-weather]').forEach(btn => {
        btn.addEventListener('click', () => {
            const weather = btn.getAttribute('data-weather');
            raceControl.setWeather(weather);
            updateUI();
            highlightActive(btn, '.weather-btn');
        });
    });

    // Safety car
    const scOnBtn  = document.getElementById('scOn');
    const scOffBtn = document.getElementById('scOff');
    if (scOnBtn)  scOnBtn.addEventListener('click',  () => { raceControl.deploySafetyCar(true);  updateUI(); });
    if (scOffBtn) scOffBtn.addEventListener('click', () => { raceControl.deploySafetyCar(false); updateUI(); });

    // Message send
    const msgInput = document.getElementById('messageInput');
    const msgBtn   = document.getElementById('sendMessage');
    if (msgBtn && msgInput) {
        msgBtn.addEventListener('click', () => {
            const text = msgInput.value.trim();
            if (text) {
                raceControl.sendMessage(text);
                msgInput.value = '';
                updateUI();
            }
        });
        msgInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') msgBtn.click();
        });
    }

    // Advance lap
    const lapBtn = document.getElementById('advanceLap');
    if (lapBtn) {
        lapBtn.addEventListener('click', () => {
            const newLap = raceControl.advanceLap();
            updateLap(newLap);
        });
    }

    // Clear logs
    const clearBtn = document.getElementById('clearLogs');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            allObservers.forEach(({ obs }) => { obs.logs = []; });
            updateUI();
        });
    }

    function updateLap(lap) {
        if (lapDisplay) {
            lapDisplay.textContent = `Lap ${lap} / ${raceControl.maxLaps}`;
        }
    }

    function highlightActive(btn, selector) {
        document.querySelectorAll(selector).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    function updateUI() {
        if (!logContainer) return;
        logContainer.innerHTML = '';

        allObservers.forEach(({ obs }) => {
            if (obs.logs.length === 0) return;
            const section = document.createElement('div');
            section.className = 'observer-log-section';
            section.innerHTML = `<div class="observer-log-header" style="border-left:4px solid ${obs.color}"><span>${obs.icon}</span> ${obs.name}</div>`;
            const list = document.createElement('div');
            list.className = 'observer-log-list';
            // Show last 8 log entries
            obs.logs.slice(-8).forEach(entry => {
                const item = document.createElement('div');
                item.className = 'observer-log-item new-item';
                item.setAttribute('data-event', entry.eventType);
                item.textContent = entry.msg;
                list.appendChild(item);
            });
            section.appendChild(list);
            logContainer.appendChild(section);
        });

        updateCountBadges();
        // Scroll log to bottom
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    // Initial lap display
    updateLap(raceControl.lap);
    updateCountBadges();

    // ── WebGL GPU Race Visualisation ─────────────────────────────────────
    (function initGPURace() {
        const canvas = document.getElementById('gpuRaceCanvas');
        const infoEl = document.getElementById('gpuInfo');
        const fpsEl  = document.getElementById('gpuFps');
        if (!canvas) return;

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            if (infoEl) infoEl.textContent = '⚠ WebGL not supported in this browser';
            return;
        }

        // Show GPU renderer name
        const dbgExt = gl.getExtension('WEBGL_debug_renderer_info');
        if (dbgExt && infoEl) {
            const renderer = gl.getParameter(dbgExt.UNMASKED_RENDERER_WEBGL);
            infoEl.textContent = '▶ GPU: ' + renderer;
        }

        // ── Monaco-inspired circuit — 24 waypoints ──────────────────────
        // Coordinate space (in shader): p = (2·fragCoord − res) / res.y
        // Canvas 880×400 → x ∈ [−2.2, 2.2], y ∈ [−1, 1]
        const TRACK = [
            [ 1.30,  0.65], //  0  Start / Finish
            [ 1.80,  0.45], //  1  Ste Devote approach
            [ 1.95,  0.10], //  2  Ste Devote apex
            [ 1.85, -0.10], //  3  Beau Rivage
            [ 1.60, -0.20], //  4  Massenet
            [ 1.25, -0.10], //  5  Casino entry
            [ 0.95, -0.30], //  6  Casino exit
            [ 0.70, -0.50], //  7  Mirabeau
            [ 0.50, -0.75], //  8  Hairpin (Loews)
            [ 0.20, -0.55], //  9  Portier entry
            [-0.10, -0.45], // 10  Portier
            [-0.50, -0.40], // 11  Tunnel entrance
            [-1.00, -0.35], // 12  Tunnel mid
            [-1.50, -0.40], // 13  Tunnel exit
            [-1.80, -0.50], // 14  Chicane 1
            [-1.90, -0.65], // 15  Chicane 2
            [-1.75, -0.80], // 16  Swimming Pool 1
            [-1.40, -0.82], // 17  Swimming Pool 2
            [-0.90, -0.78], // 18  La Rascasse
            [-0.55, -0.58], // 19  Anthony Noghes
            [-0.20, -0.30], // 20  Uphill
            [ 0.40,  0.10], // 21  Return
            [ 0.85,  0.45], // 22  S/F approach
            [ 1.30,  0.65], // 23  back to Start (closes loop)
        ];

        // ── Car configs (5 F1 cars + 1 Safety Car) ─────────────────────
        const CARS = [
            { t: 0.00, spd: 0.00150, col: [0.91, 0.00, 0.18] }, // Ferrari red
            { t: 0.14, spd: 0.00158, col: [1.00, 0.50, 0.00] }, // McLaren papaya
            { t: 0.28, spd: 0.00155, col: [0.21, 0.44, 0.78] }, // Red Bull blue
            { t: 0.42, spd: 0.00148, col: [0.15, 0.96, 0.82] }, // Mercedes teal
            { t: 0.56, spd: 0.00143, col: [0.45, 0.03, 0.68] }, // Alpine purple
            { t: 0.95, spd: 0.00120, col: [1.00, 0.55, 0.00] }, // Safety Car orange
        ];

        // ── GPU state — updated via Observer pattern ─────────────────────
        const gpuState = { flag: 'green', weather: 'dry', safetyCar: false };

        class GpuObserver {
            update(eventType, data) {
                if (eventType === 'flag')    gpuState.flag      = data.flag;
                if (eventType === 'weather') gpuState.weather   = data.weather;
                if (eventType === 'safety')  gpuState.safetyCar = data.active;
            }
        }
        const gpuObs = new GpuObserver();
        raceControl.subscribe('flag',    gpuObs);
        raceControl.subscribe('weather', gpuObs);
        raceControl.subscribe('safety',  gpuObs);

        // ── Shaders ─────────────────────────────────────────────────────
        const VS = `
attribute vec2 a_pos;
void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

        const FS = `
precision mediump float;
uniform vec2  u_res;
uniform float u_time;
uniform float u_flag;    /* 0=green 1=yellow 2=red 3=checkered */
uniform float u_weather; /* 0=dry 1=rain 2=mixed */
uniform float u_sc;      /* 0=off 1=on */
uniform vec2  u_track[24];
uniform vec2  u_cars[6];
uniform vec3  u_colors[6];

/* Distance from point p to segment [a,b] */
float segDist(vec2 p, vec2 a, vec2 b) {
    vec2 ab = b - a;
    vec2 ap = p - a;
    float t = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
    return length(ap - t * ab);
}

/* Minimum distance to the track centreline */
float trackDist(vec2 p) {
    float d = 99.0;
    for (int i = 0; i < 23; i++) {
        d = min(d, segDist(p, u_track[i], u_track[i + 1]));
    }
    return d;
}

float rand(vec2 c) {
    return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_res) / u_res.y;
    float d  = trackDist(p);
    float TW = 0.11;   /* track half-width */
    float CW = 0.017;  /* curb width */

    /* Backdrop gradient */
    vec3 col = mix(vec3(0.02, 0.03, 0.08), vec3(0.04, 0.07, 0.16),
                   smoothstep(-0.5, 0.5, p.y));

    /* Subtle dot grid on backdrop */
    vec2 gp  = fract(p * 5.0);
    float dot = 1.0 - smoothstep(0.04, 0.08, length(gp - 0.5));
    col += dot * 0.04;

    /* Grass */
    float grassMix = smoothstep(TW + CW + 0.05, TW + CW, d);
    vec3  grass    = vec3(0.06, 0.20, 0.04) + (noise(p * 9.0) - 0.5) * 0.03;
    col = mix(col, grass, grassMix);

    /* Curbs — alternating red / white stripes */
    float curbMix = smoothstep(TW + CW, TW + CW * 0.5, d)
                  * smoothstep(TW - CW * 0.3, TW, d);
    float stripe  = mod(p.x * 4.5 + p.y * 2.8, 0.55);
    vec3  curbCol = (stripe > 0.275) ? vec3(0.88, 0.10, 0.08) : vec3(0.95, 0.95, 0.95);
    col = mix(col, curbCol, curbMix * 0.9);

    /* Asphalt */
    float trackMix = smoothstep(TW, TW - 0.012, d);
    vec3  asphalt  = vec3(0.19, 0.19, 0.21) + (noise(p * 18.0) - 0.5) * 0.018;
    col = mix(col, asphalt, trackMix);

    /* Centre dashes */
    float dash = mod(p.x * 7.0 + p.y * 4.5, 1.0);
    float cl   = smoothstep(0.007, 0.003, d) * step(0.45, dash);
    col = mix(col, vec3(0.92), cl);

    /* Cars — glow + body rendered on GPU */
    for (int i = 0; i < 6; i++) {
        float visible = (i == 5) ? u_sc : 1.0;
        float dc   = length(p - u_cars[i]);
        float glow = smoothstep(0.20, 0.0,   dc) * 0.55;
        float body = smoothstep(0.038, 0.018, dc);
        float core = smoothstep(0.012, 0.004, dc);
        col += u_colors[i] * (glow + body + core * 0.5) * visible;
    }

    /* Flag overlays */
    float pulse = 0.5 + 0.5 * sin(u_time * 2.8);
    if (u_flag < 0.5) {          /* green */
        col += vec3(0.0, 0.07, 0.0) * trackMix * pulse;
    } else if (u_flag < 1.5) {   /* yellow */
        col = mix(col, col * vec3(2.2, 1.8, 0.1),
                  trackMix * 0.40 * (0.5 + 0.5 * pulse));
    } else if (u_flag < 2.5) {   /* red */
        col = mix(col, col * vec3(2.8, 0.2, 0.2),
                  trackMix * 0.45 * (0.5 + 0.5 * pulse));
    } else {                      /* checkered */
        float sq = mod(floor(p.x * 5.5) + floor(p.y * 5.5), 2.0);
        col = mix(col, vec3(sq), 0.32 * pulse * trackMix);
    }

    /* Safety-car orange halo */
    if (u_sc > 0.5) {
        float scd = length(p - u_cars[5]);
        col += vec3(1.0, 0.5, 0.0) * (0.006 / (scd + 0.01)) * 0.4;
    }

    /* Weather — animated rain streaks */
    if (u_weather > 0.5) {
        float intensity = (u_weather > 1.5) ? 0.5 : 1.0;
        vec2  rc     = p * vec2(28.0, 6.0) + vec2(u_time * 0.8, u_time * 14.0);
        float rn     = rand(floor(rc));
        vec2  rl     = fract(rc);
        float streak = smoothstep(0.82, 1.0, rn)
                     * smoothstep(1.0,  0.5, rl.y)
                     * smoothstep(0.25, 0.08, rl.x);
        col += streak * 0.28 * intensity;
        col  = mix(col, col * 0.8 + vec3(0.04, 0.07, 0.16),
                   trackMix * 0.45 * intensity);
    }

    /* Vignette */
    float vig = 1.0 - smoothstep(0.4, 1.1, length(p * vec2(0.45, 0.78)));
    col *= vig;

    /* Tone map + gamma */
    col = col / (col + vec3(0.85));
    col = pow(max(col, vec3(0.0)), vec3(0.4545));

    gl_FragColor = vec4(col, 1.0);
}`;

        // ── Compile & link shaders ───────────────────────────────────────
        function mkShader(type, src) {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(s));
                return null;
            }
            return s;
        }

        const vs = mkShader(gl.VERTEX_SHADER,   VS);
        const fs = mkShader(gl.FRAGMENT_SHADER, FS);
        if (!vs || !fs) { if (infoEl) infoEl.textContent = '⚠ Shader compile failed'; return; }

        const prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(prog));
            if (infoEl) infoEl.textContent = '⚠ Shader link failed';
            return;
        }
        gl.useProgram(prog);

        // Full-screen quad (triangle strip)
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array([-1, -1,  1, -1,  -1, 1,  1, 1]),
            gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(prog, 'a_pos');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        // Uniform locations
        const uRes     = gl.getUniformLocation(prog, 'u_res');
        const uTime    = gl.getUniformLocation(prog, 'u_time');
        const uFlag    = gl.getUniformLocation(prog, 'u_flag');
        const uWeather = gl.getUniformLocation(prog, 'u_weather');
        const uSC      = gl.getUniformLocation(prog, 'u_sc');
        const uTrack   = gl.getUniformLocation(prog, 'u_track');
        const uCars    = gl.getUniformLocation(prog, 'u_cars');
        const uColors  = gl.getUniformLocation(prog, 'u_colors');

        // Upload static uniforms
        gl.uniform2fv(uTrack,  TRACK.flat());
        gl.uniform3fv(uColors, CARS.flatMap(c => c.col));
        gl.uniform2f(uRes, canvas.width, canvas.height);

        // ── Arc-length parameterisation of track ────────────────────────
        const SEG_LENS = [];
        let totalLen = 0;
        for (let i = 0; i < TRACK.length - 1; i++) {
            const dx = TRACK[i + 1][0] - TRACK[i][0];
            const dy = TRACK[i + 1][1] - TRACK[i][1];
            const len = Math.sqrt(dx * dx + dy * dy);
            SEG_LENS.push({ start: totalLen, len, i });
            totalLen += len;
        }

        function getTrackPos(t) {
            t = ((t % 1) + 1) % 1;
            const target = t * totalLen;
            for (const seg of SEG_LENS) {
                if (target <= seg.start + seg.len) {
                    const f = (target - seg.start) / seg.len;
                    const a = TRACK[seg.i], b = TRACK[seg.i + 1];
                    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
                }
            }
            return TRACK[0].slice();
        }

        // ── Animation loop ───────────────────────────────────────────────
        const FLAG_MAP    = { green: 0, yellow: 1, red: 2, checkered: 3 };
        const WEATHER_MAP = { dry: 0, rain: 1, mixed: 2 };

        let lastTime = 0, fpsFrames = 0, fpsAccum = 0;

        function animate(now) {
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime  = now;
            fpsAccum += dt;
            fpsFrames++;
            if (fpsAccum >= 0.5) {
                if (fpsEl) fpsEl.textContent = Math.round(fpsFrames / fpsAccum) + ' FPS';
                fpsAccum = 0; fpsFrames = 0;
            }

            // Speed multiplier based on race state
            let speedMul = 1.0;
            if      (gpuState.flag === 'yellow')     speedMul = 0.30;
            else if (gpuState.flag === 'red')         speedMul = 0.05;
            else if (gpuState.flag === 'checkered')   speedMul = 1.30;
            else if (gpuState.safetyCar)              speedMul = 0.50;

            // Update car t values
            CARS.forEach((car, i) => {
                let s = (i === 5)              ? (gpuState.safetyCar ? 0.85 : 0)
                      : gpuState.safetyCar     ? 0.50
                      : speedMul;
                car.t = ((car.t + car.spd * s * 60 * dt) % 1 + 1) % 1;
            });

            // Upload per-frame uniforms
            gl.uniform2fv(uCars, CARS.flatMap(c => getTrackPos(c.t)));
            gl.uniform1f(uTime,    now / 1000);
            gl.uniform1f(uFlag,    FLAG_MAP[gpuState.flag]    ?? 0);
            gl.uniform1f(uWeather, WEATHER_MAP[gpuState.weather] ?? 0);
            gl.uniform1f(uSC,      gpuState.safetyCar ? 1.0 : 0.0);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(ts => { lastTime = ts; requestAnimationFrame(animate); });
    })();
    // ── End WebGL GPU Race Visualisation ─────────────────────────────────
});
