// TimelineSection: container for TimelineSidecapCard components
class TimelineSection extends HTMLElement {
    static get observedAttributes() { return ['months', 'income']; }
    constructor() {
        super();
        this.classList.add('timeline-section');

    }

    // Annual income for this section
    get income() {
        this.updateIncomeAndExpenses();
        return parseInt(this.getAttribute('income') || '0', 10);
    }
    set income(val) {
        this.setAttribute('income', val);
    }

    get months() {
        this.updateMonths();
        return parseInt(this.getAttribute('months') || '0', 10);
    }

    updateIncomeAndExpenses() {
        // Find all child cycling-text elements with data-role="income"
        const incomeCyclers = this.querySelectorAll('cycling-text[data-role="income"]');
        let total_income = 0;
        incomeCyclers.forEach(cycler => {
            const val = parseInt(cycler.value || '0', 10);
            if (!isNaN(val)) total_income += val;
        });

        // Find all child cycling-text elements with data-role="expenses"
        const expenseCyclers = this.querySelectorAll('cycling-text[data-role="expenses"]');
        let total_expenses = 0;
        expenseCyclers.forEach(cycler => {
            const val = parseInt(cycler.value || '0', 10);
            if (!isNaN(val)) total_expenses += val;
        });
        // Net income
        const net_income = total_income - total_expenses;
        this.income = net_income;
    }

    updateMonths() {
        // Support months="auto"
        if (this.getAttribute('months') === 'auto') {
            // console.log('[TimelineSection::updateMonths][auto] called');
            // Find the vertical ruler and its line
            const ruler = document.getElementById('vertical-ruler');
            const rulerLine = ruler ? ruler.querySelector('.vertical-ruler-line') : null;
            // console.log('[TimelineSection::updateMonths][auto] ruler:', ruler, 'rulerLine:', rulerLine);
            if (!rulerLine) return;
            // Get the bottom Y of the ruler line relative to the document
            const rulerRect = rulerLine.getBoundingClientRect();
            const mainContentRect = document.querySelector('.main-content').getBoundingClientRect();
            const rulerBottomY = rulerRect.top + rulerRect.height - mainContentRect.top;
            // Get the top Y of this section relative to main-content
            const sectionRect = this.getBoundingClientRect();
            const sectionTopY = sectionRect.top - mainContentRect.top;
            // Calculate available px
            const availablePx = Math.max(0, rulerBottomY - sectionTopY);
            const pxPerMonth = getMonthsToPx();
            const months = Math.floor(availablePx / pxPerMonth);
            // console.log('[TimelineSection::updateMonths][auto] rulerRect:', rulerRect, 'mainContentRect:', mainContentRect, 'sectionRect:', sectionRect);
            // console.log('[TimelineSection::updateMonths][auto] rulerBottomY:', rulerBottomY, 'sectionTopY:', sectionTopY, 'availablePx:', availablePx, 'pxPerMonth:', pxPerMonth, 'months:', months);
            this.style.height = (months * pxPerMonth) + 'px';
            return;
        }
        // Find all child cycling-text elements with data-role="years" and data-role="months"

        const yearsCyclers = this.querySelectorAll('cycling-text[data-role="years"]');
        const monthsCyclers = this.querySelectorAll('cycling-text[data-role="months"]');
        let total_length = 0;
        // Sum years (converted to months)
        yearsCyclers.forEach(cycler => {
            const val = parseInt(cycler.value || '0', 10);
            if (!isNaN(val)) total_length += val * 12;
        });
        // Sum months
        monthsCyclers.forEach(cycler => {
            const val = parseInt(cycler.value || '0', 10);
            if (!isNaN(val)) total_length += val;
        });
        this.setAttribute('months', total_length);
    }

    connectedCallback() {
        setTimeout(() => {
            this.updateMonths();
            this._applyStyles();
        });
        // If months is auto, observe all previous timeline-section siblings, not just the immediate previous sibling
        if (this.getAttribute('months') === 'auto') {
            this._autoResizeHandler = () => {
                this.updateMonths();
                this._applyStyles();
            };
            window.addEventListener('resize', this._autoResizeHandler);
            // Observe all previous timeline-section siblings for changes
            this._prevSectionObservers = [];
            let sibling = this.previousElementSibling;
            while (sibling) {
                if (sibling.tagName === 'TIMELINE-SECTION') {
                    const observer = new MutationObserver(() => {
                        this.updateMonths();
                        this._applyStyles();
                    });
                    observer.observe(sibling, { attributes: true, attributeFilter: ['months', 'style'] });
                    this._prevSectionObservers.push(observer);
                }
                sibling = sibling.previousElementSibling;
            }
        }
    }
    attributeChangedCallback() {
        this._applyStyles();
    }
    _applyStyles() {
        // Set height based on months
        const months = parseInt(this.getAttribute('months') || '12', 10);


        const pxPerMonth = getMonthsToPx();
        this.style.height = (months * pxPerMonth) + 'px';
        this.style.position = 'relative';
        this.style.marginBottom = '1.5rem';
        this.style.display = 'block';
        this.style.width = '100%';
    }
    refresh() {
        // Called by child cards if they need the section to update
        // (e.g., recalculate totals, update UI, etc.)
        this.updateIncomeAndExpenses();
        this.updateMonths();
    }
    disconnectedCallback() {
        if (this._autoResizeHandler) {
            window.removeEventListener('resize', this._autoResizeHandler);
        }
        if (this._prevSectionObservers) {
            this._prevSectionObservers.forEach(obs => obs.disconnect());
        }
        if (this._prevSectionObserver) {
            this._prevSectionObserver.disconnect();
        }
    }
}
customElements.define('timeline-section', TimelineSection);

// --- Utility: px/month conversion (used by ruler, sections, and money logic) ---
function getMonthsToPx() {
    const min = 100;
    const max = 120;
    let px = window.innerHeight / 12;
    if (px < min) return min;
    if (px > max) return max;
    return px;

}

// TimelineElement: base class for timeline cards
class TimelineElement extends HTMLElement {
    refresh() {
        // Optionally, update card appearance or content here
        // Propagate refresh to parent section if present
        if (this.parentElement && typeof this.parentElement.refresh === 'function') {
            this.parentElement.refresh();
        }
    }
    findParentCard() {
        // Finds the nearest parent that is a TimelineCard or TimelineSidecapCard
        return this.closest('timeline-sidecap-card, timeline-card');
    }
    /**
     * Creates a wrapper div for absolute positioning if 'at-month' is set.
     * If at-month is negative, positions from the bottom of the parent section.
     * @param {number} atMonth - The month offset (can be negative)
     * @param {number} pxPerMonth - Pixels per month
     */
    createPositionedWrapper(atMonth, pxPerMonth) {
        const wrapper = document.createElement('div');
        if (this.hasAttribute('at-month')) {
            wrapper.style.position = 'absolute';
            if (atMonth >= 0) {
                wrapper.style.top = (atMonth * pxPerMonth) + 'px';
            } else {
                wrapper.style.bottom = (Math.abs(atMonth) * pxPerMonth) + 'px';
            }
            wrapper.style.left = '0';
            wrapper.style.width = '97%';
            wrapper.style.marginLeft = '1.5%';
            wrapper.style.marginRight = '1.5%';
        }
        return wrapper;
    }
}

// TimelineSidecapCard: a Bootstrap sidecap card at a vertical offset, uses attributes for content
class TimelineSidecapCard extends TimelineElement {
    static get observedAttributes() { return ['image', 'title', 'small-text', 'at-month']; }
    constructor() {
        super();
        this.classList.add('timeline-sidecap-card');
        this._rendered = false;
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback() {
        // No-op: only render once
    }
    render() {
        if (this._rendered) return;

        // Collect original children
        const originalChildren = Array.from(this.childNodes);

        // Remove any previously rendered content
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        const image = this.getAttribute('image') || '';
        const title = this.getAttribute('title') || '';
        const smallText = this.getAttribute('small-text') || '';
        const atMonth = parseInt(this.getAttribute('at-month') || '0', 10);
        const pxPerMonth = getMonthsToPx();

        // Use parent method to create wrapper
        const wrapper = this.createPositionedWrapper(atMonth, pxPerMonth);

        // Create the card structure
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.style.maxHeight = '350px';

        card.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image}" class="img-fluid rounded-start sidecap-img" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <div class="card-text card-body-content"></div>
              <p class="card-text"><small class="text-body-secondary">${smallText}</small></p>
            </div>
          </div>
        </div>
      `;

        // Move only the original children into the card body content
        const bodyContent = card.querySelector('.card-body-content');
        for (const child of originalChildren) {
            bodyContent.appendChild(child);
        }

        wrapper.appendChild(card);
        this.appendChild(wrapper);

        this._rendered = true;
    }
    refresh() {
        // Called by child CyclingText if they change
        // Update image src if a cycling-text[data-role="img"] is present
        const imgCycler = this.querySelector('cycling-text[data-role="img"]');
        if (imgCycler) {
            let imgName = (imgCycler.value || '').toLowerCase();
            imgName = imgName.replace(/\s+/g, '_'); // Replace spaces with underscores
            // Find the image element inside the card and update its src
            const imgEl = this.querySelector('.img-fluid');
            if (imgEl) {
                imgEl.src = `assets/${imgName}.webp`;
            }
        }
        // Propagate refresh to parent section
        super.refresh();
    }
}
customElements.define('timeline-sidecap-card', TimelineSidecapCard);

// CyclingText: clickable, cycles through options, notifies parent card
class CyclingText extends TimelineElement {
    static get observedAttributes() { return ['options', 'randomize']; }
    constructor() {
        super();
        this.parentCard = null;
        this.options = [];
        this.index = 0;
        this.span = document.createElement('span');
        this.span.style.cursor = 'pointer';
        this.span.style.fontWeight = 'bold';
        this.span.style.color = '#b8005c';
        this.span.style.background = '#fffbe7';
        this.span.style.padding = '2px 6px';
        this.span.style.borderRadius = '4px';
        this.span.style.transition = 'background 0.2s';
        this.appendChild(this.span);
        this.handleClick = this.handleClick.bind(this);
    }
    async connectedCallback() {
        // If data-role="paper" and no options attribute, fetch journal-citation-stats.json for options
        if (this.getAttribute('data-role') === 'paper' && !this.hasAttribute('options')) {
            try {
                const response = await fetch('journal-citation-stats.json');
                const data = await response.json();
                const journals = Object.keys(data);
                this.setAttribute('options', journals.join(','));
            } catch (e) {
                console.error('Failed to load journal-citation-stats.json', e);
            }
        }
        this._parseOptions();
        // If randomize attribute is present, pick a random index
        if (this.hasAttribute('randomize')) {
            if (this.options.length > 0) {
                this.index = Math.floor(Math.random() * this.options.length);
            }
        }
        this.span.addEventListener('click', this.handleClick);
        this.render();
        // If this is an image cycler, trigger parent card refresh to update image
        if (this.getAttribute('data-role') === 'img') {
            const parentCard = this.findParentCard();
            if (parentCard) parentCard.refresh();
        }
    }
    disconnectedCallback() {
        this.span.removeEventListener('click', this.handleClick);
    }
    attributeChangedCallback() {
        this._parseOptions();
        this.render();
    }
    _parseOptions() {
        const attr = this.getAttribute('options') || '';
        this.options = attr.split(',').map(s => s.trim()).filter(Boolean);
        if (this.index >= this.options.length) this.index = 0;
    }
    handleClick() {
        if (this.options.length > 1) {
            this.index = (this.index + 1) % this.options.length;
            this.render();

            // why not simply called this.parentElement.render()?
            // because it's possible that the true DOM parent is not a TimelineSidecapCard, 
            // but a div (or other element) 
            const parentCard = this.findParentCard();
            if (parentCard) parentCard.refresh();
        }
    }
    render() {
        this.span.textContent = this.options[this.index] || '';
    }
    // Allow programmatic cycling (for initial value)
    get value() {
        return this.options[this.index] || '';
    }
}
customElements.define('cycling-text', CyclingText);

// TimelineCard: a Bootstrap card with colored header, customizable via attributes
class TimelineCard extends TimelineElement {
    static get observedAttributes() { return ['header', 'title', 'type', 'at-month']; }
    constructor() {
        super();
        this.classList.add('timeline-card');
        this._rendered = false;
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback() {
        // No-op: only render once
    }
    render() {
        if (this._rendered) return;

        // Collect original children
        const originalChildren = Array.from(this.childNodes);

        // Remove any previously rendered content
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        const header = this.getAttribute('header') || '';
        const title = this.getAttribute('title') || '';
        const type = this.getAttribute('type') || 'primary';
        const atMonth = parseInt(this.getAttribute('at-month') || '0', 10);
        const pxPerMonth = getMonthsToPx();

        // Use parent method to create wrapper
        const wrapper = this.createPositionedWrapper(atMonth, pxPerMonth);

        // Create card structure
        const card = document.createElement('div');
        card.className = `card text-bg-${type} mb-3`;

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.textContent = header;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = title;

        const cardText = document.createElement('div');
        cardText.className = 'card-text card-body-content';

        // Move only the original children into cardText
        for (const child of originalChildren) {
            cardText.appendChild(child);
        }

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        wrapper.appendChild(card);
        this.appendChild(wrapper);

        this._rendered = true;
    }
    refresh() {
        // Optionally, update card appearance or content here
        // Propagate refresh to parent section if present
        super.refresh();
    }
}
customElements.define('timeline-card', TimelineCard);

// NumberDisplay: shows three numbers (citations, savings, retirement) with labels
class NumberDisplay extends HTMLElement {
    constructor() {
        super();
        // Remove shadow DOM, use light DOM
        this._container = document.createElement('div');
        this._container.className = 'number-stats';
        this.innerHTML = '';
        this.appendChild(this._container);
        this.render();
    }

    render() {
        this._container.innerHTML = `
            <style>
                .number-stats {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items: center;
                    width: 100%;
                    gap: 2.5rem;
                }
                .stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .stat-label {
                    font-size: 0.7rem;
                    color: #888;
                    margin-bottom: 0.2rem;
                    text-transform: uppercase;
                }
                .stat-value {
                    font-size: 2.1rem;
                    font-weight: 700;
                    color: #222;
                    line-height: 1.1;
                    font-family: 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
                }
            </style>
            <div class="stat">
                <span class="stat-label">Citations</span>
                <span class="stat-value" id="citations">0</span>
            </div>
            <div class="stat">
                <span class="stat-label">Savings</span>
                <span class="stat-value" id="savings">$0</span>
            </div>
            <div class="stat">
                <span class="stat-label">Retirement</span>
                <span class="stat-value" id="retirement">$0</span>
            </div>
        `;
    }

    setCitations(val) {
        this._container.querySelector('#citations').textContent = val;
    }
    setSavings(val) {
        this._container.querySelector('#savings').textContent = val;
    }
    setRetirement(val) {
        this._container.querySelector('#retirement').textContent = val;
    }

    static get observedAttributes() {
        return ['citations', 'savings', 'retirement'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'citations') this.setCitations(newValue);
        if (name === 'savings') this.setSavings(newValue);
        if (name === 'retirement') this.setRetirement(newValue);
    }
    connectedCallback() {
        this.render();
        if (this.hasAttribute('citations')) this.setCitations(this.getAttribute('citations'));
        if (this.hasAttribute('savings')) this.setSavings(this.getAttribute('savings'));
        if (this.hasAttribute('retirement')) this.setRetirement(this.getAttribute('retirement'));
    }
}
customElements.define('number-display', NumberDisplay);

class TaxesDisplay extends HTMLElement {
    static get observedAttributes() { return ['income-ref']; }
    constructor() {
        super();
        this.year = null;
        this.incomeRef = null;
        this.taxData = null;
        this.incomeCycler = null;
        this.attachShadow({ mode: 'open' });
        this.value = 0;
    }

    async connectedCallback() {
        this.incomeRef = this.getAttribute('income-ref');
        this.setAttribute('data-role', 'expenses');
        // Find the referenced cycling-text[data-role="income"]
        this.incomeCycler = this._findIncomeCycler();
        if (!this.incomeCycler) {
            console.error('[TaxesDisplay] Could not find income cycler for ref', this.incomeRef);
            this._renderError('No income cycler');
            return;
        }
        // Listen for clicks (cycling)
        this.incomeCycler.addEventListener('click', this._onIncomeChange);
        // Fetch tax.json
        await this._fetchTaxData();
        this._updateTax();
    }

    disconnectedCallback() {
        if (this.incomeCycler) {
            this.incomeCycler.removeEventListener('click', this._onIncomeChange);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'income-ref') this.incomeRef = newValue;
        this._updateTax();
    }

    _findIncomeCycler() {
        // Try by id first
        if (this.incomeRef) {
            const byId = document.getElementById(this.incomeRef);
            if (byId && byId.tagName.toLowerCase() === 'cycling-text') return byId;
        }
        // Otherwise, find the first cycling-text[data-role="income"] in the same timeline-section
        let parent = this.parentElement;
        while (parent && parent.tagName && parent.tagName.toLowerCase() !== 'timeline-section') {
            parent = parent.parentElement;
        }
        if (parent) {
            const cycler = parent.querySelector('cycling-text[data-role="income"]');
            if (cycler) return cycler;
        }
        // Fallback: search globally
        const globalCycler = document.querySelector('cycling-text[data-role="income"]');
        return globalCycler;
    }

    _findSectionYear() {
        // Find parent timeline-section and map its id to a year
        let parent = this.parentElement;
        while (parent && parent.tagName && parent.tagName.toLowerCase() !== 'timeline-section') {
            parent = parent.parentElement;
        }
        if (!parent) return null;
        const sectionId = parent.getAttribute('id');
        // Hardcoded mapping from section id to year
        const sectionYearMap = {
            'phd': 2010,
            'postdoc': 2017,
            'phd-first-job': 2011,
            'phd-second-job': 2013,
            'no-phd-first-job': 2011,
            'no-phd-second-job': 2013,
            'no-phd-third-job': 2016,
            'no-phd-laid-off': 2016,
            'no-phd-fourth-job': 2022
        };
        return sectionYearMap[sectionId] || null;
    }

    async _fetchTaxData() {
        if (this.taxData) return;
        try {
            const resp = await fetch('assets/tax.json');
            this.taxData = await resp.json();
        } catch (e) {
            console.error('[TaxesDisplay] Failed to load tax.json', e);
        }
    }

    _onIncomeChange = () => {
        this._updateTax();
    }

    _updateTax() {
        const year = this._findSectionYear();
        if (!this.taxData || !year || !this.incomeCycler) return;
        const yearData = this.taxData[year];
        if (!yearData) {
            const err = `[TaxesDisplay] Year ${year} not found in tax.json`;
            console.error(err);
            this._renderError(err);
            throw new Error(err);
        }
        const incomeStr = (this.incomeCycler.value || '').replace(/[^0-9]/g, '');
        const income = parseInt(incomeStr, 10);
        if (!income) {
            const err = `[TaxesDisplay] Invalid income value: ${this.incomeCycler.value}`;
            console.error(err);
            this._renderError(err);
            return;
        }
        const tax = yearData[income];
        if (tax === undefined) {
            const err = `[TaxesDisplay] No tax entry for income ${income} in year ${year}`;
            console.error(err);
            this._renderError(err);
            throw new Error(err);
        }
        this.value = tax;
        console.log(`[TaxesDisplay] For year ${year}, income ${income}: tax = ${tax}`);
        this._renderTax(tax);
    }

    _renderTax(tax) {
        this.shadowRoot.innerHTML = `<span>$${tax.toLocaleString()}</span>`;
    }
    _renderError(msg) {
        this.shadowRoot.innerHTML = `<span style="color:red;">${msg}</span>`;
    }
}
customElements.define('taxes-display', TaxesDisplay); 