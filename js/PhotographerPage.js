import Factory from "./Factory.js";
import Lightbox from "./Lightbox.js";
import Photographer from "./Photographer.js";

export default class PhotographerPage {
  constructor() {
    this.photographer = {};
    this.medias = [];
    this.lightbox = null;

    const filter = document.querySelector("#filter");
    const menuOuvert = document.querySelector(".photograph-grid-tri_button");
    const menuFermer = document.querySelector(
      ".photograph-grid-tri_buttonFirst"
    );

    filter.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        menuFermer.style.display = "none";
        menuOuvert.style.display = "flex";
      }
    });
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
            if (mediasImages[o].image) {
              this.medias.push(new Factory("image", mediasImages[o]));
            } else if (mediasImages[o].video) {
              this.medias.push(new Factory("video", mediasImages[o]));
            }
          }

          break;
        }
      }

      this.lightbox = new Lightbox(this.medias);
      this.photographer.displayBandeau();
      this.photographer.displayCard(likes);

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
    // use slice() to copy the array and not just make a reference

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

    ["click", "keypress"].forEach((evt) =>
      filterTextClickedPopularite.addEventListener(
        evt,
        () => {
          console.log(evt);
          if (evt === "click" || evt === "keypress") {
            this.deleteDomMedia();
            this.medias.sort(function (a, b) {
              return b.likes - a.likes;
            });
            this.displayMedias(this.medias);
            this.updateFilter(filterTextClickedPopularite.innerText);
          }
        },
        false
      )
    );

    ["click", "keypress"].forEach((evt) =>
      filterTextClickedDate.addEventListener(
        evt,
        () => {
          if (evt === "click" || evt === "keypress") {
            this.deleteDomMedia();
            this.medias.sort(function (a, b) {
              var x = a.alt.toLowerCase();
              var y = b.alt.toLowerCase();
              return x < y ? -1 : x > y ? 1 : 0;
            });
            this.displayMedias(this.medias);
            this.updateFilter(filterTextClickedDate.innerText);
          }
        },
        false
      )
    );

    ["click", "keypress"].forEach((evt) =>
      filterTextClickedTitre.addEventListener(
        evt,
        () => {
          if (evt === "click" || evt === "keypress") {
            this.deleteDomMedia();
            this.medias.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });
            this.displayMedias(this.medias);
            this.updateFilter(filterTextClickedTitre.innerText);
          }
        },
        false
      )
    );

    arrowOuverte.addEventListener("click", () => {
      menuFermer.style.display = "none";
      menuOuvert.style.display = "flex";
    });

    arrowFermer.addEventListener("click", () => {
      menuOuvert.style.display = "none";
      menuFermer.style.display = "flex";
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
      const divMediaEachFirstChild = divMediaEach.firstChild;

      divMediaEachFirstChild.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
          this.lightbox.start(i);
        }
      });

      divMediaEachFirstChild.addEventListener("click", () => {
        this.lightbox.start(i);
      });

      const bottomMedia = document.createElement("div");
      bottomMedia.className = "photograph-grid-media-containerMedia_bottom";

      const pText = document.createElement("p");
      pText.textContent = `${medias[i].alt}`;

      const spanLikes = document.createElement("span");
      spanLikes.textContent = `${medias[i].likes} ♥`;

      spanLikes.addEventListener("click", () => {
        spanLikes.textContent = `${(medias[i].likes += 1)} ♥`;
        let wholeLikes = 0;
        for (let j = 0; j < medias.length; j++) {
          wholeLikes += medias[j].likes;
        }
        this.photographer.displayCard(wholeLikes);

        console.log("medias", medias);
        console.log("this medias", this.medias);
      });
      bottomMedia.appendChild(pText);
      bottomMedia.appendChild(spanLikes);

      divMediaEach.appendChild(bottomMedia);

      divMedia.appendChild(divMediaEach);
    }
  }
}
