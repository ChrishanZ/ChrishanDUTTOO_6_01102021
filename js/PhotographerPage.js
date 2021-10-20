import Photographer from "./Photographer.js";

export default class PhotographerPage {
  constructor() {
    this.photographer = {};
  }

  async getPhotographer(id) {
    const mediasImages = [];
    let likes = 0;
    try {
      const response = await fetch("../js/data.json");
      const data = await response.json();

      for (let j = 0; j < data.media.length; j++) {
        if (data.media[j].photographerId === id) {
          mediasImages.push(data.media[j]);
        }
      }
      for (let i = 0; i < data.photographers.length; i++) {
        if (data.photographers[i].id === id) {
          this.photographer = new Photographer(
            data.photographers[i].id,
            data.photographers[i].name,
            data.photographers[i].portrait,
            data.photographers[i].city,
            data.photographers[i].country,
            data.photographers[i].tags,
            data.photographers[i].tagline,
            data.photographers[i].price,
            mediasImages
          );
          for (let o = 0; o < mediasImages.length; o++) {
            likes += mediasImages[o].likes;
          }
          this.photographer.displayBandeau();
          this.photographer.displayCard(likes);
          break;
        }
      }
    } catch (e) {
      console.log("error : ", e);
    }
  }

  displayMedia() {
    const container = document.querySelector("#container");
    const div = document.createElement("div");
    const divTri = document.createElement("div");
    const p = document.createElement("p");

    div.className = "photograph-grid";
    divTri.className = "photograph-grid-tri";
    p.textContent = `Trier par `;

    // Menu fermer
    const divButtonFirst = document.createElement("div");
    const divButtonNotListed = document.createElement("div");
    const pButtonNotListed = document.createElement("p");
    pButtonNotListed.textContent = `Popularité`;
    divButtonNotListed.className = "photograph-grid-tri_buttonFirst_notListed";
    divButtonNotListed.appendChild(pButtonNotListed);
    const spanButtonNotListed = document.createElement("span");

    divButtonFirst.className = "photograph-grid-tri_buttonFirst";
    divButtonFirst.appendChild(divButtonNotListed);
    divButtonFirst.appendChild(spanButtonNotListed);

    divTri.appendChild(p);
    divTri.appendChild(divButtonFirst);
    div.appendChild(divTri);

    //Menu Ouvert
    const divButton = document.createElement("div");
    const divButtonList = document.createElement("div");
    const pButtonPopularite = document.createElement("p");
    const pButtonDate = document.createElement("p");
    const pButtonTitre = document.createElement("p");
    const spanButton = document.createElement("span");

    pButtonPopularite.textContent = `Popularité`;
    pButtonDate.textContent = `Date`;
    pButtonTitre.textContent = `Titre`;

    pButtonPopularite.addEventListener("click", () => {
      arrayMedias = [...arrayMediasLikes];
      console.log("popu: ", arrayMedias);
    });
    pButtonDate.addEventListener("click", () => {
      arrayMedias = [...arrayMediasDate];
      console.log("date: ", arrayMedias);
    });
    pButtonTitre.addEventListener("click", () => {
      arrayMedias = [...arrayMediasName];
      console.log("titre: ", arrayMedias);
    });

    divButton.className = "photograph-grid-tri_button";
    divButtonList.className = "photograph-grid-tri_button_list";

    divButtonList.appendChild(pButtonPopularite);
    divButtonList.appendChild(pButtonDate);
    divButtonList.appendChild(pButtonTitre);

    divButton.appendChild(divButtonList);
    divButton.appendChild(spanButton);

    divTri.appendChild(divButton);
    div.appendChild(divTri);

    container.appendChild(div);

    const arrowOuvrir = document.querySelector(
      ".photograph-grid-tri_buttonFirst span"
    );
    const arrowFermer = document.querySelector(
      ".photograph-grid-tri_button span"
    );
    const menuOuvert = document.querySelector(".photograph-grid-tri_button");
    const menuFermer = document.querySelector(
      ".photograph-grid-tri_buttonFirst"
    );

    arrowOuvrir.parentElement.addEventListener("click", () => {
      console.log(menuOuvert);
      menuFermer.style.display = "none";
      menuOuvert.style.display = "flex";
    });

    arrowFermer.parentElement.addEventListener("click", () => {
      console.log(menuOuvert);
      menuOuvert.style.display = "none";
      menuFermer.style.display = "flex";
    });

    // use slice() to copy the array and not just make a reference
    const arrayMediasLikes = this.photographer.media.slice(0);
    arrayMediasLikes.sort(function (a, b) {
      return b.likes - a.likes;
    });
    console.log("likes", arrayMediasLikes);

    const arrayMediasName = this.photographer.media.slice(0);
    arrayMediasName.sort(function (a, b) {
      var x = a.alt.toLowerCase();
      var y = b.alt.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    console.log("name", arrayMediasName);

    const arrayMediasDate = this.photographer.media.slice(0);
    arrayMediasDate.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    console.log("date", arrayMediasDate);

    let arrayMedias = [...arrayMediasLikes];
    console.log("basic", arrayMedias);

    // MEDIAS
    const divMedia = document.createElement("div");
    divMedia.className = "photograph-grid-media";
    for (let l = 0; l < arrayMedias.length; l++) {
      const containerMedia = document.createElement("div");
      containerMedia.className = "photograph-grid-media-containerMedia";
      const vidMedia = document.createElement("video");
      const imgMedia = document.createElement("img");
      if (arrayMedias[l].video) {
        vidMedia.src = `media/artistsVideos/${arrayMedias[l].video}`;
        containerMedia.appendChild(vidMedia);
      } else if (arrayMedias[l].image) {
        imgMedia.src = `media/artistsPictures/${arrayMedias[l].image}`;
        imgMedia.alt = `${arrayMedias[l].alt}`;
        containerMedia.appendChild(imgMedia);
      }

      const bottomMedia = document.createElement("div");
      bottomMedia.className = "photograph-grid-media-containerMedia_bottom";

      const pText = document.createElement("p");
      pText.textContent = `${arrayMedias[l].alt}`;

      const spanLikes = document.createElement("span");
      spanLikes.textContent = `${arrayMedias[l].likes} ♥`;

      bottomMedia.appendChild(pText);
      bottomMedia.appendChild(spanLikes);
      containerMedia.appendChild(bottomMedia);
      divMedia.appendChild(containerMedia);
      div.appendChild(divMedia);
    }
  }
}
