// import Img
// import Video

export default class Factory {
  constructor(type, data) {
    if (type === "image") {
      return new Image(data); //
    }
  }
}
