import MediaFactory from "./MediaFactory.js";

export default class Lightbox {
  constructor(media, firstName) {
    this.media = media;
    this.firstName = firstName;
    this.title = media?.title;
    this.url = this.media?.image ? this.media?.image : this.media?.video;
  }

  retrieveGallery() {
    const domMedia = Array.from(
      document.querySelectorAll(".imageContainer img, .videoContainer source")
    );
    return domMedia.map((link) => link.getAttribute("src"));
  }

  loadMedia(currentIndex = null) {
    document.body.appendChild(this.buildDOM());
    return currentIndex;
  }

  onKeyUp(e) {
    if (e.key === "Escape" || e.code === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  next(e) {
    e.preventDefault();
    let i = this.media.findIndex((media) => media === this.url);
    console.log(i);
    if (i === this.media.length - 1) {
      i = -1;
    }
    this.loadMedia(this.media[i + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.media.findIndex((media) => (media = this.url));

    if ((i = 0)) {
      i = this.media.length;
    }
    this.loadMedia(this.media[i - 1]);
  }

  buildDOM() {
    const lightbox = document.createElement("div");
    const imageUrl = `../Sample_Photos/${this.firstName}/${this.url}`;

    lightbox.classList.add("lightbox");
    lightbox.innerHTML = `<div>
        <button class="lightbox-close"></button>
        <button class="lightbox-next"></button>
        <button class="lightbox-prev"></button>
        <div class="lightbox-container">
        <img src="${imageUrl}"/>
        <div class="lightbox-container-title">
        ${this.title}
        </div>
        </div>
        </div> `;

    lightbox
      .querySelector(".lightbox-close")
      .addEventListener("click", this.close);
    lightbox
      .querySelector(".lightbox-next")
      .addEventListener("click", this.next);
    lightbox
      .querySelector(".lightbox-prev")
      .addEventListener("click", this.prev);

    return lightbox;
  }
}
