import Factory from "./Factory.js";

export default class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.position = 0;
  }

  start(index) {
    this.position = index;

    console.log(this.position);
    console.log(this.medias);
    const lightboxModal = document.querySelector(".lightboxModal");
    lightboxModal.style.display = "flex";

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
  }
  next() {
    if (this.position === this.medias.length - 1) {
      this.position = 0;
    } else {
      this.position++;
    }
    this.display();
  }
  prev() {
    if (this.position === 0) {
      this.position = this.medias.length - 1;
    } else {
      this.position--;
    }
    this.display();
  }
  display() {
    const lightboxModal = document.querySelector(".lightboxModal");
    lightboxModal.appendChild(this.medias[this.position].display());
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
