export default class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.position = 0;

    const lightboxModal = document.querySelector(".lightboxModal");
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
  }

  start(index) {
    this.position = index;

    const lightboxModal = document.querySelector(".lightboxModal");
    lightboxModal.style.display = "flex";
    this.display();
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
    const p = document.createElement("p");
    lightboxModal.appendChild(this.medias[this.position].display());
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
