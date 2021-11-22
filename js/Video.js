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
    const vidMedia = document.createElement("video");
    vidMedia.tabIndex = 0;
    vidMedia.src = `media/artistsVideos/${this.video}`;
    vidMedia.ariaLabel = `${this.alt}`;
    vidMedia.type = "video/mp4";
    return vidMedia;
  }
}
