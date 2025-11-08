const menu = document.querySelector(".circle-menu");
const btn = document.querySelector(".menu-btn");
const items = document.querySelectorAll(".item");

btn.onclick = () => {
    menu.classList.toggle("active");
    btn.style.transform = `rotate(45deg)`;
    const radius = 120;
    const angleStep = 360 / items.length;

    items.forEach((item, i) => {
        const angle = angleStep * i - 90;
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;

        if (menu.classList.contains("active")) {
            item.style.transform = `translate(${x}px, ${y}px)`;
            btn.style.transform = `rotate(45deg)`;
        } else {
            item.style.transform = `translate(0,0)`;
            btn.style.transform = `rotate(0deg)`;
        }
    });
};






















