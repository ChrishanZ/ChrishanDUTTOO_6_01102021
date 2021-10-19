import Photographer from "./Photographer.js";

export default class PhotographerPage {
  constructor() {
    this.photographer = {};
  }

  async getPhotographer(id) {
    const mediasImages = [];
    try {
      const response = await fetch("../js/data.json");
      const data = await response.json();

      for (let j = 0; j < data.media.length; j++) {
        if (data.media[j].photographerId === id) {
          mediasImages.push(data.media[j]);
        }
      }
      for (let i = 0; i < data.photographers.length; i++) {
        if (data.photographers[i].id === id) {
          this.photographer = new Photographer(
            data.photographers[i].id,
            data.photographers[i].name,
            data.photographers[i].portrait,
            data.photographers[i].city,
            data.photographers[i].country,
            data.photographers[i].tags,
            data.photographers[i].tagline,
            data.photographers[i].price,
            mediasImages
          );
          this.photographer.displayBandeau();
          this.photographer.displayCard();
          break;
        }
      }
    } catch (e) {
      console.log("error : ", e);
    }
  }

  displayMedia() {
    console.log(this.photographer.media);
  }
}
