import Factory from "./Factory.js";

export default class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.position = 0;
  }

  start(index) {
    this.position = index;

    const lightboxModal = document.querySelector(".lightboxModal");
    lightboxModal.style.display = "flex";

    const containerMedia = document.createElement("div");
    containerMedia.classList = "test";

    const left = document.querySelector(".lightboxModal_left");
    const right = document.querySelector(".lightboxModal_right");
    const cross = document.querySelector(".lightboxModal_cross");
    left.addEventListener("click", () => {
      this.deleteDom();
      this.prev();
    });
    right.addEventListener("click", () => {
      this.deleteDom();
      this.next();
    });
    cross.addEventListener("click", () => {
      this.deleteDom();
      lightboxModal.style.display = "none";
    });

    const elem = this.medias[this.position].display();
    lightboxModal.appendChild(elem);
  } // prends un index qui affiche la lightbox à partir de cet index
  next() {
    if (this.position === this.medias.length - 1) {
      this.position = 0;
    } else {
      this.position++;
    }
    this.display();
  } // + 1 et si max go a maxlength arriver à 0
  prev() {
    if (this.position === 0) {
      this.position = this.medias.length - 1;
    } else {
      this.position--;
    }
    this.display();
  } // - 1 et si max go a 0  afficher maxlength
  display() {
    const lightboxModal = document.querySelector(".lightboxModal");
    lightboxModal.appendChild(this.medias[this.position].display());
    // typeOF , instanceof  pour check si img ou video
  }
  deleteDom() {
    const lightboxModalImg = document.querySelector(".lightboxModal img");
    const lightboxModalVid = document.querySelector(".lightboxModal video");

    if (lightboxModalImg !== null) {
      lightboxModalImg.remove();
    } else if (lightboxModalVid !== null) {
      lightboxModalVid.remove();
    }
  }
}
