/* ===== SOLID PRINCIPLES — INTERACTIVE LOGIC ===== */
document.addEventListener('DOMContentLoaded', () => {

    /* ───── DATA ───── */
    const principles = [
        {
            letter: 'S',
            name: 'Single Responsibility',
            fullName: 'Single Responsibility Principle (SRP)',
            color: '#ff4444',
            color2: '#ff8866',
            emoji: '🎯',
            definition: 'A class should have only one reason to change. Each module or class should be responsible for a single part of the functionality.',
            f1Analogy: 'In an F1 team, the aerodynamicist focuses solely on downforce and drag — they don\'t design the engine or manage pit stops. Each specialist has one job, and that separation is what makes a 1000-person team deliver a car in record time.',
            codeGood: `<span class="hl-cm">// ✅ Good: Each class has one job</span>
<span class="hl-kw">class</span> <span class="hl-cls">CarEngine</span> {
  <span class="hl-fn">start</span>() { <span class="hl-cm">/* engine logic */</span> }
  <span class="hl-fn">stop</span>()  { <span class="hl-cm">/* engine logic */</span> }
}

<span class="hl-kw">class</span> <span class="hl-cls">TelemetryLogger</span> {
  <span class="hl-fn">log</span>(data) { <span class="hl-cm">/* logging only */</span> }
}

<span class="hl-kw">class</span> <span class="hl-cls">FuelManager</span> {
  <span class="hl-fn">calculateFuel</span>(laps) { <span class="hl-cm">/* fuel only */</span> }
}`,
            codeBad: `<span class="hl-cm">// ❌ Bad: One class does everything</span>
<span class="hl-kw">class</span> <span class="hl-cls">F1Car</span> {
  <span class="hl-fn">startEngine</span>()   { <span class="hl-cm">/* engine */</span> }
  <span class="hl-fn">logTelemetry</span>()  { <span class="hl-cm">/* logging */</span> }
  <span class="hl-fn">calculateFuel</span>() { <span class="hl-cm">/* fuel */</span> }
  <span class="hl-fn">renderUI</span>()      { <span class="hl-cm">/* display */</span> }
  <span class="hl-fn">saveToDatabase</span>(){ <span class="hl-cm">/* storage */</span> }
}`,
            violation: 'When one class handles engine control, telemetry, fuel management, and UI rendering, changing the logging format could accidentally break the engine start sequence. Each change becomes risky because responsibilities are tangled.'
        },
        {
            letter: 'O',
            name: 'Open/Closed',
            fullName: 'Open/Closed Principle (OCP)',
            color: '#ff8833',
            color2: '#ffaa55',
            emoji: '🔓',
            definition: 'Software entities should be open for extension but closed for modification. You should be able to add new behavior without changing existing code.',
            f1Analogy: 'The F1 car\'s aerodynamic package can be extended with new wing configurations, DRS systems, or ground effect floors — without redesigning the entire chassis. The monocoque is "closed" for modification but "open" for new aero attachments.',
            codeGood: `<span class="hl-cm">// ✅ Good: Extend via new classes</span>
<span class="hl-kw">class</span> <span class="hl-cls">TireStrategy</span> {
  <span class="hl-fn">recommend</span>(weather) { <span class="hl-kw">throw</span> <span class="hl-str">'override me'</span>; }
}

<span class="hl-kw">class</span> <span class="hl-cls">DryStrategy</span> <span class="hl-kw">extends</span> <span class="hl-cls">TireStrategy</span> {
  <span class="hl-fn">recommend</span>() { <span class="hl-kw">return</span> <span class="hl-str">'Medium compound'</span>; }
}

<span class="hl-kw">class</span> <span class="hl-cls">WetStrategy</span> <span class="hl-kw">extends</span> <span class="hl-cls">TireStrategy</span> {
  <span class="hl-fn">recommend</span>() { <span class="hl-kw">return</span> <span class="hl-str">'Full wet compound'</span>; }
}
<span class="hl-cm">// Adding RainStrategy? Just create a new class!</span>`,
            codeBad: `<span class="hl-cm">// ❌ Bad: Modifying existing code for every new case</span>
<span class="hl-kw">class</span> <span class="hl-cls">TireSelector</span> {
  <span class="hl-fn">recommend</span>(weather) {
    <span class="hl-kw">if</span> (weather === <span class="hl-str">'dry'</span>) <span class="hl-kw">return</span> <span class="hl-str">'Medium'</span>;
    <span class="hl-kw">if</span> (weather === <span class="hl-str">'wet'</span>) <span class="hl-kw">return</span> <span class="hl-str">'Full wet'</span>;
    <span class="hl-kw">if</span> (weather === <span class="hl-str">'damp'</span>) <span class="hl-kw">return</span> <span class="hl-str">'Inter'</span>;
    <span class="hl-cm">// Must edit THIS file for every new type!</span>
  }
}`,
            violation: 'Every time a new weather condition appears, you must modify the existing TireSelector class, risking bugs in already-tested code. Instead, extend the system with new subclasses.'
        },
        {
            letter: 'L',
            name: 'Liskov Substitution',
            fullName: 'Liskov Substitution Principle (LSP)',
            color: '#e6c200',
            color2: '#ffe066',
            emoji: '🔄',
            definition: 'Subtypes must be substitutable for their base types without altering the correctness of the program.',
            f1Analogy: 'Any FIA-legal F1 car must fit the same standard refueling rig, tire guns, and safety equipment, regardless of the team. A Red Bull and a Ferrari must both "plug in" to the standard pit infrastructure — they\'re substitutable at the interface level.',
            codeGood: `<span class="hl-cm">// ✅ Good: All drivers fit the same interface</span>
<span class="hl-kw">class</span> <span class="hl-cls">Driver</span> {
  <span class="hl-fn">drive</span>(car)  { car.<span class="hl-fn">accelerate</span>(); }
  <span class="hl-fn">pit</span>(car)    { car.<span class="hl-fn">enterPitLane</span>(); }
}

<span class="hl-kw">class</span> <span class="hl-cls">ReserveDriver</span> <span class="hl-kw">extends</span> <span class="hl-cls">Driver</span> {
  <span class="hl-fn">drive</span>(car)  { car.<span class="hl-fn">accelerate</span>(); }
  <span class="hl-fn">pit</span>(car)    { car.<span class="hl-fn">enterPitLane</span>(); }
}
<span class="hl-cm">// ReserveDriver can replace Driver seamlessly</span>`,
            codeBad: `<span class="hl-cm">// ❌ Bad: Subclass breaks parent behavior</span>
<span class="hl-kw">class</span> <span class="hl-cls">Bird</span> {
  <span class="hl-fn">fly</span>() { <span class="hl-cm">/* flies */</span> }
}

<span class="hl-kw">class</span> <span class="hl-cls">Penguin</span> <span class="hl-kw">extends</span> <span class="hl-cls">Bird</span> {
  <span class="hl-fn">fly</span>() { <span class="hl-kw">throw</span> <span class="hl-str">'I can\\'t fly!'</span>; }
  <span class="hl-cm">// Violates LSP — can't substitute for Bird</span>
}`,
            violation: 'If a subclass throws errors or behaves unexpectedly when used in place of the superclass, every piece of code using the parent type must add special checks. This defeats the purpose of inheritance and polymorphism.'
        },
        {
            letter: 'I',
            name: 'Interface Segregation',
            fullName: 'Interface Segregation Principle (ISP)',
            color: '#44cc44',
            color2: '#66ee88',
            emoji: '✂️',
            definition: 'Clients should not be forced to depend on interfaces they do not use. Prefer many small, specific interfaces over one large general-purpose one.',
            f1Analogy: 'The F1 steering wheel has separate interfaces: radio button, DRS toggle, brake bias dial, drink button. Each controls one thing. Imagine if ALL controls were on a single giant multifunction knob — one mistake and you\'d radio the team while deploying DRS!',
            codeGood: `<span class="hl-cm">// ✅ Good: Small focused interfaces</span>
<span class="hl-kw">class</span> <span class="hl-cls">Steerable</span> {
  <span class="hl-fn">steer</span>(angle) { <span class="hl-cm">/* ... */</span> }
}

<span class="hl-kw">class</span> <span class="hl-cls">Brakeable</span> {
  <span class="hl-fn">brake</span>(force) { <span class="hl-cm">/* ... */</span> }
}

<span class="hl-kw">class</span> <span class="hl-cls">DRSActivatable</span> {
  <span class="hl-fn">activateDRS</span>() { <span class="hl-cm">/* ... */</span> }
}
<span class="hl-cm">// Cars implement only what they need</span>`,
            codeBad: `<span class="hl-cm">// ❌ Bad: One fat interface forces unused methods</span>
<span class="hl-kw">class</span> <span class="hl-cls">IVehicle</span> {
  <span class="hl-fn">steer</span>()       { }
  <span class="hl-fn">brake</span>()       { }
  <span class="hl-fn">activateDRS</span>() { }
  <span class="hl-fn">openDoor</span>()    { }  <span class="hl-cm">// F1 cars don't have doors!</span>
  <span class="hl-fn">foldMirrors</span>() { }  <span class="hl-cm">// Not applicable!</span>
}`,
            violation: 'F1 cars forced to implement openDoor() and foldMirrors() from a generic Vehicle interface either provide empty stubs or throw errors — bloating the codebase with irrelevant methods and creating misleading APIs.'
        },
        {
            letter: 'D',
            name: 'Dependency Inversion',
            fullName: 'Dependency Inversion Principle (DIP)',
            color: '#4e9af5',
            color2: '#7ec4ff',
            emoji: '⬆️',
            definition: 'High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details.',
            f1Analogy: 'The F1 race strategist (high-level) doesn\'t directly read raw sensor voltage (low-level). Instead, both depend on the telemetry abstraction layer — a standardized data feed. If the sensor hardware changes, the strategist\'s code stays the same.',
            codeGood: `<span class="hl-cm">// ✅ Good: Depend on abstractions</span>
<span class="hl-kw">class</span> <span class="hl-cls">DataSource</span> {
  <span class="hl-fn">getData</span>() { <span class="hl-kw">throw</span> <span class="hl-str">'implement me'</span>; }
}

<span class="hl-kw">class</span> <span class="hl-cls">SensorFeed</span> <span class="hl-kw">extends</span> <span class="hl-cls">DataSource</span> {
  <span class="hl-fn">getData</span>() { <span class="hl-kw">return</span> <span class="hl-cm">/* live sensor data */</span>; }
}

<span class="hl-kw">class</span> <span class="hl-cls">RaceStrategist</span> {
  <span class="hl-kw">constructor</span>(dataSource) {
    <span class="hl-kw">this</span>.src = dataSource; <span class="hl-cm">// abstraction!</span>
  }
  <span class="hl-fn">plan</span>() { <span class="hl-kw">return this</span>.src.<span class="hl-fn">getData</span>(); }
}`,
            codeBad: `<span class="hl-cm">// ❌ Bad: High-level depends on low-level</span>
<span class="hl-kw">class</span> <span class="hl-cls">RaceStrategist</span> {
  <span class="hl-fn">plan</span>() {
    <span class="hl-kw">const</span> sensor = <span class="hl-kw">new</span> <span class="hl-cls">VoltageSensorV2</span>();
    <span class="hl-kw">const</span> data = sensor.<span class="hl-fn">readRawVoltage</span>();
    <span class="hl-cm">// Tightly coupled! Changing sensor = rewrite.</span>
  }
}`,
            violation: 'When the high-level RaceStrategist directly instantiates VoltageSensorV2, switching to a newer sensor model forces rewriting the strategist code. The abstraction layer eliminates this coupling.'
        }
    ];

    const benefits = [
        { icon: '🧩', title: 'Maintainability', desc: 'Changes in one module don\'t ripple-effect through the entire system. Fix bugs without fear of breaking unrelated features.' },
        { icon: '🔌', title: 'Extensibility', desc: 'Add new features by writing new code, not modifying existing tested code. The system grows without increasing fragility.' },
        { icon: '🧪', title: 'Testability', desc: 'Small, focused classes with clear interfaces are easy to unit test in isolation using mocks and stubs.' },
        { icon: '🤝', title: 'Team Collaboration', desc: 'Clear module boundaries let team members work on different parts simultaneously without merge conflicts.' },
        { icon: '♻️', title: 'Reusability', desc: 'Well-designed components can be reused across projects. A clean TireStrategy can work in a simulator and the live app.' },
        { icon: '📈', title: 'Scalability', desc: 'SOLID architectures handle growing complexity gracefully. Adding the 20th car model is as easy as adding the 2nd.' }
    ];

    /* ───── HERO PARTICLES ───── */
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('span');
            particle.classList.add('hero-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = (100 + Math.random() * 20) + '%';
            particle.style.animationDuration = (6 + Math.random() * 10) + 's';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
            particlesContainer.appendChild(particle);
        }
    }

    /* ───── HERO LETTER COLORS ───── */
    document.querySelectorAll('.hero-letter').forEach(el => {
        el.style.setProperty('--letter-color', el.dataset.color);
    });

    /* ───── BENTO GRID ───── */
    const bentoGrid = document.getElementById('bentoGrid');
    if (bentoGrid) {
        bentoGrid.innerHTML = principles.map((p, i) => {
            const wide = i === 0 ? ' bento-wide' : '';
            return `<div class="bento-card${wide} animate-on-scroll" style="--card-accent:${p.color};--card-accent2:${p.color2};--card-glow:${p.color}33;">
                <div class="card-glow" style="background:radial-gradient(circle at 50% 0%, ${p.color}15, transparent 60%);"></div>
                <div class="card-icon">${p.emoji}</div>
                <div class="card-letter">${p.letter}</div>
                <div class="card-title">${p.name}</div>
                <div class="card-desc">${p.definition}</div>
            </div>`;
        }).join('');
    }

    /* ───── PRINCIPLE TABS ───── */
    const tabsEl = document.getElementById('principleTabs');
    const detailEl = document.getElementById('principleDetail');
    let activeIdx = 0;

    function renderTabs() {
        if (!tabsEl) return;
        tabsEl.innerHTML = principles.map((p, i) => {
            const active = i === activeIdx ? ' active' : '';
            return `<button class="ptab-btn${active}" data-idx="${i}"
                style="--tab-bg:${p.color}18;--tab-color:${p.color};--tab-glow:${p.color}33;">
                <span class="ptab-letter" style="color:${p.color}">${p.letter}</span>
                ${p.name}
            </button>`;
        }).join('');

        tabsEl.querySelectorAll('.ptab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeIdx = parseInt(btn.dataset.idx);
                renderTabs();
                renderDetail();
            });
        });
    }

    function renderDetail() {
        if (!detailEl) return;
        const p = principles[activeIdx];
        detailEl.innerHTML = `
            <div class="pd-header">
                <div class="pd-letter-big" style="color:${p.color}">${p.letter}</div>
                <div class="pd-header-text">
                    <div class="pd-full-name">${p.fullName}</div>
                    <h3>${p.name} Principle</h3>
                    <div class="pd-definition">${p.definition}</div>
                </div>
            </div>
            <div class="pd-body">
                <div class="pd-section">
                    <h4 style="color:${p.color}"><span class="pd-icon">🏎️</span> F1 Analogy</h4>
                    <div class="f1-analogy">
                        <div class="f1-tag">Formula 1</div>
                        <p>${p.f1Analogy}</p>
                    </div>
                </div>
                <div class="pd-section">
                    <h4 style="color:#44cc44"><span class="pd-icon">✅</span> Correct Implementation</h4>
                    <div class="code-block">
                        <span class="code-label">JavaScript</span>
                        <pre>${p.codeGood}</pre>
                    </div>
                </div>
                <div class="pd-section">
                    <h4 style="color:#ff4444"><span class="pd-icon">⚠️</span> Violation Example</h4>
                    <div class="violation-card">
                        <div class="viol-tag">Anti-pattern</div>
                        <p>${p.violation}</p>
                    </div>
                </div>
                <div class="pd-section">
                    <h4 style="color:#ff8833"><span class="pd-icon">❌</span> Bad Code</h4>
                    <div class="code-block">
                        <span class="code-label">JavaScript</span>
                        <pre>${p.codeBad}</pre>
                    </div>
                </div>
            </div>
        `;
        detailEl.style.animation = 'none';
        detailEl.offsetHeight; // trigger reflow
        detailEl.style.animation = 'detailSlideIn 0.4s ease';
    }

    renderTabs();
    renderDetail();

    /* ───── LIVE DEMO ───── */
    const demoContainer = document.getElementById('demoContainer');
    if (demoContainer) {
        let demoIdx = 0;

        function renderDemo() {
            const p = principles[demoIdx];
            demoContainer.innerHTML = `
                <div style="grid-column: 1 / -1;">
                    <div class="demo-tabs">
                        ${principles.map((pr, i) => `
                            <button class="demo-tab${i === demoIdx ? ' active' : ''}" data-idx="${i}">${pr.letter} — ${pr.name}</button>
                        `).join('')}
                    </div>
                </div>
                <div class="demo-panel">
                    <div class="demo-panel-header">
                        <span class="demo-dot" style="background:#ff4444"></span>
                        ❌ Before (Violation)
                    </div>
                    <div class="demo-panel-body">
                        <div class="demo-code">${p.codeBad}</div>
                    </div>
                </div>
                <div class="demo-panel">
                    <div class="demo-panel-header">
                        <span class="demo-dot" style="background:#44cc44"></span>
                        ✅ After (SOLID)
                    </div>
                    <div class="demo-panel-body">
                        <div class="demo-code">${p.codeGood}</div>
                    </div>
                </div>
            `;

            demoContainer.querySelectorAll('.demo-tab').forEach(btn => {
                btn.addEventListener('click', () => {
                    demoIdx = parseInt(btn.dataset.idx);
                    renderDemo();
                });
            });
        }

        renderDemo();
    }

    /* ───── BENEFITS ───── */
    const benefitsGrid = document.getElementById('benefitsGrid');
    if (benefitsGrid) {
        benefitsGrid.innerHTML = benefits.map(b => `
            <div class="benefit-card animate-on-scroll">
                <div class="benefit-icon">${b.icon}</div>
                <h3>${b.title}</h3>
                <p>${b.desc}</p>
            </div>
        `).join('');

        // Mouse tracking glow effect
        benefitsGrid.querySelectorAll('.benefit-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
                const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
                card.style.setProperty('--mouse-x', x + '%');
                card.style.setProperty('--mouse-y', y + '%');
            });
        });
    }

    /* ───── SCROLL ANIMATIONS ───── */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

});
