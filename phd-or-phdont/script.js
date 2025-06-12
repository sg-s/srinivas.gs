// --- Animated Subtitle Logic ---
const subtitles = [
    'Because research papers make terrible diapers.',
    "'What's your h-index?' asked no landlord ever",
    "Turns out grocery stores don't accept preprints as payment.",
    "My friend bought a house. I bought Zotero storage.",
    "Because who needs income when you have academic prestige?",
    "Nothing says job security like a one-year postdoc contract.",
    "I built a ML model to predict when rent eclipses my salary."
];

const subtitleElem = document.getElementById('hero-subtitle');
let subtitleIndex = 0;
let charIndex = 0;
let typing = true;

function typeSubtitle() {
    if (charIndex <= subtitles[subtitleIndex].length) {
        subtitleElem.textContent = subtitles[subtitleIndex].slice(0, charIndex);
        charIndex++;
        setTimeout(typeSubtitle, 40);
    } else {
        typing = false;
        setTimeout(eraseSubtitle, 1800);
    }
}

function eraseSubtitle() {
    if (charIndex > 0) {
        subtitleElem.textContent = subtitles[subtitleIndex].slice(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseSubtitle, 20);
    } else {
        subtitleIndex = (subtitleIndex + 1) % subtitles.length;
        typing = true;
        setTimeout(typeSubtitle, 400);
    }
}

typeSubtitle();



// --- Vertical Ruler Logic ---
// Draws a vertical ruler with month and year ticks, aligned to px/month logic
function generateRuler(startMonth = 7, startYear = 2010) {
    const mainContent = document.querySelector('.main-content');
    const ruler = document.getElementById('vertical-ruler');
    if (!mainContent || !ruler) return;

    ruler.innerHTML = '';

    // Add the vertical line
    const line = document.createElement('div');
    line.className = 'vertical-ruler-line';
    const pxPerMonth = getMonthsToPx();

    // Calculate total months from start to now
    const now = new Date();
    const endYear = now.getFullYear();
    const endMonth = now.getMonth();
    const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
    line.style.height = (totalMonths * pxPerMonth) + 'px';
    ruler.appendChild(line);

    const monthLetters = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let month = startMonth;
    let year = startYear;

    for (let i = 0; i <= totalMonths; i++) {
        const y = i * pxPerMonth;
        if (month === 0) {
            // Year label
            const label = document.createElement('div');
            label.className = 'ruler-label';
            label.style.top = `${y}px`;
            label.textContent = `${year + 1}`;
            ruler.appendChild(label);
            year++;
        } else {
            // Month letter label
            const monthLabel = document.createElement('div');
            monthLabel.className = 'ruler-month-label';
            monthLabel.style.top = `${y}px`;
            monthLabel.textContent = monthLetters[month];
            ruler.appendChild(monthLabel);
        }
        month = (month + 1) % 12;
    }
    updateAutoTimelineSections();
}

window.addEventListener('DOMContentLoaded', () => generateRuler());
window.addEventListener('resize', () => generateRuler());

// --- Sticky Header Favicon Logic ---
// Shows favicon in sticky header when hero section is out of view
window.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero-section');
    const faviconImg = document.getElementById('header-favicon');
    if (!heroSection || !faviconImg) return;

    const observer = new window.IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    faviconImg.style.display = 'none';
                } else {
                    faviconImg.style.display = 'block';
                }
            });
        },
        { root: null, threshold: 0.01 }
    );
    observer.observe(heroSection);
});

// --- Money Display Logic for TimelineSection ---
// Calculates and updates the money display in the sticky header based on how much of each timeline-section is above the money line
function getMoneyLineY() {
    // 50% of viewport height from top of viewport
    return window.innerHeight * 0.5;
}

function getSectionEarned(section) {
    // Get section's bounding rect relative to viewport
    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    const sectionTop = rect.top;
    const sectionBottom = rect.bottom;
    const moneyLineY = getMoneyLineY();
    const income = section.income || 0;
    const sectionMonths = parseInt(section.getAttribute('months') || '12', 10);
    const pxPerMonth = getMonthsToPx();
    // Calculate pixels above the money line
    const pixelsAbove = Math.max(0, Math.min(sectionBottom, moneyLineY) - sectionTop);
    const monthsAbove = pixelsAbove / pxPerMonth;
    const monthlyIncome = income / 12;
    // Find retirement contribution (per month)
    let retirementContribution = 0;
    const retirementCycler = section.querySelector('cycling-text[data-role="retirement-contribution"]');
    if (retirementCycler) {
        retirementContribution = parseInt(retirementCycler.value || '0', 10);
    }
    // Total deduction for retirement
    const totalRetirement = monthsAbove * retirementContribution;
    // Calculate earned after retirement deduction
    const earned = monthsAbove * monthlyIncome - totalRetirement;
    if (retirementContribution > 0 && monthsAbove > 0 && totalRetirement > 0) {
        // console.log(`[Retirement] Section: ${section.id || section.getAttribute('id')}, monthsAbove: ${monthsAbove.toFixed(2)}, monthlyIncome: ${monthlyIncome.toFixed(2)}, retirementContribution: ${retirementContribution}, totalRetirement: ${totalRetirement.toFixed(2)}, earned (after deduction): ${earned.toFixed(2)}`);
    }
    return earned;
}

let lastPhdVsNoPhdDiff = 0;
let lastAnimatedCostValue = null;
let costSummaryVisible = false;
let costNumberElem = null;

// --- SPY Price Data ---
let spyPrices = null;
let spyTimestamps = null;
let timelineStartMonthIdx = 0; // Offset into SPY data for timeline start

function loadSpyPrices() {
    if (spyPrices) return Promise.resolve(spyPrices);
    return fetch('assets/spy.json')
        .then(res => res.json())
        .then(data => {
            spyPrices = data.high;
            spyTimestamps = Object.keys(spyPrices).map(Number).sort((a, b) => a - b);
            // Align timeline start to Aug 2010
            const timelineStartDate = new Date(2010, 7, 1); // Aug 2010 (month is 0-based)
            let minDiff = Infinity;
            let minIdx = 0;
            for (let i = 0; i < spyTimestamps.length; ++i) {
                const diff = Math.abs(spyTimestamps[i] - timelineStartDate.getTime());
                if (diff < minDiff) {
                    minDiff = diff;
                    minIdx = i;
                }
            }
            timelineStartMonthIdx = minIdx;
            return spyPrices;
        });
}

// Helper: get the closest SPY price for a given month index (0 = first month in data)
function getSpyPriceForMonth(monthIdx) {
    if (!spyTimestamps || !spyPrices) return null;
    if (monthIdx < 0) monthIdx = 0;
    if (monthIdx >= spyTimestamps.length) monthIdx = spyTimestamps.length - 1;
    const ts = spyTimestamps[monthIdx];
    return spyPrices[ts];
}

// Helper: get the latest SPY price (for current value)
function getLatestSpyPrice() {
    if (!spyTimestamps || !spyPrices) return null;
    const ts = spyTimestamps[spyTimestamps.length - 1];
    return spyPrices[ts];
}

function updateMoneyDisplays() {
    loadSpyPrices().then(() => {
        const phdCol = document.querySelector('.phd-col');
        const nophdCol = document.querySelector('.nophd-col');
        const phdSections = phdCol ? phdCol.querySelectorAll('timeline-section') : [];
        const nophdSections = nophdCol ? nophdCol.querySelectorAll('timeline-section') : [];
        let phdTotal = 0;
        let nophdTotal = 0;
        let phdCitations = 0;
        let nophdCitations = 0;
        let phdRetirementShares = 0, phdRetirementCash = 0;
        let nophdRetirementShares = 0, nophdRetirementCash = 0;
        let phdRetirementValue = 0, nophdRetirementValue = 0;
        const moneyLineY = getMoneyLineY();
        const pxPerMonth = getMonthsToPx();

        // Helper to compute citations for a set of sections
        function computeCitations(sections) {
            let totalCitations = 0;
            sections.forEach(section => {
                // Section's start Y and months
                const sectionRect = section.getBoundingClientRect();
                const sectionTop = sectionRect.top;
                const sectionMonths = parseInt(section.getAttribute('months') || '12', 10);
                // Find all timeline-cards in this section
                const cards = section.querySelectorAll('timeline-card');
                cards.forEach(card => {
                    // Card's at-month (relative to section)
                    const atMonth = parseInt(card.getAttribute('at-month') || '0', 10);
                    // Card's Y position
                    const cardY = sectionTop + (atMonth * pxPerMonth);
                    // Only consider cards above the money line
                    if (cardY < moneyLineY) {
                        // Find all cycling-text[data-role="paper"] in this card
                        const paperCyclers = card.querySelectorAll('cycling-text[data-role="paper"]');
                        paperCyclers.forEach(cycler => {
                            const journal = cycler.value;
                            const { rate, lag } = getJournalCitationStats(journal);
                            // Months since publication (from cardY to moneyLineY)
                            const monthsSincePub = Math.floor((moneyLineY - cardY) / pxPerMonth);
                            const monthsCited = Math.max(0, monthsSincePub - lag);
                            if (monthsCited > 0) {
                                totalCitations += monthsCited * rate;
                            }
                        });
                    }
                });
            });
            return totalCitations;
        }

        // Helper to simulate retirement investing for a set of sections
        function simulateRetirement(sections) {
            let totalShares = 0;
            let cash = 0;
            let monthIdx = timelineStartMonthIdx; // Start at timeline's start in SPY data
            let monthsSoFar = 0;
            sections.forEach(section => {
                const sectionMonths = parseInt(section.getAttribute('months') || '12', 10);
                // Find employee and employer match cyclers
                const retirementCycler = section.querySelector('cycling-text[data-role="retirement-contribution"]');
                const matchCycler = section.querySelector('cycling-text[data-role="employer-match"]');
                // Parse employee percent
                let empPercent = 0;
                const empVal = retirementCycler ? (retirementCycler.value || '') : '';
                if (empVal.endsWith('%')) {
                    empPercent = parseFloat(empVal) / 100;
                }
                // Parse employer match percent
                let matchPercent = 0;
                const matchVal = matchCycler ? (matchCycler.value || '') : '';
                if (matchVal.endsWith('%')) {
                    matchPercent = parseFloat(matchVal) / 100;
                }
                // Find income
                const incomeCycler = section.querySelector('cycling-text[data-role="income"]');
                let income = 0;
                if (incomeCycler) {
                    income = parseInt(incomeCycler.value || '0', 10);
                }
                // Compute monthly employee contribution
                let empMonthly = 0;
                if (income > 0 && empPercent > 0) {
                    empMonthly = (income * empPercent) / 12;
                }
                // Compute actual match percent (min logic)
                let actualMatchPercent = Math.min(empPercent, matchPercent);
                let matchMonthly = 0;
                if (income > 0 && actualMatchPercent > 0) {
                    matchMonthly = (income * actualMatchPercent) / 12;
                }
                // How many months of this section are above the money line?
                const sectionRect = section.getBoundingClientRect();
                const sectionTop = sectionRect.top;
                const sectionBottom = sectionRect.bottom;
                const pixelsAbove = Math.max(0, Math.min(sectionBottom, moneyLineY) - sectionTop);
                const monthsAbove = pixelsAbove / pxPerMonth;
                const monthsToSim = Math.floor(monthsAbove);
                for (let m = 0; m < monthsToSim; ++m, ++monthIdx) {
                    const totalToInvest = empMonthly + matchMonthly + cash;
                    const price = getSpyPriceForMonth(monthIdx);
                    if (price && totalToInvest > 0) {
                        const sharesBought = totalToInvest / price;
                        totalShares += sharesBought;
                        cash = 0;
                    }
                }
                monthsSoFar += monthsToSim;
            });
            // Value at the current money line
            const currentPrice = getSpyPriceForMonth(monthIdx - 1) || getLatestSpyPrice();
            const value = totalShares * (currentPrice || 0);
            return { shares: totalShares, value, cash, price: currentPrice };
        }

        phdSections.forEach(sec => {
            phdTotal += getSectionEarned(sec);
        });
        nophdSections.forEach(sec => {
            nophdTotal += getSectionEarned(sec);
        });
        phdCitations = computeCitations(phdSections);
        nophdCitations = computeCitations(nophdSections);

        // Simulate retirement for each column
        const phdRet = simulateRetirement(phdSections);
        const nophdRet = simulateRetirement(nophdSections);
        phdRetirementShares = phdRet.shares;
        phdRetirementValue = phdRet.value;
        nophdRetirementShares = nophdRet.shares;
        nophdRetirementValue = nophdRet.value;

        // Update number displays
        const numberDisplays = document.querySelectorAll('.sticky-header number-display');
        if (numberDisplays.length >= 2) {
            numberDisplays[0].setSavings(`$${Math.round(phdTotal).toLocaleString()}`);
            numberDisplays[1].setSavings(`$${Math.round(nophdTotal).toLocaleString()}`);
            numberDisplays[0].setCitations(Math.floor(phdCitations));
            numberDisplays[1].setCitations(Math.floor(nophdCitations));
            numberDisplays[0].setRetirement(`$${Math.round(phdRetirementValue).toLocaleString()}`);
            numberDisplays[1].setRetirement(`$${Math.round(nophdRetirementValue).toLocaleString()}`);
        }

        // Debug logs
        function formatMonthYear(ts) {
            if (!ts) return '';
            const d = new Date(Number(ts));
            return `${d.getMonth() + 1}/${d.getFullYear()}`;
        }
        if (phdRetirementShares > 0) {
            const ts = spyTimestamps && phdRet ? spyTimestamps[Math.max(0, (phdRet.price && spyPrices) ? spyTimestamps.findIndex(t => spyPrices[t] === phdRet.price) : 0)] : null;
            const dateStr = ts ? formatMonthYear(ts) : '';
            // console.log(`[RETIREMENT][PhD] Shares: ${phdRetirementShares.toFixed(4)}, Value: $${phdRetirementValue.toFixed(2)}, Price: $${phdRet.price?.toFixed(2)}, Date: ${dateStr}`);
            // Print current month and price as you scroll
            // console.log(`[PhD] Current Month: ${dateStr}, Current SPY Price: $${phdRet.price?.toFixed(2)}`);
        }
        if (nophdRetirementShares > 0) {
            const ts = spyTimestamps && nophdRet ? spyTimestamps[Math.max(0, (nophdRet.price && spyPrices) ? spyTimestamps.findIndex(t => spyPrices[t] === nophdRet.price) : 0)] : null;
            const dateStr = ts ? formatMonthYear(ts) : '';
            // console.log(`[RETIREMENT][NoPhD] Shares: ${nophdRetirementShares.toFixed(4)}, Value: $${nophdRetirementValue.toFixed(2)}, Price: $${nophdRet.price?.toFixed(2)}, Date: ${dateStr}`);
            // Print current month and price as you scroll
            // console.log(`[NoPhD] Current Month: ${dateStr}, Current SPY Price: $${nophdRet.price?.toFixed(2)}`);
        }

        // Animate or update the cost summary if visible
        if (costSummaryVisible && costNumberElem) {
            if (lastAnimatedCostValue !== lastPhdVsNoPhdDiff) {
                animateNumber(costNumberElem, lastAnimatedCostValue || 0, lastPhdVsNoPhdDiff, 1000);
                lastAnimatedCostValue = lastPhdVsNoPhdDiff;
            }
        } else if (costNumberElem) {
            // If not visible, just set the value (no animation)
            costNumberElem.textContent = lastPhdVsNoPhdDiff.toLocaleString();
            lastAnimatedCostValue = lastPhdVsNoPhdDiff;
        }

        // Update the global difference for the cost-summary (include retirement)
        lastPhdVsNoPhdDiff = Math.abs(Math.round(phdTotal + phdRetirementValue) - Math.round(nophdTotal + nophdRetirementValue));
    });
}

// Throttle scroll/resize updates for performance
let moneyUpdateTimeout = null;
function scheduleMoneyUpdate() {
    if (moneyUpdateTimeout) return;
    moneyUpdateTimeout = setTimeout(() => {
        updateMoneyDisplays();
        moneyUpdateTimeout = null;
    }, 20);
}

window.addEventListener('scroll', scheduleMoneyUpdate);
window.addEventListener('resize', scheduleMoneyUpdate);
window.addEventListener('DOMContentLoaded', () => {
    updateMoneyDisplays();
});

// Load journal citation rates and lag times from JSON
let journalCitationStats = {};

function getJournalCitationStats(journal) {
    // Return stats for the journal, or a default if not found or not loaded
    if (journalCitationStats && journalCitationStats[journal]) {
        return journalCitationStats[journal];
    }
    return { rate: 0.5, lag: 10 };
}

fetch('journal-citation-stats.json')
    .then(response => response.json())
    .then(data => {
        journalCitationStats = data;
    })
    .catch(err => {
        console.error('Failed to load journal citation stats:', err);
    });

function updateAutoTimelineSections() {
    document.querySelectorAll('timeline-section[months="auto"]').forEach(section => {
        if (typeof section.updateMonths === 'function') {
            section.updateMonths();
            if (typeof section._applyStyles === 'function') section._applyStyles();
        }
    });
}

// Patch generateRuler to call updateAutoTimelineSections after drawing
const origGenerateRuler = generateRuler;
generateRuler = function (...args) {
    origGenerateRuler.apply(this, args);
    updateAutoTimelineSections();
};
window.addEventListener('resize', updateAutoTimelineSections);

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end.toLocaleString();
        }
    };
    window.requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', () => {
    const costContainer = document.querySelector('.cost-summary-container');
    costNumberElem = document.getElementById('phd-cost-animated');
    if (costContainer && costNumberElem) {
        const observer = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                costSummaryVisible = entry.isIntersecting;
                if (costSummaryVisible) {
                    // Animate to the current value
                    animateNumber(costNumberElem, lastAnimatedCostValue || 0, lastPhdVsNoPhdDiff, 1000);
                    lastAnimatedCostValue = lastPhdVsNoPhdDiff;
                }
            });
        }, { threshold: 0.5 });
        observer.observe(costContainer);
    }
});

// --- Update UI feedback for percent-based retirement contribution and employer match ---
function updateRetirementDollarFeedback() {
    document.querySelectorAll('cycling-text[data-role="retirement-contribution"]').forEach(cycler => {
        // Find the closest income cycler in the same section
        const section = cycler.closest('timeline-section');
        let incomeCycler = section ? section.querySelector('cycling-text[data-role="income"]') : null;
        let income = 0;
        if (incomeCycler) {
            income = parseInt(incomeCycler.value || '0', 10);
        }
        // Parse employee percent
        let empPercent = 0;
        const empVal = cycler.value || '';
        if (empVal.endsWith('%')) {
            empPercent = parseFloat(empVal) / 100;
        }
        // Find employer match cycler
        const matchCycler = section ? section.querySelector('cycling-text[data-role="employer-match"]') : null;
        let matchPercent = 0;
        if (matchCycler) {
            const matchVal = matchCycler.value || '';
            if (matchVal.endsWith('%')) {
                matchPercent = parseFloat(matchVal) / 100;
            }
        }
        // Compute monthly employee contribution
        let empMonthly = 0;
        if (income > 0 && empPercent > 0) {
            empMonthly = (income * empPercent) / 12;
        }
        // Compute actual match percent (min logic)
        let actualMatchPercent = Math.min(empPercent, matchPercent);
        let matchMonthly = 0;
        if (income > 0 && actualMatchPercent > 0) {
            matchMonthly = (income * actualMatchPercent) / 12;
        }
        // Update feedback span for employee
        const feedback = cycler.nextElementSibling;
        if (feedback && feedback.classList.contains('retirement-dollar-feedback')) {
            if (empMonthly > 0) {
                feedback.textContent = `($${Math.round(empMonthly).toLocaleString()}/mo)`;
            } else {
                feedback.textContent = '';
            }
        }
        // Update feedback span for employer match
        if (matchCycler) {
            const matchFeedback = matchCycler.nextElementSibling;
            if (matchFeedback && matchFeedback.classList.contains('employer-match-dollar-feedback')) {
                if (matchMonthly > 0) {
                    matchFeedback.textContent = `($${Math.round(matchMonthly).toLocaleString()}/mo)`;
                } else {
                    matchFeedback.textContent = '';
                }
            }
        }
    });
}

// Listen for cycling-text changes
function observeRetirementCyclers() {
    document.addEventListener('click', function (e) {
        if (e.target && (e.target.closest('cycling-text[data-role="retirement-contribution"]') || e.target.closest('cycling-text[data-role="income"]') || e.target.closest('cycling-text[data-role="employer-match"]'))) {
            setTimeout(updateRetirementDollarFeedback, 10);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    updateRetirementDollarFeedback();
    observeRetirementCyclers();
});

// Mobile overlay logic
function handleMobileOverlay() {
    const overlay = document.getElementById('mobile-overlay');
    if (!overlay) return;
    if (window.innerWidth <= 768) {
        overlay.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
    }
}
window.addEventListener('DOMContentLoaded', handleMobileOverlay);
window.addEventListener('resize', handleMobileOverlay);

// --- Share Link Logic ---
(function () {
    // Each cycler index fits in 3 bits (max 8 options per cycler)
    const BITS_PER_INDEX = 3;
    const NUM_CYCLERS = 100; // For decoding, pad/truncate to this many cyclers

    function encodeIndicesBase64(indices) {
        // Pack indices into a bitstream
        let bitString = '';
        for (let idx of indices) {
            bitString += idx.toString(2).padStart(BITS_PER_INDEX, '0');
        }
        // Pad to nearest byte
        while (bitString.length % 8 !== 0) bitString += '0';
        // Convert to bytes
        const bytes = [];
        for (let i = 0; i < bitString.length; i += 8) {
            bytes.push(parseInt(bitString.slice(i, i + 8), 2));
        }
        // Convert to base64url
        const binary = String.fromCharCode(...bytes);
        return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    function decodeIndicesBase64(hash) {
        // Base64url decode
        let binary = '';
        try {
            binary = atob(hash.replace(/-/g, '+').replace(/_/g, '/'));
        } catch (e) {
            return [];
        }
        let bitString = '';
        for (let i = 0; i < binary.length; i++) {
            bitString += binary.charCodeAt(i).toString(2).padStart(8, '0');
        }
        // Unpack indices
        const indices = [];
        for (let i = 0; i < NUM_CYCLERS; i++) {
            const bits = bitString.slice(i * BITS_PER_INDEX, (i + 1) * BITS_PER_INDEX);
            if (bits.length < BITS_PER_INDEX) break;
            indices.push(parseInt(bits, 2));
        }
        return indices;
    }

    function getCyclerIndices() {
        return Array.from(document.querySelectorAll('cycling-text')).map(c => c.index || 0);
    }

    function setCyclerIndices(indices) {
        const cyclers = document.querySelectorAll('cycling-text');
        cyclers.forEach((c, i) => {
            if (indices[i] !== undefined && !isNaN(indices[i])) {
                c.index = indices[i];
                c.render && c.render();
                if (typeof c.refresh === 'function') c.refresh();
            }
        });
        // Force all sidecap cards to refresh their images
        document.querySelectorAll('timeline-sidecap-card').forEach(card => {
            if (typeof card.refresh === 'function') card.refresh();
        });
    }

    function updateShareLink() {
        const indices = getCyclerIndices();
        const hash = encodeIndicesBase64(indices);
        const url = `${location.origin}${location.pathname}#${hash}`;
        const input = document.getElementById('share-link');
        if (input) input.value = url;

        // note: disabling this for now because it leads to a lot of issues
        // with managing state. disabling this also allows me to add a 
        // reload button (and support cmd+r which reloads the page and randomizes choices)

        // // Update the address bar hash without reloading
        // if (window.location.hash !== `#${hash}`) {
        //     history.replaceState(null, '', `#${hash}`);
        // }
    }

    function observeCyclers() {
        document.querySelectorAll('cycling-text').forEach(c => {
            c.addEventListener('click', updateShareLink);
        });
    }

    function setupCopyButton() {
        const btn = document.getElementById('copy-share-link');
        const input = document.getElementById('share-link');
        if (btn && input) {
            btn.onclick = function () {
                input.select();
                document.execCommand('copy');
                btn.classList.add('btn-success');
                setTimeout(() => btn.classList.remove('btn-success'), 600);
            };
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        if (location.hash.length > 1) {
            const hash = location.hash.slice(1);
            const indices = decodeIndicesBase64(hash);
            setCyclerIndices(indices);
        }
        updateShareLink();
        observeCyclers();
        setupCopyButton();
    });

    // MutationObserver for programmatic changes
    const observer = new MutationObserver(updateShareLink);
    window.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('cycling-text').forEach(c => {
            observer.observe(c, { attributes: true, attributeFilter: ['index'] });
        });
    });
})(); 