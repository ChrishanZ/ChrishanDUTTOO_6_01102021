export default class Image {
  constructor(data) {
    this.id = data.id;
    this.alt = data.alt;
    this.date = data.date;
    this.image = data.image;
    this.likes = data.likes;
    this.photographerId = data.photographerId;
    this.price = data.price;
    this.tags = data.tags;
  }

  display() {
    const containerMedia = document.createElement("div");
    containerMedia.className = "photograph-grid-media-containerMedia";
    const imgMedia = document.createElement("img");
    imgMedia.src = `media/artistsPictures/${this.image}`;
    imgMedia.alt = `${this.alt}`;

    imgMedia.addEventListener("click", () => {
      console.log("lightbox image");
    });

    const bottomMedia = document.createElement("div");
    bottomMedia.className = "photograph-grid-media-containerMedia_bottom";

    const pText = document.createElement("p");
    pText.textContent = `${this.alt}`;

    const spanLikes = document.createElement("span");
    spanLikes.textContent = `${this.likes} ♥`;
    bottomMedia.appendChild(pText);
    bottomMedia.appendChild(spanLikes);
    containerMedia.appendChild(imgMedia);
    containerMedia.appendChild(bottomMedia);

    return containerMedia;
  }
}
