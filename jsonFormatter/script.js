const btn = document.getElementById('formatBtn');
const input = document.getElementById('jsonInput');
const output = document.getElementById('output');

btn.addEventListener('click', () => {
    try {
        const parsed = JSON.parse(input.value);
        const formatted = JSON.stringify(parsed, null, 2);
        output.textContent = formatted;
        output.classList.remove('error');
    } catch (err) {
        output.textContent = "Invalid JSON:\n" + err.message;
        output.classList.add('error');
    }
});













