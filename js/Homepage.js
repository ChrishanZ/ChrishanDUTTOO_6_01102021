import Photographer from "./Photographer.js";

export default class Homepage {
  constructor() {
    this.photographersList = [];
    this.tags = [];
  }

  async getPhotographers() {
    try {
      const response = await fetch("../js/data.json");
      const data = await response.json();
      data.photographers.forEach((photographer) => {
        this.photographersList.push(
          new Photographer(
            photographer.id,
            photographer.name,
            photographer.portrait,
            photographer.city,
            photographer.country,
            photographer.tags,
            photographer.tagline,
            photographer.price
          )
        );
      });
      this.displayedPhotographers = this.photographersList;
    } catch (e) {
      console.log("e : ", e);
    }
  }

  displayPhotographers() {
    let ul = document.createElement("ul");
    let container = document.getElementById("container");
    container.appendChild(ul);
    for (let i = 0; i < this.displayedPhotographers.length; i++) {
      ul.appendChild(this.displayedPhotographers[i].display());
      console.log("test");
    }
  }
  // parcourir la boucle de l'ensemble des photosgraphers

  getTags() {
    for (let i = 0; i < this.photographersList.length; i++) {
      for (let j = 0; j < this.photographersList[i].tags.length; j++) {
        this.tags.push(this.photographersList[i].tags[j]);
      }
    }
    this.tags = [...new Set(this.tags)];
    this.tags.unshift("all");
    console.log(this.tags);
  }
  filterTags(tag) {
    console.log(tag);
    console.log(this.photographersList);
    if (tag !== "all") {
      this.displayedPhotographers = this.photographersList.filter(
        (photographer) => photographer.tags.includes(tag)
      );
    } else {
      this.displayedPhotographers = this.photographersList;
    }
    let container = document.getElementById("container");
    // tant que container a des child
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }

    this.displayPhotographers();
    console.log(this.displayedPhotographers);
  }

  displayTags() {
    let navigation = document.getElementById("navigation");

    for (let i = 0; i < this.tags.length; i++) {
      let li = document.createElement("li");
      li.textContent = `#${this.tags[i]}`;
      li.setAttribute("id", "anchorTags");
      navigation.appendChild(li);
      li.addEventListener("click", (event) => {
        this.filterTags(this.tags[i]);
      });
    }
  }
}
