export default class Photographer {
  constructor(id, name, portrait, city, country, tags, tagline, price) {
    this.id = id;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.tags = tags;
    this.price = price;
  }

  display() {
    let li = document.createElement("li");

    let anchor = document.createElement("a");
    anchor.href = `./photographerPage.html?id=${this.id}`; //
    // anchor.className = "photograph__card--link";

    let img = document.createElement("img");
    img.src = `media/PhotographersIDPhotos/${this.portrait}`;
    // img.className = `artist-pict`;
    img.alt = `Portrait représentant:  ${this.name}`;

    let h2 = document.createElement("h2");
    h2.textContent = `${this.name}`;

    let div = document.createElement("div");
    // div.className = "photograph__card--txt";

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
}
