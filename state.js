class RaceSession {
    constructor() {
        this.setState(new PracticeState());
    }

    setState(state) {
        this.state = state;
    }

    accelerate() {
        return this.state.accelerate(this);
    }

    pitStop() {
        return this.state.pitStop(this);
    }

    toggleSafetyCar() {
        if (this.state instanceof SafetyCarState) {
            this.setState(this.state.previousState || new RaceState());
            return "Safety car ended. The session returns to the previous racing state.";
        }

        if (this.state instanceof FinishedState) {
            return "The race is already finished. Safety car cannot be deployed.";
        }

        this.setState(new SafetyCarState(this.state));
        return "Safety car deployed. All drivers must slow down and hold position.";
    }

    nextPhase() {
        return this.state.nextPhase(this);
    }

    reset() {
        this.setState(new PracticeState());
        return "Session reset to Practice State.";
    }

    getSnapshot() {
        return this.state.getSnapshot();
    }
}

class RaceStateBase {
    constructor(config) {
        this.config = config;
    }

    accelerate() {
        return this.config.accelerate;
    }

    pitStop() {
        return this.config.pitStop;
    }

    nextPhase() {
        return this.config.nextPhaseMessage;
    }

    getSnapshot() {
        return this.config;
    }
}

class PracticeState extends RaceStateBase {
    constructor() {
        super({
            key: "practice",
            name: "Practice Session",
            stateName: "Practice State",
            icon: "\u{1F527}",
            description: "Teams collect data, test setups, and avoid unnecessary risk.",
            speedMode: "Controlled",
            pitMode: "Setup changes",
            riskMode: "Low",
            color: "#22c55e",
            softColor: "rgba(34, 197, 94, 0.18)",
            accelerate: "Practice State: the driver increases speed carefully to collect telemetry.",
            pitStop: "Practice State: pit stop focuses on setup changes and sensor checks.",
            nextPhaseMessage: "Practice completed. The session moves to Qualifying State.",
        });
    }

    nextPhase(context) {
        context.setState(new QualifyingState());
        return this.config.nextPhaseMessage;
    }
}

class QualifyingState extends RaceStateBase {
    constructor() {
        super({
            key: "qualifying",
            name: "Qualifying Session",
            stateName: "Qualifying State",
            icon: "\u{23F1}",
            description: "The car uses maximum grip and energy deployment for one flying lap.",
            speedMode: "One-lap push",
            pitMode: "Tyre preparation",
            riskMode: "Medium",
            color: "#a855f7",
            softColor: "rgba(168, 85, 247, 0.18)",
            accelerate: "Qualifying State: the driver uses full battery deployment for a flying lap.",
            pitStop: "Qualifying State: the team fits fresh soft tyres for another attempt.",
            nextPhaseMessage: "Qualifying completed. The session moves to Race State.",
        });
    }

    nextPhase(context) {
        context.setState(new RaceState());
        return this.config.nextPhaseMessage;
    }
}

class RaceState extends RaceStateBase {
    constructor() {
        super({
            key: "race",
            name: "Grand Prix Race",
            stateName: "Race State",
            icon: "\u{1F3CE}",
            description: "The driver balances attack, tyre wear, fuel saving, and strategy.",
            speedMode: "Race pace",
            pitMode: "Strategic stop",
            riskMode: "High",
            color: "#e10600",
            softColor: "rgba(225, 6, 0, 0.18)",
            accelerate: "Race State: the driver attacks with full race power and DRS when available.",
            pitStop: "Race State: the team performs a timed tyre stop for track position.",
            nextPhaseMessage: "The chequered flag falls. The session moves to Finished State.",
        });
    }

    nextPhase(context) {
        context.setState(new FinishedState());
        return this.config.nextPhaseMessage;
    }
}

class SafetyCarState extends RaceStateBase {
    constructor(previousState) {
        super({
            key: "safety",
            name: "Safety Car Period",
            stateName: "Safety Car State",
            icon: "\u{1F6A8}",
            description: "The field slows down, overtaking is restricted, and strategy changes quickly.",
            speedMode: "Limited",
            pitMode: "Opportunistic",
            riskMode: "Managed",
            color: "#facc15",
            softColor: "rgba(250, 204, 21, 0.18)",
            accelerate: "Safety Car State: acceleration is limited and overtaking is not allowed.",
            pitStop: "Safety Car State: a cheap pit stop is possible while the field is slow.",
            nextPhaseMessage: "Safety car withdrawn. The session returns to racing conditions.",
        });
        this.previousState = previousState;
    }

    nextPhase(context) {
        context.setState(this.previousState || new RaceState());
        return this.config.nextPhaseMessage;
    }
}

class FinishedState extends RaceStateBase {
    constructor() {
        super({
            key: "finished",
            name: "Race Finished",
            stateName: "Finished State",
            icon: "\u{1F3C1}",
            description: "The result is locked. Cars return to parc ferme and no racing actions remain.",
            speedMode: "Cool down",
            pitMode: "Closed",
            riskMode: "None",
            color: "#94a3b8",
            softColor: "rgba(148, 163, 184, 0.18)",
            accelerate: "Finished State: the race is over, so acceleration is only a cool-down lap.",
            pitStop: "Finished State: pit stops are closed because the session is complete.",
            nextPhaseMessage: "Finished State: there is no next racing phase.",
        });
    }
}

const stateOrder = [
    new PracticeState().getSnapshot(),
    new QualifyingState().getSnapshot(),
    new RaceState().getSnapshot(),
    new SafetyCarState(new RaceState()).getSnapshot(),
    new FinishedState().getSnapshot(),
];

document.addEventListener("DOMContentLoaded", () => {
    const session = new RaceSession();

    const el = (id) => {
        const node = document.getElementById(id);
        if (!node) {
            console.warn(`state.js: missing element #${id}`);
        }
        return node;
    };

    const sessionCard = el("sessionCard");
    const statePill = el("statePill");
    const sessionIcon = el("sessionIcon");
    const stateTitle = el("stateTitle");
    const stateDescription = el("stateDescription");
    const speedMode = el("speedMode");
    const pitMode = el("pitMode");
    const riskMode = el("riskMode");
    const currentResponse = el("currentResponse");
    const statesList = el("statesList");

    const accelerateBtn = el("accelerateBtn");
    const pitBtn = el("pitBtn");
    const safetyBtn = el("safetyBtn");
    const nextBtn = el("nextBtn");
    const resetBtn = el("resetBtn");

    function render() {
        const snapshot = session.getSnapshot();

        if (sessionCard) {
            sessionCard.style.setProperty("--state-color", snapshot.softColor);
            sessionCard.style.setProperty("--state-soft", snapshot.softColor);
            sessionCard.style.borderColor = snapshot.color;
        }

        if (statePill) {
            statePill.textContent = snapshot.stateName;
            statePill.style.background = snapshot.softColor;
        }

        if (sessionIcon) sessionIcon.textContent = snapshot.icon;
        if (stateTitle) stateTitle.textContent = snapshot.name;
        if (stateDescription) stateDescription.textContent = snapshot.description;
        if (speedMode) speedMode.textContent = snapshot.speedMode;
        if (pitMode) pitMode.textContent = snapshot.pitMode;
        if (riskMode) riskMode.textContent = snapshot.riskMode;

        if (statesList) {
            statesList.innerHTML = stateOrder.map((state) => {
                const activeClass = state.key === snapshot.key ? "active" : "";

                return `
                    <div class="state-card ${activeClass}" style="--state-accent: ${state.color}; --state-bg: ${state.softColor};">
                        <div class="icon">${state.icon}</div>
                        <h4>${state.stateName}</h4>
                        <p>${state.description}</p>
                    </div>
                `;
            }).join("");
        }
    }

    if (accelerateBtn) {
        accelerateBtn.addEventListener("click", () => {
            if (currentResponse) currentResponse.textContent = session.accelerate();
            render();
        });
    }

    if (pitBtn) {
        pitBtn.addEventListener("click", () => {
            if (currentResponse) currentResponse.textContent = session.pitStop();
            render();
        });
    }

    if (safetyBtn) {
        safetyBtn.addEventListener("click", () => {
            if (currentResponse) currentResponse.textContent = session.toggleSafetyCar();
            render();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentResponse) currentResponse.textContent = session.nextPhase();
            render();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (currentResponse) currentResponse.textContent = session.reset();
            render();
        });
    }

    render();
});
