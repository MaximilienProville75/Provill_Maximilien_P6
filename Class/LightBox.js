import MediaFactory from "./MediaFactory.js";

export default class Lightbox {
  static init() {
    const domMedia = Array.from(
      document.querySelectorAll(".imageContainer img, .videoContainer source")
    );

    console.log(domMedia);
    const gallery = domMedia.map((link) => link.getAttribute("src"));

    domMedia.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        //Changer structure => anchor pas div
        console.log(e.currentTarget.getAttribute("src"));
        new Lightbox({
          url: e.currentTarget.getAttribute("src"),
          title: e.currentTarget.getAttribute("data-title"),
        });
      })
    );

    return gallery;
  }

  constructor({ url, title }, gallery) {
    this.element = this.buildDOM(url, title);
    this.gallery = gallery;
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  loadMedia(url) {
    this.url = null;
    const media = new MediaFactory();
    const container = this.element.querySelector(".lightbox-container");
    container.innerText = "";
    container.appendChild(media);
    console.log(container);
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
    console.log(this.media);
    let i = this.media.findIndex((media) => (media = this.url));

    if ((i = this.media.length - 1)) {
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

  buildDOM(url, title) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    // let result = "";
    // if (element.image) {
    //   result = `<img src="${url}/>`;
    //   return result;
    // } else if (element.video) {
    //   result = `<video controls="">
    //             <source src="${url}" type="video/mp4">
    //           </video>
    //           `;
    //   return result;
    // }

    // <video controls="" class="media"><source src="${url}"></video>

    dom.innerHTML = `<div class="lightbox">
      <button class="lightbox-close"></button>
      <button class="lightbox-next"></button>
      <button class="lightbox-prev"></button>
      <div class="lightbox-container">
     
      <img src="${url}"/>
      <div class="lightbox-container-title">
      ${title}
      </div>
      </div>
      </div> `;

    dom
      .querySelector(".lightbox-close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox-next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox-prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}
