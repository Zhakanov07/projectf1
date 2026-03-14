/* ============================================
   Factory Pattern — Grand Prix Motors
   Interactive F1 Component Manufacturing Demo
   ============================================ */

// ─── FACTORY PATTERN IMPLEMENTATION ─────────────────────────────────

/**
 * Product interfaces — every component type has a base class
 * with methods that all concrete products must implement.
 */

class Engine {
    getName()      { return 'Unknown Engine'; }
    getType()      { return 'N/A'; }
    getPower()     { return 0; }     // HP
    getRPM()       { return 0; }     // max RPM
    getWeight()    { return 0; }     // kg
    getIcon()      { return '\u2699\uFE0F'; }
}

class Chassis {
    getName()      { return 'Unknown Chassis'; }
    getMaterial()   { return 'N/A'; }
    getWeight()    { return 0; }     // kg
    getRigidity()  { return 0; }     // torsional rigidity kNm/deg
    getSafety()    { return 'N/A'; }
    getIcon()      { return '\uD83D\uDE97'; }
}

class AeroKit {
    getName()        { return 'Unknown Aero Kit'; }
    getDownforce()   { return 0; }   // kg at 250 km/h
    getDragCoeff()   { return 0; }   // Cd
    getTopSpeedDelta() { return 0; } // km/h effect
    getIcon()        { return '\uD83C\uDF00'; }
}

class TyreSet {
    getName()      { return 'Unknown Tyre Set'; }
    getCompound()  { return 'N/A'; }
    getGrip()      { return 0; }     // grip rating 0-100
    getDurability() { return 0; }    // laps
    getOptimalTemp() { return 'N/A'; }
    getIcon()      { return '\u26AA'; }
}


// ─── CONCRETE PRODUCTS ──────────────────────────────────────────────

// Ferrari Products
class FerrariEngine extends Engine {
    getName()   { return 'Ferrari 066/10 V6 Turbo Hybrid'; }
    getType()   { return 'V6 Turbo Hybrid'; }
    getPower()  { return 1000; }
    getRPM()    { return 15000; }
    getWeight() { return 150; }
}

class FerrariChassis extends Chassis {
    getName()     { return 'Ferrari SF-23 Monocoque'; }
    getMaterial()  { return 'Carbon Fibre T800/Kevlar'; }
    getWeight()   { return 70; }
    getRigidity() { return 45000; }
    getSafety()   { return 'FIA Grade A+'; }
}

class FerrariAeroKit extends AeroKit {
    getName()          { return 'Ferrari High-Downforce Package'; }
    getDownforce()     { return 850; }
    getDragCoeff()     { return 0.88; }
    getTopSpeedDelta() { return -5; }
}

class FerrariTyreSet extends TyreSet {
    getName()       { return 'Pirelli P Zero (Ferrari Spec)'; }
    getCompound()   { return 'Soft C4'; }
    getGrip()       { return 92; }
    getDurability() { return 18; }
    getOptimalTemp() { return '100-120\u00B0C'; }
}

// Red Bull Products
class RedBullEngine extends Engine {
    getName()   { return 'Honda RBPT RA621H V6 Hybrid'; }
    getType()   { return 'V6 Turbo Hybrid'; }
    getPower()  { return 1020; }
    getRPM()    { return 15200; }
    getWeight() { return 148; }
}

class RedBullChassis extends Chassis {
    getName()     { return 'RB19 Newey Aero-Monocoque'; }
    getMaterial()  { return 'Carbon Fibre T1100/Zylon'; }
    getWeight()   { return 68; }
    getRigidity() { return 48000; }
    getSafety()   { return 'FIA Grade A+'; }
}

class RedBullAeroKit extends AeroKit {
    getName()          { return 'Red Bull Low-Drag Aero Package'; }
    getDownforce()     { return 780; }
    getDragCoeff()     { return 0.82; }
    getTopSpeedDelta() { return +3; }
}

class RedBullTyreSet extends TyreSet {
    getName()       { return 'Pirelli P Zero (Red Bull Spec)'; }
    getCompound()   { return 'Medium C3'; }
    getGrip()       { return 85; }
    getDurability() { return 28; }
    getOptimalTemp() { return '90-110\u00B0C'; }
}

// McLaren Products
class McLarenEngine extends Engine {
    getName()   { return 'Mercedes-AMG M14 E Performance'; }
    getType()   { return 'V6 Turbo Hybrid'; }
    getPower()  { return 990; }
    getRPM()    { return 14800; }
    getWeight() { return 152; }
}

class McLarenChassis extends Chassis {
    getName()     { return 'MCL60 Carbon Composite Tub'; }
    getMaterial()  { return 'Carbon Fibre T700/Nomex'; }
    getWeight()   { return 72; }
    getRigidity() { return 43000; }
    getSafety()   { return 'FIA Grade A'; }
}

class McLarenAeroKit extends AeroKit {
    getName()          { return 'McLaren Balanced Aero Package'; }
    getDownforce()     { return 810; }
    getDragCoeff()     { return 0.85; }
    getTopSpeedDelta() { return 0; }
}

class McLarenTyreSet extends TyreSet {
    getName()       { return 'Pirelli P Zero (McLaren Spec)'; }
    getCompound()   { return 'Hard C2'; }
    getGrip()       { return 78; }
    getDurability() { return 35; }
    getOptimalTemp() { return '85-105\u00B0C'; }
}

// Mercedes Products
class MercedesEngine extends Engine {
    getName()   { return 'Mercedes-AMG F1 M15 Hybrid'; }
    getType()   { return 'V6 Turbo Hybrid'; }
    getPower()  { return 1050; }
    getRPM()    { return 15500; }
    getWeight() { return 146; }
}

class MercedesChassis extends Chassis {
    getName()     { return 'W11 Zero-Pod Monocoque'; }
    getMaterial()  { return 'Carbon Fibre UD/Titanium Core'; }
    getWeight()   { return 66; }
    getRigidity() { return 50000; }
    getSafety()   { return 'FIA Grade A++'; }
}

class MercedesAeroKit extends AeroKit {
    getName()          { return 'Mercedes DAS Aero Package'; }
    getDownforce()     { return 870; }
    getDragCoeff()     { return 0.86; }
    getTopSpeedDelta() { return -2; }
}

class MercedesTyreSet extends TyreSet {
    getName()       { return 'Pirelli P Zero (Mercedes Spec)'; }
    getCompound()   { return 'Medium C3'; }
    getGrip()       { return 88; }
    getDurability() { return 26; }
    getOptimalTemp() { return '95-115\u00B0C'; }
}


// ─── FACTORY (CREATOR) CLASSES ──────────────────────────────────────

/**
 * TeamFactory — Abstract Creator.
 * Declares factory methods for each component type.
 */
class TeamFactory {
    createEngine()  { throw new Error('Must override createEngine()'); }
    createChassis() { throw new Error('Must override createChassis()'); }
    createAeroKit() { throw new Error('Must override createAeroKit()'); }
    createTyreSet() { throw new Error('Must override createTyreSet()'); }
    getTeamName()   { return 'Unknown Team'; }
    getTeamColor()  { return '#6366f1'; }
}

class FerrariFactory extends TeamFactory {
    createEngine()  { return new FerrariEngine(); }
    createChassis() { return new FerrariChassis(); }
    createAeroKit() { return new FerrariAeroKit(); }
    createTyreSet() { return new FerrariTyreSet(); }
    getTeamName()   { return 'Scuderia Ferrari'; }
    getTeamColor()  { return '#e10600'; }
}

class RedBullFactory extends TeamFactory {
    createEngine()  { return new RedBullEngine(); }
    createChassis() { return new RedBullChassis(); }
    createAeroKit() { return new RedBullAeroKit(); }
    createTyreSet() { return new RedBullTyreSet(); }
    getTeamName()   { return 'Oracle Red Bull Racing'; }
    getTeamColor()  { return '#1e3a8a'; }
}

class McLarenFactory extends TeamFactory {
    createEngine()  { return new McLarenEngine(); }
    createChassis() { return new McLarenChassis(); }
    createAeroKit() { return new McLarenAeroKit(); }
    createTyreSet() { return new McLarenTyreSet(); }
    getTeamName()   { return 'McLaren F1 Team'; }
    getTeamColor()  { return '#ff8000'; }
}

class MercedesFactory extends TeamFactory {
    createEngine()  { return new MercedesEngine(); }
    createChassis() { return new MercedesChassis(); }
    createAeroKit() { return new MercedesAeroKit(); }
    createTyreSet() { return new MercedesTyreSet(); }
    getTeamName()   { return 'Mercedes-AMG Petronas'; }
    getTeamColor()  { return '#00d2be'; }
}


// ─── FACTORY REGISTRY ───────────────────────────────────────────────

const FACTORIES = {
    ferrari:  new FerrariFactory(),
    redbull:  new RedBullFactory(),
    mclaren:  new McLarenFactory(),
    mercedes: new MercedesFactory(),
};

const COMPONENT_INFO = {
    engine:  { method: 'createEngine',  icon: '\u2699\uFE0F', label: 'Engine',   color: '#ef4444' },
    chassis: { method: 'createChassis', icon: '\uD83D\uDE97',  label: 'Chassis',  color: '#6366f1' },
    aero:    { method: 'createAeroKit', icon: '\uD83C\uDF00',  label: 'Aero Kit', color: '#22d3ee' },
    tyres:   { method: 'createTyreSet', icon: '\u26AA',        label: 'Tyre Set', color: '#f59e0b' },
};


// ─── DEMO CONTROLLER ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    let selectedFactoryKey = 'ferrari';
    let lastComponent = null;
    let lastComponentKey = null;
    let logEntries = [];

    // ── DOM refs ──
    const factorySelect  = document.getElementById('factorySelect');
    const componentPanel = document.getElementById('componentPanel');
    const productDisplay = document.getElementById('productDisplay');
    const productionLog  = document.getElementById('productionLog');
    const logCount       = document.getElementById('logCount');
    const codePreview    = document.getElementById('codePreview');
    const produceAllBtn  = document.getElementById('produceAll');
    const clearLogBtn    = document.getElementById('clearLog');

    // ── Factory Selection ──
    if (factorySelect) {
        factorySelect.querySelectorAll('[data-factory]').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedFactoryKey = btn.getAttribute('data-factory');
                factorySelect.querySelectorAll('[data-factory]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                lastComponent = null;
                lastComponentKey = null;
                renderProduct();
                renderCodePreview();
            });
        });
    }

    // ── Component Manufacturing ──
    if (componentPanel) {
        componentPanel.querySelectorAll('[data-component]').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-component');
                manufacture(key);
            });
        });
    }

    function manufacture(componentKey) {
        const factory = FACTORIES[selectedFactoryKey];
        const info = COMPONENT_INFO[componentKey];
        const product = factory[info.method]();

        lastComponent = product;
        lastComponentKey = componentKey;

        // Add log entry
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        logEntries.unshift({
            icon: info.icon,
            name: product.getName(),
            factory: factory.getTeamName(),
            type: info.label,
            color: factory.getTeamColor(),
            time: timeStr
        });

        renderProduct();
        renderLog();
        renderCodePreview();
    }

    // Produce All
    if (produceAllBtn) {
        produceAllBtn.addEventListener('click', () => {
            Object.keys(COMPONENT_INFO).forEach(key => manufacture(key));
        });
    }

    // Clear Log
    if (clearLogBtn) {
        clearLogBtn.addEventListener('click', () => {
            logEntries = [];
            lastComponent = null;
            lastComponentKey = null;
            renderProduct();
            renderLog();
            renderCodePreview();
        });
    }

    // ── Render Product Display ──
    function renderProduct() {
        if (!productDisplay) return;

        if (!lastComponent) {
            productDisplay.innerHTML = '<div class="product-empty">Select a component to manufacture</div>';
            return;
        }

        const factory = FACTORIES[selectedFactoryKey];
        const info = COMPONENT_INFO[lastComponentKey];
        const color = factory.getTeamColor();

        let specsHTML = '';

        if (lastComponent instanceof Engine) {
            specsHTML = buildSpecsGrid([
                { label: 'Power', value: lastComponent.getPower() + ' HP', pct: lastComponent.getPower() / 1100 * 100 },
                { label: 'Max RPM', value: lastComponent.getRPM().toLocaleString(), pct: lastComponent.getRPM() / 16000 * 100 },
                { label: 'Weight', value: lastComponent.getWeight() + ' kg', pct: lastComponent.getWeight() / 200 * 100 },
                { label: 'Type', value: lastComponent.getType(), pct: 100 },
            ], color);
        } else if (lastComponent instanceof Chassis) {
            specsHTML = buildSpecsGrid([
                { label: 'Weight', value: lastComponent.getWeight() + ' kg', pct: lastComponent.getWeight() / 100 * 100 },
                { label: 'Rigidity', value: lastComponent.getRigidity().toLocaleString() + ' kNm/deg', pct: lastComponent.getRigidity() / 55000 * 100 },
                { label: 'Material', value: lastComponent.getMaterial(), pct: 100 },
                { label: 'Safety', value: lastComponent.getSafety(), pct: 100 },
            ], color);
        } else if (lastComponent instanceof AeroKit) {
            const delta = lastComponent.getTopSpeedDelta();
            const deltaStr = delta >= 0 ? '+' + delta + ' km/h' : delta + ' km/h';
            specsHTML = buildSpecsGrid([
                { label: 'Downforce', value: lastComponent.getDownforce() + ' kg', pct: lastComponent.getDownforce() / 1000 * 100 },
                { label: 'Drag Coeff', value: 'Cd ' + lastComponent.getDragCoeff(), pct: lastComponent.getDragCoeff() / 1.0 * 100 },
                { label: 'Speed Effect', value: deltaStr, pct: 50 + (delta / 10 * 50) },
                { label: 'Package', value: lastComponent.getName().split(' ').slice(-2).join(' '), pct: 100 },
            ], color);
        } else if (lastComponent instanceof TyreSet) {
            specsHTML = buildSpecsGrid([
                { label: 'Grip Rating', value: lastComponent.getGrip() + '/100', pct: lastComponent.getGrip() },
                { label: 'Durability', value: lastComponent.getDurability() + ' laps', pct: lastComponent.getDurability() / 40 * 100 },
                { label: 'Compound', value: lastComponent.getCompound(), pct: 100 },
                { label: 'Optimal Temp', value: lastComponent.getOptimalTemp(), pct: 100 },
            ], color);
        }

        productDisplay.innerHTML = `
            <div class="product-card">
                <div class="product-card-header" style="--product-color:${color}">
                    <span class="product-card-icon">${info.icon}</span>
                    <div class="product-card-info">
                        <h4>${lastComponent.getName()}</h4>
                        <span>Produced by ${factory.getTeamName()}</span>
                    </div>
                </div>
                ${specsHTML}
                <div class="product-badge" style="border-color:${color}">
                    ${info.icon} ${info.label} &mdash; ${factory.getTeamName()}
                </div>
            </div>
        `;
    }

    function buildSpecsGrid(specs, color) {
        return `<div class="product-specs-grid">${specs.map(s =>
            `<div class="product-spec-item">
                <div class="product-spec-label">${s.label}</div>
                <div class="product-spec-value">${s.value}</div>
                <div class="product-spec-bar"><div class="product-spec-bar-fill" style="width:${Math.min(s.pct, 100)}%;background:${color}"></div></div>
            </div>`
        ).join('')}</div>`;
    }

    // ── Render Production Log ──
    function renderLog() {
        if (!productionLog) return;
        if (logCount) logCount.textContent = logEntries.length;

        if (logEntries.length === 0) {
            productionLog.innerHTML = `
                <div class="log-empty">
                    <div class="log-empty-icon">\uD83C\uDFED</div>
                    <p>Factory idle \u2014 produce components to see the log</p>
                </div>`;
            return;
        }

        productionLog.innerHTML = logEntries.map(e =>
            `<div class="log-entry" style="--log-color:${e.color}">
                <span class="log-entry-icon">${e.icon}</span>
                <div class="log-entry-text">
                    <strong>${e.name}</strong>
                    <span>${e.type} \u2014 ${e.factory}</span>
                </div>
                <span class="log-entry-time">${e.time}</span>
            </div>`
        ).join('');
    }

    // ── Render Code Preview ──
    function renderCodePreview() {
        if (!codePreview) return;

        if (!lastComponentKey) {
            codePreview.innerHTML = '<span class="cm">// Select a factory and manufacture a component...</span>';
            return;
        }

        const factoryCls = {
            ferrari: 'FerrariFactory',
            redbull: 'RedBullFactory',
            mclaren: 'McLarenFactory',
            mercedes: 'MercedesFactory',
        }[selectedFactoryKey];

        const info = COMPONENT_INFO[lastComponentKey];
        const product = lastComponent;

        let code = '<span class="cm">// Factory Pattern: Create components via factory interface</span>\n';
        code += `<span class="kw">const</span> factory = <span class="kw">new</span> <span class="fn">${factoryCls}</span>();\n\n`;
        code += `<span class="cm">// The client calls the factory method — no concrete class needed</span>\n`;
        code += `<span class="kw">const</span> product = factory.<span class="fn">${info.method}</span>();\n\n`;
        code += `<span class="cm">// Product implements common interface</span>\n`;
        code += `product.<span class="fn">getName</span>();   <span class="cm">// → "${product.getName()}"</span>\n`;

        if (product instanceof Engine) {
            code += `product.<span class="fn">getPower</span>();  <span class="cm">// → ${product.getPower()} HP</span>\n`;
            code += `product.<span class="fn">getRPM</span>();    <span class="cm">// → ${product.getRPM()} RPM</span>\n`;
            code += `product.<span class="fn">getWeight</span>(); <span class="cm">// → ${product.getWeight()} kg</span>`;
        } else if (product instanceof Chassis) {
            code += `product.<span class="fn">getMaterial</span>(); <span class="cm">// → "${product.getMaterial()}"</span>\n`;
            code += `product.<span class="fn">getRigidity</span>(); <span class="cm">// → ${product.getRigidity()} kNm/deg</span>\n`;
            code += `product.<span class="fn">getSafety</span>();   <span class="cm">// → "${product.getSafety()}"</span>`;
        } else if (product instanceof AeroKit) {
            code += `product.<span class="fn">getDownforce</span>();     <span class="cm">// → ${product.getDownforce()} kg</span>\n`;
            code += `product.<span class="fn">getDragCoeff</span>();     <span class="cm">// → ${product.getDragCoeff()}</span>\n`;
            code += `product.<span class="fn">getTopSpeedDelta</span>(); <span class="cm">// → ${product.getTopSpeedDelta()} km/h</span>`;
        } else if (product instanceof TyreSet) {
            code += `product.<span class="fn">getGrip</span>();       <span class="cm">// → ${product.getGrip()}/100</span>\n`;
            code += `product.<span class="fn">getDurability</span>(); <span class="cm">// → ${product.getDurability()} laps</span>\n`;
            code += `product.<span class="fn">getCompound</span>();   <span class="cm">// → "${product.getCompound()}"</span>`;
        }

        codePreview.innerHTML = code;
    }

    // Initial render
    renderProduct();
    renderLog();
    renderCodePreview();
});
