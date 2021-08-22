const artistMediaGallery = document.getElementById("mediaGallery");

export default class image {
  constructor(media) {
    Object.assign(this, media);
  }

  display() {
    const imageContainer = document.createElement("div");

    const imageImg = document.createElement("img");
    imageImg.setAttribute("src", `assets/${this.photographerId}/${this.image}`);
    imageImg.setAttribute("alt", `${this["alt-text"]}`);
    imageImg.classList.add("media");

    const imageTitle = document.createElement("div");
    imageTitle.innerHTML = this.title;

    const imageLikes = document.createElement("div");
    imageLikes.innerHTML = this.likes;

    const onclickImageLikes = document.createElement("a");
    const heartClick = document.createElement("i");
    heartClick.classList.add("fas fa-heart icon empty");

    imageContainer.appendChild(imageImg);
    imageContainer.appendChild(imageTitle);
    onclickImageLikes.appendChild(heartClick);
    imageLikes.appendChild(onclickImageLikes);
    imageContainer.appendChild(imageLikes);

    artistMediaGallery.appendChild(imageContainer);
  }
}
