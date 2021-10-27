export default class Video {
  constructor(data) {
    this.id = data.id;
    this.alt = data.alt;
    this.date = data.date;
    this.video = data.video;
    this.likes = data.likes;
    this.photographerId = data.photographerId;
    this.price = data.price;
    this.tags = data.tags;
  }

  display() {
    const containerMedia = document.createElement("div");
    containerMedia.className = "photograph-grid-media-containerMedia";
    const vidMedia = document.createElement("video");
    vidMedia.src = `media/artistsVideos/${this.video}`;
    vidMedia.type = "video/mp4";
    vidMedia.addEventListener("click", () => {
      console.log("lightbox video");
    });

    const bottomMedia = document.createElement("div");
    bottomMedia.className = "photograph-grid-media-containerMedia_bottom";

    const pText = document.createElement("p");
    pText.textContent = `${this.alt}`;

    const spanLikes = document.createElement("span");
    spanLikes.textContent = `${this.likes} ♥`;
    bottomMedia.appendChild(pText);
    bottomMedia.appendChild(spanLikes);
    containerMedia.appendChild(vidMedia);
    containerMedia.appendChild(bottomMedia);

    return containerMedia;
  }
}
