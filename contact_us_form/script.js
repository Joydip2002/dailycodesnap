const map = L.map("map").setView([20.5937, 78.9629], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const marker = L.marker([20.5937, 78.9629], { draggable: true }).addTo(
    map
);

function updateLatLng(lat, lng) {
    document.getElementById("lat").value = lat.toFixed(6);
    document.getElementById("lng").value = lng.toFixed(6);
}

marker.on("dragend", function () {
    const pos = marker.getLatLng();
    updateLatLng(pos.lat, pos.lng);
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        map.setView([latitude, longitude], 13);
        marker.setLatLng([latitude, longitude]);
        updateLatLng(latitude, longitude);
    });
}


























