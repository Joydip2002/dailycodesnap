function showPopup(type) {
  let messages = {
    success: "Action completed!",
    error: "Something went wrong!",
    info: "Here is some info!"
  };

  let toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="icon">${
      type === "success" ? "✔" : type === "error" ? "⚠" : "ℹ"
    }</span>
    ${messages[type]}
  `;

  document.getElementById("notification-box").appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}






















