/* ============================================
   Car Detail Page — Data & Logic
   ============================================ */

const CAR_DATABASE = {
    'ferrari-sf-23': {
        name: 'Ferrari SF-23',
        team: 'Scuderia Ferrari',
        year: 2023,
        price: '$8,500,000',
        type: 'modern',
        badge: 'Modern Era',
        badgeBg: '#e10600',
        badgeColor: '#fff',
        heroGradient: 'linear-gradient(135deg, #e10600 0%, #900 100%)',
        wiki: 'Ferrari_SF-23',
        subtitle: '2023 • V6 Turbo Hybrid 1.6L • Maranello, Italy',
        description: 'The Ferrari SF-23 is Scuderia Ferrari\'s 2023 Formula One challenger, designed under the technical leadership of Enrico Cardile. Powered by a 1.6L V6 turbocharged hybrid power unit producing over 1000 HP, this car carried Charles Leclerc and Carlos Sainz through 22 Grand Prix races. It featured an innovative sidepod design and improved downforce package.',
        specs: {
            power: { value: '1000+', unit: 'HP', icon: '' },
            topSpeed: { value: '350', unit: 'km/h', icon: '' },
            weight: { value: '798', unit: 'kg', icon: '' },
            acceleration: { value: '2.6', unit: 's (0-100)', icon: '⏱' }
        },
        performance: {
            power: 95, speed: 88, aero: 82, reliability: 78, braking: 85, handling: 84
        },
        techSpecs: {
            'Engine': 'Ferrari 066/10 V6 Turbo Hybrid',
            'Displacement': '1.6L',
            'Power Output': '1000+ HP (combined)',
            'ERS': '120 kW Energy Recovery System',
            'Gearbox': '8-speed seamless shift',
            'Chassis': 'Carbon fibre monocoque',
            'Suspension': 'Pushrod (front), Pullrod (rear)',
            'Brakes': 'Carbon-ceramic Brembo',
            'Tyres': 'Pirelli P Zero (18")',
            'Fuel Capacity': '110 kg',
            'Weight': '798 kg (min)',
            'Top Speed': '~350 km/h'
        },
        drivers: [
            { name: 'Charles Leclerc', role: 'Driver #16', emoji: '🇲🇨' },
            { name: 'Carlos Sainz Jr.', role: 'Driver #55', emoji: '🇪🇸' }
        ],
        history: [
            { date: 'Feb 2023', text: 'SF-23 unveiled at Fiorano' },
            { date: 'Mar 2023', text: 'Season debut at Bahrain GP' },
            { date: 'Jul 2023', text: 'Leclerc takes podium at Austrian GP' },
            { date: 'Sep 2023', text: 'Sainz wins Singapore GP under lights' },
            { date: 'Nov 2023', text: 'Season ends — 4th in Constructors\'' }
        ],
        highlights: [
            { icon: '', value: '1 Win', label: 'Race Victories' },
            { icon: '', value: '6', label: 'Podium Finishes' },
            { icon: '', value: 'P4', label: 'Constructors Standing' }
        ]
    },
    'red-bull-rb19': {
        name: 'Red Bull RB19',
        team: 'Red Bull Racing',
        year: 2023,
        price: '$12,000,000',
        type: 'modern',
        badge: 'Modern Era',
        badgeBg: '#1e3a8a',
        badgeColor: '#fff',
        heroGradient: 'linear-gradient(135deg, #0600ef 0%, #001040 100%)',
        wiki: 'Red_Bull_RB19',
        subtitle: '2023 • V6 Turbo Hybrid 1.6L • Milton Keynes, UK',
        description: 'The Red Bull RB19 is the most dominant Formula 1 car in history. Designed by Adrian Newey and his team, it won 21 out of 22 races in the 2023 season. Max Verstappen claimed his third consecutive World Championship in commanding fashion, with teammate Sergio Pérez also claiming victories.',
        specs: {
            power: { value: '1000+', unit: 'HP', icon: '' },
            topSpeed: { value: '360', unit: 'km/h', icon: '' },
            weight: { value: '798', unit: 'kg', icon: '' },
            acceleration: { value: '2.4', unit: 's (0-100)', icon: '⏱' }
        },
        performance: {
            power: 98, speed: 96, aero: 99, reliability: 95, braking: 94, handling: 97
        },
        techSpecs: {
            'Engine': 'Honda RBPT V6 Turbo Hybrid',
            'Displacement': '1.6L',
            'Power Output': '1000+ HP (combined)',
            'ERS': '120 kW Energy Recovery System',
            'Gearbox': '8-speed seamless shift',
            'Chassis': 'Carbon fibre monocoque',
            'Suspension': 'Pullrod (front & rear)',
            'Brakes': 'Carbon-ceramic',
            'Tyres': 'Pirelli P Zero (18")',
            'Fuel Capacity': '110 kg',
            'Weight': '798 kg (min)',
            'Top Speed': '~360 km/h'
        },
        drivers: [
            { name: 'Max Verstappen', role: 'Driver #1 — World Champion', emoji: '🇳🇱' },
            { name: 'Sergio Pérez', role: 'Driver #11', emoji: '🇲🇽' }
        ],
        history: [
            { date: 'Feb 2023', text: 'RB19 launched in New York' },
            { date: 'Mar 2023', text: 'Verstappen wins season opener at Bahrain' },
            { date: 'Jun 2023', text: '10-race win streak achieved' },
            { date: 'Oct 2023', text: 'Verstappen clinches 3rd World Championship at Qatar' },
            { date: 'Nov 2023', text: '21 wins out of 22 races — new all-time record' }
        ],
        highlights: [
            { icon: '', value: '21 Wins', label: 'Out of 22 Races' },
            { icon: '', value: '1st', label: 'Constructors Champion' },
            { icon: '⏱', value: '10', label: 'Consecutive Wins' }
        ]
    },
    'mercedes-w11': {
        name: 'Mercedes W11',
        team: 'Mercedes-AMG Petronas F1',
        year: 2020,
        price: '$15,000,000',
        type: 'modern',
        badge: 'Modern Era',
        badgeBg: '#00d2be',
        badgeColor: '#000',
        heroGradient: 'linear-gradient(135deg, #00d2be 0%, #005f56 100%)',
        wiki: 'Mercedes-AMG_F1_W11_EQ_Performance',
        subtitle: '2020 • V6 Turbo Hybrid 1.6L • Brixworth, UK',
        description: 'The Mercedes W11 EQ Performance is widely regarded as the most dominant F1 car in history. Lewis Hamilton used it to equal Michael Schumacher\'s record of 7 World Championships. The car won 13 out of 17 races in the shortened 2020 season, setting new benchmarks for qualifying pace.',
        specs: {
            power: { value: '950+', unit: 'HP', icon: '' },
            topSpeed: { value: '362', unit: 'km/h', icon: '' },
            weight: { value: '746', unit: 'kg', icon: '' },
            acceleration: { value: '2.4', unit: 's (0-100)', icon: '⏱' }
        },
        performance: {
            power: 92, speed: 95, aero: 96, reliability: 94, braking: 93, handling: 95
        },
        techSpecs: {
            'Engine': 'Mercedes-AMG F1 M11 V6 Turbo Hybrid',
            'Displacement': '1.6L',
            'Power Output': '950+ HP (combined)',
            'ERS': '120 kW Energy Recovery System',
            'Gearbox': '8-speed seamless shift',
            'Chassis': 'Carbon fibre monocoque',
            'Suspension': 'Pushrod (front), Pullrod (rear)',
            'Brakes': 'Carbon-ceramic Brembo',
            'Tyres': 'Pirelli P Zero (13")',
            'Fuel Capacity': '110 kg',
            'Weight': '746 kg (min)',
            'Top Speed': '~362 km/h'
        },
        drivers: [
            { name: 'Lewis Hamilton', role: 'Driver #44 — 7× Champion', emoji: '🇬🇧' },
            { name: 'Valtteri Bottas', role: 'Driver #77', emoji: '🇫🇮' }
        ],
        history: [
            { date: 'Feb 2020', text: 'W11 unveiled — DAS system shocks paddock' },
            { date: 'Jul 2020', text: 'Dominant 1-2 at Austrian GP season opener' },
            { date: 'Sep 2020', text: 'Hamilton matches Schumacher\'s win record' },
            { date: 'Nov 2020', text: 'Hamilton clinches 7th WDC at Turkish GP' },
            { date: 'Dec 2020', text: '13/17 wins, 15/17 poles — statistical legend' }
        ],
        highlights: [
            { icon: '', value: '13 Wins', label: 'Out of 17 Races' },
            { icon: '', value: '15', label: 'Pole Positions' },
            { icon: '', value: '7th WDC', label: 'Hamilton Record' }
        ]
    },
    'mclaren-mcl60': {
        name: 'McLaren MCL60',
        team: 'McLaren F1 Team',
        year: 2023,
        price: '$6,800,000',
        type: 'modern',
        badge: 'Modern Era',
        badgeBg: '#ff8000',
        badgeColor: '#000',
        heroGradient: 'linear-gradient(135deg, #ff8000 0%, #c76300 100%)',
        wiki: 'McLaren_MCL60',
        subtitle: '2023 • V6 Turbo Hybrid 1.6L • Woking, UK',
        description: 'The McLaren MCL60 marked the team\'s dramatic resurgence in 2023. After a challenging start, mid-season upgrades transformed it into a race-winning machine. Lando Norris and Oscar Piastri delivered consistent performances and a memorable 1-2 at the season opener of 2024.',
        specs: {
            power: { value: '1000+', unit: 'HP', icon: '' },
            topSpeed: { value: '345', unit: 'km/h', icon: '' },
            weight: { value: '798', unit: 'kg', icon: '' },
            acceleration: { value: '2.5', unit: 's (0-100)', icon: '⏱' }
        },
        performance: {
            power: 90, speed: 85, aero: 88, reliability: 85, braking: 84, handling: 87
        },
        techSpecs: {
            'Engine': 'Mercedes-AMG V6 Turbo Hybrid',
            'Displacement': '1.6L',
            'Power Output': '1000+ HP (combined)',
            'ERS': '120 kW Energy Recovery System',
            'Gearbox': '8-speed seamless shift',
            'Chassis': 'Carbon fibre monocoque',
            'Suspension': 'Pushrod (front & rear)',
            'Brakes': 'Carbon-ceramic Akebono',
            'Tyres': 'Pirelli P Zero (18")',
            'Fuel Capacity': '110 kg',
            'Weight': '798 kg (min)',
            'Top Speed': '~345 km/h'
        },
        drivers: [
            { name: 'Lando Norris', role: 'Driver #4', emoji: '🇬🇧' },
            { name: 'Oscar Piastri', role: 'Driver #81', emoji: '🇦🇺' }
        ],
        history: [
            { date: 'Feb 2023', text: 'MCL60 launched — papaya livery returns' },
            { date: 'Jun 2023', text: 'Major upgrade package at Austrian GP' },
            { date: 'Sep 2023', text: 'Norris takes podium at Singapore' },
            { date: 'Oct 2023', text: 'Sprint win at Qatar GP — McLaren is back' },
            { date: 'Nov 2023', text: '4th in Constructors\' — massive leap from P5' }
        ],
        highlights: [
            { icon: '', value: 'P5→P4', label: 'Constructors Jump' },
            { icon: '', value: '1', label: 'Sprint Victory' },
            { icon: '', value: 'Mid-Season', label: 'Breakthrough Upgrade' }
        ]
    },
    'alpine-a523': {
        name: 'Alpine A523',
        team: 'BWT Alpine F1 Team',
        year: 2023,
        price: '$5,200,000',
        type: 'modern',
        badge: 'Modern Era',
        badgeBg: '#2293d1',
        badgeColor: '#fff',
        heroGradient: 'linear-gradient(135deg, #2293d1 0%, #0a4d7a 100%)',
        wiki: 'Alpine_A523',
        subtitle: '2023 • V6 Turbo Hybrid 1.6L • Enstone, UK',
        description: 'The Alpine A523 continued the French team\'s Formula 1 campaign with a striking pink and blue livery. Pierre Gasly and Esteban Ocon piloted the Renault-powered machine through a season of steady midfield racing, showcasing Alpine\'s engineering progress.',
        specs: {
            power: { value: '1000+', unit: 'HP', icon: '' },
            topSpeed: { value: '340', unit: 'km/h', icon: '' },
            weight: { value: '798', unit: 'kg', icon: '' },
            acceleration: { value: '2.6', unit: 's (0-100)', icon: '⏱' }
        },
        performance: {
            power: 86, speed: 82, aero: 80, reliability: 76, braking: 80, handling: 81
        },
        techSpecs: {
            'Engine': 'Renault E-Tech RE23 V6 Turbo Hybrid',
            'Displacement': '1.6L',
            'Power Output': '1000+ HP (combined)',
            'ERS': '120 kW Energy Recovery System',
            'Gearbox': '8-speed seamless shift',
            'Chassis': 'Carbon fibre monocoque',
            'Suspension': 'Pushrod (front & rear)',
            'Brakes': 'AP Racing carbon-ceramic',
            'Tyres': 'Pirelli P Zero (18")',
            'Fuel Capacity': '110 kg',
            'Weight': '798 kg (min)',
            'Top Speed': '~340 km/h'
        },
        drivers: [
            { name: 'Pierre Gasly', role: 'Driver #10', emoji: '🇫🇷' },
            { name: 'Esteban Ocon', role: 'Driver #31', emoji: '🇫🇷' }
        ],
        history: [
            { date: 'Feb 2023', text: 'A523 revealed — striking BWT pink livery' },
            { date: 'Mar 2023', text: 'Gasly\'s Alpine debut at Bahrain' },
            { date: 'Jun 2023', text: 'Points finish at Spanish GP' },
            { date: 'Oct 2023', text: 'Both drivers in points at Japanese GP' },
            { date: 'Nov 2023', text: '6th in Constructors\' Championship' }
        ],
        highlights: [
            { icon: '', value: 'P6', label: 'Constructors Standing' },
            { icon: '🇫🇷', value: '2', label: 'French Drivers' },
            { icon: '', value: '120', label: 'Points Scored' }
        ]
    },
    'aston-martin-amr23': {
        name: 'Aston Martin AMR23',
        team: 'Aston Martin Aramco F1',
        year: 2023,
        price: '$7,100,000',
        type: 'modern',
        badge: 'Modern Era',
        badgeBg: '#358c75',
        badgeColor: '#fff',
        heroGradient: 'linear-gradient(135deg, #358c75 0%, #1a5c49 100%)',
        wiki: 'Aston_Martin_AMR23',
        subtitle: '2023 • V6 Turbo Hybrid 1.6L • Silverstone, UK',
        description: 'The Aston Martin AMR23 was the breakthrough car that established the team as genuine front-runners. Fernando Alonso delivered 8 podiums, including the dramatic season opener in Bahrain where he finished 3rd. The British Racing Green machine became one of the stories of the season.',
        specs: {
            power: { value: '1000+', unit: 'HP', icon: '' },
            topSpeed: { value: '345', unit: 'km/h', icon: '' },
            weight: { value: '798', unit: 'kg', icon: '' },
            acceleration: { value: '2.5', unit: 's (0-100)', icon: '⏱' }
        },
        performance: {
            power: 91, speed: 85, aero: 89, reliability: 87, braking: 86, handling: 88
        },
        techSpecs: {
            'Engine': 'Mercedes-AMG V6 Turbo Hybrid',
            'Displacement': '1.6L',
            'Power Output': '1000+ HP (combined)',
            'ERS': '120 kW Energy Recovery System',
            'Gearbox': '8-speed seamless shift',
            'Chassis': 'Carbon fibre monocoque',
            'Suspension': 'Pushrod (front), Pullrod (rear)',
            'Brakes': 'Carbon-ceramic',
            'Tyres': 'Pirelli P Zero (18")',
            'Fuel Capacity': '110 kg',
            'Weight': '798 kg (min)',
            'Top Speed': '~345 km/h'
        },
        drivers: [
            { name: 'Fernando Alonso', role: 'Driver #14 — 2× Champion', emoji: '🇪🇸' },
            { name: 'Lance Stroll', role: 'Driver #18', emoji: '🇨🇦' }
        ],
        history: [
            { date: 'Feb 2023', text: 'AMR23 launched — new aero concept' },
            { date: 'Mar 2023', text: 'Alonso podium on debut at Bahrain GP!' },
            { date: 'Apr 2023', text: '3 podiums in first 4 races' },
            { date: 'Jul 2023', text: '8th podium for Alonso at Dutch GP' },
            { date: 'Nov 2023', text: 'P5 in Constructors\' — best result in years' }
        ],
        highlights: [
            { icon: '', value: '8', label: 'Podium Finishes' },
            { icon: '', value: 'P5', label: 'Best in Years' },
            { icon: '🇪🇸', value: 'Alonso', label: '2× Champion Returns' }
        ]
    },
    'ferrari-f2004': {
        name: 'Ferrari F2004',
        team: 'Scuderia Ferrari',
        year: 2004,
        price: '$25,000,000',
        type: 'classic',
        badge: 'Classic Legend',
        badgeBg: '#d4af37',
        badgeColor: '#000',
        heroGradient: 'linear-gradient(135deg, #cc0000 0%, #660000 100%)',
        wiki: 'Ferrari_F2004',
        subtitle: '2004 • V10 3.0L • Maranello, Italy',
        description: 'The Ferrari F2004 is widely considered the greatest Formula 1 car ever built. In Michael Schumacher\'s hands, it won 15 out of 18 races — a record that stood for nearly 20 years. The screaming V10 engine produced 900 HP and the car was unmatched in every aspect.',
        specs: {
            power: { value: '900', unit: 'HP', icon: '' },
            topSpeed: { value: '370', unit: 'km/h', icon: '' },
            weight: { value: '605', unit: 'kg', icon: '' },
            acceleration: { value: '2.1', unit: 's (0-100)', icon: '⏱' }
        },
        performance: {
            power: 85, speed: 94, aero: 90, reliability: 92, braking: 88, handling: 93
        },
        techSpecs: {
            'Engine': 'Ferrari Tipo 053 V10',
            'Displacement': '3.0L',
            'Power Output': '900 HP @ 18,300 RPM',
            'Rev Limit': '19,000 RPM',
            'Gearbox': '7-speed semi-automatic',
            'Chassis': 'Carbon fibre monocoque',
            'Suspension': 'Pushrod (front & rear)',
            'Brakes': 'Carbon-carbon Brembo',
            'Tyres': 'Bridgestone Potenza',
            'Fuel Capacity': '~90 kg',
            'Weight': '605 kg (min)',
            'Top Speed': '~370 km/h'
        },
        drivers: [
            { name: 'Michael Schumacher', role: 'Driver #1 — 7× Champion', emoji: '🇩🇪' },
            { name: 'Rubens Barrichello', role: 'Driver #2', emoji: '🇧🇷' }
        ],
        history: [
            { date: 'Jan 2004', text: 'F2004 revealed — evolution of dominant F2003-GA' },
            { date: 'Mar 2004', text: 'Schumacher wins season opener at Melbourne' },
            { date: 'Jul 2004', text: 'Schumacher clinches title with 6 races to go' },
            { date: 'Oct 2004', text: '15 wins out of 18 — all-time record' },
            { date: '2024', text: 'Still benchmark for F1 dominance 20 years later' }
        ],
        highlights: [
            { icon: '', value: '15 Wins', label: 'Out of 18 Races' },
            { icon: '', value: '83%', label: 'Win Rate' },
            { icon: '', value: '7th WDC', label: 'Schumacher Record' }
        ]
    },
    'mclaren-mp4-4': {
        name: 'McLaren MP4/4',
        team: 'McLaren Honda',
        year: 1988,
        price: '$30,000,000',
        type: 'classic',
        badge: 'Classic Legend',
        badgeBg: '#d4af37',
        badgeColor: '#000',
        heroGradient: 'linear-gradient(135deg, #c0c0c0 0%, #505050 100%)',
        wiki: 'McLaren_MP4/4',
        subtitle: '1988 • V6 Turbo 1.5L • Woking, UK',
        description: 'The McLaren MP4/4 holds the record for the highest win percentage in F1 history: 15 victories out of 16 races (93.75%). Designed by Gordon Murray, this car was the weapon of choice for Ayrton Senna and Alain Prost — two of the greatest drivers in history racing for the same team.',
        specs: {
            power: { value: '685', unit: 'HP', icon: '' },
            topSpeed: { value: '340', unit: 'km/h', icon: '' },
            weight: { value: '540', unit: 'kg', icon: '' },
            acceleration: { value: '2.8', unit: 's (0-100)', icon: '⏱' }
        },
        performance: {
            power: 70, speed: 82, aero: 78, reliability: 90, braking: 75, handling: 85
        },
        techSpecs: {
            'Engine': 'Honda RA168-E V6 Twin-Turbo',
            'Displacement': '1.5L',
            'Power Output': '685 HP (race trim, restricted)',
            'Turbo': 'Twin IHI turbochargers (2.5 bar)',
            'Gearbox': '6-speed manual',
            'Chassis': 'Carbon fibre/Kevlar monocoque',
            'Suspension': 'Double-wishbone (front & rear)',
            'Brakes': 'Carbon/steel composite',
            'Tyres': 'Goodyear',
            'Fuel Capacity': '~150L',
            'Weight': '540 kg (min)',
            'Top Speed': '~340 km/h'
        },
        drivers: [
            { name: 'Ayrton Senna', role: 'Driver #12 — World Champion 1988', emoji: '🇧🇷' },
            { name: 'Alain Prost', role: 'Driver #11 — 4× Champion', emoji: '🇫🇷' }
        ],
        history: [
            { date: 'Jan 1988', text: 'Gordon Murray designs the low-line MP4/4' },
            { date: 'Apr 1988', text: 'Senna wins Brazilian GP — emotional debut' },
            { date: 'Jul 1988', text: '11 consecutive wins by mid-season' },
            { date: 'Oct 1988', text: 'Senna clinches first WDC at Suzuka' },
            { date: 'Nov 1988', text: '15/16 wins — the most dominant season ever' }
        ],
        highlights: [
            { icon: '', value: '15/16', label: 'Wins — All-Time Record %' },
            { icon: '', value: '93.75%', label: 'Win Percentage' },
            { icon: '⭐', value: 'Senna vs Prost', label: 'Greatest Rivalry' }
        ]
    },
    'lotus-79': {
        name: 'Lotus 79',
        team: 'Team Lotus',
        year: 1978,
        price: '$18,000,000',
        type: 'classic',
        badge: 'Classic Legend',
        badgeBg: '#d4af37',
        badgeColor: '#000',
        heroGradient: 'linear-gradient(135deg, #ffd700 0%, #a08000 100%)',
        wiki: 'Lotus_79',
        subtitle: '1978 • V8 3.0L Ford DFV • Hethel, UK',
        description: 'The Lotus 79 revolutionised Formula 1 with its ground-effect aerodynamics. Designed by Colin Chapman and Peter Wright, it used inverted wing profiles under the sidepods to generate massive downforce. Mario Andretti dominated the 1978 season, winning the World Championship.',
        specs: {
            power: { value: '485', unit: 'HP', icon: '' },
            topSpeed: { value: '310', unit: 'km/h', icon: '' },
            weight: { value: '580', unit: 'kg', icon: '' },
            acceleration: { value: '3.2', unit: 's (0-100)', icon: '⏱' }
        },
        performance: {
            power: 52, speed: 65, aero: 85, reliability: 60, braking: 55, handling: 80
        },
        techSpecs: {
            'Engine': 'Ford Cosworth DFV V8',
            'Displacement': '3.0L',
            'Power Output': '485 HP @ 10,800 RPM',
            'Aspiration': 'Naturally aspirated',
            'Gearbox': 'Hewland FGA 5-speed manual',
            'Chassis': 'Aluminium monocoque',
            'Suspension': 'Double-wishbone (front & rear)',
            'Brakes': 'Ventilated disc',
            'Tyres': 'Goodyear',
            'Innovation': 'Ground-effect aerodynamics',
            'Weight': '580 kg',
            'Top Speed': '~310 km/h'
        },
        drivers: [
            { name: 'Mario Andretti', role: 'Driver #5 — World Champion 1978', emoji: '🇺🇸' },
            { name: 'Ronnie Peterson', role: 'Driver #6', emoji: '🇸🇪' }
        ],
        history: [
            { date: '1977', text: 'Ground effect tested on Lotus 78' },
            { date: 'Jan 1978', text: 'Lotus 79 — perfected ground-effect design' },
            { date: 'Jun 1978', text: 'Andretti dominates early season' },
            { date: 'Sep 1978', text: 'Andretti crowned World Champion' },
            { date: 'legacy', text: 'Changed F1 aerodynamics forever' }
        ],
        highlights: [
            { icon: '', value: '6 Wins', label: 'Championship Season' },
            { icon: '', value: 'Ground Effect', label: 'Revolutionary Innovation' },
            { icon: '🇺🇸', value: 'Andretti', label: 'Last American Champion' }
        ]
    },
    'williams-fw14b': {
        name: 'Williams FW14B',
        team: 'Williams Renault',
        year: 1992,
        price: '$20,000,000',
        type: 'classic',
        badge: 'Classic Legend',
        badgeBg: '#d4af37',
        badgeColor: '#000',
        heroGradient: 'linear-gradient(135deg, #003399 0%, #001155 100%)',
        wiki: 'Williams_FW14B',
        subtitle: '1992 • V10 3.5L Renault • Grove, UK',
        description: 'The Williams FW14B is one of the most technically advanced F1 cars ever built. Designed by Adrian Newey and Patrick Head, it featured active suspension, traction control, and anti-lock brakes. Nigel Mansell dominated the 1992 season, winning the first 5 races in a row.',
        specs: {
            power: { value: '750', unit: 'HP', icon: '' },
            topSpeed: { value: '340', unit: 'km/h', icon: '' },
            weight: { value: '505', unit: 'kg', icon: '' },
            acceleration: { value: '2.5', unit: 's (0-100)', icon: '⏱' }
        },
        performance: {
            power: 75, speed: 82, aero: 88, reliability: 82, braking: 79, handling: 95
        },
        techSpecs: {
            'Engine': 'Renault RS4 V10',
            'Displacement': '3.5L',
            'Power Output': '750 HP @ 13,500 RPM',
            'Aspiration': 'Naturally aspirated',
            'Gearbox': '6-speed semi-automatic',
            'Chassis': 'Carbon fibre monocoque',
            'Suspension': 'Active hydraulic (computer-controlled)',
            'Brakes': 'Carbon disc, ABS',
            'Tyres': 'Goodyear',
            'Innovations': 'Active suspension, traction control',
            'Weight': '505 kg (min)',
            'Top Speed': '~340 km/h'
        },
        drivers: [
            { name: 'Nigel Mansell', role: 'Driver #5 — World Champion 1992', emoji: '🇬🇧' },
            { name: 'Riccardo Patrese', role: 'Driver #6', emoji: '🇮🇹' }
        ],
        history: [
            { date: 'Feb 1992', text: 'FW14B unveiled — active suspension debut' },
            { date: 'Mar 1992', text: 'Mansell wins 5 of first 5 races' },
            { date: 'Jul 1992', text: 'Records 9 wins from 11 races' },
            { date: 'Aug 1992', text: 'Mansell clinches title at Hungarian GP' },
            { date: 'Nov 1992', text: '10 wins — Williams domination complete' }
        ],
        highlights: [
            { icon: '', value: '10 Wins', label: 'Dominant Season' },
            { icon: '', value: 'Active Suspension', label: 'Tech Revolution' },
            { icon: '🇬🇧', value: 'Mansell', label: 'Il Leone Champion' }
        ]
    }
};

// Car order for prev/next navigation
const CAR_ORDER = [
    'ferrari-sf-23', 'red-bull-rb19', 'mercedes-w11', 'mclaren-mcl60',
    'alpine-a523', 'aston-martin-amr23', 'ferrari-f2004', 'mclaren-mp4-4',
    'lotus-79', 'williams-fw14b'
];

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get('car');

    if (!carId || !CAR_DATABASE[carId]) {
        window.location.href = 'products.html';
        return;
    }

    const car = CAR_DATABASE[carId];
    renderCarDetail(car, carId);
    loadDetailPhoto(car);

    // Animate sections on scroll (since script.js only targets card-type elements)
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                sectionObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.cd-section.animate-on-scroll').forEach(el => {
        sectionObserver.observe(el);
    });

    // Animate perf bars when visible
    const barsObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animatePerfBars();
                barsObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });
    const barsEl = document.getElementById('perfBars');
    if (barsEl) barsObserver.observe(barsEl);

    // Draw radar when visible
    const radarObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                drawRadar(car);
                radarObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });
    const radarEl = document.getElementById('radarCanvas');
    if (radarEl) radarObserver.observe(radarEl);
});

function renderCarDetail(car, carId) {
    /* Title */
    document.title = `${car.name} — Grand Prix Motors`;

    /* Hero background gradient */
    const heroBg = document.getElementById('cdHeroBg');
    if (heroBg) heroBg.style.background = car.heroGradient;

    /* Badge */
    const badge = document.getElementById('heroBadge');
    badge.textContent = car.badge;
    badge.style.background = car.badgeBg;
    badge.style.color = car.badgeColor;

    /* Name, team, subtitle, price */
    document.getElementById('heroName').textContent = car.name;
    document.getElementById('heroTeam').textContent = car.team;
    document.getElementById('heroSubtitle').textContent = car.subtitle;
    document.getElementById('heroPrice').textContent = car.price;

    /* Description */
    document.getElementById('carDescription').textContent = car.description;

    /* Specs grid */
    const specsGrid = document.getElementById('specsGrid');
    specsGrid.innerHTML = '';
    const specNames = { HP: 'Power', 'km/h': 'Top Speed', kg: 'Weight' };
    Object.values(car.specs).forEach(s => {
        const label = s.unit.includes('0-100') ? 'Acceleration' : (specNames[s.unit] || s.unit);
        specsGrid.innerHTML += `
            <div class="cd-spec-card">
                <div class="cd-spec-icon">${s.icon}</div>
                <div class="cd-spec-value">${s.value}<small>${s.unit}</small></div>
                <div class="cd-spec-label">${label}</div>
            </div>`;
    });

    /* Performance bars */
    const perfBars = document.getElementById('perfBars');
    perfBars.innerHTML = '';
    const perfLabels = {
        power: 'Power', speed: 'Top Speed', aero: 'Aerodynamics',
        reliability: 'Reliability', braking: 'Braking', handling: 'Handling'
    };
    Object.entries(car.performance).forEach(([key, val]) => {
        const color = val >= 90 ? '#22c55e' : val >= 80 ? car.badgeBg : val >= 60 ? '#f59e0b' : '#ef4444';
        perfBars.innerHTML += `
            <div class="cd-bar-item">
                <div class="cd-bar-header">
                    <span class="cd-bar-label">${perfLabels[key]}</span>
                    <span class="cd-bar-val">${val}/100</span>
                </div>
                <div class="cd-bar-track">
                    <div class="cd-bar-fill" data-width="${val}" style="background:${color};"></div>
                </div>
            </div>`;
    });

    /* Tech specs */
    const techList = document.getElementById('techList');
    techList.innerHTML = '';
    Object.entries(car.techSpecs).forEach(([label, value]) => {
        techList.innerHTML += `
            <div class="cd-tech-row">
                <span class="cd-tech-label">${label}</span>
                <span class="cd-tech-value">${value}</span>
            </div>`;
    });

    /* Drivers */
    const driverList = document.getElementById('driverList');
    driverList.innerHTML = '';
    car.drivers.forEach(d => {
        driverList.innerHTML += `
            <div class="cd-driver-item">
                <div class="cd-driver-avatar" style="background:${car.badgeBg}22;border:2px solid ${car.badgeBg}44">${d.emoji}</div>
                <div class="cd-driver-info">
                    <div class="cd-driver-name">${d.name}</div>
                    <div class="cd-driver-role">${d.role}</div>
                </div>
            </div>`;
    });

    /* Timeline */
    const timeline = document.getElementById('carTimeline');
    timeline.innerHTML = '';
    car.history.forEach(h => {
        timeline.innerHTML += `
            <div class="cd-timeline-item">
                <div class="cd-timeline-date">${h.date}</div>
                <div class="cd-timeline-text">${h.text}</div>
            </div>`;
    });

    /* Highlights */
    const highlights = document.getElementById('highlights');
    if (highlights && car.highlights) {
        highlights.innerHTML = '';
        car.highlights.forEach(h => {
            highlights.innerHTML += `
                <div class="cd-highlight-card">
                    <div class="cd-highlight-icon">${h.icon}</div>
                    <div class="cd-highlight-value">${h.value}</div>
                    <div class="cd-highlight-label">${h.label}</div>
                </div>`;
        });
    }

    /* Prev / Next */
    const idx = CAR_ORDER.indexOf(carId);
    const prevIdx = (idx - 1 + CAR_ORDER.length) % CAR_ORDER.length;
    const nextIdx = (idx + 1) % CAR_ORDER.length;
    const prevCar = CAR_DATABASE[CAR_ORDER[prevIdx]];
    const nextCar = CAR_DATABASE[CAR_ORDER[nextIdx]];

    const prevEl = document.getElementById('prevCar');
    const nextEl = document.getElementById('nextCar');
    prevEl.href = `car-detail.html?car=${CAR_ORDER[prevIdx]}`;
    prevEl.querySelector('.cd-nav-name').textContent = prevCar.name;
    nextEl.href = `car-detail.html?car=${CAR_ORDER[nextIdx]}`;
    nextEl.querySelector('.cd-nav-name').textContent = nextCar.name;

    /* Driver Profile */
    renderDriverProfile(car);
}

function loadDetailPhoto(car) {
    const heroImg = document.getElementById('heroImg');
    if (!heroImg || !car.wiki) return;

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(car.wiki)}`)
        .then(res => res.json())
        .then(data => {
            /* Prefer original image (full resolution), fallback to 4K thumbnail */
            let src4k = null;
            if (data.originalimage && data.originalimage.source) {
                src4k = data.originalimage.source;
            } else if (data.thumbnail && data.thumbnail.source) {
                src4k = data.thumbnail.source.replace(/\/\d+px-/, '/3840px-');
            }
            if (!src4k) return;

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                heroImg.src = src4k;
                requestAnimationFrame(() => heroImg.classList.add('loaded'));
            };
            img.onerror = () => {
                /* Fallback: try 3840px resize of thumbnail */
                const fallback = data.thumbnail
                    ? data.thumbnail.source.replace(/\/\d+px-/, '/3840px-')
                    : null;
                if (fallback && fallback !== src4k) {
                    const img2 = new Image();
                    img2.crossOrigin = 'anonymous';
                    img2.onload = () => {
                        heroImg.src = fallback;
                        requestAnimationFrame(() => heroImg.classList.add('loaded'));
                    };
                    img2.onerror = () => {
                        /* Last resort: original thumbnail */
                        heroImg.src = data.thumbnail.source;
                        requestAnimationFrame(() => heroImg.classList.add('loaded'));
                    };
                    img2.src = fallback;
                } else if (data.thumbnail) {
                    heroImg.src = data.thumbnail.source;
                    requestAnimationFrame(() => heroImg.classList.add('loaded'));
                }
            };
            img.src = src4k;
        })
        .catch(() => {});
}

function animatePerfBars() {
    requestAnimationFrame(() => {
        document.querySelectorAll('.cd-bar-fill[data-width]').forEach((bar, i) => {
            setTimeout(() => {
                bar.style.width = bar.getAttribute('data-width') + '%';
                setTimeout(() => bar.classList.add('animated'), 800);
            }, i * 100);
        });
    });
}

function drawRadar(car) {
    const canvas = document.getElementById('radarCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(cx, cy) - 30;
    const keys = ['power', 'speed', 'aero', 'reliability', 'braking', 'handling'];
    const labels = ['Power', 'Speed', 'Aero', 'Reliability', 'Braking', 'Handling'];
    const n = keys.length;

    ctx.clearRect(0, 0, W, H);

    // Grid
    for (let level = 1; level <= 5; level++) {
        const r = (R / 5) * level;
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Axes
    for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.stroke();
    }

    // Data polygon
    ctx.beginPath();
    keys.forEach((key, i) => {
        const val = car.performance[key] / 100;
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        const x = cx + R * val * Math.cos(angle);
        const y = cy + R * val * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = car.badgeBg + '33';
    ctx.fill();
    ctx.strokeStyle = car.badgeBg;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Points
    keys.forEach((key, i) => {
        const val = car.performance[key] / 100;
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        const x = cx + R * val * Math.cos(angle);
        const y = cy + R * val * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = car.badgeBg;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    });

    // Labels
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.textAlign = 'center';
    labels.forEach((label, i) => {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        const x = cx + (R + 20) * Math.cos(angle);
        const y = cy + (R + 20) * Math.sin(angle);
        ctx.fillText(label, x, y + 4);
    });
}

/* ============================================
   Driver Profile Data (per car)
   ============================================ */
const DRIVER_PROFILES = {
    'ferrari-sf-23': {
        primary: {
            name: 'Charles Leclerc', number: 16, country: 'Monaco',
            flag: '🇲🇨', team: 'Scuderia Ferrari', teamColor: '#e10600',
            dob: '16 Oct 1997', podiums: 32, wins: 7, championships: 0,
            fastestLaps: 8, seasonsInF1: 6, pointsCareer: 1130,
            bio: 'Charles Leclerc has been the spearhead of Scuderia Ferrari since 2019. Known for his raw speed and qualifying mastery, Leclerc consistently extracts maximum performance, often taking the SF-23 beyond its expected potential.'
        },
        secondary: {
            name: 'Carlos Sainz Jr.', number: 55, country: 'Spain',
            flag: '🇪🇸', team: 'Scuderia Ferrari', teamColor: '#e10600',
            dob: '1 Sep 1994', podiums: 20, wins: 3, championships: 0,
            fastestLaps: 5, seasonsInF1: 9, pointsCareer: 980,
            bio: 'Carlos Sainz Jr. is a consistent, calculating racer. His Singapore GP 2023 victory demonstrated the combination of strategic intelligence and racecraft that makes him a key asset for Ferrari.'
        }
    },
    'red-bull-rb19': {
        primary: {
            name: 'Max Verstappen', number: 1, country: 'Netherlands',
            flag: '🇳🇱', team: 'Red Bull Racing', teamColor: '#1e3a8a',
            dob: '30 Sep 1997', podiums: 105, wins: 54, championships: 3,
            fastestLaps: 32, seasonsInF1: 9, pointsCareer: 2586,
            bio: 'Max Verstappen rewrote the record books in 2023, claiming 19 victories in a single season. His combination of raw pace, tire management, and race intelligence made the RB19 virtually unbeatable.'
        },
        secondary: {
            name: 'Sergio Pérez', number: 11, country: 'Mexico',
            flag: '🇲🇽', team: 'Red Bull Racing', teamColor: '#1e3a8a',
            dob: '26 Jan 1990', podiums: 35, wins: 6, championships: 0,
            fastestLaps: 11, seasonsInF1: 13, pointsCareer: 1480,
            bio: 'Sergio Pérez played a crucial supporting role in Red Bull\'s dominant 2023 campaign. His experience in tire management and consistency earned him 2nd in the Drivers\' Championship.'
        }
    },
    'mercedes-w11': {
        primary: {
            name: 'Lewis Hamilton', number: 44, country: 'United Kingdom',
            flag: '🇬🇧', team: 'Mercedes-AMG Petronas', teamColor: '#00d2be',
            dob: '7 Jan 1985', podiums: 197, wins: 103, championships: 7,
            fastestLaps: 65, seasonsInF1: 17, pointsCareer: 4639,
            bio: 'Lewis Hamilton used the W11 to clinch his record-equalling 7th World Championship. His ability to extract pace in all conditions, combined with unrivalled race experience, made him near-perfect in 2020.'
        },
        secondary: {
            name: 'Valtteri Bottas', number: 77, country: 'Finland',
            flag: '🇫🇮', team: 'Mercedes-AMG Petronas', teamColor: '#00d2be',
            dob: '28 Aug 1989', podiums: 67, wins: 10, championships: 0,
            fastestLaps: 19, seasonsInF1: 11, pointsCareer: 1797,
            bio: 'Valtteri Bottas provided strong support with 2 victories in 2020 and played a key role in securing Mercedes\' 7th consecutive Constructors\' Championship.'
        }
    },
    'mclaren-mcl60': {
        primary: {
            name: 'Lando Norris', number: 4, country: 'United Kingdom',
            flag: '🇬🇧', team: 'McLaren F1 Team', teamColor: '#ff8000',
            dob: '13 Nov 1999', podiums: 18, wins: 2, championships: 0,
            fastestLaps: 8, seasonsInF1: 5, pointsCareer: 780,
            bio: 'Lando Norris emerged as one of the top drivers of 2023. His consistency and raw speed, especially after McLaren\'s mid-season upgrade, proved he is a future championship contender.'
        },
        secondary: {
            name: 'Oscar Piastri', number: 81, country: 'Australia',
            flag: '🇦🇺', team: 'McLaren F1 Team', teamColor: '#ff8000',
            dob: '6 Apr 2001', podiums: 6, wins: 1, championships: 0,
            fastestLaps: 2, seasonsInF1: 2, pointsCareer: 310,
            bio: 'Oscar Piastri impressed immediately as a rookie, delivering mature drives and a sprint victory in his debut season at McLaren.'
        }
    },
    'alpine-a523': {
        primary: {
            name: 'Pierre Gasly', number: 10, country: 'France',
            flag: '🇫🇷', team: 'BWT Alpine F1', teamColor: '#2293d1',
            dob: '7 Feb 1996', podiums: 5, wins: 1, championships: 0,
            fastestLaps: 3, seasonsInF1: 7, pointsCareer: 400,
            bio: 'Pierre Gasly joined Alpine for 2023, bringing speed and determination. His racecraft and consistent points finishes demonstrated his quality as a top midfield performer.'
        },
        secondary: {
            name: 'Esteban Ocon', number: 31, country: 'France',
            flag: '🇫🇷', team: 'BWT Alpine F1', teamColor: '#2293d1',
            dob: '17 Sep 1996', podiums: 3, wins: 1, championships: 0,
            fastestLaps: 2, seasonsInF1: 7, pointsCareer: 395,
            bio: 'Esteban Ocon brought consistent performances and a fierce competitive spirit to the Alpine garage alongside his compatriot Gasly.'
        }
    },
    'aston-martin-amr23': {
        primary: {
            name: 'Fernando Alonso', number: 14, country: 'Spain',
            flag: '🇪🇸', team: 'Aston Martin Aramco', teamColor: '#358c75',
            dob: '29 Jul 1981', podiums: 106, wins: 32, championships: 2,
            fastestLaps: 23, seasonsInF1: 22, pointsCareer: 2267,
            bio: 'Fernando Alonso produced a stunning 2023 comeback with Aston Martin, claiming 8 podiums and demonstrating that at 42 he remains one of the greatest drivers of all time.'
        },
        secondary: {
            name: 'Lance Stroll', number: 18, country: 'Canada',
            flag: '🇨🇦', team: 'Aston Martin Aramco', teamColor: '#358c75',
            dob: '29 Oct 1998', podiums: 3, wins: 0, championships: 0,
            fastestLaps: 1, seasonsInF1: 7, pointsCareer: 290,
            bio: 'Lance Stroll contributed solid points finishes throughout the season, supporting the team\'s best Constructors\' result.'
        }
    },
    'ferrari-f2004': {
        primary: {
            name: 'Michael Schumacher', number: 1, country: 'Germany',
            flag: '🇩🇪', team: 'Scuderia Ferrari', teamColor: '#e10600',
            dob: '3 Jan 1969', podiums: 155, wins: 91, championships: 7,
            fastestLaps: 77, seasonsInF1: 19, pointsCareer: 1566,
            bio: 'Michael Schumacher dominated the 2004 season with 13 victories, clinching his 7th and final Championship. The combination of Schumacher and the F2004 remains the benchmark for F1 perfection.'
        },
        secondary: {
            name: 'Rubens Barrichello', number: 2, country: 'Brazil',
            flag: '🇧🇷', team: 'Scuderia Ferrari', teamColor: '#e10600',
            dob: '23 May 1972', podiums: 68, wins: 11, championships: 0,
            fastestLaps: 17, seasonsInF1: 19, pointsCareer: 658,
            bio: 'Rubens Barrichello added 2 more victories in 2004, showcasing the car\'s dominance and serving as the perfect wingman to Schumacher.'
        }
    },
    'mclaren-mp4-4': {
        primary: {
            name: 'Ayrton Senna', number: 12, country: 'Brazil',
            flag: '🇧🇷', team: 'McLaren Honda', teamColor: '#dc0000',
            dob: '21 Mar 1960', podiums: 80, wins: 41, championships: 3,
            fastestLaps: 19, seasonsInF1: 11, pointsCareer: 614,
            bio: 'Ayrton Senna won his first World Championship in the MP4/4, taking 8 victories with mesmerizing qualifying performances. Widely regarded as the most naturally gifted driver in F1 history.'
        },
        secondary: {
            name: 'Alain Prost', number: 11, country: 'France',
            flag: '🇫🇷', team: 'McLaren Honda', teamColor: '#dc0000',
            dob: '24 Feb 1955', podiums: 106, wins: 51, championships: 4,
            fastestLaps: 41, seasonsInF1: 13, pointsCareer: 798,
            bio: 'Alain Prost, "The Professor," won 7 races in 1988 but narrowly lost the title to Senna. Their intense rivalry remains the most legendary in motorsport.'
        }
    },
    'lotus-79': {
        primary: {
            name: 'Mario Andretti', number: 5, country: 'United States',
            flag: '🇺🇸', team: 'Team Lotus', teamColor: '#c4a747',
            dob: '28 Feb 1940', podiums: 19, wins: 12, championships: 1,
            fastestLaps: 10, seasonsInF1: 14, pointsCareer: 180,
            bio: 'Mario Andretti won the 1978 World Championship driving the revolutionary ground-effect Lotus 79. He remains the last American to claim the F1 Drivers\' title.'
        },
        secondary: {
            name: 'Ronnie Peterson', number: 6, country: 'Sweden',
            flag: '🇸🇪', team: 'Team Lotus', teamColor: '#c4a747',
            dob: '14 Feb 1944', podiums: 26, wins: 10, championships: 0,
            fastestLaps: 9, seasonsInF1: 10, pointsCareer: 206,
            bio: 'Ronnie Peterson, "SuperSwede," was one of the most spectacular racers of his era. His tragic death at the 1978 Italian GP shook the entire racing world.'
        }
    },
    'williams-fw14b': {
        primary: {
            name: 'Nigel Mansell', number: 5, country: 'United Kingdom',
            flag: '🇬🇧', team: 'Williams Renault', teamColor: '#003399',
            dob: '8 Aug 1953', podiums: 59, wins: 31, championships: 1,
            fastestLaps: 30, seasonsInF1: 15, pointsCareer: 482,
            bio: 'Nigel Mansell dominated the 1992 season with 9 victories, including the first 5 races. "Il Leone" finally claimed his well-deserved Championship in the technologically revolutionary FW14B.'
        },
        secondary: {
            name: 'Riccardo Patrese', number: 6, country: 'Italy',
            flag: '🇮🇹', team: 'Williams Renault', teamColor: '#003399',
            dob: '17 Apr 1954', podiums: 37, wins: 6, championships: 0,
            fastestLaps: 13, seasonsInF1: 17, pointsCareer: 281,
            bio: 'Riccardo Patrese added 1 victory in 1992 and finished 2nd in the Constructors\', supporting Williams\' dominant 1-2 championship finish.'
        }
    }
};

function renderDriverProfile(car) {
    const container = document.getElementById('driverProfile');
    const section = document.getElementById('driverProfileSection');
    if (!container || !section) return;

    const params = new URLSearchParams(window.location.search);
    const carId = params.get('car');
    const profiles = DRIVER_PROFILES[carId];
    if (!profiles) { section.style.display = 'none'; return; }

    const renderCard = (driver, isPrimary) => `
        <div class="dp-card ${isPrimary ? 'dp-card-primary' : ''}" style="border-left: 4px solid ${driver.teamColor};">
            <div class="dp-card-header" style="background: linear-gradient(180deg, ${driver.teamColor}18, ${driver.teamColor}08);">
                <div class="dp-number" style="color: ${driver.teamColor};">${driver.number}</div>
                <div class="dp-flag">${driver.flag}</div>
                <div class="dp-driver-number-display" style="color: ${driver.teamColor};">#${driver.number}</div>
            </div>
            <div class="dp-card-body">
                <div class="dp-name-block">
                    <h3 class="dp-name">${driver.name}</h3>
                    <div class="dp-team" style="color: ${driver.teamColor};">${driver.team}</div>
                    <div class="dp-country">${driver.country} &bull; Born ${driver.dob}</div>
                </div>
                <p class="dp-bio">${driver.bio}</p>
                <div class="dp-stats-grid">
                    <div class="dp-stat">
                        <div class="dp-stat-val" style="color: ${driver.teamColor};">${driver.wins}</div>
                        <div class="dp-stat-label">Race Wins</div>
                    </div>
                    <div class="dp-stat">
                        <div class="dp-stat-val" style="color: ${driver.teamColor};">${driver.podiums}</div>
                        <div class="dp-stat-label">Podiums</div>
                    </div>
                    <div class="dp-stat">
                        <div class="dp-stat-val" style="color: ${driver.teamColor};">${driver.championships}</div>
                        <div class="dp-stat-label">Championships</div>
                    </div>
                    <div class="dp-stat">
                        <div class="dp-stat-val" style="color: ${driver.teamColor};">${driver.pointsCareer}</div>
                        <div class="dp-stat-label">Career Points</div>
                    </div>
                    <div class="dp-stat">
                        <div class="dp-stat-val" style="color: ${driver.teamColor};">${driver.fastestLaps}</div>
                        <div class="dp-stat-label">Fastest Laps</div>
                    </div>
                    <div class="dp-stat">
                        <div class="dp-stat-val" style="color: ${driver.teamColor};">${driver.seasonsInF1}</div>
                        <div class="dp-stat-label">F1 Seasons</div>
                    </div>
                </div>
            </div>
        </div>`;

    container.innerHTML = renderCard(profiles.primary, true) + renderCard(profiles.secondary, false);
}
