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
    const imgMedia = document.createElement("img");
    imgMedia.tabIndex = 0;
    imgMedia.src = `media/artistsPictures/${this.image}`;
    imgMedia.alt = `${this.alt}`;
    return imgMedia;
  }
}
