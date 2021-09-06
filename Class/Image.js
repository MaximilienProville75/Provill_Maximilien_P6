const artistMediaGallery = document.getElementById("mediaGallery");

export default class Image {
  constructor({ id, photographerId, title, image, tags, likes, date, price }) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.image = image;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }

  display(firstName) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("imageContainer");

    const imageImg = document.createElement("img");
    imageImg.setAttribute("src", `Sample_Photos/${firstName}/${this.image}`);
    imageImg.setAttribute("alt", `${this["alt-text"]}`);
    imageImg.setAttribute("data-title", this.title);
    imageImg.classList.add("media");

    const imageDescription = document.createElement("div");
    imageDescription.classList.add("imageDescription");

    const imageTitle = document.createElement("div");
    imageTitle.innerHTML = this.title;
    imageTitle.classList.add("imageTitle");

    const imageLikes = document.createElement("div");
    imageLikes.innerHTML = this.likes;
    imageLikes.classList.add("imageLikes");

    const onclickImageLikes = document.createElement("a");
    const heartClick = document.createElement("i");
    heartClick.classList.add("fas", "fa-heart", "icon", "empty");

    imageContainer.appendChild(imageImg);
    imageDescription.appendChild(imageTitle);
    onclickImageLikes.appendChild(heartClick);
    imageLikes.appendChild(onclickImageLikes);
    imageDescription.appendChild(imageLikes);
    imageContainer.appendChild(imageDescription);

    artistMediaGallery.appendChild(imageContainer);
  }
}
