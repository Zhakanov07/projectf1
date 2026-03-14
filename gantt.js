/* ============================================
   Gantt Chart — Grand Prix Motors
   Interactive Gantt with WBS data
   ============================================ */

(function () {
    'use strict';

    // ===== PROJECT DATA (from WBS) =====
    const PROJECT_START = new Date(2026, 0, 5);   // Jan 5, 2026
    const PROJECT_END   = new Date(2026, 5, 15);  // Jun 15, 2026

    const phases = [
        {
            code: '1.1', name: 'Planning & Analysis', lead: 'Sara Williams',
            start: '2026-01-05', end: '2026-02-02', phase: 'planning',
            children: [
                { code: '1.1.1', name: 'Requirements', start: '2026-01-05', end: '2026-01-15', phase: 'planning', children: [
                    { code: '1.1.1.1', name: 'Stakeholder Interviews', person: 'Sara Williams', start: '2026-01-05', end: '2026-01-08', phase: 'planning' },
                    { code: '1.1.1.2', name: 'User Stories & Use Cases', person: 'Sara Williams', start: '2026-01-09', end: '2026-01-12', phase: 'planning' },
                    { code: '1.1.1.3', name: 'Requirements Document (SRS)', person: 'Sara Williams', start: '2026-01-13', end: '2026-01-15', phase: 'planning' },
                ]},
                { code: '1.1.2', name: 'Project Charter', start: '2026-01-16', end: '2026-01-24', phase: 'planning', children: [
                    { code: '1.1.2.1', name: 'Scope & Objectives', person: 'Marco Rossi', start: '2026-01-16', end: '2026-01-18', phase: 'planning' },
                    { code: '1.1.2.2', name: 'Risk Assessment', person: 'Sara Williams', start: '2026-01-19', end: '2026-01-21', phase: 'planning' },
                    { code: '1.1.2.3', name: 'Budget & Timeline', person: 'Marco Rossi', start: '2026-01-22', end: '2026-01-24', phase: 'planning' },
                ]},
                { code: '1.1.3', name: 'Technology Stack', start: '2026-01-25', end: '2026-02-02', phase: 'planning', children: [
                    { code: '1.1.3.1', name: 'Frontend Framework Selection', person: 'Hiroshi Nakamura', start: '2026-01-25', end: '2026-01-28', phase: 'planning' },
                    { code: '1.1.3.2', name: 'API & Data Sources Research', person: 'Hiroshi Nakamura', start: '2026-01-29', end: '2026-02-02', phase: 'planning' },
                ]},
            ]
        },
        {
            code: '1.2', name: 'UI/UX Design', lead: 'Luca Martini',
            start: '2026-02-03', end: '2026-03-02', phase: 'design',
            children: [
                { code: '1.2.1', name: 'Wireframes', start: '2026-02-03', end: '2026-02-12', phase: 'design', children: [
                    { code: '1.2.1.1', name: 'Homepage Wireframe', person: 'Luca Martini', start: '2026-02-03', end: '2026-02-05', phase: 'design' },
                    { code: '1.2.1.2', name: 'Catalog Page Wireframe', person: 'Luca Martini', start: '2026-02-06', end: '2026-02-08', phase: 'design' },
                    { code: '1.2.1.3', name: 'Sub-pages Wireframes', person: 'Luca Martini', start: '2026-02-09', end: '2026-02-12', phase: 'design' },
                ]},
                { code: '1.2.2', name: 'Visual Design', start: '2026-02-13', end: '2026-02-22', phase: 'design', children: [
                    { code: '1.2.2.1', name: 'Color Scheme & Typography', person: 'Luca Martini', start: '2026-02-13', end: '2026-02-15', phase: 'design' },
                    { code: '1.2.2.2', name: 'Logo & Branding Assets', person: 'Luca Martini', start: '2026-02-16', end: '2026-02-19', phase: 'design' },
                    { code: '1.2.2.3', name: 'High-fidelity Mockups', person: 'Luca Martini', start: '2026-02-20', end: '2026-02-22', phase: 'design' },
                ]},
                { code: '1.2.3', name: 'Responsive Design', start: '2026-02-23', end: '2026-03-02', phase: 'design', children: [
                    { code: '1.2.3.1', name: 'Mobile Layout Adaptation', person: 'Luca Martini', start: '2026-02-23', end: '2026-02-26', phase: 'design' },
                    { code: '1.2.3.2', name: 'Tablet & Desktop Breakpoints', person: 'Luca Martini', start: '2026-02-27', end: '2026-03-02', phase: 'design' },
                ]},
            ]
        },
        {
            code: '1.3', name: 'Development', lead: 'Hiroshi Nakamura',
            start: '2026-03-03', end: '2026-05-04', phase: 'development',
            children: [
                { code: '1.3.1', name: 'Frontend (HTML/CSS/JS)', start: '2026-03-03', end: '2026-04-06', phase: 'development', children: [
                    { code: '1.3.1.1', name: 'Homepage Development', person: 'Hiroshi Nakamura', start: '2026-03-03', end: '2026-03-10', phase: 'development' },
                    { code: '1.3.1.2', name: 'Catalog & Car Cards', person: 'Hiroshi Nakamura', start: '2026-03-11', end: '2026-03-20', phase: 'development' },
                    { code: '1.3.1.3', name: 'About & Strategy Pages', person: 'Anna Turner', start: '2026-03-21', end: '2026-03-28', phase: 'development' },
                    { code: '1.3.1.4', name: 'CSS Animations & Transitions', person: 'Hiroshi Nakamura', start: '2026-03-29', end: '2026-04-06', phase: 'development' },
                ]},
                { code: '1.3.2', name: 'Interactive Features', start: '2026-04-07', end: '2026-04-20', phase: 'development', children: [
                    { code: '1.3.2.1', name: 'Search Functionality', person: 'Hiroshi Nakamura', start: '2026-04-07', end: '2026-04-10', phase: 'development' },
                    { code: '1.3.2.2', name: 'Sort & Filter Catalog', person: 'Hiroshi Nakamura', start: '2026-04-11', end: '2026-04-14', phase: 'development' },
                    { code: '1.3.2.3', name: 'Wikipedia Photo API Integration', person: 'Anna Turner', start: '2026-04-15', end: '2026-04-20', phase: 'development' },
                ]},
                { code: '1.3.3', name: 'Content & Data', start: '2026-04-21', end: '2026-05-04', phase: 'development', children: [
                    { code: '1.3.3.1', name: 'F1 Car Database (10 cars)', person: 'Anna Turner', start: '2026-04-21', end: '2026-04-25', phase: 'development' },
                    { code: '1.3.3.2', name: 'Technical Specs & Descriptions', person: 'Anna Turner', start: '2026-04-26', end: '2026-04-30', phase: 'development' },
                    { code: '1.3.3.3', name: 'OOP & SOLID Code Examples', person: 'Hiroshi Nakamura', start: '2026-05-01', end: '2026-05-04', phase: 'development' },
                ]},
            ]
        },
        {
            code: '1.4', name: 'Testing & QA', lead: 'Anna Turner',
            start: '2026-05-05', end: '2026-05-25', phase: 'testing',
            children: [
                { code: '1.4.1', name: 'Functional Testing', start: '2026-05-05', end: '2026-05-12', phase: 'testing', children: [
                    { code: '1.4.1.1', name: 'Navigation & Links Test', person: 'Anna Turner', start: '2026-05-05', end: '2026-05-07', phase: 'testing' },
                    { code: '1.4.1.2', name: 'Search & Filter Validation', person: 'Anna Turner', start: '2026-05-08', end: '2026-05-10', phase: 'testing' },
                    { code: '1.4.1.3', name: 'API & Image Loading Test', person: 'Anna Turner', start: '2026-05-11', end: '2026-05-12', phase: 'testing' },
                ]},
                { code: '1.4.2', name: 'Cross-browser & Responsive', start: '2026-05-13', end: '2026-05-19', phase: 'testing', children: [
                    { code: '1.4.2.1', name: 'Chrome / Firefox / Safari', person: 'Anna Turner', start: '2026-05-13', end: '2026-05-15', phase: 'testing' },
                    { code: '1.4.2.2', name: 'Mobile & Tablet Responsive', person: 'Luca Martini', start: '2026-05-16', end: '2026-05-19', phase: 'testing' },
                ]},
                { code: '1.4.3', name: 'Performance & Accessibility', start: '2026-05-20', end: '2026-05-25', phase: 'testing', children: [
                    { code: '1.4.3.1', name: 'Lighthouse Audit', person: 'Hiroshi Nakamura', start: '2026-05-20', end: '2026-05-22', phase: 'testing' },
                    { code: '1.4.3.2', name: 'WCAG Accessibility Check', person: 'Anna Turner', start: '2026-05-23', end: '2026-05-25', phase: 'testing' },
                ]},
            ]
        },
        {
            code: '1.5', name: 'Deployment & Launch', lead: 'Hiroshi Nakamura',
            start: '2026-05-26', end: '2026-06-15', phase: 'deployment',
            children: [
                { code: '1.5.1', name: 'Hosting Setup', start: '2026-05-26', end: '2026-06-01', phase: 'deployment', children: [
                    { code: '1.5.1.1', name: 'Domain & SSL Configuration', person: 'Hiroshi Nakamura', start: '2026-05-26', end: '2026-05-28', phase: 'deployment' },
                    { code: '1.5.1.2', name: 'CDN & Caching Setup', person: 'Hiroshi Nakamura', start: '2026-05-29', end: '2026-06-01', phase: 'deployment' },
                ]},
                { code: '1.5.2', name: 'Go-Live & Monitoring', start: '2026-06-02', end: '2026-06-08', phase: 'deployment', children: [
                    { code: '1.5.2.1', name: 'Production Deployment', person: 'Hiroshi Nakamura', start: '2026-06-02', end: '2026-06-04', phase: 'deployment' },
                    { code: '1.5.2.2', name: 'Analytics & Error Monitoring', person: 'Anna Turner', start: '2026-06-05', end: '2026-06-08', phase: 'deployment' },
                ]},
                { code: '1.5.3', name: 'Documentation & Handoff', start: '2026-06-09', end: '2026-06-15', phase: 'deployment', children: [
                    { code: '1.5.3.1', name: 'Technical Documentation', person: 'Hiroshi Nakamura', start: '2026-06-09', end: '2026-06-12', phase: 'deployment' },
                    { code: '1.5.3.2', name: 'User Manual & Training', person: 'Sara Williams', start: '2026-06-13', end: '2026-06-15', phase: 'deployment' },
                ]},
            ]
        }
    ];

    // ===== STATE =====
    let dayWidth = 5;
    let zoomLevel = 100;
    let allExpanded = false;
    const expandedPhases = new Set();
    const expandedDeliverables = new Set();

    // ===== UTILITY =====
    function parseDate(str) {
        const [y, m, d] = str.split('-').map(Number);
        return new Date(y, m - 1, d);
    }

    function daysBetween(a, b) {
        return Math.round((b - a) / (1000 * 60 * 60 * 24));
    }

    function dayOffset(date) {
        return daysBetween(PROJECT_START, date);
    }

    function formatDateShort(str) {
        const d = parseDate(str);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months[d.getMonth()] + ' ' + d.getDate();
    }

    function totalDays() {
        return daysBetween(PROJECT_START, PROJECT_END) + 1;
    }

    // ===== GENERATE TIMELINE HEADER =====
    function buildTimelineHeader() {
        const timeline = document.getElementById('ganttTimeline');
        if (!timeline) return;
        timeline.innerHTML = '';

        const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let current = new Date(PROJECT_START);
        let lastMonth = -1;
        let monthDiv = null;
        let daysDiv = null;

        while (current <= PROJECT_END) {
            const m = current.getMonth();
            if (m !== lastMonth) {
                monthDiv = document.createElement('div');
                monthDiv.className = 'gantt-month';
                const label = document.createElement('div');
                label.className = 'gantt-month-label';
                label.textContent = monthNames[m] + ' ' + current.getFullYear();
                monthDiv.appendChild(label);
                daysDiv = document.createElement('div');
                daysDiv.className = 'gantt-days';
                monthDiv.appendChild(daysDiv);
                timeline.appendChild(monthDiv);
                lastMonth = m;
            }

            const dayEl = document.createElement('div');
            dayEl.className = 'gantt-day';
            const dow = current.getDay();
            if (dow === 0 || dow === 6) dayEl.classList.add('weekend');
            if (current.getTime() === today.getTime()) dayEl.classList.add('today');

            // Show day number every few days depending on zoom
            if (dayWidth >= 14) {
                dayEl.textContent = current.getDate();
            } else if (dayWidth >= 8) {
                dayEl.textContent = current.getDate() % 2 === 1 ? current.getDate() : '';
            } else if (dayWidth >= 5) {
                dayEl.textContent = current.getDate() % 5 === 1 ? current.getDate() : '';
            }

            dayEl.style.minWidth = dayWidth + 'px';
            dayEl.style.maxWidth = dayWidth + 'px';
            daysDiv.appendChild(dayEl);

            current.setDate(current.getDate() + 1);
        }
    }

    // ===== BUILD GRID CELLS FOR A ROW =====
    function buildGridCells() {
        const frag = document.createDocumentFragment();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let current = new Date(PROJECT_START);

        while (current <= PROJECT_END) {
            const cell = document.createElement('div');
            cell.className = 'gantt-grid-cell';
            cell.style.minWidth = dayWidth + 'px';
            cell.style.maxWidth = dayWidth + 'px';
            const dow = current.getDay();
            if (dow === 0 || dow === 6) cell.classList.add('weekend');
            if (current.getTime() === today.getTime()) cell.classList.add('today');
            frag.appendChild(cell);
            current.setDate(current.getDate() + 1);
        }
        return frag;
    }

    // ===== CREATE A BAR =====
    function createBar(task, isPhase, isSubtask) {
        const start = parseDate(task.start);
        const end = parseDate(task.end);
        const left = dayOffset(start) * dayWidth;
        const width = (daysBetween(start, end) + 1) * dayWidth;

        const bar = document.createElement('div');
        bar.className = 'gantt-bar bar-' + task.phase;
        if (isPhase) bar.classList.add('phase-bar');
        if (isSubtask) bar.classList.add('subtask-bar');
        bar.style.left = left + 'px';
        bar.style.width = Math.max(width, 4) + 'px';

        // Label on wider bars
        if (width > 60) {
            const text = document.createElement('span');
            text.className = 'gantt-bar-text';
            text.textContent = task.name;
            bar.appendChild(text);
        }

        // Tooltip interactions
        bar.addEventListener('mouseenter', (e) => showTooltip(e, task, isPhase));
        bar.addEventListener('mousemove', moveTooltip);
        bar.addEventListener('mouseleave', hideTooltip);

        return bar;
    }

    // ===== BUILD ROW =====
    function createRow(task, depth, isPhase, parentPhase) {
        const row = document.createElement('div');
        row.className = 'gantt-row';
        if (isPhase) row.classList.add('phase-row');
        if (depth > 0) {
            row.classList.add('subtask-row');
            row.dataset.parent = parentPhase;
            row.dataset.depth = depth;
        }

        // Label
        const label = document.createElement('div');
        label.className = 'gantt-row-label';

        // Indent
        if (depth > 0) {
            const indent = document.createElement('span');
            indent.className = 'task-indent';
            indent.style.width = (depth * 16) + 'px';
            label.appendChild(indent);
        }

        // Toggle button for items with children
        const hasChildren = task.children && task.children.length > 0;
        if (hasChildren) {
            const toggle = document.createElement('button');
            toggle.className = 'task-toggle';
            toggle.textContent = '▶';
            toggle.dataset.code = task.code;
            toggle.addEventListener('click', () => toggleChildren(task.code, toggle));
            label.appendChild(toggle);
        }

        const code = document.createElement('span');
        code.className = 'task-code';
        code.textContent = task.code;
        label.appendChild(code);

        const name = document.createElement('span');
        name.className = 'task-name';
        name.textContent = task.name;
        name.title = task.name;
        label.appendChild(name);

        row.appendChild(label);

        // Timeline area
        const timeline = document.createElement('div');
        timeline.className = 'gantt-row-timeline';

        // Grid
        const grid = document.createElement('div');
        grid.className = 'gantt-grid-lines';
        grid.appendChild(buildGridCells());
        timeline.appendChild(grid);

        // Bar
        timeline.appendChild(createBar(task, isPhase, depth > 1));
        row.appendChild(timeline);

        return row;
    }

    // ===== BUILD ALL ROWS =====
    function buildGanttBody() {
        const body = document.getElementById('ganttBody');
        if (!body) return;
        body.innerHTML = '';

        const filter = document.getElementById('phaseFilter').value;

        phases.forEach(phase => {
            if (filter !== 'all' && phase.phase !== filter) return;

            // Phase row
            body.appendChild(createRow(phase, 0, true, null));

            const phaseExpanded = expandedPhases.has(phase.code);

            if (phase.children) {
                phase.children.forEach(deliverable => {
                    const delRow = createRow(deliverable, 1, false, phase.code);
                    if (!phaseExpanded) delRow.classList.add('hidden');
                    delRow.dataset.parent = phase.code;
                    body.appendChild(delRow);

                    const delExpanded = expandedDeliverables.has(deliverable.code);

                    if (deliverable.children) {
                        deliverable.children.forEach(task => {
                            const taskRow = createRow(task, 2, false, deliverable.code);
                            if (!phaseExpanded || !delExpanded) taskRow.classList.add('hidden');
                            taskRow.dataset.parent = deliverable.code;
                            taskRow.dataset.grandparent = phase.code;
                            body.appendChild(taskRow);
                        });
                    }
                });
            }
        });

        // Add today line
        addTodayLine(body);

        // Update toggles visual state
        updateToggleStates();
    }

    // ===== TODAY LINE =====
    function addTodayLine(container) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (today < PROJECT_START || today > PROJECT_END) return;

        const offset = dayOffset(today);
        const left = 280 + offset * dayWidth; // 280 = label width

        const line = document.createElement('div');
        line.className = 'gantt-today-line';
        line.style.left = left + 'px';
        container.appendChild(line);
    }

    // ===== TOGGLE CHILDREN =====
    function toggleChildren(code, toggleBtn) {
        const isPhase = code.split('.').length === 2; // e.g. "1.1"

        if (isPhase) {
            if (expandedPhases.has(code)) {
                expandedPhases.delete(code);
                // Also collapse all deliverables under this phase
                phases.forEach(p => {
                    if (p.code === code && p.children) {
                        p.children.forEach(d => expandedDeliverables.delete(d.code));
                    }
                });
            } else {
                expandedPhases.add(code);
            }
        } else {
            // Deliverable toggle
            if (expandedDeliverables.has(code)) {
                expandedDeliverables.delete(code);
            } else {
                expandedDeliverables.add(code);
            }
        }

        buildGanttBody();
    }

    // ===== UPDATE TOGGLE BUTTON STATES =====
    function updateToggleStates() {
        document.querySelectorAll('.task-toggle').forEach(btn => {
            const code = btn.dataset.code;
            const isExpanded = expandedPhases.has(code) || expandedDeliverables.has(code);
            if (isExpanded) {
                btn.classList.add('expanded');
            } else {
                btn.classList.remove('expanded');
            }
        });
    }

    // ===== TOOLTIP =====
    let tooltipEl = null;

    function createTooltipEl() {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'gantt-tooltip';
        document.body.appendChild(tooltipEl);
    }

    function showTooltip(e, task, isPhase) {
        if (!tooltipEl) createTooltipEl();

        const phaseColors = {
            planning: '#6366f1',
            design: '#ec4899',
            development: '#06b6d4',
            testing: '#f59e0b',
            deployment: '#10b981'
        };
        const phaseLabels = {
            planning: 'Planning',
            design: 'Design',
            development: 'Development',
            testing: 'Testing',
            deployment: 'Deployment'
        };

        const start = parseDate(task.start);
        const end = parseDate(task.end);
        const duration = daysBetween(start, end) + 1;

        tooltipEl.innerHTML = `
            <h4>${task.code} — ${task.name}</h4>
            <p> ${formatDateShort(task.start)} — ${formatDateShort(task.end)}</p>
            <p>⏱ Duration: ${duration} days</p>
            ${task.person ? '<p> ' + task.person + '</p>' : ''}
            ${task.lead ? '<p> Lead: ' + task.lead + '</p>' : ''}
            <span class="tt-phase" style="background:${phaseColors[task.phase]}">${phaseLabels[task.phase]}</span>
        `;

        tooltipEl.classList.add('visible');
        moveTooltip(e);
    }

    function moveTooltip(e) {
        if (!tooltipEl) return;
        const x = e.clientX + 16;
        const y = e.clientY - 10;
        tooltipEl.style.left = Math.min(x, window.innerWidth - 300) + 'px';
        tooltipEl.style.top = Math.min(y, window.innerHeight - 150) + 'px';
    }

    function hideTooltip() {
        if (tooltipEl) tooltipEl.classList.remove('visible');
    }

    // ===== ZOOM =====
    function setZoom(level) {
        zoomLevel = Math.max(50, Math.min(300, level));
        dayWidth = Math.round(5 * (zoomLevel / 100));
        document.getElementById('zoomLevel').textContent = zoomLevel + '%';
        render();
    }

    // ===== EXPAND/COLLAPSE ALL =====
    function toggleAllSubtasks() {
        allExpanded = !allExpanded;
        const btn = document.getElementById('toggleSubtasks');
        const icon = document.getElementById('toggleIcon');

        if (allExpanded) {
            phases.forEach(p => {
                expandedPhases.add(p.code);
                if (p.children) p.children.forEach(d => expandedDeliverables.add(d.code));
            });
            btn.innerHTML = '<span>▲</span> Collapse All';
        } else {
            expandedPhases.clear();
            expandedDeliverables.clear();
            btn.innerHTML = '<span>▼</span> Expand All';
        }
        buildGanttBody();
    }

    // ===== RENDER =====
    function render() {
        document.documentElement.style.setProperty('--day-width', dayWidth + 'px');
        buildTimelineHeader();
        buildGanttBody();
    }

    // ===== INIT =====
    function init() {
        if (!document.getElementById('ganttBody')) return;

        // Zoom controls
        document.getElementById('zoomIn').addEventListener('click', () => setZoom(zoomLevel + 25));
        document.getElementById('zoomOut').addEventListener('click', () => setZoom(zoomLevel - 25));

        // Filter
        document.getElementById('phaseFilter').addEventListener('change', () => {
            expandedPhases.clear();
            expandedDeliverables.clear();
            allExpanded = false;
            document.getElementById('toggleSubtasks').innerHTML = '<span>▼</span> Expand All';
            buildGanttBody();
        });

        // Toggle all
        document.getElementById('toggleSubtasks').addEventListener('click', toggleAllSubtasks);

        // Initial render
        render();

        // Scroll to today if in range
        setTimeout(() => {
            const todayLine = document.querySelector('.gantt-today-line');
            if (todayLine) {
                const scroll = document.getElementById('ganttScroll');
                const left = parseInt(todayLine.style.left) - 400;
                if (scroll && left > 0) scroll.scrollLeft = left;
            }
        }, 100);
    }

    // Run when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
