import Video from "./Video.js";
import Image from "./Image.js";

export default class MediaFactory {
  static createMedia(media) {
    let objectMedia = null;
    if (media.image) {
      objectMedia = new Image(media);
    }
    if (media.video) {
      objectMedia = new Video(media);
    }
    return objectMedia;
  }
}
