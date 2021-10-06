export default class PhotographerPage {
  constructor(id, name, city, country, tagline, tags, portrait) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.tags = tags;
    this.portrait = portrait;
  }

  displayBandeau() {
    const container = document.querySelector("#container");
    const divContainer = document.createElement("div");

    const divLeft = document.createElement("div");
    divLeft.className = "photograph-bandeau-left";

    const divLeftInner = document.createElement("div");
    divLeftInner.className = "photograph-bandeau-left_inner";
    const h2 = document.createElement("h2");
    h2.textContent = `NAME`;

    const divButton = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = `BUTTON`;

    const strong = document.createElement("strong");
    strong.textContent = `CITY & COUNTRY`;

    const p = document.createElement("p");
    p.textContent = `TAGLINE`;

    const ul = document.createElement("ul");
    const liTags = document.createElement("li");
    ul.appendChild(liTags);
    liTags.textContent = `#TAGS`;

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
    img.src = `https://images.unsplash.com/photo-1633113089635-115b38c66c49?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80`;
    img.alt = `Portrait représentant:  TEST`;

    divRight.appendChild(img);

    divContainer.className = "photograph-bandeau";
    divContainer.appendChild(divLeft);
    divContainer.appendChild(divRight);
    container.appendChild(divContainer);
  }

  displayGrid() {}

  displayCard() {
    const container = document.querySelector("#container");
    const div = document.createElement("div");
    div.className = "photograph-card";
    const p = document.createElement("p");
    p.textContent = `297 081 ♥`;
    const pSecond = document.createElement("p");
    pSecond.textContent = `300€ / jour`;

    div.appendChild(p);
    div.appendChild(pSecond);
    container.appendChild(div);
  }
}
