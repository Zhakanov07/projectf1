class PitStopCollection {
    constructor(tasks) {
        this.tasks = tasks;
    }

    createIterator() {
        return new PitStopIterator(this.tasks);
    }
}

class PitStopIterator {
    constructor(tasks) {
        this.tasks = tasks;
        this.index = 0;
    }

    current() {
        return this.tasks[this.index];
    }

    next() {
        if (this.hasNext()) {
            this.index += 1;
        }
        return this.current();
    }

    previous() {
        if (this.hasPrevious()) {
            this.index -= 1;
        }
        return this.current();
    }

    first() {
        this.index = 0;
        return this.current();
    }

    last() {
        this.index = this.tasks.length - 1;
        return this.current();
    }

    reset() {
        return this.first();
    }

    hasNext() {
        return this.index < this.tasks.length - 1;
    }

    hasPrevious() {
        return this.index > 0;
    }

    position() {
        return this.index;
    }

    size() {
        return this.tasks.length;
    }
}

const pitStopTasks = [
    {
        icon: "\u{1F527}",
        title: "Front jack lifts the car",
        description: "The pit crew raises the car so all tyres can be changed safely.",
    },
    {
        icon: "\u{1F6DE}",
        title: "Wheel guns remove old tyres",
        description: "Mechanics loosen all four wheel nuts in a synchronized movement.",
    },
    {
        icon: "\u{1F9F5}",
        title: "Fresh tyre set is mounted",
        description: "The chosen compound is fitted according to the race strategy.",
    },
    {
        icon: "\u{2705}",
        title: "Tyre nuts are locked",
        description: "Each corner confirms the wheel is secure before release.",
    },
    {
        icon: "\u{1F6A6}",
        title: "Lollipop signal clears",
        description: "The release controller checks pit lane traffic and gives the signal.",
    },
    {
        icon: "\u{1F3CE}",
        title: "Driver exits the pit box",
        description: "The car accelerates back into the fast lane and returns to the race.",
    },
];

document.addEventListener("DOMContentLoaded", () => {
    const collection = new PitStopCollection(pitStopTasks);
    const iterator = collection.createIterator();

    const currentTask = document.getElementById("currentTask");
    const currentIndex = document.getElementById("currentIndex");
    const hasNext = document.getElementById("hasNext");
    const hasPrevious = document.getElementById("hasPrevious");
    const stepsList = document.getElementById("stepsList");

    const firstBtn = document.getElementById("firstBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const lastBtn = document.getElementById("lastBtn");
    const resetBtn = document.getElementById("resetBtn");

    function renderSteps() {
        stepsList.innerHTML = pitStopTasks.map((task, index) => {
            const statusClass = index === iterator.position()
                ? "active"
                : index < iterator.position()
                    ? "done"
                    : "";

            return `
                <div class="step-card ${statusClass}">
                    <div class="icon">${task.icon}</div>
                    <h4>${index + 1}. ${task.title}</h4>
                    <p>${task.description}</p>
                </div>
            `;
        }).join("");
    }

    function renderCurrentTask() {
        const task = iterator.current();

        currentTask.innerHTML = `
            <div class="task-icon">${task.icon}</div>
            <div>
                <span class="task-step">Step ${iterator.position() + 1}</span>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
        `;
    }

    function renderStatus() {
        currentIndex.textContent = `${iterator.position() + 1} / ${iterator.size()}`;
        hasNext.textContent = String(iterator.hasNext());
        hasPrevious.textContent = String(iterator.hasPrevious());

        firstBtn.disabled = !iterator.hasPrevious();
        prevBtn.disabled = !iterator.hasPrevious();
        nextBtn.disabled = !iterator.hasNext();
        lastBtn.disabled = !iterator.hasNext();
    }

    function render() {
        renderCurrentTask();
        renderSteps();
        renderStatus();
    }

    firstBtn.addEventListener("click", () => {
        iterator.first();
        render();
    });

    prevBtn.addEventListener("click", () => {
        iterator.previous();
        render();
    });

    nextBtn.addEventListener("click", () => {
        iterator.next();
        render();
    });

    lastBtn.addEventListener("click", () => {
        iterator.last();
        render();
    });

    resetBtn.addEventListener("click", () => {
        iterator.reset();
        render();
    });

    render();
});
