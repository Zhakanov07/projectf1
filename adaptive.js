/* ============================================
   Adaptive Pattern - Telemetry Adapter Demo
   ============================================ */

class FerrariGarageUnit {
    sample() {
        return {
            carId: '16',
            lastLapMs: 78642,
            tyreCompound: 'S',
            ersPct: 74,
            fuelKg: 41.2,
            mode: 'Qualifying Push'
        };
    }
}

class FiaTimingFeed {
    read() {
        return {
            driverNumber: '1',
            lap_time: '1:18.924',
            stint: 'Medium',
            battery: '68%',
            fuel_remaining_l: 47.5,
            status: 'Track clear'
        };
    }
}

class WeatherStation {
    currentTrack() {
        return {
            track: 'Silverstone',
            gripIndex: 91,
            rainChance: '24%',
            windKph: 18,
            ambientC: 23,
            warning: 'Crosswind in sector 2'
        };
    }
}

class FerrariTelemetryAdapter {
    constructor(unit) {
        this.unit = unit;
    }

    getSnapshot() {
        const raw = this.unit.sample();
        return {
            source: 'Ferrari Garage Unit',
            vehicle: 'Car #' + raw.carId,
            lapTime: formatLapTime(raw.lastLapMs),
            tyre: raw.tyreCompound === 'S' ? 'Soft' : raw.tyreCompound,
            energy: raw.ersPct + '%',
            fuel: raw.fuelKg.toFixed(1) + ' kg',
            note: raw.mode
        };
    }
}

class FiaTimingAdapter {
    constructor(feed) {
        this.feed = feed;
    }

    getSnapshot() {
        const raw = this.feed.read();
        return {
            source: 'FIA Timing Feed',
            vehicle: 'Driver #' + raw.driverNumber,
            lapTime: raw.lap_time,
            tyre: raw.stint,
            energy: raw.battery,
            fuel: raw.fuel_remaining_l.toFixed(1) + ' L',
            note: raw.status
        };
    }
}

class WeatherFeedAdapter {
    constructor(station) {
        this.station = station;
    }

    getSnapshot() {
        const raw = this.station.currentTrack();
        return {
            source: 'Weather Radar',
            vehicle: raw.track,
            lapTime: 'Grip ' + raw.gripIndex + '/100',
            tyre: 'Rain risk ' + raw.rainChance,
            energy: 'Wind ' + raw.windKph + ' km/h',
            fuel: raw.ambientC + ' C',
            note: raw.warning
        };
    }
}

const adaptiveSources = {
    ferrari: {
        label: 'Ferrari Garage Unit',
        accent: '#e10600',
        legacyMethod: 'sample()',
        getRaw() {
            return new FerrariGarageUnit().sample();
        },
        createAdapter() {
            return new FerrariTelemetryAdapter(new FerrariGarageUnit());
        }
    },
    fia: {
        label: 'FIA Timing Feed',
        accent: '#2563eb',
        legacyMethod: 'read()',
        getRaw() {
            return new FiaTimingFeed().read();
        },
        createAdapter() {
            return new FiaTimingAdapter(new FiaTimingFeed());
        }
    },
    weather: {
        label: 'Weather Radar',
        accent: '#14b8a6',
        legacyMethod: 'currentTrack()',
        getRaw() {
            return new WeatherStation().currentTrack();
        },
        createAdapter() {
            return new WeatherFeedAdapter(new WeatherStation());
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const sourceList = document.getElementById('adapterSourceList');
    const rawPayload = document.getElementById('rawPayload');
    const normalizedMetrics = document.getElementById('normalizedMetrics');
    const adaptiveLog = document.getElementById('adaptiveLog');
    const codePreview = document.getElementById('adapterCodePreview');
    const normalizeSelected = document.getElementById('normalizeSelected');
    const normalizeAll = document.getElementById('normalizeAll');
    const clearAdaptiveLog = document.getElementById('clearAdaptiveLog');

    if (!sourceList) return;

    let activeSourceKey = 'ferrari';
    let logEntries = [];

    updateSourceSelection();
    renderRawPayload();
    renderCodePreview();

    sourceList.addEventListener('click', event => {
        const button = event.target.closest('.adaptive-source');
        if (!button) return;
        activeSourceKey = button.dataset.source;
        updateSourceSelection();
        renderRawPayload();
        renderCodePreview();
    });

    normalizeSelected.addEventListener('click', () => {
        adaptSource(activeSourceKey);
    });

    normalizeAll.addEventListener('click', () => {
        Object.keys(adaptiveSources).forEach(sourceKey => adaptSource(sourceKey));
    });

    clearAdaptiveLog.addEventListener('click', () => {
        logEntries = [];
        adaptiveLog.innerHTML = '<div class="adaptive-empty-log">No transformations yet.</div>';
        normalizedMetrics.innerHTML = '<div class="adaptive-empty">Run an adapter to build a normalized snapshot.</div>';
    });

    function adaptSource(sourceKey) {
        const source = adaptiveSources[sourceKey];
        const snapshot = source.createAdapter().getSnapshot();
        renderSnapshot(snapshot, source.accent);
        logEntries.unshift({
            source: source.label,
            detail: 'Translated ' + source.legacyMethod + ' into getSnapshot() for the strategy dashboard.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        });
        renderLog();
        activeSourceKey = sourceKey;
        updateSourceSelection();
        renderRawPayload();
        renderCodePreview();
    }

    function updateSourceSelection() {
        sourceList.querySelectorAll('.adaptive-source').forEach(button => {
            button.classList.toggle('active', button.dataset.source === activeSourceKey);
        });
    }

    function renderRawPayload() {
        rawPayload.textContent = JSON.stringify(adaptiveSources[activeSourceKey].getRaw(), null, 2);
    }

    function renderSnapshot(snapshot, accent) {
        const metricEntries = [
            ['Source', snapshot.source],
            ['Target', snapshot.vehicle],
            ['Lap / grip', snapshot.lapTime],
            ['Tyre / risk', snapshot.tyre],
            ['Energy / wind', snapshot.energy],
            ['Fuel / temp', snapshot.fuel],
            ['Status', snapshot.note]
        ];

        normalizedMetrics.innerHTML = metricEntries.map(([label, value]) => {
            return '<div class="adaptive-metric" style="border-color:' + accent + '33;">' +
                '<div class="adaptive-metric-label">' + label + '</div>' +
                '<div class="adaptive-metric-value">' + value + '</div>' +
                '</div>';
        }).join('');
    }

    function renderLog() {
        adaptiveLog.innerHTML = logEntries.map(entry => {
            return '<div class="adaptive-log-entry">' +
                '<div class="adaptive-log-meta"><span>' + entry.source + '</span><span>' + entry.time + '</span></div>' +
                '<div class="adaptive-log-text">' + entry.detail + '</div>' +
                '</div>';
        }).join('');
    }

    function renderCodePreview() {
        const source = adaptiveSources[activeSourceKey];
        codePreview.textContent = [
            'const legacy = new ' + source.label.replace(/\s+/g, '') + '();',
            'const adapter = registry.' + activeSourceKey + '.createAdapter();',
            'const snapshot = adapter.getSnapshot();',
            '',
            '// Client code stays stable',
            'strategyDashboard.render(snapshot);'
        ].join('\n');
    }
});

function formatLapTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return minutes + ':' + String(seconds).padStart(2, '0') + '.' + String(milliseconds).padStart(3, '0');
}