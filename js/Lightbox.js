export default class Lightbox {
  constructor(medias) {
    this.medias = medias;
    this.position = 0;
    this.focusedElementBeforeModal = null;

    const lightboxModal = document.querySelector(".lightboxModal");
    const left = document.querySelector(".lightboxModal_left");
    const right = document.querySelector(".lightboxModal_right");
    const cross = document.querySelector(".lightboxModal_cross");

    left.addEventListener("click", () => {
      this.deleteDom();
      this.prev();
    });
    left.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.deleteDom();
        this.prev();
      }
    });
    right.addEventListener("click", () => {
      this.deleteDom();
      this.next();
    });
    right.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.deleteDom();
        this.next();
      }
    });
    cross.addEventListener("click", () => {
      this.deleteDom();
      lightboxModal.style.display = "none";
      this.focusedElementBeforeModal.focus();
    });
    cross.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.deleteDom();
        lightboxModal.style.display = "none";
        this.focusedElementBeforeModal.focus();
      }
    });
    lightboxModal.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        this.deleteDom();
        lightboxModal.style.display = "none";
        this.focusedElementBeforeModal.focus();
      } else if (e.keyCode === 37) {
        this.deleteDom();
        this.prev();
      } else if (e.keyCode === 39) {
        this.deleteDom();
        this.next();
      } 
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
    this.focusedElementBeforeModal = document.activeElement;
    const lightboxModal = document.querySelector(".lightboxModal");
    const p = document.createElement("p");
    lightboxModal.appendChild(this.medias[this.position].display());
    p.textContent = this.medias[this.position].alt;
    lightboxModal.appendChild(p);

    // Find all focusable children
    const focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="1"], [contenteditable]';
    let focusableElements = lightboxModal.querySelectorAll(
      focusableElementsString
    );
    // Convert NodeList to Array
    focusableElements = Array.prototype.slice.call(focusableElements);
    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];

    lightboxModal.addEventListener("keydown", trapTabKey);

    function trapTabKey(e) {
      // Check for TAB key press
      if (e.keyCode === 9) {
        // SHIFT + TAB
        if (e.shiftKey) {
          if (document.activeElement === firstTabStop) {
            e.preventDefault();
            lastTabStop.focus();
          }

          // TAB
        } else {
          if (document.activeElement === lastTabStop) {
            e.preventDefault();
            firstTabStop.focus();
          }
        }
      }

      // ESCAPE
      if (e.keyCode === 27) {
        closeModal();
      }
    }
    firstTabStop.focus();
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
