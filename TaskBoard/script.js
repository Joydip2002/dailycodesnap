const tasks = document.querySelectorAll(".task");
const columns = document.querySelectorAll(".column");

tasks.forEach((task) => {
    task.addEventListener("dragstart", () =>
        task.classList.add("dragging")
    );
    task.addEventListener("dragend", () =>
        task.classList.remove("dragging")
    );
});

columns.forEach((col) => {
    col.addEventListener("dragover", (e) => {
        e.preventDefault();
        const dragging = document.querySelector(".task.dragging");
        col.appendChild(dragging);
    });

    col.addEventListener("dragenter", () => col.classList.add("highlight"));
    col.addEventListener("dragleave", () =>
        col.classList.remove("highlight")
    );
    col.addEventListener("drop", () => col.classList.remove("highlight"));
});























