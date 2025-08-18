const resep = document.querySelector(".resep").addEventListener("click", () => {
  window.location.href = "pages/resep.html";
});

const detail = document.querySelector(".detail-resep");

const showDetail = document.querySelectorAll(".detail");
showDetail.forEach((e) => {
  e.addEventListener("click", () => {
    detail.style.display = "block";
  });
});
const tutup = document.querySelector(".tutup").addEventListener("click", () => {
  detail.style.display = "none";
});
