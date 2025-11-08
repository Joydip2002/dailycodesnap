function compare() {
    let t1 = document.getElementById("text1").value;
    let t2 = document.getElementById("text2").value;
    let result = "";
    let max = Math.max(t1.length, t2.length);

    for (let i = 0; i < max; i++) {
        if (t1[i] !== t2[i]) {
            result += `<span class="diff">${t2[i] || ""}</span>`;
        } else {
            result += t2[i] || "";
        }
    }

    document.getElementById("result").innerHTML = result;
}

document.getElementById("text1").addEventListener("input", compare);
document.getElementById("text2").addEventListener("input", compare);

















