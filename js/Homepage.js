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
  }
  filterTags(tag) {
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
  }
  resetColorTags() {
    let navigation = document.getElementById("navigation");

    for (let i = 0; i < navigation.children.length; i++) {
      navigation.children[i].children[0].style.backgroundColor = "white";
    }
  }
  displayTags() {
    let navigation = document.getElementById("navigation");
    for (let i = 0; i < this.tags.length; i++) {
      let a = document.createElement("a");
      a.tabIndex = 0;
      let li = document.createElement("li");
      
      let spanSr = document.createElement("span");
      spanSr.textContent = "#";
      spanSr.ariaHidden = "true";
      const newText = document.createTextNode(this.tags[i]);
      li.appendChild(spanSr);
      li.appendChild(newText);
   
      
      li.setAttribute("id", "anchorTags");
      a.appendChild(li);
      navigation.appendChild(a);
      a.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
          this.resetColorTags();
          this.filterTags(this.tags[i]);
          li.style.backgroundColor = "grey";
        }
      });

      a.addEventListener("click", (event) => {
        this.resetColorTags();
        this.filterTags(this.tags[i]);
        li.style.backgroundColor = "grey";
      });
    }
  }
}
