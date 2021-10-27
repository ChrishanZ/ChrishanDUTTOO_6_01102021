import Factory from "./Factory.js";

export default class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.position = 0;
  }

  start(index) {
    this.position = index;
  } // prends un index qui affiche la lightbox à partir de cet index
  next() {
    if (this.position === this.medias.length - 1) {
      this.position = 0;
    } else {
      this.position++;
    }
    this.display(this.medias[this.position]);
  } // + 1 et si max go a maxlength arriver à 0
  prev() {
    if (this.position === 0) {
      this.position = this.medias.length - 1;
    } else {
      this.position--;
    }
    this.display(this.medias[this.position]);
  } // - 1 et si max go a 0  afficher maxlength
  display(media) {
    const lightboxModal = document.querySelector(".lightboxModal");
    lightboxModal.style.display = "flex";
    const left = document.querySelector(".lightboxModal_left");
    const right = document.querySelector(".lightboxModal_right");
    left.addEventListener("click", () => {
      this.deleteDom();
      this.prev();
    });
    right.addEventListener("click", () => {
      this.deleteDom();
      this.next();
    });
    const cross = document.querySelector(".lightboxModal_cross");
    cross.addEventListener("click", () => {
      this.deleteDom();
      lightboxModal.style.display = "none";
    });

    const eachElem = media.display();
    lightboxModal.appendChild(eachElem);
    // typeOF , instanceof  pour check si img ou video
  }
  deleteDom() {
    const lightboxModal = document.querySelector(".lightboxModal");
    const lightboxModalContent = lightboxModal.querySelector(
      ".photograph-grid-media-containerMedia"
    );
    if (lightboxModalContent) {
      lightboxModalContent.remove();
    }
  }
}
