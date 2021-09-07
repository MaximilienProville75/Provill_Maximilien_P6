import Video from "./Video.js";
import Image from "./Image.js";
import Lightbox from "./LightBox.js";

export default class MediaFactory {
  static createMedia(media, firstName) {
    if (media.image) {
      const imageLightBox = new Lightbox(media, firstName);
      const image = new Image(media, imageLightBox);
      return image;
    }
    if (media.video) {
      const videoLightBox = new Lightbox(media, firstName);
      return new Video(media, videoLightBox);
    }
    return null;
  }
}
