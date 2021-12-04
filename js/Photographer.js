export default class Photographer {
  constructor(id, name, portrait, city, country, tags, tagline, price, media) {
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.tags = tags;
    this.price = price;
    this.media = media;
    this.focusedElementBeforeModal = null;
  }

  display() {
    let li = document.createElement("li");
    let anchor = document.createElement("a");
    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    let div = document.createElement("div");
    let strong = document.createElement("strong");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let span2 = document.createElement("span");
    let ul = document.createElement("ul");

    anchor.tabIndex = 0;
    h2.tabIndex = 0;
    strong.tabIndex = 0;
    p.tabIndex = 0;
    span.tabIndex = 0;

    anchor.href = `./photographerPage.html?id=${this.id}`; //
    img.src = `media/PhotographersIDPhotos/${this.portrait}`;
    img.alt = `Portrait représentant:  ${this.name}`;
    h2.textContent = `${this.name}`;
    strong.textContent = `${this.city}, ${this.country}`;
    p.textContent = `${this.tagline}`;
    span2.textContent = '/';
    span2.ariaHidden = "true";
    console.log(span2);
    const firstText = document.createTextNode(`${this.price}€`);
    const secondText = document.createTextNode(`jour`);
    span.appendChild(firstText);
    span.appendChild(span2);
    span.appendChild(secondText);


   

    anchor.appendChild(img)
    li.appendChild(anchor);
    li.appendChild(h2);
    div.appendChild(strong);
    div.appendChild(p);
    div.appendChild(span);
    for (let i = 0; i < this.tags.length; i++) {
      let liTags = document.createElement("li");
      let spanSr = document.createElement("span");
      spanSr.textContent = "#";
      spanSr.ariaHidden = "true";
      const newText = document.createTextNode(this.tags[i]);
      liTags.appendChild(spanSr);
      liTags.appendChild(newText);
      liTags.tabIndex = 0;
      ul.appendChild(liTags);
    }
    div.appendChild(ul);
    li.appendChild(div);
    return li;
  }

  displayBandeau() {
    const divContainer = document.querySelector(".photograph-bandeau");
    const divLeft = document.createElement("div");
    const divLeftInner = document.createElement("div");
    const h2 = document.createElement("h2");
    const divButton = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");
    h2.tabIndex = 0;
    a.tabIndex = 0;
 
    a.classList.add("modal-toggle");

    a.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.displayForm();
      }
    });
    a.addEventListener("click", () => {
      this.displayForm();
    });

    divLeft.className = "photograph-bandeau-left";
    divLeftInner.className = "photograph-bandeau-left_inner";
    h2.textContent = `${this.name}`;
    h3.textContent = `Contactez-moi`;
    h3.ariaLabel = `Contactez-moi, appuyer sur entrer pour ouvrir la modale de contact`;

    const strong = document.createElement("strong");
    const p = document.createElement("p");
    const ul = document.createElement("ul");
    strong.tabIndex = 0;
    p.tabIndex = 0;

    strong.textContent = `${this.city}, ${this.country}`;
    p.textContent = `${this.tagline}`;
    for (let i = 0; i < this.tags.length; i++) {
      let liTags = document.createElement("li");
      let spanSr = document.createElement("span");
      spanSr.textContent = "#";
      spanSr.ariaHidden = "true";
      const newText = document.createTextNode(this.tags[i]);
      liTags.appendChild(spanSr);
      liTags.appendChild(newText);
      liTags.tabIndex = 0;
      ul.appendChild(liTags);
    }

    divLeftInner.appendChild(h2);
    a.appendChild(h3);
    divButton.appendChild(a);
    divLeftInner.appendChild(divButton);
    divLeft.appendChild(divLeftInner);
    divLeft.appendChild(strong);
    divLeft.appendChild(p);
    divLeft.appendChild(ul);

    const divRight = document.createElement("div");
    divRight.className = "photograph-bandeau-right";
    const img = document.createElement("img");
    img.src = `media/PhotographersIDPhotos/${this.portrait}`;
    img.alt = `Portrait représentant:  ${this.name}`;

    divRight.appendChild(img);
    divContainer.appendChild(divLeft);
    divContainer.appendChild(divRight);
  }

  displayForm() {
    // Save current focus
    this.focusedElementBeforeModal = document.activeElement;

    const divModal = document.querySelector(".modal");
    const modal = document.querySelector(".modal-container");
    const h4Modal = document.querySelector(".modal-container_title h4");
    const cross = document.querySelector("#cross");
    const crossAref = document.querySelector("#crossAref");
    const prenomInput = document.querySelector("#prenomInput");
    const nomInput = document.querySelector("#nomInput");
    const emailInput = document.querySelector("#mailInput");
    const messageInput = document.querySelector("#messageInput");
    const buttonSend = document.querySelector("button");

    modal.addEventListener("keydown", trapTabKey);

    h4Modal.textContent = `Contactez-moi ${this.name}`;
    divModal.style.display = "flex";

    crossAref.ariaLabel = "Fermer"
    crossAref.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.closeModal();
        prenomInput.value = "";
        nomInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
      }
    });
    modal.addEventListener("keydown", (event) => {
      if (event.keyCode == 27) {
        this.closeModal();
        prenomInput.value = "";
        nomInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
      }
    });

    cross.addEventListener("click", () => {
      this.closeModal();
        prenomInput.value = "";
        nomInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    });

    buttonSend.addEventListener("click", () => {
      console.log("Prénom : ", prenomInput.value);
      console.log("Nom : ", nomInput.value);
      console.log("Mail : ", emailInput.value);
      console.log("Message : ", messageInput.value);
      this.closeModal();
      prenomInput.value = "";
      nomInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
    });

    // Find all focusable children
    const focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElements = modal.querySelectorAll(focusableElementsString);
    // Convert NodeList to Array
    focusableElements = Array.prototype.slice.call(focusableElements);

    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];
    firstTabStop.focus();

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
    }
  }

  closeModal() {
    const divModal = document.querySelector(".modal");
    divModal.style.display = "none";

    // Set focus back to element that had it before the modal was opened
    this.focusedElementBeforeModal.focus();
  }

  displayCard(likes) {
    const containerCard = document.querySelector(".photograph-card");
    containerCard.firstChild.textContent = `${likes} ♥`;
    containerCard.lastChild.textContent = `${this.price}€ / jour`;
  }
}
