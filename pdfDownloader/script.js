document.getElementById("download").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const text = document.getElementById("textInput").value || "No text entered.";

    // Add title
    doc.setFontSize(16);
    doc.text("My Text PDF", 10, 20);

    // Add user text
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(text, 180); // auto-wrap text
    doc.text(splitText, 10, 35);

    // Download
    doc.save("text-content.pdf");
});















