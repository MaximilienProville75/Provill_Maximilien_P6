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

  loadMedia(index) {
    document.body.appendChild(this.buildDOM(index));
  }

  // loadTitle(index) {
  //   const titleLightbox = document.getElementById("titleLightBox");
  //   titleLightbox.appendChild(this.buildDOM(index));
  // }

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
    const lightBoxCLose = document.getElementById("lightbox");
    window.setTimeout(() => {
      lightBoxCLose.remove(lightBoxCLose);
    });
  }

  next(e, incrementedIndex) {
    e.preventDefault();
    const gallery = this.retrieveGallery();

    while (incrementedIndex != gallery.length) {
      this.loadMedia(incrementedIndex);
      break;
    }
    if (incrementedIndex === gallery.length) {
      this.close(e);
    }
  }

  prev(e, decrementedIndex) {
    e.preventDefault();
    const gallery = this.retrieveGallery();

    while (decrementedIndex != gallery.length - gallery.length) {
      this.loadMedia(decrementedIndex);
      break;
    }
    if (decrementedIndex === 0) {
      this.close(e);
    }

    console.log(decrementedIndex);
  }

  resetLightBoxes() {
    const hasLightBox = document.getElementById("lightbox");
    if (hasLightBox) {
      hasLightBox.parentNode.removeChild(hasLightBox);
    }
  }

  hasNext(currentIndex) {
    const gallery = this.retrieveGallery();
    if (currentIndex === gallery.length) {
      console.log("is last");
    }
  }

  buildDOM(currentIndex) {
    this.resetLightBoxes();
    const gallery = this.retrieveGallery();
    // check current index compared to the gallery array length
    // last element ? hide next button
    // first element ? hide prev button

    const lightbox = document.createElement("div");
    const imageUrl = `../${gallery[currentIndex]}`;

    lightbox.classList.add("lightbox");
    lightbox.setAttribute("id", "lightbox");
    lightbox.innerHTML = `<div>
        <button class="lightbox-close"></button>
        <button class="lightbox-next"></button>
        <button class="lightbox-prev"></button>
        <div class="lightbox-container">
        <img src="${imageUrl}"/>
        <div id="titleLightBox" class="lightbox-container-title">
        ${this.title}
        </div>
        </div>
        </div> `;

    lightbox
      .querySelector(".lightbox-close")
      .addEventListener("click", (e) => this.close(e, currentIndex));
    lightbox
      .querySelector(".lightbox-next")
      .addEventListener("click", (e) => this.next(e, currentIndex + 1));
    lightbox
      .querySelector(".lightbox-prev")
      .addEventListener("click", (e) => this.prev(e, currentIndex - 1));

    return lightbox;
  }
}
