const resep = document.querySelector(".resep");
resep.addEventListener("click", () => {
  window.location.href = "pages/resep.html";
  preventDefault();
});
const showDetail = document.querySelectorAll(".detail");
showDetail.forEach((e) => {
  e.addEventListener("click", () => {
    // cek card yg diklik
    const dataset = ambilDataset(e);
    bikinResep(dataset);
  });
});

async function loadData(path) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch {
    console.error();
  }
}

const ambilDataset = function (elemen) {
  const dataset = elemen.dataset.nama;
  console.log(dataset);
  return dataset;
};

// function bikin element detail resep
async function bikinResep(dataset) {
  const data = await loadData("data/resep.json");
  data.forEach((e) => {
    // cek card yg dikklik
    if (e.nama.toLowerCase().includes(dataset)) {
      console.log(`isi data`, data);
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
      masak.textContent = "Cara memasak :";
      const cara = document.createElement("p");
      cara.textContent = e.cara_masak;

      // tombol tutup
      const tutup = document.createElement("button");
      tutup.classList.add("tutup");
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
    }
  });
}

// bikin fitur serch
const input = document.querySelector("#search");
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    bikinMenu();
  }
});

//  function bikin element card menu
async function bikinMenu() {
  const data = await loadData("data/card.json");
  // ambil falue input
  const input = document.querySelector("#search").value.toLowerCase();
  // hapus card sebelumnya
  const oldCard = document.querySelectorAll(".card-item");
  oldCard.forEach((e) => {
    e.remove();
  });
  let ketemu = false;
  data.forEach((e) => {
    if (e.judul.toLowerCase().includes(input)) {
      console.log(input);
      // bikin element
      const card = document.createElement("div");
      card.classList.add("card-item");
      const img = document.createElement("img");
      img.setAttribute("src", "images/sate.png");
      const info = document.createElement("div");
      info.classList.add("card-info");
      const jdlInfo = document.createElement("h3");
      jdlInfo.textContent = e.judul;
      const textInfo = document.createElement("p");
      textInfo.textContent = e.text;
      const foter = document.createElement("div");
      foter.classList.add("card-foter");
      const detail = document.createElement("div");
      detail.classList.add("detail");
      detail.setAttribute("data-nama", e.datset);
      detail.textContent = "detail";

      card.appendChild(img);
      info.appendChild(jdlInfo);
      info.appendChild(textInfo);
      card.appendChild(info);
      foter.appendChild(detail);
      card.appendChild(foter);

      const container = document.querySelector(".container-card");
      container.appendChild(card);

      const showDetail = document.querySelectorAll(".detail");
      showDetail.forEach((e) => {
        e.addEventListener("click", () => {
          // cek card yg diklik
          const dataset = ambilDataset(e);
          bikinResep(dataset);
        });
      });
      ketemu = true;
    }
  });
  if (!ketemu) {
    const container = document.querySelector(".container-card");
    container.textContent = `Resep untuk ${input} tidak tersedia`;
  }
}
