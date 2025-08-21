const resep = document.querySelector(".resep");
resep.addEventListener("click", () => {
  window.location.href = "pages/resep.html";
});
const tentang = document.querySelector(".tentang");
tentang.addEventListener("click", () => {
  window.location.href = "pages/tentang.html";
});

const showDetail = document.querySelectorAll(".detail");
showDetail.forEach((e) => {
  e.addEventListener("click", () => {
    // cek card yg diklik
    const dataset = ambilDataset(e);
    bikinResep(dataset);
    const body = document.body;
    body.classList.add("card-open");
    bikinResep();
  });
});

const kategori = document.querySelectorAll(".kategori");
kategori.forEach((e) => {
  e.addEventListener("click", () => {
    // console.log(e.textContent);
    bikinMenu("dataKategori", e.textContent.toLowerCase());
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
        body.classList.remove("card-open");
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
    // jika inputan kosong
    const input = document.querySelector("#search").value.toLowerCase();
    if (input === "") {
      eror("Masukkan kata kunci pencarian");
      return;
    }
    bikinMenu("judul", input);
  }
});

// function eror
const eror = function (pesanEror) {
  const oldCard = document.querySelectorAll(".card-item");
  oldCard.forEach((e) => {
    e.remove();
  });
  const container = document.querySelector(".container-card");
  const notFound = document.createElement("div");
  notFound.classList.add("not-found");
  notFound.textContent = pesanEror;
  container.appendChild(notFound);
};

//  function bikin element card menu
async function bikinMenu(key, value) {
  // bentuk key harus berupa string
  const data = await loadData("data/card.json");

  // hapus pesan,card sebelumnya
  eror();
  const notFound = document.querySelector(".not-found");
  notFound ? notFound.remove() : null;

  let ketemu = false;

  data.forEach((e) => {
    if (e[key].toLowerCase().includes(value)) {
      // console.log(input);
      // bikin element
      const card = document.createElement("div");
      card.classList.add("card-item");
      const img = document.createElement("img");
      img.setAttribute("src", e.img);
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
      detail.setAttribute("data-nama", e.dataset);
      detail.textContent = "detail";
      detail.addEventListener("click", () => {
        bikinResep(e.dataset);
      });

      card.appendChild(img);
      info.appendChild(jdlInfo);
      info.appendChild(textInfo);
      card.appendChild(info);
      foter.appendChild(detail);
      card.appendChild(foter);

      const container = document.querySelector(".container-card");
      container.appendChild(card);
      ketemu = true;
    }
  });
  if (!ketemu) {
    eror("Resep tidak ditemukan");
  }
}
