const artistMediaGallery = document.getElementById("mediaGallery");

export default class Image {
  constructor(
    { id, photographerId, title, image, tags, likes, date, price },
    lightBox
  ) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.image = image;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.lightBox = lightBox;
  }

  display(firstName) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("imageContainer");

    const imageImg = document.createElement("img");
    imageImg.setAttribute("src", `Sample_Photos/${firstName}/${this.image}`);
    imageImg.setAttribute("alt", `${this["alt-text"]}`);
    imageImg.setAttribute("data-title", this.title);
    imageImg.addEventListener("click", () => {
      const gallery = this.lightBox.retrieveGallery();
      const links = gallery.map((media) => media.split("/")[2]);
      const currentIndex = links.indexOf(this.image);
      this.lightBox.loadMedia(currentIndex);
      console.log(this.title);
    });
    imageImg.classList.add("media");

    const imageDescription = document.createElement("div");
    imageDescription.classList.add("imageDescription");
    imageDescription.setAttribute("data-date", this.date);

    const imageTitle = document.createElement("div");
    imageTitle.innerHTML = this.title;
    imageTitle.setAttribute("data-title", this.title);
    imageTitle.classList.add("imageTitle");

    const imageLikes = document.createElement("div");
    imageLikes.setAttribute("arial-label", "likes");
    imageLikes.classList.add("totalLikesBox");
    const imageLikesCount = document.createElement("span");
    imageLikesCount.innerHTML = this.likes;
    imageLikesCount.setAttribute("data-likes", this.likes);
    imageLikesCount.classList.add("imageLikes");
    imageLikes.appendChild(imageLikesCount);

    const onclickImageLikes = document.createElement("a");
    onclickImageLikes.classList.add("heart");
    const heartClick = document.createElement("i");
    heartClick.classList.add("fas", "fa-heart", "icon", "empty", "heart");

    imageContainer.appendChild(imageImg);
    imageDescription.appendChild(imageTitle);
    onclickImageLikes.appendChild(heartClick);
    imageLikes.appendChild(onclickImageLikes);
    imageDescription.appendChild(imageLikes);
    imageContainer.appendChild(imageDescription);

    artistMediaGallery.appendChild(imageContainer);
  }
}
