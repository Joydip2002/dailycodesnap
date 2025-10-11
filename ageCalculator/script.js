
const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculate");
const resultDiv = document.getElementById("result");

calculateBtn.addEventListener("click", () => {
    const dob = new Date(dobInput.value);
    if (!dobInput.value) {
        resultDiv.textContent = "Please select your birth date!";
        return;
    }
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    resultDiv.textContent = `You are ${age} years old 🎉`;
});