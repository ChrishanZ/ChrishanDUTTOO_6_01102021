import Factory from "./Factory.js";
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
            if (mediasImages[o].image) {
              this.medias.push(new Factory("image", mediasImages[o]));
            } else if (mediasImages[o].video) {
              this.medias.push(new Factory("video", mediasImages[o]));
            }
          }
          // this.lightbox = new Lightbox(this.medias);
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

  // displayMedia(arrayMedias) {
  //   const container = document.querySelector(".photograph-grid");
  //   // MEDIAS
  //   const divMedia = document.createElement("div");
  //   divMedia.className = "photograph-grid-media";
  //   for (let l = 0; l < arrayMedias.length; l++) {
  //     const containerMedia = document.createElement("div");
  //     containerMedia.className = "photograph-grid-media-containerMedia";
  //     const vidMedia = document.createElement("video");
  //     const imgMedia = document.createElement("img");
  //     if (arrayMedias[l].video) {
  //       containerMedia.appendChild(vidMedia);
  //     } else if (arrayMedias[l].image) {
  //       imgMedia.src = `media/artistsPictures/${arrayMedias[l].image}`;
  //       imgMedia.alt = `${arrayMedias[l].alt}`;

  //       imgMedia.addEventListener("click", () => {
  //         const lightboxModal = document.createElement("div");
  //         lightboxModal.classList = "lightboxModal";
  //         lightboxModal.style.display = "flex";
  //         const left = document.createElement("span");
  //         left.classList = "lightboxModal_left";

  //         const right = document.createElement("span");
  //         right.classList = "lightboxModal_right";

  //         const cross = document.createElement("span");
  //         cross.classList = "lightboxModal_cross";

  //         const lightboxImg = document.createElement("img");
  //         lightboxImg.src = `media/artistsPictures/${arrayMedias[l].image}`;
  //         lightboxImg.alt = `${arrayMedias[l].alt}`;
  //         lightboxModal.appendChild(lightboxImg);

  //         right.addEventListener("click", () => {
  //           lightboxImg.remove();
  //           l++;
  //           lightboxImg.src = `media/artistsPictures/${arrayMedias[l].image}`;
  //           lightboxImg.alt = `${arrayMedias[l].alt}`;
  //           lightboxModal.appendChild(lightboxImg);
  //         });

  //         left.addEventListener("click", () => {
  //           lightboxImg.remove();
  //           l--;
  //           lightboxImg.src = `media/artistsPictures/${arrayMedias[l].image}`;
  //           lightboxImg.alt = `${arrayMedias[l].alt}`;
  //           lightboxModal.appendChild(lightboxImg);
  //         });
  //         cross.addEventListener("click", () => {
  //           lightboxModal.style.display = "none";
  //         });

  //         lightboxModal.appendChild(left);

  //         lightboxModal.appendChild(right);
  //         lightboxModal.appendChild(cross);
  //         containerMedia.appendChild(lightboxModal);
  //       });
  //       containerMedia.appendChild(imgMedia);
  //     }

  //     const bottomMedia = document.createElement("div");
  //     bottomMedia.className = "photograph-grid-media-containerMedia_bottom";

  //     const pText = document.createElement("p");
  //     pText.textContent = `${arrayMedias[l].alt}`;

  //     const spanLikes = document.createElement("span");
  //     spanLikes.textContent = `${arrayMedias[l].likes} ♥`;

  //     bottomMedia.appendChild(pText);
  //     bottomMedia.appendChild(spanLikes);
  //     containerMedia.appendChild(bottomMedia);
  //     divMedia.appendChild(containerMedia);
  //     container.appendChild(divMedia);
  //   }
  // }

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
      divMedia.appendChild(medias[i].display());
    }
  }
}
