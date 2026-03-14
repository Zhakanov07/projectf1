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
});
