const home = document.querySelector(".home").addEventListener("click", (event) => {
  window.location.href = "../index.html";
  event.preventDefault();
});
const resep = document.querySelector(".resep").addEventListener("click", (event) => {
  window.location.href = "../pages/resep.html";
  event.preventDefault();
});