// ====== Utilities ======
const el = id => document.getElementById(id);
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Controls
const barsEl = el('bars');
const sizeRange = el('size');
const speedRange = el('speed');
const algoSelect = el('algorithm');
const btnGenerate = el('btn-generate');
const btnPlay = el('btn-play');
const btnPause = el('btn-pause');
const btnStep = el('btn-step');
const btnReset = el('btn-reset');
const countCompareEl = el('count-compare');
const countSwapEl = el('count-swap');

// State
let array = [];
let steps = []; // {type:'compare'|'swap'|'mark', i, j, arr?:[]}
let running = false;
let paused = false;
let stepPtr = 0;
let comparisons = 0, swaps = 0;
let defaultSize = Number(sizeRange.value);

// ====== Build / Render ======
function generateArray(n) {
    array = [];
    for (let i = 0; i < n; i++) {
        // values 5..100
        array.push(Math.floor(Math.random() * 96) + 5);
    }
    renderBars(array);
    resetStats();
    steps = [];
    stepPtr = 0;
}

function renderBars(arr, highlights = {}) {
    barsEl.innerHTML = '';
    const max = Math.max(...arr, 100);
    arr.forEach((v, idx) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = (v / max * 100) + '%';
        bar.dataset.index = idx;
        // tiny label for larger bars
        if (arr.length <= 40) bar.textContent = v;
        // apply highlight classes
        if (highlights.compare && (idx === highlights.compare[0] || idx === highlights.compare[1])) bar.classList.add('compare');
        if (highlights.swap && (idx === highlights.swap[0] || idx === highlights.swap[1])) bar.classList.add('swap');
        if (highlights.sorted && highlights.sorted.includes(idx)) bar.classList.add('sorted');
        barsEl.appendChild(bar);
    });
}

function resetStats() {
    comparisons = 0; swaps = 0;
    updateCounts();
}
function updateCounts() {
    countCompareEl.textContent = comparisons;
    countSwapEl.textContent = swaps;
}

// ====== Algorithms (generate action steps, not animate directly) ======
// Step actions:
// {type:'compare', i, j}
// {type:'swap', i, j}
// {type:'set', i, value} // used for insertion shifts
// {type:'mark', idx} // mark sorted

function generateBubbleSteps(arr) {
    const a = arr.slice();
    const n = a.length;
    const s = [];
    for (let pass = 0; pass < n - 1; pass++) {
        let swapped = false;
        for (let i = 0; i < n - 1 - pass; i++) {
            s.push({ type: 'compare', i, j: i + 1 });
            if (a[i] > a[i + 1]) {
                s.push({ type: 'swap', i, j: i + 1 });
                const tmp = a[i]; a[i] = a[i + 1]; a[i + 1] = tmp;
                swapped = true;
            }
        }
        // mark the last element in this pass as sorted
        s.push({ type: 'mark', idx: n - 1 - pass });
        if (!swapped) {
            // remaining are sorted
            for (let k = 0; k < n - 1 - pass; k++) s.push({ type: 'mark', idx: k });
            break;
        }
    }
    // ensure first element marked if not done
    s.push({ type: 'mark', idx: 0 });
    return s;
}

function generateInsertionSteps(arr) {
    const a = arr.slice();
    const n = a.length;
    const s = [];
    s.push({ type: 'mark', idx: 0 });
    for (let i = 1; i < n; i++) {
        let key = a[i];
        let j = i - 1;
        s.push({ type: 'compare', i: j, j: i });
        while (j >= 0 && a[j] > key) {
            s.push({ type: 'swap', i: j, j: j + 1 }); // visually shift
            a[j + 1] = a[j];
            j--;
            if (j >= 0) s.push({ type: 'compare', i: j, j: i });
        }
        a[j + 1] = key;
        s.push({ type: 'set', i: j + 1, value: key });
        // mark first i as sorted-ish (insertion ensures up to i is sorted)
        for (let k = 0; k <= i; k++) s.push({ type: 'mark', idx: k });
    }
    return s;
}

// Map steps to animations
async function playSteps() {
    running = true;
    paused = false;
    btnPlay.disabled = true;
    btnPause.disabled = false;
    btnGenerate.disabled = true;
    btnStep.disabled = true;
    algoSelect.disabled = true;
    sizeRange.disabled = true;

    const ms = Math.max(5, Number(speedRange.value));
    const sortedSet = new Set();

    for (; stepPtr < steps.length; stepPtr++) {
        if (paused) break;
        const st = steps[stepPtr];
        if (st.type === 'compare') {
            comparisons++;
            renderBars(array, { compare: [st.i, st.j], sorted: Array.from(sortedSet) });
        } else if (st.type === 'swap') {
            swaps++;
            // swap array values
            const tmp = array[st.i]; array[st.i] = array[st.j]; array[st.j] = tmp;
            renderBars(array, { swap: [st.i, st.j], sorted: Array.from(sortedSet) });
        } else if (st.type === 'set') {
            array[st.i] = st.value;
            renderBars(array, { swap: [st.i], sorted: Array.from(sortedSet) });
        } else if (st.type === 'mark') {
            sortedSet.add(st.idx);
            renderBars(array, { sorted: Array.from(sortedSet) });
        }
        updateCounts();
        await sleep(ms);
    }

    // finished or paused
    if (stepPtr >= steps.length) {
        // fully done
        running = false;
        btnPlay.disabled = false;
        btnPause.disabled = true;
        btnGenerate.disabled = false;
        btnStep.disabled = true;
        algoSelect.disabled = false;
        sizeRange.disabled = false;
    } else if (paused) {
        btnPlay.disabled = false;
        btnPause.disabled = true;
        btnGenerate.disabled = false;
        btnStep.disabled = false;
        algoSelect.disabled = false;
        sizeRange.disabled = false;
    }
}

// Single step execution (for the Step button)
async function stepOnce() {
    if (stepPtr >= steps.length) return;
    const st = steps[stepPtr++];
    if (st.type === 'compare') { comparisons++; renderBars(array, { compare: [st.i, st.j] }); }
    else if (st.type === 'swap') { swaps++; const tmp = array[st.i]; array[st.i] = array[st.j]; array[st.j] = tmp; renderBars(array, { swap: [st.i, st.j] }); }
    else if (st.type === 'set') { array[st.i] = st.value; renderBars(array, { swap: [st.i] }); }
    else if (st.type === 'mark') { renderBars(array, { sorted: [st.idx].concat([]) }); /* we don't keep full set here for step */ }
    updateCounts();
}

// Reset visualization to initial unsorted array before step generation (keeps current array)
function resetVisualization() {
    steps = [];
    stepPtr = 0;
    resetStats();
    renderBars(array);
    btnPlay.disabled = false;
    btnPause.disabled = true;
    btnStep.disabled = false;
    paused = false;
    running = false;
}

// Prepare steps from algorithm
function prepareSteps() {
    steps = [];
    stepPtr = 0;
    const arrCopy = array.slice();
    const algo = algoSelect.value;
    if (algo === 'bubble') steps = generateBubbleSteps(arrCopy);
    else steps = generateInsertionSteps(arrCopy);
    // reset counters
    comparisons = 0; swaps = 0;
    updateCounts();
    renderBars(array);
}

// ====== Events ======
btnGenerate.addEventListener('click', () => {
    generateArray(Number(sizeRange.value));
    prepareSteps();
});

btnPlay.addEventListener('click', async () => {
    if (running) {
        paused = false;
        return;
    }
    // if no steps prepared, prepare
    if (steps.length === 0) prepareSteps();
    paused = false;
    playSteps();
});

btnPause.addEventListener('click', () => {
    paused = true;
    btnPause.disabled = true;
    btnPlay.disabled = false;
});

btnStep.addEventListener('click', async () => {
    if (running) return;
    if (steps.length === 0) prepareSteps();
    await stepOnce();
});

btnReset.addEventListener('click', () => {
    paused = true;
    running = false;
    stepPtr = 0;
    generateArray(Number(sizeRange.value));
    prepareSteps();
    btnPlay.disabled = false;
    btnPause.disabled = true;
    btnStep.disabled = false;
});

// When algorithm/size changes, regenerate steps but keep array (or regenerate array)
algoSelect.addEventListener('change', () => {
    prepareSteps();
});

sizeRange.addEventListener('input', () => {
    // regenerate array live while sliding
    defaultSize = Number(sizeRange.value);
    generateArray(defaultSize);
    prepareSteps();
});

speedRange.addEventListener('input', () => {
    // no immediate action; play uses current speed
});

(function init() {
    generateArray(defaultSize);
    prepareSteps();
})();