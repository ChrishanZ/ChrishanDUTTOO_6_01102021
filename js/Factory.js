import Image from "./Image.js";
import Video from "./Video.js";

export default class Factory {
  constructor(type, data) {
    console.log(data);
    if (type === "image") {
      return new Image(data);
    } else if (type === "video") {
      return new Video(data);
    } else {
      console.log("Type is unknown");
    }
  }
}
