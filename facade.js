/* ============================================
   Facade Pattern - Purchase Workflow Demo
   ============================================ */

class InventoryService {
    reserve(car) {
        return {
            car,
            slot: 'Reserved in climate-secure vault',
            status: 'Inventory locked'
        };
    }
}

class FinanceService {
    approve(plan, fee) {
        return {
            plan,
            fee,
            status: fee === 0 ? 'Funds confirmed' : 'Premium plan approved'
        };
    }
}

class CertificationService {
    prepare(car) {
        return {
            dossier: car + ' provenance dossier',
            fia: 'FIA conformity verified',
            export: 'Ownership transfer packet ready'
        };
    }
}

class LogisticsService {
    schedule(destination, days) {
        return {
            destination,
            eta: days + ' days',
            mode: 'Enclosed carbon-safe transport'
        };
    }
}

class PurchaseFacade {
    constructor(inventory, finance, certification, logistics) {
        this.inventory = inventory;
        this.finance = finance;
        this.certification = certification;
        this.logistics = logistics;
    }

    completePurchase(order) {
        const reservation = this.inventory.reserve(order.car);
        const payment = this.finance.approve(order.plan, order.fee);
        const documents = this.certification.prepare(order.car);
        const shipment = this.logistics.schedule(order.destination, order.days);

        return {
            reservation,
            payment,
            documents,
            shipment,
            total: '$' + (order.price + order.fee).toLocaleString('en-US')
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carOptions = document.getElementById('carOptions');
    const planOptions = document.getElementById('planOptions');
    const destinationOptions = document.getElementById('destinationOptions');
    const facadeLog = document.getElementById('facadeLog');
    const facadeReceipt = document.getElementById('facadeReceipt');
    const facadeCodePreview = document.getElementById('facadeCodePreview');
    const runFacade = document.getElementById('runFacade');
    const runManual = document.getElementById('runManual');
    const clearFacadeLog = document.getElementById('clearFacadeLog');

    if (!carOptions) return;

    const state = {
        car: 'Ferrari SF-23',
        price: 8500000,
        plan: 'Full payment',
        fee: 0,
        destination: 'Monaco',
        days: 4
    };

    const facade = new PurchaseFacade(
        new InventoryService(),
        new FinanceService(),
        new CertificationService(),
        new LogisticsService()
    );

    bindOptionGroup(carOptions, ['car', 'price']);
    bindOptionGroup(planOptions, ['plan', 'fee']);
    bindOptionGroup(destinationOptions, ['destination', 'days']);
    renderCodePreview('facade');

    runFacade.addEventListener('click', () => {
        const result = facade.completePurchase(state);
        renderFacadeLog([
            ['InventoryService', 'Reserved ' + result.reservation.car + ' and locked stock for the sales team.'],
            ['FinanceService', result.payment.status + ' for ' + result.payment.plan + '.'],
            ['CertificationService', result.documents.dossier + ' and compliance papers prepared.'],
            ['LogisticsService', 'Shipment booked to ' + result.shipment.destination + ' with ETA ' + result.shipment.eta + '.'],
            ['PurchaseFacade', 'Combined every subsystem response into one checkout summary.']
        ]);
        renderReceipt(result);
        renderCodePreview('facade');
    });

    runManual.addEventListener('click', () => {
        renderFacadeLog([
            ['Client UI', 'Calls InventoryService.reserve(state.car)'],
            ['Client UI', 'Calls FinanceService.approve(state.plan, state.fee)'],
            ['Client UI', 'Calls CertificationService.prepare(state.car)'],
            ['Client UI', 'Calls LogisticsService.schedule(state.destination, state.days)'],
            ['Client UI', 'Manually merges four responses and handles ordering rules itself']
        ]);
        facadeReceipt.innerHTML = '<div class="facade-empty">Manual mode shows the orchestration burden on the client side.</div>';
        renderCodePreview('manual');
    });

    clearFacadeLog.addEventListener('click', () => {
        facadeLog.innerHTML = '<div class="facade-empty">No workflow started.</div>';
        facadeReceipt.innerHTML = '<div class="facade-empty">Run the facade to see the summarized result.</div>';
        renderCodePreview('facade');
    });

    function bindOptionGroup(container, keys) {
        container.addEventListener('click', event => {
            const button = event.target.closest('.facade-option');
            if (!button) return;

            container.querySelectorAll('.facade-option').forEach(option => option.classList.remove('active'));
            button.classList.add('active');

            keys.forEach(key => {
                const rawValue = button.dataset[key];
                state[key] = /^\d+$/.test(rawValue) ? Number(rawValue) : rawValue;
            });
        });
    }

    function renderFacadeLog(entries) {
        facadeLog.innerHTML = entries.map((entry, index) => {
            return '<div class="facade-log-entry">' +
                '<div class="facade-log-step">Step ' + (index + 1) + ' - ' + entry[0] + '</div>' +
                '<div class="facade-log-text">' + entry[1] + '</div>' +
                '</div>';
        }).join('');
    }

    function renderReceipt(result) {
        const items = [
            ['Car', result.reservation.car],
            ['Inventory', result.reservation.status],
            ['Finance', result.payment.plan],
            ['Paperwork', result.documents.fia],
            ['Delivery', result.shipment.destination + ' / ' + result.shipment.eta],
            ['Total', result.total]
        ];

        facadeReceipt.innerHTML = '<div class="facade-receipt">' + items.map(item => {
            return '<div class="facade-receipt-item">' +
                '<div class="facade-receipt-label">' + item[0] + '</div>' +
                '<div class="facade-receipt-value">' + item[1] + '</div>' +
                '</div>';
        }).join('') + '</div>';
    }

    function renderCodePreview(mode) {
        if (mode === 'manual') {
            facadeCodePreview.textContent = [
                'const reservation = inventory.reserve(state.car);',
                'const payment = finance.approve(state.plan, state.fee);',
                'const docs = certification.prepare(state.car);',
                'const shipment = logistics.schedule(state.destination, state.days);',
                'const receipt = { reservation, payment, docs, shipment };'
            ].join('\n');
            return;
        }

        facadeCodePreview.textContent = [
            'const facade = new PurchaseFacade(inventory, finance, certification, logistics);',
            'const receipt = facade.completePurchase(state);',
            '',
            '// Client gets one workflow result',
            'salesDesk.render(receipt);'
        ].join('\n');
    }
});