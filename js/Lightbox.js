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

    lightboxModal.appendChild(this.display());
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

    const p = document.createElement("p");
    p.textContent = this.medias[this.position].alt;
    lightboxModal.appendChild(p);
  }
  deleteDom() {
    const lightboxModalImg = document.querySelector(".lightboxModal img");
    const lightboxModalVid = document.querySelector(".lightboxModal video");
    const lightboxModalText = document.querySelector(".lightboxModal p");

    if (lightboxModalImg !== null) {
      lightboxModalImg.remove();
      lightboxModalText.remove();
    } else if (lightboxModalVid !== null) {
      lightboxModalText.remove();
      lightboxModalVid.remove();
    }
  }
}
