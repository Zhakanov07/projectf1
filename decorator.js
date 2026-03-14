/* ============================================
   Decorator Pattern — Grand Prix Motors
   Interactive F1 Car Upgrade Builder Demo
   ============================================ */

// ─── DECORATOR PATTERN IMPLEMENTATION ───────────────────────────────

/**
 * BaseCar — The Component interface.
 * Every car (and decorator) must implement these methods.
 */
class BaseCar {
    getDescription() { return 'Unknown Car'; }
    getTopSpeed()    { return 0; }    // km/h
    getHorsepower()  { return 0; }    // HP
    getWeight()      { return 0; }    // kg
    getPrice()       { return 0; }    // $
    getUpgrades()    { return []; }
}

/**
 * Concrete Components — real F1 cars with base specs.
 */
class FerrariSF23 extends BaseCar {
    getDescription() { return 'Ferrari SF-23'; }
    getTopSpeed()    { return 340; }
    getHorsepower()  { return 1000; }
    getWeight()      { return 798; }
    getPrice()       { return 8500000; }
    getUpgrades()    { return []; }
}

class RedBullRB19 extends BaseCar {
    getDescription() { return 'Red Bull RB19'; }
    getTopSpeed()    { return 350; }
    getHorsepower()  { return 1020; }
    getWeight()      { return 796; }
    getPrice()       { return 12000000; }
    getUpgrades()    { return []; }
}

class McLarenMCL60 extends BaseCar {
    getDescription() { return 'McLaren MCL60'; }
    getTopSpeed()    { return 338; }
    getHorsepower()  { return 990; }
    getWeight()      { return 800; }
    getPrice()       { return 6800000; }
    getUpgrades()    { return []; }
}

class MercedesW11 extends BaseCar {
    getDescription() { return 'Mercedes W11'; }
    getTopSpeed()    { return 362; }
    getHorsepower()  { return 1050; }
    getWeight()      { return 746; }
    getPrice()       { return 15000000; }
    getUpgrades()    { return []; }
}

/**
 * CarDecorator — Base Decorator.
 * Wraps a BaseCar and delegates all methods to it.
 * Subclasses override specific methods to add behaviour.
 */
class CarDecorator extends BaseCar {
    constructor(car) {
        super();
        this._car = car;
    }
    getDescription() { return this._car.getDescription(); }
    getTopSpeed()    { return this._car.getTopSpeed(); }
    getHorsepower()  { return this._car.getHorsepower(); }
    getWeight()      { return this._car.getWeight(); }
    getPrice()       { return this._car.getPrice(); }
    getUpgrades()    { return this._car.getUpgrades(); }
}

/**
 * Concrete Decorators — each adds a specific upgrade to the car.
 */

// DRS system: +15 km/h top speed, +$200,000
class DRSUpgrade extends CarDecorator {
    getDescription() { return this._car.getDescription(); }
    getTopSpeed()    { return this._car.getTopSpeed() + 15; }
    getPrice()       { return this._car.getPrice() + 200000; }
    getUpgrades()    { return [...this._car.getUpgrades(), { name: 'DRS System', icon: '', desc: '+15 km/h top speed', color: '#ef4444' }]; }
}

// Hybrid boost: +50 HP, +$500,000, +12 kg
class HybridBoost extends CarDecorator {
    getHorsepower()  { return this._car.getHorsepower() + 50; }
    getWeight()      { return this._car.getWeight() + 12; }
    getPrice()       { return this._car.getPrice() + 500000; }
    getUpgrades()    { return [...this._car.getUpgrades(), { name: 'Hybrid Boost', icon: '', desc: '+50 HP, +12 kg', color: '#eab308' }]; }
}

// Lightweight chassis: -30 kg, +$800,000
class LightweightChassis extends CarDecorator {
    getWeight()      { return this._car.getWeight() - 30; }
    getPrice()       { return this._car.getPrice() + 800000; }
    getUpgrades()    { return [...this._car.getUpgrades(), { name: 'Lightweight Chassis', icon: '', desc: '-30 kg weight', color: '#22d3ee' }]; }
}

// Aero package: +8 km/h, +$350,000
class AeroPackage extends CarDecorator {
    getTopSpeed()    { return this._car.getTopSpeed() + 8; }
    getPrice()       { return this._car.getPrice() + 350000; }
    getUpgrades()    { return [...this._car.getUpgrades(), { name: 'Aero Package', icon: '', desc: '+8 km/h downforce-tuned', color: '#6366f1' }]; }
}

// Slick tyres: +5 km/h, -$50,000 (cheaper compound)
class SlickTyres extends CarDecorator {
    getTopSpeed()    { return this._car.getTopSpeed() + 5; }
    getPrice()       { return this._car.getPrice() + 150000; }
    getUpgrades()    { return [...this._car.getUpgrades(), { name: 'Slick Tyres', icon: '', desc: '+5 km/h grip', color: '#f59e0b' }]; }
}

// KERS recovery: +30 HP, +8 kg, +$400,000
class KERSRecovery extends CarDecorator {
    getHorsepower()  { return this._car.getHorsepower() + 30; }
    getWeight()      { return this._car.getWeight() + 8; }
    getPrice()       { return this._car.getPrice() + 400000; }
    getUpgrades()    { return [...this._car.getUpgrades(), { name: 'KERS Recovery', icon: '', desc: '+30 HP, +8 kg', color: '#22c55e' }]; }
}


// ─── DECORATOR REGISTRY ─────────────────────────────────────────────
const DECORATORS = {
    drs:         { cls: DRSUpgrade,       name: 'DRS System',          icon: '', desc: '+15 km/h top speed',        color: '#ef4444' },
    hybrid:      { cls: HybridBoost,      name: 'Hybrid Boost',        icon: '',  desc: '+50 HP, +12 kg',            color: '#eab308' },
    lightweight: { cls: LightweightChassis,name: 'Lightweight Chassis', icon: '',  desc: '-30 kg weight',             color: '#22d3ee' },
    aero:        { cls: AeroPackage,       name: 'Aero Package',        icon: '',  desc: '+8 km/h downforce-tuned',   color: '#6366f1' },
    slick:       { cls: SlickTyres,        name: 'Slick Tyres',         icon: '',  desc: '+5 km/h grip',              color: '#f59e0b' },
    kers:        { cls: KERSRecovery,      name: 'KERS Recovery',       icon: '',  desc: '+30 HP, +8 kg',             color: '#22c55e' },
};

const CAR_CLASSES = {
    ferrari:  { cls: FerrariSF23,  name: 'Ferrari SF-23',  color: '#e10600' },
    redbull:  { cls: RedBullRB19,  name: 'Red Bull RB19',  color: '#1e3a8a' },
    mclaren:  { cls: McLarenMCL60, name: 'McLaren MCL60',  color: '#ff8000' },
    mercedes: { cls: MercedesW11,  name: 'Mercedes W11',   color: '#00d2be' },
};


// ─── DEMO CONTROLLER ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    let selectedCarKey = 'ferrari';
    let activeDecorators = []; // ordered list of decorator keys

    // ── DOM refs ──
    const carSelect     = document.getElementById('carSelect');
    const upgradePanel  = document.getElementById('upgradePanel');
    const specDisplay   = document.getElementById('specDisplay');
    const upgradeChain  = document.getElementById('upgradeChain');
    const codePreview   = document.getElementById('codePreview');
    const resetBtn      = document.getElementById('resetUpgrades');
    const randomBtn     = document.getElementById('randomBuild');

    // Build the current decorated car from scratch
    function buildCar() {
        let car = new CAR_CLASSES[selectedCarKey].cls();
        activeDecorators.forEach(key => {
            car = new DECORATORS[key].cls(car);
        });
        return car;
    }

    // ── Car Selection ──
    if (carSelect) {
        carSelect.querySelectorAll('[data-car]').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedCarKey = btn.getAttribute('data-car');
                carSelect.querySelectorAll('[data-car]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeDecorators = [];
                syncUpgradeButtons();
                render();
            });
        });
    }

    // ── Upgrade Toggles ──
    if (upgradePanel) {
        upgradePanel.querySelectorAll('[data-upgrade]').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-upgrade');
                const idx = activeDecorators.indexOf(key);
                if (idx > -1) {
                    activeDecorators.splice(idx, 1);
                } else {
                    activeDecorators.push(key);
                }
                syncUpgradeButtons();
                render();
            });
        });
    }

    function syncUpgradeButtons() {
        if (!upgradePanel) return;
        upgradePanel.querySelectorAll('[data-upgrade]').forEach(btn => {
            const key = btn.getAttribute('data-upgrade');
            btn.classList.toggle('active', activeDecorators.includes(key));
        });
    }

    // Reset
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            activeDecorators = [];
            syncUpgradeButtons();
            render();
        });
    }

    // Random build
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            const keys = Object.keys(DECORATORS);
            const count = Math.floor(Math.random() * keys.length) + 1;
            const shuffled = keys.sort(() => Math.random() - 0.5);
            activeDecorators = shuffled.slice(0, count);
            syncUpgradeButtons();
            render();
        });
    }

    // ── Render Everything ──
    function render() {
        const car = buildCar();
        renderSpecs(car);
        renderChain(car);
        renderCodePreview();
    }

    function renderSpecs(car) {
        if (!specDisplay) return;
        const baseCar = new CAR_CLASSES[selectedCarKey].cls();
        const carColor = CAR_CLASSES[selectedCarKey].color;

        const diff = (val, base) => {
            const d = val - base;
            if (d === 0) return '';
            return d > 0
                ? `<span class="spec-diff positive">+${d}</span>`
                : `<span class="spec-diff negative">${d}</span>`;
        };

        specDisplay.innerHTML = `
            <div class="spec-car-name" style="border-color:${carColor}">${car.getDescription()}</div>
            <div class="spec-grid">
                <div class="spec-item">
                    <div class="spec-icon"></div>
                    <div class="spec-value">${car.getTopSpeed()} <small>km/h</small> ${diff(car.getTopSpeed(), baseCar.getTopSpeed())}</div>
                    <div class="spec-label">Top Speed</div>
                    <div class="spec-bar"><div class="spec-bar-fill" style="width:${Math.min(car.getTopSpeed()/400*100,100)}%;background:${carColor}"></div></div>
                </div>
                <div class="spec-item">
                    <div class="spec-icon"></div>
                    <div class="spec-value">${car.getHorsepower()} <small>HP</small> ${diff(car.getHorsepower(), baseCar.getHorsepower())}</div>
                    <div class="spec-label">Horsepower</div>
                    <div class="spec-bar"><div class="spec-bar-fill" style="width:${Math.min(car.getHorsepower()/1200*100,100)}%;background:${carColor}"></div></div>
                </div>
                <div class="spec-item">
                    <div class="spec-icon"></div>
                    <div class="spec-value">${car.getWeight()} <small>kg</small> ${diff(car.getWeight(), baseCar.getWeight())}</div>
                    <div class="spec-label">Weight</div>
                    <div class="spec-bar"><div class="spec-bar-fill" style="width:${Math.min(car.getWeight()/900*100,100)}%;background:${carColor}"></div></div>
                </div>
                <div class="spec-item">
                    <div class="spec-icon"></div>
                    <div class="spec-value">$${(car.getPrice()/1000000).toFixed(1)}M ${diff(car.getPrice(), baseCar.getPrice()) ? `<span class="spec-diff positive">+$${((car.getPrice()-baseCar.getPrice())/1000000).toFixed(1)}M</span>` : ''}</div>
                    <div class="spec-label">Price</div>
                    <div class="spec-bar"><div class="spec-bar-fill" style="width:${Math.min(car.getPrice()/20000000*100,100)}%;background:${carColor}"></div></div>
                </div>
            </div>
            ${car.getUpgrades().length > 0 ? `
            <div class="spec-upgrades">
                <div class="spec-upgrades-title">Applied Upgrades:</div>
                <div class="spec-upgrade-tags">
                    ${car.getUpgrades().map(u => `<span class="upgrade-tag" style="border-color:${u.color}"><span>${u.icon}</span> ${u.name}</span>`).join('')}
                </div>
            </div>` : '<div class="spec-no-upgrades">No upgrades applied. Add decorators to enhance the car!</div>'}
        `;
    }

    function renderChain(car) {
        if (!upgradeChain) return;
        if (activeDecorators.length === 0) {
            upgradeChain.innerHTML = `
                <div class="chain-empty">
                    <div class="chain-empty-icon"></div>
                    <p>Select upgrades to visualize the decorator chain</p>
                </div>`;
            return;
        }

        const baseName = CAR_CLASSES[selectedCarKey].name;
        let chainHTML = `<div class="chain-node chain-base"><span class="chain-icon"></span> <strong>${baseName}</strong><div class="chain-sub">Base Component</div></div>`;

        activeDecorators.forEach((key, i) => {
            const d = DECORATORS[key];
            chainHTML += `<div class="chain-arrow">↓ wraps</div>`;
            chainHTML += `<div class="chain-node chain-decorator" style="border-color:${d.color}"><span class="chain-icon">${d.icon}</span> <strong>${d.name}</strong><div class="chain-sub">${d.desc}</div></div>`;
        });

        chainHTML += `<div class="chain-arrow">↓ final result</div>`;
        chainHTML += `<div class="chain-node chain-result"><span class="chain-icon"></span> <strong>Decorated Car</strong><div class="chain-sub">${activeDecorators.length} decorator(s) applied</div></div>`;

        upgradeChain.innerHTML = chainHTML;
    }

    function renderCodePreview() {
        if (!codePreview) return;
        const baseCls = CAR_CLASSES[selectedCarKey].cls.name;
        let code = `<span class="cm">// Build the decorated car</span>\n`;
        code += `<span class="kw">let</span> car = <span class="kw">new</span> <span class="fn">${baseCls}</span>();\n`;

        activeDecorators.forEach(key => {
            const cls = DECORATORS[key].cls.name;
            code += `car = <span class="kw">new</span> <span class="fn">${cls}</span>(car);\n`;
        });

        code += `\n<span class="cm">// Each decorator wraps the previous object</span>\n`;
        code += `car.<span class="fn">getTopSpeed</span>();    <span class="cm">// → ${buildCar().getTopSpeed()} km/h</span>\n`;
        code += `car.<span class="fn">getHorsepower</span>();  <span class="cm">// → ${buildCar().getHorsepower()} HP</span>\n`;
        code += `car.<span class="fn">getWeight</span>();      <span class="cm">// → ${buildCar().getWeight()} kg</span>\n`;
        code += `car.<span class="fn">getPrice</span>();       <span class="cm">// → $${(buildCar().getPrice()/1000000).toFixed(1)}M</span>`;

        codePreview.innerHTML = code;
    }

    // Initial render
    render();
});
