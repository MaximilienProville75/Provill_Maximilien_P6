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
      document.querySelectorAll(".imageContainer img, .videoContainer source")
    );
    return domMedia.map((link) => link.getAttribute("src"));
  }

  retrieveTitle() {
    const titleMedia = Array.from(
      document.querySelectorAll("img.media, .videoContainer video")
    );
    return titleMedia.map((link) => link.getAttribute("data-title"));
  }

  retrieveIndex() {
    const indexBla = Array.from(
      document.querySelectorAll(
        ".lightbox-container img, .lightbox-container source"
      )
    );
    return indexBla.map((link) => link.getAttribute("data-index"));
  }

  loadMedia(index) {
    document.body.appendChild(this.buildDOM(index));
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
    this.isVisible = false;
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
    this.isVisible = false;

    while (decrementedIndex != gallery.length - gallery.length - 1) {
      this.loadMedia(decrementedIndex);
      break;
    }
    if (decrementedIndex < 0) {
      this.close(e);
    }
  }

  onKeyUp(e) {
    let index = this.retrieveIndex();
    let indexNum = parseInt(index);

    if (e.key === "Escape" || e.code === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e, indexNum - 1);
    } else if (e.key === "ArrowRight") {
      this.next(e, indexNum + 1);
    }
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
    let htmlBeacon;
    const lightbox = document.createElement("div");
    const imageUrl = `/${gallery[currentIndex]}`;
    console.log(imageUrl);
    console.log(gallery);
    // const videoUrl = ``;

    if (imageUrl.split(".")[1].match("\\jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF$")) {
      htmlBeacon = `<img src="${imageUrl}" data-index=${currentIndex}  / >`;
    } else {
      htmlBeacon = `<video  autoplay class="lightBoxVideo">
      <source src="${imageUrl}" type="video/mp4" data-index=${currentIndex}>
      </video>`;
    }

    const titleArray = this.retrieveTitle();
    const titlePage = titleArray[currentIndex];

    lightbox.classList.add("lightbox");
    lightbox.setAttribute("id", "lightbox");
    lightbox.innerHTML = `<div>
        <button class="lightbox-close"></button>
        <button class="lightbox-next"></button>
        <button class="lightbox-prev"></button>
        <div class="lightbox-container">
        ${htmlBeacon}
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
