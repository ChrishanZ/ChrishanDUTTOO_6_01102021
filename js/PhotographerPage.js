import Factory from "./Factory.js";
import Lightbox from "./Lightbox.js";
import Photographer from "./Photographer.js";

export default class PhotographerPage {
  constructor() {
    this.photographer = {};
    this.medias = [];
    this.lightbox = null;
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
            data.photographers[i].price
          );
          for (let o = 0; o < mediasImages.length; o++) {
            likes += mediasImages[o].likes;
            mediasImages[o].index;
            if (mediasImages[o].image) {
              this.medias.push(new Factory("image", mediasImages[o]));
            } else if (mediasImages[o].video) {
              this.medias.push(new Factory("video", mediasImages[o]));
            }
          }
          this.lightbox = new Lightbox(this.medias);
          this.photographer.displayBandeau();
          this.photographer.displayCard(likes);
          break;
        }
      }
      this.displayMedias(
        this.medias.sort(function (a, b) {
          return b.likes - a.likes;
        })
      );
    } catch (e) {
      console.log("error : ", e);
    }
  }

  displayFilter() {
    const filterTextClickedPopularite = document.querySelector("#popularite");
    const filterTextClickedDate = document.querySelector("#date");
    const filterTextClickedTitre = document.querySelector("#titre");
    const arrowOuverte = document.querySelector(
      ".photograph-grid-tri_buttonFirst"
    );
    const arrowFermer = document.querySelector(".photograph-grid-tri_button");
    const menuOuvert = document.querySelector(".photograph-grid-tri_button");
    const menuFermer = document.querySelector(
      ".photograph-grid-tri_buttonFirst"
    );

    filterTextClickedPopularite.addEventListener("click", (e) => {
      e.preventDefault();
      this.deleteDomMedia();
      this.displayMedias(arrayMediasLikes);
      this.updateFilter(filterTextClickedPopularite.innerText);
    });
    filterTextClickedDate.addEventListener("click", (e) => {
      e.preventDefault();
      this.deleteDomMedia();
      this.displayMedias(arrayMediasName);
      this.updateFilter(filterTextClickedDate.innerText);
    });
    filterTextClickedTitre.addEventListener("click", (e) => {
      e.preventDefault();
      this.deleteDomMedia();
      this.displayMedias(arrayMediasDate);
      this.updateFilter(filterTextClickedTitre.innerText);
    });

    arrowOuverte.addEventListener("click", () => {
      console.log(menuOuvert);
      menuFermer.style.display = "none";
      menuOuvert.style.display = "flex";
    });

    arrowFermer.addEventListener("click", () => {
      console.log(menuOuvert);
      menuOuvert.style.display = "none";
      menuFermer.style.display = "flex";
    });

    // use slice() to copy the array and not just make a reference
    const arrayMediasLikes = this.medias.slice(0);
    const arrayMediasName = this.medias.slice(0);
    const arrayMediasDate = this.medias.slice(0);
    arrayMediasLikes.sort(function (a, b) {
      return b.likes - a.likes;
    });
    arrayMediasName.sort(function (a, b) {
      var x = a.alt.toLowerCase();
      var y = b.alt.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    arrayMediasDate.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  deleteDomMedia() {
    const containerMedias = document.querySelectorAll(
      ".photograph-grid-media-containerMedia"
    );
    for (let i = 0; i < containerMedias.length; i++) {
      containerMedias[i].remove();
    }
  }
  updateFilter(filtre) {
    document.querySelector(
      ".photograph-grid-tri_buttonFirst_notListed p"
    ).textContent = `${filtre}`;
  }

  displayMedias(medias) {
    const divMedia = document.querySelector(".photograph-grid-media");

    for (let i = 0; i < medias.length; i++) {
      const divMediaEach = document.createElement("div");
      divMediaEach.classList = "photograph-grid-media-containerMedia";
      divMediaEach.appendChild(medias[i].display());

      divMediaEach.addEventListener("click", () => {
        this.lightbox.display(this.medias[i]);
      });

      const bottomMedia = document.createElement("div");
      bottomMedia.className = "photograph-grid-media-containerMedia_bottom";

      const pText = document.createElement("p");
      pText.textContent = `${medias[i].alt}`;

      const spanLikes = document.createElement("span");
      spanLikes.textContent = `${medias[i].likes} ♥`;
      bottomMedia.appendChild(pText);
      bottomMedia.appendChild(spanLikes);
      divMediaEach.appendChild(bottomMedia);

      divMedia.appendChild(divMediaEach);
    }
  }
}
