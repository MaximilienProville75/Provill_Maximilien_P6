import Image from "./Photo.js";
import Video from "./Video.js";

export default class MediaGallery {
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
