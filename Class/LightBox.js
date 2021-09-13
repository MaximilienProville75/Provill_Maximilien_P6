import MediaFactory from "./MediaFactory.js";

export default class Lightbox {
  constructor(media, firstName) {
    this.media = media;
    this.firstName = firstName;
    this.title = media?.title;
    this.isVisible = false;
    this.url = this.media?.image ? this.media?.image : this.media?.video;
    document.body.addEventListener("keyup", (e) => {
      if (this.isVisible) {
        this.onKeyUp(e);
      }
    });
  }

  retrieveGallery() {
    const domMedia = Array.from(
      document.querySelectorAll(".imageContainer img")
    );
    return domMedia.map((link) => link.getAttribute("src"));
  }

  retrieveTitle() {
    const titleMedia = Array.from(document.querySelectorAll("img.media"));
    return titleMedia.map((link) => link.getAttribute("data-title"));
  }

  loadMedia(index) {
    document.body.appendChild(this.buildDOM(index));
  }

  onKeyUp(e, currentIndex) {
    const gallery = this.retrieveGallery();
    const imageUrl = `../${gallery[currentIndex]}`;
    const decrementedIndex = currentIndex - 1;
    const incrementedIndex = currentIndex + 1;
    if (e.key === "Escape" || e.code === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e, decrementedIndex);
    } else if (e.key === "ArrowRight") {
      this.next(e, incrementedIndex);
    }
  }

  close(e) {
    e.preventDefault();
    this.isVisible = false;
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

    while (decrementedIndex != gallery.length - gallery.length - 1) {
      this.loadMedia(decrementedIndex);
      break;
    }
    if (decrementedIndex < 0) {
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

  buildDOM(currentIndex) {
    this.isVisible = true;
    this.resetLightBoxes();
    const gallery = this.retrieveGallery();
    // check current index compared to the gallery array length
    // last element ? hide next button
    // first element ? hide prev button

    const lightbox = document.createElement("div");
    const imageUrl = `../${gallery[currentIndex]}`;
    const titleArray = this.retrieveTitle();
    const titlePage = titleArray[currentIndex];

    lightbox.classList.add("lightbox");
    lightbox.setAttribute("id", "lightbox");
    lightbox.innerHTML = `<div>
        <button class="lightbox-close"></button>
        <button class="lightbox-next"></button>
        <button class="lightbox-prev"></button>
        <div class="lightbox-container">
        <img src="${imageUrl}"/>
        <div id="titleLightBox" class="lightbox-container-title">
        ${titlePage}
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
