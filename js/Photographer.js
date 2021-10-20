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
    // Collect media
    this.media = media;
  }

  display() {
    let li = document.createElement("li");

    let anchor = document.createElement("a");
    anchor.href = `./photographerPage.html?id=${this.id}`; //

    console.log(this.id);

    let img = document.createElement("img");
    img.src = `media/PhotographersIDPhotos/${this.portrait}`;

    img.alt = `Portrait représentant:  ${this.name}`;

    let h2 = document.createElement("h2");
    h2.textContent = `${this.name}`;

    let div = document.createElement("div");

    let strong = document.createElement("strong");
    strong.textContent = `${this.city}, ${this.country}`;

    let p = document.createElement("p");
    p.textContent = `${this.tagline}`;

    let span = document.createElement("span");
    span.textContent = `${this.price}€/jour`;

    let ul = document.createElement("ul");

    li.appendChild(anchor);
    anchor.appendChild(img);
    anchor.appendChild(h2);

    li.append(div);
    div.appendChild(strong);
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(ul);
    for (let i = 0; i < this.tags.length; i++) {
      let liTags = document.createElement("li");
      liTags.textContent = `#${this.tags[i]}`;
      ul.appendChild(liTags);
    }

    return li;
  }

  displayBandeau() {
    const container = document.querySelector("#container");
    const divContainer = document.createElement("div");

    const divLeft = document.createElement("div");
    divLeft.className = "photograph-bandeau-left";

    const divLeftInner = document.createElement("div");
    divLeftInner.className = "photograph-bandeau-left_inner";
    const h2 = document.createElement("h2");
    h2.textContent = `${this.name}`; // this.name

    const divButton = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = `Contactez-moi`;

    const strong = document.createElement("strong");
    strong.textContent = `${this.city}, ${this.country}`;

    const p = document.createElement("p");
    p.textContent = `${this.tagline}`;

    const ul = document.createElement("ul");
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

    divContainer.className = "photograph-bandeau";
    divContainer.appendChild(divLeft);
    divContainer.appendChild(divRight);
    container.appendChild(divContainer);
  }

  displayCard(likes) {
    const container = document.querySelector("#container");
    const div = document.createElement("div");
    div.className = "photograph-card";
    const p = document.createElement("p");
    p.textContent = `${likes} ♥`;
    const pSecond = document.createElement("p");
    pSecond.textContent = `${this.price}€ / jour`;
    div.appendChild(p);
    div.appendChild(pSecond);
    container.appendChild(div);
  }
}
