/* ===== RISK REGISTER & MATRIX — INTERACTIVE LOGIC ===== */
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- DATA ---------- */
    const probLevels  = ['Almost Certain', 'Likely', 'Possible', 'Unlikely', 'Rare'];
    const impactLevels = ['Negligible', 'Marginal', 'Moderate', 'Critical', 'Catastrophic'];
    const probVal  = { 'Almost Certain': 5, 'Likely': 4, 'Possible': 3, 'Unlikely': 2, 'Rare': 1 };
    const impactVal = { 'Negligible': 1, 'Marginal': 2, 'Moderate': 3, 'Critical': 4, 'Catastrophic': 5 };

    const risks = [
        {
            id: 'R-01',
            description: 'F1 car authentication failure — a listed vehicle may have non-original or counterfeit components, damaging credibility.',
            cause: 'Incomplete documentation from previous owners; rare components are difficult to verify without FIA lab access.',
            probability: 'Possible',
            impact: 'Critical',
            strategy: 'Mitigate',
            action: 'Implement a two-stage authentication protocol: initial visual & VIN inspection plus independent FIA-certified lab analysis before listing any car.'
        },
        {
            id: 'R-02',
            description: 'Website performance degradation under high traffic — catalog pages with 3D car viewers may crash during peak events.',
            cause: 'Heavy 3D assets and real-time WebGL rendering combined with insufficient CDN capacity.',
            probability: 'Likely',
            impact: 'Moderate',
            strategy: 'Mitigate',
            action: 'Use lazy-loading for 3D assets, deploy CDN edge caching, enable auto-scaling on the hosting platform, and set up uptime monitoring.'
        },
        {
            id: 'R-03',
            description: 'Key team member departure — loss of the lead developer or chief appraiser mid-project could stall delivery.',
            cause: 'Competitive F1 industry job market; single points of knowledge with no documentation.',
            probability: 'Possible',
            impact: 'Critical',
            strategy: 'Mitigate',
            action: 'Maintain up-to-date technical documentation, cross-train team members, and keep at least one backup resource onboarded for critical roles.'
        },
        {
            id: 'R-04',
            description: 'Legal & compliance issues — selling vintage F1 cars across borders may violate import/export or heritage vehicle regulations.',
            cause: 'Varying international automotive laws; some countries classify F1 cars as cultural heritage items.',
            probability: 'Unlikely',
            impact: 'Catastrophic',
            strategy: 'Avoid',
            action: 'Engage a specialized automotive trade lawyer before opening sales to new regions; maintain a compliance checklist per country.'
        },
        {
            id: 'R-05',
            description: 'Payment fraud or chargeback on high-value transactions — a single fraudulent order could represent millions in loss.',
            cause: 'High transaction values attract sophisticated fraud; online escrow can be spoofed.',
            probability: 'Unlikely',
            impact: 'Catastrophic',
            strategy: 'Transfer',
            action: 'Partner with a specialized escrow service for transactions over $500K; require verified identity (KYC) and bank-grade wire transfers; insure each transaction.'
        },
        {
            id: 'R-06',
            description: 'Project schedule overrun — development of catalog, 3D viewer, and payment integration may exceed planned timeline.',
            cause: 'Scope creep from stakeholder requests; underestimated complexity of F1 car data integration.',
            probability: 'Almost Certain',
            impact: 'Moderate',
            strategy: 'Mitigate',
            action: 'Use agile sprints with fixed 2-week cycles; freeze scope after each sprint planning; weekly status reviews with stakeholders.'
        },
        {
            id: 'R-07',
            description: 'Third-party API downtime — dependency on external services (payment gateway, shipping tracker, FIA database) could disrupt operations.',
            cause: 'External provider outages or breaking API changes without notice.',
            probability: 'Possible',
            impact: 'Moderate',
            strategy: 'Accept',
            action: 'Implement graceful degradation with cached fallback data; set up health-check monitoring for all third-party services.'
        }
    ];

    /* ---------- HELPERS ---------- */
    function riskScore(prob, impact) {
        return probVal[prob] * impactVal[impact];
    }

    function riskLevel(prob, impact) {
        var s = riskScore(prob, impact);
        if (s >= 15) return { label: 'Extreme',  cls: 'badge-extreme' };
        if (s >= 10) return { label: 'High',     cls: 'badge-high' };
        if (s >= 5)  return { label: 'Moderate', cls: 'badge-medium' };
        if (s >= 3)  return { label: 'Low',      cls: 'badge-low' };
        return              { label: 'Minimum',  cls: 'badge-minimum' };
    }

    function cellZone(score) {
        if (score >= 15) return 'zone-extreme';
        if (score >= 10) return 'zone-high';
        if (score >= 5)  return 'zone-moderate';
        if (score >= 3)  return 'zone-low';
        return 'zone-minimum';
    }

    function cellLabel(score) {
        if (score >= 15) return 'Extreme Risk';
        if (score >= 10) return 'High Risk';
        if (score >= 5)  return 'Moderate Risk';
        if (score >= 3)  return 'Low Risk';
        return 'Minimum Risk';
    }

    function strategyCls(s) {
        return 'strategy-' + s.toLowerCase().split(' ')[0];
    }

    /* ---------- RENDER REGISTER TABLE ---------- */
    var regBody = document.getElementById('riskTableBody');
    if (regBody) {
        risks.forEach(function(r) {
            var lvl = riskLevel(r.probability, r.impact);
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td><span class="risk-id">' + r.id + '</span></td>' +
                '<td>' + r.description + '</td>' +
                '<td>' + r.cause + '</td>' +
                '<td><span class="badge badge-prob">' + r.probability + '</span></td>' +
                '<td><span class="badge badge-imp">' + r.impact + '</span></td>' +
                '<td><span class="badge ' + lvl.cls + '">' + lvl.label + '</span></td>' +
                '<td><span class="strategy-tag ' + strategyCls(r.strategy) + '">' + r.strategy + '</span></td>' +
                '<td>' + r.action + '</td>';
            regBody.appendChild(tr);
        });
    }

    /* ---------- RENDER 5x5 RISK MATRIX ---------- */
    var matrixTable = document.getElementById('riskMatrix');
    if (matrixTable) {
        var map = {};
        risks.forEach(function(r) {
            var key = r.probability + '-' + r.impact;
            if (!map[key]) map[key] = [];
            map[key].push(r);
        });

        var html = '';
        html += '<colgroup><col style="width:36px"><col style="width:105px">';
        for (var i = 0; i < 5; i++) html += '<col>';
        html += '</colgroup>';

        /* Thead */
        html += '<thead>';
        html += '<tr><th colspan="7" class="matrix-title">Risk Probability &amp; Impact Matrix</th></tr>';
        html += '<tr><td></td><td></td><td colspan="5" class="matrix-impact-header">Impact</td></tr>';
        html += '<tr><td></td><td class="matrix-corner-label">Risk Management<br>Matrix</td>';
        impactLevels.forEach(function(l) { html += '<th class="matrix-col-header">' + l + '</th>'; });
        html += '</tr></thead>';

        /* Tbody */
        html += '<tbody>';
        probLevels.forEach(function(prob, pIdx) {
            html += '<tr>';
            if (pIdx === 0) {
                html += '<td class="matrix-axis-cell" rowspan="5"><span class="axis-y-label">Probability</span></td>';
            }
            html += '<th class="matrix-row-header">' + prob + '</th>';
            impactLevels.forEach(function(impact) {
                var score = probVal[prob] * impactVal[impact];
                var zone = cellZone(score);
                var label = cellLabel(score);
                var key = prob + '-' + impact;
                var chips = '';
                if (map[key]) {
                    chips = map[key].map(function(r) {
                        return '<span class="matrix-risk-chip" title="' + r.description.replace(/"/g, '&quot;') + '">' + r.id + '</span>';
                    }).join(' ');
                }
                html += '<td class="matrix-cell ' + zone + '">';
                html += '<span class="cell-level-label">' + label + '</span>';
                if (chips) html += '<div class="cell-chips">' + chips + '</div>';
                html += '</td>';
            });
            html += '</tr>';
        });
        html += '</tbody>';
        matrixTable.innerHTML = html;
    }

    /* ---------- RENDER OVERVIEW STATS ---------- */
    var statsWrap = document.getElementById('overviewStats');
    if (statsWrap) {
        var total = risks.length;
        var counts = { Extreme: 0, High: 0, Moderate: 0, Low: 0, Minimum: 0 };
        risks.forEach(function(r) {
            var lvl = riskLevel(r.probability, r.impact);
            counts[lvl.label] = (counts[lvl.label] || 0) + 1;
        });
        [
            { val: total, lbl: 'Total Risks', color: 'color-blue' },
            { val: counts.Extreme, lbl: 'Extreme', color: 'color-red' },
            { val: counts.High, lbl: 'High', color: 'color-orange' },
            { val: counts.Moderate, lbl: 'Moderate', color: 'color-yellow' },
            { val: counts.Low, lbl: 'Low', color: 'color-green' }
        ].forEach(function(s) {
            var div = document.createElement('div');
            div.className = 'overview-stat';
            div.innerHTML = '<span class="stat-val ' + s.color + '">' + s.val + '</span><span class="stat-lbl">' + s.lbl + '</span>';
            statsWrap.appendChild(div);
        });
    }
});
