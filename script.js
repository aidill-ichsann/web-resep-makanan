const resep = document.querySelector(".resep");
resep.addEventListener("click", () => {
  window.location.href = "pages/resep.html";
});

const showDetail = document.querySelectorAll(".detail");
showDetail.forEach((e) => {
  e.addEventListener("click", () => {
    bikinElemen();
  });
});

// function bikin element detail resep

async function bikinElemen() {
  try {
    const response = await fetch("data/resep.json");
    const data = await response.json();

    data.forEach((e) => {
      // bikin elemen html
      const detail = document.createElement("div");
      detail.classList.add("detail-resep");
      const judul = document.createElement("h2");
      judul.textContent = e.nama;
      const judulBahan = document.createElement("h3");
      judulBahan.textContent = "Bahan-bahannya :";

      // buat list
      const listBahan = document.createElement("ul");
      e.resep.forEach((bahan) => {
        const li = document.createElement("li");
        li.textContent = bahan;
        listBahan.appendChild(li);
      });

      const masak = document.createElement("h3");
      masak.textContent = "Mara memasak :";
      const cara = document.createElement("p");
      cara.textContent = e.cara_masak;

      // tombol tutup
      const tutup = document.createElement("button");
      tutup.classList.add("tutup")
      tutup.textContent = "tutup";

      detail.appendChild(judul);
      detail.appendChild(judulBahan);
      detail.appendChild(listBahan);
      detail.appendChild(masak);
      detail.appendChild(cara);
      detail.appendChild(tutup);

      // tombol tutup
      tutup.addEventListener("click", () => {
        detail.remove();
      });

      const body = document.body;
      body.appendChild(detail);
    });
  } catch {
    console.error();
  }
}
