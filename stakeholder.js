/* ===== STAKEHOLDER ANALYSIS — INTERACTIVE LOGIC ===== */
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- STAKEHOLDER DATA ---------- */
    const stakeholders = [
        {
            id: 1,
            name: 'Project Sponsor (CEO)',
            role: 'Provides overall funding, approves major decisions, and sets the strategic direction for the Grand Prix Motors platform.',
            power: 'High',
            interest: 'High',
            expectations: 'Successful on-time delivery within budget; strong ROI and brand positioning in the luxury F1 market.',
            quadrant: 'manage-closely'
        },
        {
            id: 2,
            name: 'Project Manager',
            role: 'Plans, coordinates, and controls all project activities; manages team, schedule, budget, and stakeholder communication.',
            power: 'High',
            interest: 'High',
            expectations: 'Clear requirements, adequate resources, and stakeholder cooperation to deliver the platform on schedule.',
            quadrant: 'manage-closely'
        },
        {
            id: 3,
            name: 'Core Development Team',
            role: 'Designs and builds the web platform, including front-end, back-end, 3D viewer, payment integration, and CMS.',
            power: 'High',
            interest: 'High',
            expectations: 'Well-defined technical requirements, modern tech stack, manageable workload, and recognition for quality work.',
            quadrant: 'manage-closely'
        },
        {
            id: 4,
            name: 'IT Department',
            role: 'Manages hosting infrastructure, security, deployment pipelines, and ensures system reliability and uptime.',
            power: 'High',
            interest: 'High',
            expectations: 'Stable and secure architecture; compatibility with existing infrastructure; proper documentation.',
            quadrant: 'manage-closely'
        },
        {
            id: 5,
            name: 'Key Client Representative',
            role: 'Represents high-net-worth buyers; provides feedback on UX, catalog features, and purchase workflow.',
            power: 'High',
            interest: 'High',
            expectations: 'Premium user experience, seamless purchasing process, and access to verified authentic F1 cars.',
            quadrant: 'manage-closely'
        },
        {
            id: 6,
            name: 'FIA Certification Body',
            role: 'External regulatory authority that certifies car authenticity; provides verification standards and lab access.',
            power: 'High',
            interest: 'Low',
            expectations: 'Compliance with authentication protocols; proper use of FIA branding and certification marks.',
            quadrant: 'keep-satisfied'
        },
        {
            id: 7,
            name: 'Payment Gateway Provider',
            role: 'Third-party service handling secure high-value transactions, escrow, and KYC/AML compliance.',
            power: 'High',
            interest: 'Low',
            expectations: 'Correct API integration, adherence to PCI DSS standards, and timely settlement of transactions.',
            quadrant: 'keep-satisfied'
        },
        {
            id: 8,
            name: 'Cloud Hosting Provider',
            role: 'Provides server infrastructure, CDN, auto-scaling, and uptime guarantees for the platform.',
            power: 'High',
            interest: 'Low',
            expectations: 'Consistent usage of services, timely payments, and adherence to platform usage policies.',
            quadrant: 'keep-satisfied'
        },
        {
            id: 9,
            name: 'End Users (Car Buyers)',
            role: 'Browse the catalog, interact with 3D car viewers, and purchase F1 cars through the platform.',
            power: 'Low',
            interest: 'High',
            expectations: 'Intuitive and fast website; detailed car information and provenance; secure and transparent transactions.',
            quadrant: 'keep-informed'
        },
        {
            id: 10,
            name: 'Marketing Department',
            role: 'Promotes the platform, manages brand campaigns, social media, and coordinates launch events.',
            power: 'Low',
            interest: 'High',
            expectations: 'On-time launch before F1 season; compelling content and visuals; SEO-optimized pages for visibility.',
            quadrant: 'keep-informed'
        },
        {
            id: 11,
            name: 'Customer Support Team',
            role: 'Handles buyer inquiries, assists with order tracking, and manages post-sale communication.',
            power: 'Low',
            interest: 'High',
            expectations: 'User-friendly admin tools, CRM integration, knowledge base, and clear escalation procedures.',
            quadrant: 'keep-informed'
        },
        {
            id: 12,
            name: 'F1 Team Partners (Sellers)',
            role: 'Supply authentic F1 cars to the platform; provide documentation, history, and technical specifications.',
            power: 'Low',
            interest: 'High',
            expectations: 'Fair consignment terms, accurate car listing representation, and timely payments for sold vehicles.',
            quadrant: 'keep-informed'
        },
        {
            id: 13,
            name: 'Logistics & Shipping Partners',
            role: 'Handle worldwide transportation of sold F1 cars in climate-controlled enclosed containers.',
            power: 'Low',
            interest: 'Low',
            expectations: 'Clear delivery schedules, accurate shipping details, and timely payment for logistics services.',
            quadrant: 'monitor'
        },
        {
            id: 14,
            name: 'Legal & Compliance Advisors',
            role: 'Provide legal guidance on cross-border trade, heritage vehicle regulations, and contract structures.',
            power: 'Low',
            interest: 'Low',
            expectations: 'Consultation on an as-needed basis; compliance with provided legal recommendations.',
            quadrant: 'monitor'
        },
        {
            id: 15,
            name: 'Industry Media & Press',
            role: 'Cover the platform launch and review the service in F1 and automotive media outlets.',
            power: 'Low',
            interest: 'Low',
            expectations: 'Access to press releases, exclusive previews, and accurate information for coverage.',
            quadrant: 'monitor'
        },
        {
            id: 16,
            name: 'Competitor Dealerships',
            role: 'External observers who monitor Grand Prix Motors\' market positioning and pricing strategies.',
            power: 'Low',
            interest: 'Low',
            expectations: 'No direct expectations; monitored for competitive intelligence and market shifts.',
            quadrant: 'monitor'
        }
    ];

    /* ---------- QUADRANT METADATA ---------- */
    const quadrants = {
        'manage-closely': {
            title: 'Manage Closely',
            subtitle: 'High Power / High Interest',
            cssClass: 'q-manage-closely',
            jcClass: 'jc-manage-closely',
            dotColor: '#ff4444',
            why: 'These stakeholders have both strong influence and a deep personal stake in the project\'s success. The Project Sponsor controls funding, the Project Manager drives execution, the Development Team builds the product, IT ensures stability, and the Key Client Representative validates the user experience. Any of them can directly accelerate or block the project.',
            communication: 'Frequent face-to-face or video meetings (at least weekly); real-time messaging channels; direct access to project dashboards; involvement in sprint reviews and decision-making sessions.',
            strategy: 'Active engagement: include them in all major decisions; provide detailed regular reports; seek their input on scope changes; maintain transparency on risks and blockers; ensure they feel ownership of the project.'
        },
        'keep-satisfied': {
            title: 'Keep Satisfied',
            subtitle: 'High Power / Low Interest',
            cssClass: 'q-keep-satisfied',
            jcClass: 'jc-keep-satisfied',
            dotColor: '#4e9af5',
            why: 'These stakeholders wield significant influence — the FIA can block car listings, the payment provider can halt transactions, and the hosting provider controls uptime — but they are not involved in daily project decisions. They care about compliance and correct usage of their services rather than project milestones.',
            communication: 'Periodic executive summaries (monthly or milestone-based); escalation contact for urgent issues; formal compliance reports when required.',
            strategy: 'Keep them satisfied with key updates without overwhelming them with details. Proactively address compliance requirements, meet SLAs, and involve them only when their specific domain expertise or approval is needed.'
        },
        'keep-informed': {
            title: 'Keep Informed',
            subtitle: 'Low Power / High Interest',
            cssClass: 'q-keep-informed',
            jcClass: 'jc-keep-informed',
            dotColor: '#e6c200',
            why: 'These stakeholders are highly interested in the project outcome — end users want a great product, marketing needs launch-ready content, support needs admin tools, and F1 team partners want their cars well-represented — but they do not have decision-making authority over the project\'s direction or budget.',
            communication: 'Regular progress newsletters or email updates (bi-weekly); beta access for testing and feedback; dedicated feedback channels (surveys, user testing sessions).',
            strategy: 'Maintain consistent communication to keep them engaged and informed. Actively collect their feedback, share progress updates, and ensure they feel heard even though they cannot directly influence key decisions.'
        },
        'monitor': {
            title: 'Monitor with Minimum Effort',
            subtitle: 'Low Power / Low Interest',
            cssClass: 'q-monitor',
            jcClass: 'jc-monitor',
            dotColor: '#66bb6a',
            why: 'These stakeholders have minimal influence on the project and relatively low concern about its daily progress. Logistics partners fulfill orders as they come, legal advisors are consulted occasionally, media covers the launch, and competitors simply observe from outside.',
            communication: 'Communication only when needed — transactional emails, press releases at launch, or ad-hoc legal consultations. No regular meetings or reports required.',
            strategy: 'Monitor passively with minimal management effort. Keep contact information current, communicate only when there is a direct need, and avoid spending project resources on unnecessary engagement.'
        }
    };

    /* ---------- RENDER STAKEHOLDER TABLE ---------- */
    const tbody = document.getElementById('stakeholderTableBody');
    if (tbody) {
        tbody.innerHTML = stakeholders.map(s => {
            const powerClass = s.power === 'High' ? 'badge-high' : 'badge-low';
            const interestClass = s.interest === 'High' ? 'badge-high' : 'badge-low';
            return `<tr>
                <td class="sh-num">${s.id}</td>
                <td class="sh-name">${s.name}</td>
                <td>${s.role}</td>
                <td><span class="badge ${powerClass}">${s.power}</span></td>
                <td><span class="badge ${interestClass}">${s.interest}</span></td>
                <td>${s.expectations}</td>
            </tr>`;
        }).join('');
    }

    /* ---------- RENDER POWER/INTEREST MATRIX ---------- */
    const matrixEl = document.getElementById('matrixContainer');
    if (matrixEl) {
        // Group stakeholders by quadrant
        const groups = {
            'manage-closely': [],
            'keep-satisfied': [],
            'keep-informed': [],
            'monitor': []
        };
        stakeholders.forEach(s => { groups[s.quadrant].push(s.name); });

        function renderQuadrant(key) {
            const q = quadrants[key];
            const items = groups[key];
            return `<div class="pi-quadrant ${q.cssClass}">
                <h3>${q.title}</h3>
                <div class="quadrant-subtitle">${q.subtitle}</div>
                <ol>${items.map(name => `<li>${name}</li>`).join('')}</ol>
            </div>`;
        }

        matrixEl.innerHTML = `
            <div class="pi-matrix">
                <div class="pi-axis-y"><span class="pi-axis-y-text">P O W E R</span></div>
                ${renderQuadrant('keep-satisfied')}
                ${renderQuadrant('manage-closely')}
                ${renderQuadrant('monitor')}
                ${renderQuadrant('keep-informed')}
                <div class="pi-corner"></div>
                <div class="pi-axis-x">I N T E R E S T</div>
            </div>

        `;
    }

    /* ---------- RENDER JUSTIFICATION CARDS ---------- */
    const justGrid = document.getElementById('justificationGrid');
    if (justGrid) {
        const order = ['manage-closely', 'keep-satisfied', 'keep-informed', 'monitor'];
        justGrid.innerHTML = order.map(key => {
            const q = quadrants[key];
            const members = stakeholders.filter(s => s.quadrant === key).map(s => s.name);
            return `<div class="justification-card ${q.jcClass}">
                <h3><span class="jc-dot" style="background:${q.dotColor}"></span>${q.title}</h3>
                <p><strong>Stakeholders:</strong> ${members.join(', ')}</p>
                <h4>Why they belong here</h4>
                <p>${q.why}</p>
                <h4>Communication approach</h4>
                <p>${q.communication}</p>
                <h4>Management strategy</h4>
                <p>${q.strategy}</p>
            </div>`;
        }).join('');
    }

});
