function generate() {
  const len = +document.getElementById("length").value;
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (document.getElementById("numbers").checked) chars += "0123456789";
  if (document.getElementById("symbols").checked) chars += "!@#$%^&*()_+";
  let pass = "";
  for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  document.getElementById("output").textContent = pass;
}
function copyPass() {
  const text = document.getElementById("output").textContent;
  if (!text) return;
  navigator.clipboard.writeText(text);
  alert("✅ Password Copied!");
}













