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
    let ul = document.createElement("ul");

    anchor.href = `./photographerPage.html?id=${this.id}`; //
    img.src = `media/PhotographersIDPhotos/${this.portrait}`;
    img.alt = `Portrait représentant:  ${this.name}`;
    h2.textContent = `${this.name}`;
    strong.textContent = `${this.city}, ${this.country}`;
    p.textContent = `${this.tagline}`;
    span.textContent = `${this.price}€/jour`;

    anchor.appendChild(img);
    anchor.appendChild(h2);
    li.appendChild(anchor);
    div.appendChild(strong);
    div.appendChild(p);
    div.appendChild(span);
    for (let i = 0; i < this.tags.length; i++) {
      let liTags = document.createElement("li");
      liTags.textContent = `#${this.tags[i]}`;
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

    divLeft.className = "photograph-bandeau-left";
    divLeftInner.className = "photograph-bandeau-left_inner";
    h2.textContent = `${this.name}`;
    h3.textContent = `Contactez-moi`;
    h3.addEventListener("click", () => {
      this.displayForm();
    });

    const strong = document.createElement("strong");
    const p = document.createElement("p");
    const ul = document.createElement("ul");
    strong.textContent = `${this.city}, ${this.country}`;
    p.textContent = `${this.tagline}`;
    for (let i = 0; i < this.tags.length; i++) {
      let liTags = document.createElement("li");
      liTags.textContent = `#${this.tags[i]}`;
      ul.appendChild(liTags);
    }

    divLeftInner.appendChild(h2);
    divButton.appendChild(h3);
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
    const divModal = document.querySelector(".modal");
    const h4Modal = document.querySelector(".modal-container_title h4");
    const cross = document.querySelector("#cross");
    const pModalPrenom = document.querySelector("#prenom");
    const pModalNom = document.querySelector("#nom");
    const pModalEmail = document.querySelector("#mail");
    const pModalMsg = document.querySelector("#message");
    const prenomInput = document.querySelector("#prenomInput");
    const nomInput = document.querySelector("#nomInput");
    const emailInput = document.querySelector("#mailInput");
    const messageInput = document.querySelector("#messageInput");
    const buttonSend = document.querySelector("button");

    h4Modal.textContent = `Contactez-moi ${this.name}`;
    divModal.style.display = "flex";
    cross.addEventListener("click", () => {
      divModal.style.display = "none";
    });

    buttonSend.textContent = `Envoyer`;
    pModalPrenom.textContent = `Prénom`;
    pModalNom.textContent = `Nom`;
    pModalEmail.textContent = `Email`;
    pModalMsg.textContent = `Votre Message`;

    buttonSend.addEventListener("click", () => {
      console.log("Prénom : ", prenomInput.value);
      console.log("Nom : ", nomInput.value);
      console.log("Mail : ", mailInput.value);
      console.log("Message : ", messageInput.value);
    });
  }

  displayCard(likes) {
    const containerCard = document.querySelector(".photograph-card");
    containerCard.firstChild.textContent = `${likes} ♥`;
    containerCard.lastChild.textContent = `${this.price}€ / jour`;
  }
  // displayLikes(likes){}
}
