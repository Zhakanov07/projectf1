/* ===== RISK REGISTER & MATRIX — INTERACTIVE LOGIC ===== */
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- DATA ---------- */
    const risks = [
        {
            id: 'R-01',
            description: 'F1 car authentication failure — a listed vehicle may turn out to have non-original or counterfeit components, damaging credibility.',
            cause: 'Incomplete documentation from previous owners; rare components are difficult to verify without FIA lab access.',
            probability: 'Medium',
            impact: 'High',
            strategy: 'Mitigate',
            action: 'Implement a two-stage authentication protocol: initial visual & VIN inspection plus independent FIA-certified lab analysis before listing any car.'
        },
        {
            id: 'R-02',
            description: 'Website performance degradation under high traffic — catalog pages with 3D car viewers may crash during peak events (e.g., race weekends).',
            cause: 'Heavy 3D assets and real-time WebGL rendering combined with insufficient CDN capacity.',
            probability: 'High',
            impact: 'Medium',
            strategy: 'Mitigate',
            action: 'Use lazy-loading for 3D assets, deploy CDN edge caching, enable auto-scaling on the hosting platform, and set up uptime monitoring with automatic alerts.'
        },
        {
            id: 'R-03',
            description: 'Key team member departure — loss of the lead developer or chief appraiser mid-project could stall delivery.',
            cause: 'Competitive F1 industry job market; single points of knowledge with no documentation.',
            probability: 'Medium',
            impact: 'High',
            strategy: 'Mitigate',
            action: 'Maintain up-to-date technical documentation, cross-train team members, and keep at least one backup resource onboarded for critical roles.'
        },
        {
            id: 'R-04',
            description: 'Legal & compliance issues — selling vintage F1 cars across borders may violate import/export or heritage vehicle regulations.',
            cause: 'Varying international automotive laws; some countries classify F1 cars as cultural heritage items.',
            probability: 'Low',
            impact: 'High',
            strategy: 'Avoid',
            action: 'Engage a specialized automotive trade lawyer before opening sales to new regions; maintain a compliance checklist per country; refuse transactions where legal status is unclear.'
        },
        {
            id: 'R-05',
            description: 'Payment fraud or chargeback on high-value transactions — a single fraudulent order could represent millions in loss.',
            cause: 'High transaction values attract sophisticated fraud; online escrow can be spoofed.',
            probability: 'Low',
            impact: 'High',
            strategy: 'Transfer',
            action: 'Partner with a specialized escrow service for all transactions over $500K; require verified identity (KYC) and bank-grade wire transfers; insure each transaction.'
        },
        {
            id: 'R-06',
            description: 'Project schedule overrun — development of catalog, 3D viewer, and payment integration may exceed planned timeline.',
            cause: 'Scope creep from stakeholder requests; underestimated complexity of F1 car data integration.',
            probability: 'High',
            impact: 'Medium',
            strategy: 'Mitigate',
            action: 'Use agile sprints with fixed 2-week cycles; freeze scope after each sprint planning; maintain a product backlog for deferred features; weekly status reviews with stakeholders.'
        },
        {
            id: 'R-07',
            description: 'Third-party API downtime — dependency on external services (payment gateway, shipping tracker, FIA database) could disrupt operations.',
            cause: 'External provider outages or breaking API changes without notice.',
            probability: 'Medium',
            impact: 'Medium',
            strategy: 'Accept',
            action: 'Implement graceful degradation with cached fallback data; set up health-check monitoring for all third-party services; prepare a contingency manual workflow for order processing.'
        }
    ];

    /* ---------- HELPERS ---------- */
    const levelMap = { 'Low': 1, 'Medium': 2, 'High': 3 };

    function riskLevel(prob, impact) {
        const score = levelMap[prob] * levelMap[impact];
        if (score >= 6) return { label: 'Critical', cls: 'badge-critical' };
        if (score >= 4) return { label: 'High', cls: 'badge-high' };
        if (score >= 2) return { label: 'Medium', cls: 'badge-medium' };
        return { label: 'Low', cls: 'badge-low' };
    }

    function strategyCls(s) {
        return 'strategy-' + s.toLowerCase().split(' ')[0];
    }

    function strategyIcon(s) {
        return '';
    }

    /* ---------- RENDER REGISTER TABLE ---------- */
    const tbody = document.getElementById('riskTableBody');
    if (tbody) {
        risks.forEach(r => {
            const lvl = riskLevel(r.probability, r.impact);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><span class="risk-id">${r.id}</span></td>
                <td>${r.description}</td>
                <td>${r.cause}</td>
                <td><span class="badge badge-${r.probability.toLowerCase()}">${r.probability}</span></td>
                <td><span class="badge badge-${r.impact.toLowerCase()}">${r.impact}</span></td>
                <td><span class="badge ${lvl.cls}">${lvl.label}</span></td>
                <td><span class="strategy-tag ${strategyCls(r.strategy)}">${strategyIcon(r.strategy)} ${r.strategy}</span></td>
                <td>${r.action}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    /* ---------- RENDER RISK MATRIX ---------- */
    const matrixGrid = document.getElementById('riskMatrix');
    if (matrixGrid) {
        const levels = ['Low', 'Medium', 'High'];
        const zoneClass = (p, i) => {
            const s = levelMap[p] * levelMap[i];
            if (s >= 6) return 'zone-critical';
            if (s >= 4) return 'zone-high';
            if (s >= 2) return 'zone-medium';
            return 'zone-low';
        };

        // Build map: "prob-impact" -> [risks]
        const map = {};
        risks.forEach(r => {
            const key = r.probability + '-' + r.impact;
            if (!map[key]) map[key] = [];
            map[key].push(r);
        });

        // Corner cell
        const corner = document.createElement('div');
        corner.className = 'matrix-corner';
        corner.innerHTML = '<span class="axis-label-y">Probability</span><span class="axis-label-x">Impact &rarr;</span>';
        matrixGrid.appendChild(corner);

        // Header row (impact labels)
        levels.forEach(l => {
            const h = document.createElement('div');
            h.className = 'matrix-header';
            h.textContent = l;
            matrixGrid.appendChild(h);
        });

        // Data rows (probability from high to low)
        [...levels].reverse().forEach(prob => {
            // Row label
            const rl = document.createElement('div');
            rl.className = 'matrix-row-label';
            rl.textContent = prob;
            matrixGrid.appendChild(rl);

            levels.forEach(impact => {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell ' + zoneClass(prob, impact);
                const key = prob + '-' + impact;
                if (map[key]) {
                    map[key].forEach(r => {
                        const chip = document.createElement('span');
                        chip.className = 'matrix-risk-chip';
                        chip.textContent = r.id;
                        chip.title = r.description;
                        cell.appendChild(chip);
                    });
                }
                matrixGrid.appendChild(cell);
            });
        });
    }

    /* ---------- RENDER OVERVIEW STATS ---------- */
    const statsWrap = document.getElementById('overviewStats');
    if (statsWrap) {
        const total = risks.length;
        let counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
        risks.forEach(r => {
            const lvl = riskLevel(r.probability, r.impact);
            counts[lvl.label]++;
        });

        const statData = [
            { val: total, lbl: 'Total Risks', color: 'color-blue' },
            { val: counts.Critical, lbl: 'Critical', color: 'color-red' },
            { val: counts.High, lbl: 'High', color: 'color-yellow' },
            { val: counts.Medium, lbl: 'Medium', color: 'color-purple' },
            { val: counts.Low, lbl: 'Low', color: 'color-green' }
        ];
        statData.forEach(s => {
            const div = document.createElement('div');
            div.className = 'overview-stat';
            div.innerHTML = `<span class="stat-val ${s.color}">${s.val}</span><span class="stat-lbl">${s.lbl}</span>`;
            statsWrap.appendChild(div);
        });
    }
});
