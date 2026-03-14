/* ============================================
   Singleton Pattern — Grand Prix Motors
   Interactive Race Director Console Demo
   ============================================ */

// ─── SINGLETON PATTERN IMPLEMENTATION ───────────────────────────────

class RaceDirector {
    static _instance = null;
    static _instanceId = 'RD-' + Math.random().toString(36).slice(2, 8).toUpperCase();

    constructor() {
        if (RaceDirector._instance) return RaceDirector._instance;

        this.currentFlag = 'None';
        this.safetyCar = false;
        this.vsc = false;
        this.lapCount = 0;
        this.incidents = 0;
        this.flagHistory = [];
        this.instanceId = RaceDirector._instanceId;

        RaceDirector._instance = this;
    }

    static getInstance() {
        if (!RaceDirector._instance) new RaceDirector();
        return RaceDirector._instance;
    }

    static resetInstance() {
        RaceDirector._instance = null;
        RaceDirector._instanceId = 'RD-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    }

    setFlag(flag) {
        this.currentFlag = flag;
        this.flagHistory.push(flag);
        if (flag === 'Red Flag' || flag === 'Yellow Flag') this.incidents++;
    }

    deploySafetyCar() {
        this.safetyCar = true;
        this.vsc = false;
        this.currentFlag = 'Yellow Flag';
        this.flagHistory.push('Safety Car');
    }

    deployVSC() {
        this.vsc = true;
        this.safetyCar = false;
        this.currentFlag = 'Yellow Flag';
        this.flagHistory.push('VSC');
    }

    endRace() {
        this.currentFlag = 'Chequered Flag';
        this.safetyCar = false;
        this.vsc = false;
        this.flagHistory.push('Chequered Flag');
    }

    greenFlag() {
        this.currentFlag = 'Green Flag';
        this.safetyCar = false;
        this.vsc = false;
        this.lapCount++;
        this.flagHistory.push('Green Flag');
    }

    getState() {
        return {
            flag: this.currentFlag,
            safetyCar: this.safetyCar,
            vsc: this.vsc,
            laps: this.lapCount,
            incidents: this.incidents,
            historyLen: this.flagHistory.length,
            id: this.instanceId
        };
    }
}

// ─── CLIENT ROLES ───────────────────────────────────────────────────

const CLIENTS = {
    principal: { name: 'Team Principal',  icon: '\uD83D\uDC54', color: '#e10600' },
    marshal:   { name: 'Track Marshal',   icon: '\uD83D\uDEA9', color: '#eab308' },
    broadcast: { name: 'TV Broadcast',    icon: '\uD83D\uDCFA', color: '#3b82f6' },
    steward:   { name: 'Race Steward',    icon: '\u2696\uFE0F', color: '#22c55e' },
};

const ACTIONS = {
    green:     { label: 'Green Flag',     icon: '\uD83D\uDFE2', method: 'greenFlag' },
    yellow:    { label: 'Yellow Flag',    icon: '\uD83D\uDFE1', method: 'setFlag', arg: 'Yellow Flag' },
    red:       { label: 'Red Flag',       icon: '\uD83D\uDD34', method: 'setFlag', arg: 'Red Flag' },
    safety:    { label: 'Safety Car',     icon: '\uD83D\uDE97', method: 'deploySafetyCar' },
    vsc:       { label: 'VSC Deploy',     icon: '\uD83C\uDFF4', method: 'deployVSC' },
    chequered: { label: 'Chequered Flag', icon: '\uD83C\uDFC1', method: 'endRace' },
};


// ─── DEMO CONTROLLER ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    let selectedClient = 'principal';
    let logEntries = [];

    const clientSelect = document.getElementById('clientSelect');
    const actionPanel  = document.getElementById('actionPanel');
    const stateDisplay = document.getElementById('stateDisplay');
    const eventLog     = document.getElementById('eventLog');
    const logCount     = document.getElementById('logCount');
    const codePreview  = document.getElementById('codePreview');
    const resetBtn     = document.getElementById('resetSingleton');
    const verifyBtn    = document.getElementById('verifyBtn');
    const identityProof = document.getElementById('identityProof');
    const identityDetail = document.getElementById('identityDetail');

    // Client selection
    if (clientSelect) {
        clientSelect.querySelectorAll('[data-client]').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedClient = btn.getAttribute('data-client');
                clientSelect.querySelectorAll('[data-client]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // Action buttons
    if (actionPanel) {
        actionPanel.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-action');
                executeAction(key);
            });
        });
    }

    function executeAction(actionKey) {
        const director = RaceDirector.getInstance();
        const action = ACTIONS[actionKey];
        const client = CLIENTS[selectedClient];

        if (action.arg) {
            director[action.method](action.arg);
        } else {
            director[action.method]();
        }

        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        logEntries.unshift({
            icon: action.icon,
            action: action.label,
            client: client.name,
            clientIcon: client.icon,
            color: client.color,
            time: timeStr,
            instanceId: director.instanceId
        });

        renderState();
        renderLog();
        renderCode(actionKey);
    }

    // Reset
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            RaceDirector.resetInstance();
            logEntries = [];
            if (identityProof) identityProof.style.display = 'none';
            renderState();
            renderLog();
            if (codePreview) codePreview.innerHTML = '<span class="cm">// Singleton reset — new instance will be created on next access</span>';
        });
    }

    // Verify same instance
    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            const a = RaceDirector.getInstance();
            const b = RaceDirector.getInstance();
            const same = a === b;
            if (identityProof) {
                identityProof.style.display = 'block';
                identityProof.querySelector('.identity-proof-inner').style.animation = 'none';
                void identityProof.offsetHeight;
                identityProof.querySelector('.identity-proof-inner').style.animation = '';
            }
            if (identityDetail) {
                identityDetail.textContent = `RaceDirector.getInstance() === RaceDirector.getInstance() → ${same}  |  Instance ID: ${a.instanceId}`;
            }

            // Log it
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            logEntries.unshift({
                icon: '\uD83D\uDD0D',
                action: 'Identity Check: ' + (same ? 'SAME' : 'DIFFERENT'),
                client: CLIENTS[selectedClient].name,
                clientIcon: CLIENTS[selectedClient].icon,
                color: '#22c55e',
                time: timeStr,
                instanceId: a.instanceId
            });
            renderLog();

            if (codePreview) {
                let code = '<span class="cm">// Verify singleton identity</span>\n';
                code += `<span class="kw">const</span> ref1 = RaceDirector.<span class="fn">getInstance</span>();\n`;
                code += `<span class="kw">const</span> ref2 = RaceDirector.<span class="fn">getInstance</span>();\n\n`;
                code += `ref1 === ref2;           <span class="cm">// → ${same}</span>\n`;
                code += `ref1.instanceId;         <span class="cm">// → "${a.instanceId}"</span>\n`;
                code += `ref2.instanceId;         <span class="cm">// → "${b.instanceId}"</span>\n`;
                code += `<span class="cm">// Both point to the exact same object in memory</span>`;
                codePreview.innerHTML = code;
            }
        });
    }

    // ── Render State ──
    function renderState() {
        if (!stateDisplay) return;
        const director = RaceDirector.getInstance();
        const s = director.getState();

        const flagColors = {
            'Green Flag': '#22c55e', 'Yellow Flag': '#eab308', 'Red Flag': '#ef4444',
            'Chequered Flag': '#fff', 'None': '#64748b'
        };
        const flagColor = flagColors[s.flag] || '#6366f1';

        stateDisplay.innerHTML = `
            <div class="state-card">
                <div class="state-row">
                    <span class="state-label">Current Flag</span>
                    <span class="state-value" style="color:${flagColor}">${s.flag}</span>
                </div>
                <div class="state-row">
                    <span class="state-label">Safety Car</span>
                    <span class="state-value">${s.safetyCar ? '\uD83D\uDE97 Deployed' : '\u274C Off'}</span>
                </div>
                <div class="state-row">
                    <span class="state-label">VSC</span>
                    <span class="state-value">${s.vsc ? '\uD83C\uDFF4 Active' : '\u274C Off'}</span>
                </div>
                <div class="state-row">
                    <span class="state-label">Laps</span>
                    <span class="state-value">${s.laps}</span>
                </div>
                <div class="state-row">
                    <span class="state-label">Incidents</span>
                    <span class="state-value">${s.incidents}</span>
                </div>
                <div class="state-row">
                    <span class="state-label">Decisions</span>
                    <span class="state-value">${s.historyLen}</span>
                </div>
                <div class="state-instance-id">\uD83D\uDD12 Instance ID: ${s.id}</div>
            </div>
        `;
    }

    // ── Render Log ──
    function renderLog() {
        if (!eventLog) return;
        if (logCount) logCount.textContent = logEntries.length;

        if (logEntries.length === 0) {
            eventLog.innerHTML = `
                <div class="log-empty-sin">
                    <div class="log-empty-icon-sin">\uD83D\uDD10</div>
                    <p>All clients share one instance \u2014 interact to prove it</p>
                </div>`;
            return;
        }

        eventLog.innerHTML = logEntries.map(e =>
            `<div class="log-entry-sin" style="--log-color:${e.color}">
                <span class="log-icon">${e.icon}</span>
                <div class="log-text">
                    <strong>${e.action}</strong>
                    <span>${e.clientIcon} ${e.client} \u2192 singleton ${e.instanceId}</span>
                </div>
                <span class="log-time">${e.time}</span>
            </div>`
        ).join('');
    }

    // ── Render Code ──
    function renderCode(actionKey) {
        if (!codePreview) return;
        const client = CLIENTS[selectedClient];
        const action = ACTIONS[actionKey];
        const director = RaceDirector.getInstance();
        const s = director.getState();

        let code = `<span class="cm">// ${client.name} accesses the singleton</span>\n`;
        code += `<span class="kw">const</span> director = RaceDirector.<span class="fn">getInstance</span>();\n\n`;

        if (action.arg) {
            code += `<span class="cm">// Execute action: ${action.label}</span>\n`;
            code += `director.<span class="fn">${action.method}</span>(<span class="str">"${action.arg}"</span>);\n\n`;
        } else {
            code += `<span class="cm">// Execute action: ${action.label}</span>\n`;
            code += `director.<span class="fn">${action.method}</span>();\n\n`;
        }

        code += `<span class="cm">// Read shared state</span>\n`;
        code += `director.currentFlag;  <span class="cm">// \u2192 "${s.flag}"</span>\n`;
        code += `director.safetyCar;    <span class="cm">// \u2192 ${s.safetyCar}</span>\n`;
        code += `director.instanceId;   <span class="cm">// \u2192 "${s.id}"</span>\n`;
        code += `<span class="cm">// Any client calling getInstance() gets this same object</span>`;

        codePreview.innerHTML = code;
    }

    // Initial render
    renderState();
    renderLog();
});
