const home = document.querySelector(".home").addEventListener("click", (event) => {
  window.location.href = "../index.html";
  event.preventDefault();
});
const resep = document.querySelector(".resep").addEventListener("click", (event) => {
  window.location.href = "../pages/resep.html";
  event.preventDefault();
});

// menu di layar hp
const menu = document.querySelector("#menu").addEventListener("click", () => {
  const header = document.querySelector("header");
  header.style.display = header.style.display === "flex" ? "none" : "flex";
});