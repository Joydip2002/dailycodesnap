const getThumb = document.getElementById("getThumb");
const thumbBox = document.getElementById("thumbBox");
const thumbnail = document.getElementById("thumbnail");
const downloadBtn = document.getElementById("downloadBtn");

getThumb.addEventListener("click", () => {
    const url = document.getElementById("videoURL").value.trim();
    const videoId = extractID(url);

    if (videoId) {
        const imgURL = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        thumbnail.src = imgURL;
        downloadBtn.href = imgURL;
        thumbBox.style.display = "block";
    } else {
        alert("Enter a valid YouTube link.");
    }
});

function extractID(url) {
    const match = url.match(/(?:v=|\/)([\w-]{11})/);
    return match ? match[1] : null;
}





















