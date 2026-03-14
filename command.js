/* ============================================
   Command Pattern — Grand Prix Motors
   Interactive Pit Wall Strategy Console Demo
   ============================================ */

// ─── RECEIVER: F1 CAR ───────────────────────────────────────────────

class F1Car {
    constructor() {
        this.inPit = false;
        this.tyreCompound = 'Medium';
        this.ersDeployed = false;
        this.drsOpen = false;
        this.engineMode = 'Normal';
        this.frontWingAngle = 12; // degrees
    }

    getState() {
        return {
            inPit: this.inPit,
            tyres: this.tyreCompound,
            ers: this.ersDeployed,
            drs: this.drsOpen,
            engine: this.engineMode,
            wing: this.frontWingAngle
        };
    }
}


// ─── COMMAND INTERFACE & CONCRETE COMMANDS ───────────────────────────

class Command {
    execute() { throw new Error('Override execute()'); }
    undo()    { throw new Error('Override undo()'); }
    getName() { return 'Unknown Command'; }
    getIcon() { return '\u2753'; }
    getColor() { return '#6366f1'; }
}

class PitStopCommand extends Command {
    constructor(car) {
        super();
        this.car = car;
        this.prevTyres = null;
        this.prevInPit = false;
    }
    execute() {
        this.prevTyres = this.car.tyreCompound;
        this.prevInPit = this.car.inPit;
        this.car.inPit = true;
        this.car.drsOpen = false;
    }
    undo() {
        this.car.inPit = this.prevInPit;
        this.car.tyreCompound = this.prevTyres;
    }
    getName() { return 'Box Box! (Pit Stop)'; }
    getIcon() { return '\uD83D\uDD04'; }
    getColor() { return '#ef4444'; }
}

class ERSCommand extends Command {
    constructor(car) { super(); this.car = car; this.prev = false; }
    execute() { this.prev = this.car.ersDeployed; this.car.ersDeployed = true; }
    undo()    { this.car.ersDeployed = this.prev; }
    getName() { return 'Deploy ERS'; }
    getIcon() { return '\u26A1'; }
    getColor() { return '#eab308'; }
}

class DRSCommand extends Command {
    constructor(car) { super(); this.car = car; this.prev = false; }
    execute() { this.prev = this.car.drsOpen; this.car.drsOpen = true; }
    undo()    { this.car.drsOpen = this.prev; }
    getName() { return 'DRS Open'; }
    getIcon() { return '\uD83D\uDCA8'; }
    getColor() { return '#22d3ee'; }
}

class TyreCommand extends Command {
    constructor(car) { super(); this.car = car; this.prevCompound = 'Medium'; }
    execute() {
        this.prevCompound = this.car.tyreCompound;
        this.car.tyreCompound = 'Soft';
        this.car.inPit = false; // exit pit
    }
    undo() { this.car.tyreCompound = this.prevCompound; }
    getName() { return 'Switch to Soft Tyres'; }
    getIcon() { return '\uD83C\uDF31'; }
    getColor() { return '#22c55e'; }
}

class PushModeCommand extends Command {
    constructor(car) { super(); this.car = car; this.prevMode = 'Normal'; }
    execute() { this.prevMode = this.car.engineMode; this.car.engineMode = 'Push'; }
    undo()    { this.car.engineMode = this.prevMode; }
    getName() { return 'Engine Push Mode'; }
    getIcon() { return '\uD83D\uDE80'; }
    getColor() { return '#a855f7'; }
}

class WingAdjustCommand extends Command {
    constructor(car) { super(); this.car = car; this.prevAngle = 12; }
    execute() { this.prevAngle = this.car.frontWingAngle; this.car.frontWingAngle += 2; }
    undo()    { this.car.frontWingAngle = this.prevAngle; }
    getName() { return 'Adjust Front Wing +2\u00B0'; }
    getIcon() { return '\uD83D\uDD27'; }
    getColor() { return '#f59e0b'; }
}


// ─── INVOKER: PIT WALL ──────────────────────────────────────────────

class PitWall {
    constructor() {
        this.history = [];   // executed commands stack
        this.redoStack = []; // undone commands for redo
    }

    executeCmd(cmd) {
        cmd.execute();
        this.history.push(cmd);
        this.redoStack = []; // clear redo on new execute
    }

    undoLast() {
        const cmd = this.history.pop();
        if (cmd) {
            cmd.undo();
            this.redoStack.push(cmd);
            return cmd;
        }
        return null;
    }

    redo() {
        const cmd = this.redoStack.pop();
        if (cmd) {
            cmd.execute();
            this.history.push(cmd);
            return cmd;
        }
        return null;
    }

    reset() {
        this.history = [];
        this.redoStack = [];
    }
}


// ─── COMMAND REGISTRY ────────────────────────────────────────────────

const CMD_REGISTRY = {
    pitstop: { cls: PitStopCommand },
    ers:     { cls: ERSCommand },
    drs:     { cls: DRSCommand },
    tyres:   { cls: TyreCommand },
    push:    { cls: PushModeCommand },
    wing:    { cls: WingAdjustCommand },
};


// ─── DEMO CONTROLLER ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const car = new F1Car();
    const pitWall = new PitWall();
    let fullLog = []; // visual log including undos

    const commandPanel  = document.getElementById('commandPanel');
    const carStateDisp  = document.getElementById('carStateDisplay');
    const historyStack  = document.getElementById('historyStack');
    const historyCount  = document.getElementById('historyCount');
    const codePreview   = document.getElementById('codePreview');
    const undoBtn       = document.getElementById('undoBtn');
    const redoBtn       = document.getElementById('redoBtn');
    const resetBtn      = document.getElementById('resetCmd');
    const undoBanner    = document.getElementById('undoBanner');

    // Command buttons
    if (commandPanel) {
        commandPanel.querySelectorAll('[data-cmd]').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-cmd');
                const CmdClass = CMD_REGISTRY[key].cls;
                const cmd = new CmdClass(car);
                pitWall.executeCmd(cmd);

                fullLog.unshift({ icon: cmd.getIcon(), name: cmd.getName(), color: cmd.getColor(), type: 'execute', index: pitWall.history.length });
                hideBanner();
                renderAll('execute', cmd);
            });
        });
    }

    // Undo
    if (undoBtn) {
        undoBtn.addEventListener('click', () => {
            const cmd = pitWall.undoLast();
            if (cmd) {
                fullLog.unshift({ icon: '\u23EA', name: 'Undo: ' + cmd.getName(), color: '#eab308', type: 'undo', index: pitWall.history.length + 1 });
                showBanner('undo-success', `\u23EA Undone: ${cmd.getName()}`);
                renderAll('undo', cmd);
            } else {
                showBanner('undo-empty', '\u274C Nothing to undo — stack is empty');
            }
        });
    }

    // Redo
    if (redoBtn) {
        redoBtn.addEventListener('click', () => {
            const cmd = pitWall.redo();
            if (cmd) {
                fullLog.unshift({ icon: '\u23E9', name: 'Redo: ' + cmd.getName(), color: '#4ade80', type: 'redo', index: pitWall.history.length });
                showBanner('redo-success', `\u23E9 Redone: ${cmd.getName()}`);
                renderAll('redo', cmd);
            } else {
                showBanner('undo-empty', '\u274C Nothing to redo');
            }
        });
    }

    // Reset
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            pitWall.reset();
            car.inPit = false;
            car.tyreCompound = 'Medium';
            car.ersDeployed = false;
            car.drsOpen = false;
            car.engineMode = 'Normal';
            car.frontWingAngle = 12;
            fullLog = [];
            hideBanner();
            renderAll('reset', null);
        });
    }

    function showBanner(cls, text) {
        if (!undoBanner) return;
        undoBanner.className = 'undo-banner ' + cls;
        undoBanner.textContent = text;
        undoBanner.style.display = 'flex';
    }
    function hideBanner() {
        if (undoBanner) undoBanner.style.display = 'none';
    }

    // ── Render All ──
    function renderAll(action, cmd) {
        renderCarState();
        renderHistory();
        renderCode(action, cmd);
    }

    function renderCarState() {
        if (!carStateDisp) return;
        const s = car.getState();

        const boolCell = (val, onText, offText) =>
            val ? `<span class="car-state-value active-state">${onText}</span>`
                : `<span class="car-state-value inactive-state">${offText}</span>`;

        carStateDisp.innerHTML = `
            <div class="car-state-card">
                <div class="car-state-row">
                    <span class="car-state-label">In Pit</span>
                    ${boolCell(s.inPit, '\uD83D\uDFE2 Yes — in the pitlane', '\u274C No — on track')}
                </div>
                <div class="car-state-row">
                    <span class="car-state-label">Tyre Compound</span>
                    <span class="car-state-value">${s.tyres}</span>
                </div>
                <div class="car-state-row">
                    <span class="car-state-label">ERS</span>
                    ${boolCell(s.ers, '\u26A1 Deployed (+160 HP)', '\u274C Harvesting')}
                </div>
                <div class="car-state-row">
                    <span class="car-state-label">DRS</span>
                    ${boolCell(s.drs, '\uD83D\uDCA8 Open (low drag)', '\u274C Closed')}
                </div>
                <div class="car-state-row">
                    <span class="car-state-label">Engine Mode</span>
                    <span class="car-state-value">${s.engine === 'Push' ? '\uD83D\uDE80 Push' : '\u2699\uFE0F Normal'}</span>
                </div>
                <div class="car-state-row">
                    <span class="car-state-label">Front Wing</span>
                    <span class="car-state-value">${s.wing}\u00B0</span>
                </div>
            </div>
        `;
    }

    function renderHistory() {
        if (!historyStack) return;
        if (historyCount) historyCount.textContent = pitWall.history.length;

        if (fullLog.length === 0) {
            historyStack.innerHTML = `
                <div class="history-empty">
                    <div class="history-empty-icon">\uD83D\uDCCB</div>
                    <p>Command stack is empty \u2014 execute commands to fill it</p>
                </div>`;
            return;
        }

        historyStack.innerHTML = fullLog.map((e, i) => {
            const undone = e.type === 'undo' ? ' undone' : '';
            return `<div class="history-entry${undone}" style="--h-color:${e.color}">
                <span class="h-icon">${e.icon}</span>
                <div class="h-text">
                    <strong>${e.name}</strong>
                    <span>${e.type === 'execute' ? 'execute()' : e.type === 'undo' ? 'undo()' : e.type === 'redo' ? 're-execute()' : ''} \u2014 stack pos #${e.index}</span>
                </div>
                <span class="h-index">[${fullLog.length - i}]</span>
            </div>`;
        }).join('');
    }

    function renderCode(action, cmd) {
        if (!codePreview) return;

        if (!cmd) {
            codePreview.innerHTML = '<span class="cm">// Click a command to execute it, then try undo...</span>';
            return;
        }

        const cmdClsName = cmd.constructor.name;
        let code = '';

        if (action === 'execute' || action === 'redo') {
            code += `<span class="cm">// Create command object (encapsulates the action)</span>\n`;
            code += `<span class="kw">const</span> cmd = <span class="kw">new</span> <span class="fn">${cmdClsName}</span>(car);\n\n`;
            code += `<span class="cm">// Invoker executes it and pushes to history</span>\n`;
            code += `pitWall.<span class="fn">executeCmd</span>(cmd);\n\n`;
            code += `<span class="cm">// History stack size: ${pitWall.history.length}</span>\n`;
        } else if (action === 'undo') {
            code += `<span class="cm">// Undo: pop last command from history</span>\n`;
            code += `<span class="kw">const</span> undone = pitWall.<span class="fn">undoLast</span>();\n`;
            code += `<span class="cm">// undone = ${cmdClsName} \u2192 calls cmd.undo()</span>\n\n`;
            code += `<span class="cm">// History stack size: ${pitWall.history.length}</span>\n`;
            code += `<span class="cm">// Redo stack size: ${pitWall.redoStack.length}</span>\n`;
        }

        const s = car.getState();
        code += `\n<span class="cm">// Car state after ${action}:</span>\n`;
        code += `car.tyreCompound;    <span class="cm">// \u2192 "${s.tyres}"</span>\n`;
        code += `car.ersDeployed;     <span class="cm">// \u2192 ${s.ers}</span>\n`;
        code += `car.drsOpen;         <span class="cm">// \u2192 ${s.drs}</span>\n`;
        code += `car.engineMode;      <span class="cm">// \u2192 "${s.engine}"</span>\n`;
        code += `car.frontWingAngle;  <span class="cm">// \u2192 ${s.wing}\u00B0</span>`;

        codePreview.innerHTML = code;
    }

    // Initial
    renderCarState();
    renderHistory();
});
