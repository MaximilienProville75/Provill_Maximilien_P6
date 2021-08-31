const params = new URL(window.location).searchParams;
const pageId = parseInt(params.get("id"), 10);

const artistBannerId = document.getElementById("photographBanner");

let activeTagsArray = [];
let nbOfLikes = 0;
let totalLikes = 0;
let chosenOption = [];
let mediaList = [];

class Photograph {
  constructor(name, id, city, country, tags, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tags = tags;
    this.tagline = tagline;
    this.price = price;
    this.portrait = `/Sample_Photos/Portraits/${portrait}`;
  }

  computePhotographerVariables() {
    return {
      name: this.name,
      id: this.id,
      city: this.city,
      country: this.country,
      tags: this.tags,
      tagline: this.tagline,
      price: this.price,
      portrait: this.portrait,
    };
  }

  renderArtistBanner() {
    const photographer = this.computePhotographerVariables();
    const { name, id, city, country, tags, tagline, portrait } = photographer;

    const artistBanner = document.createElement("section");
    artistBanner.classList.add("artistBanner");

    const artistBannerDescription = document.createElement("div");
    artistBannerDescription.classList.add("artistBannerDescription");

    const artistPhot = document.createElement("img");
    artistPhot.setAttribute("src", portrait);
    artistPhot.setAttribute("alt", `Portrait de ${name}`);
    artistPhot.classList.add("artistBannerPortrait");

    const artistName = document.createElement("div");
    artistName.innerHTML = name;
    artistName.classList.add("ArtistName");

    // const contactMeBtn = document.createElement("button");
    // contactMeBtn.innerHTML = "Contactez-moi";
    // contactMeBtn.className = "contactMeButton";
    // contactMeBtn.type = "button";

    const artistCityCountry = document.createElement("div");
    artistCityCountry.innerHTML = city + ", " + country;
    artistCityCountry.classList.add("ArtistCity");

    const artistDescription = document.createElement("div");
    artistDescription.innerHTML = tagline;
    artistDescription.classList.add("ArtistDescription");

    const photographerTagList = artistBanner.appendChild(
      document.createElement("ul")
    );
    photographerTagList.classList.add("artistBannerHashtags");
    artistBanner.dataset.tags = tags.join(",");
    tags.forEach((tag) => {
      const photographerTag = photographerTagList.appendChild(
        document.createElement("li")
      );
      const photographerSRtag = photographerTag.appendChild(
        document.createElement("span")
      );
      photographerSRtag.classList.add("screen-reader-only");
      const photographerTagLink = photographerTag.appendChild(
        document.createElement("a")
      );
      photographerTagLink.dataset.tagName = tag;
      photographerTagLink.classList.add("tag");
      photographerTagLink.setAttribute("href", "#");
      photographerTagLink.innerText = `#${tag}`;
    });

    artistBanner.appendChild(artistPhot);
    artistBannerDescription.appendChild(artistName);
    // artistDescription.appendChild(contactMeBtn);
    artistBannerDescription.appendChild(artistDescription);
    artistBannerDescription.appendChild(artistCityCountry);
    artistBannerDescription.appendChild(photographerTagList);
    artistBanner.appendChild(artistBannerDescription);
    artistBannerId.appendChild(artistBanner);
  }
}

const filterOrderBy = document.getElementById("filterOrderBy");
const orderByClick = document.getElementById("orderByClick");
const orderOptions = document.querySelector(".orderOptions");
const filterContent = document.getElementById("filterContent");
const orderbotArrow = document.getElementById("orderbotArrow");
const orderSelected = document.getElementById("orderSelected");
const filterOptions = document.querySelectorAll(".option");

function openAndCloseDropdown() {
  if (!orderOptions.classList.contains("open")) {
    orderOptions.classList.toggle("open");
    orderbotArrow.animate([{ transform: "rotate(180deg)" }], {
      duration: 300,
      fill: "forwards",
    });
  } else {
    orderbotArrow.animate([{ transform: "rotate(0deg)" }], {
      duration: 300,
      fill: "forwards",
    });

    const close = function close() {
      orderOptions.classList.toggle("open");
      orderByClick.setAttribute("aria-expanded", "false");
    };
    orderOptions.animate(
      [{ opacity: "0", transform: "translateY(-25px)" }],
      360,
      "ease-in-out"
    );
    setTimeout(close, 300);
  }
}
orderByClick.addEventListener("click", (e) => {
  e.preventDefault();
  openAndCloseDropdown();
});
window.addEventListener("click", (e) => {
  if (
    orderOptions.classList.contains("open") &&
    !filterContent.contains(e.target)
  ) {
    openAndCloseDropdown();
  }
});
filterOptions.forEach((option) => {
  if (option.getAttribute("aria-selected") === "true") {
    orderSelected.innerText = option.innerText;
    option.classList.add("hidden");
  }

  option.addEventListener("click", (e) => {
    e.preventDefault();
    const filterLastSelected = document.querySelector(
      ".order-by__options > .hidden"
    );
    filterLastSelected.setAttribute("aria-selected", "false");
    filterLastSelected.classList.remove("hidden");
    option.classList.add("hidden");
    option.setAttribute("aria-selected", "true");
    orderSelected.innerText = option.innerText;
  });
});

const artistMediaGallery = document.getElementById("mediaGallery");

class Video {
  constructor({ id, photographerId, title, video, tags, likes, date, price }) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.video = video;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }

  display(firstName) {
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("videoContainer");

    const videoVideo = document.createElement("video");
    const videoSource = document.createElement("source");
    videoSource.setAttribute("src", `assets/${firstName}/${this.video}`);
    videoSource.setAttribute("type", "video/mp4");
    videoVideo.classList.add("media");
    videoVideo.appendChild(videoSource);

    const videoDescription = document.createElement("div");
    videoDescription.classList.add("videoDescription");

    const videoTitle = document.createElement("div");
    videoTitle.innerHTML = this.title;
    videoTitle.classList.add("videoTitle");

    const videoLikes = document.createElement("div");
    videoLikes.innerHTML = this.likes;
    videoLikes.classList.add("videoLikes");

    const videoHeart = document.createElement("a");
    const videoHeartClick = document.createElement("i");
    videoHeartClick.classList.add("fas", "fa-heart", "icon", "empty");

    videoContainer.appendChild(videoVideo);
    videoDescription.appendChild(videoTitle);
    videoHeart.appendChild(videoHeartClick);
    videoLikes.appendChild(videoHeart);
    videoDescription.appendChild(videoLikes);
    videoContainer.appendChild(videoDescription);

    artistMediaGallery.appendChild(videoContainer);
  }
}

class Image {
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

const photographerTotalLikes = document.getElementById("totalLikes");
const photographerPrice = document.getElementById("price");

function totalLikesAndPrice(element) {
  photographerPrice.innerText = `${element.price} € / jour`;
  photographerTotalLikes.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
}

function animateAndIncrementLikes() {
  const heartIcons = document.querySelectorAll(".heart");
  heartIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.firstElementChild.classList.toggle("empty");
      icon.firstElementChild.classList.toggle("full");

      // If the heart is activated, increment likes and total likes, else, decrement
      const likes = icon.previousElementSibling;
      nbOfLikes = parseInt(icon.previousElementSibling.innerText, 10);
      nbOfLikes = icon.firstElementChild.classList.contains("full")
        ? (nbOfLikes += 1)
        : (nbOfLikes -= 1);
      likes.innerText = `${nbOfLikes}`;

      totalLikes = icon.firstElementChild.classList.contains("full")
        ? (totalLikes += 1)
        : (totalLikes -= 1);
      photographerTotalLikes.innerHTML = `${totalLikes} <i class='fas fa-heart'></i>`;
    });
  });
}

function fetchData(url) {
  return fetch(url)
    .then((res) => res.json())
    .then(function (response) {
      const { medias, photographers } = response;
      let newPhotographers = [];
      let newPhotographer;
      photographers.forEach((photographer) => {
        const { name, id, city, country, tags, tagline, price, portrait } =
          photographer;

        if (pageId === id) {
          newPhotographer = new Photograph(
            name,
            id,
            city,
            country,
            tags,
            tagline,
            price,
            portrait
          );
          newPhotographer.renderArtistBanner();
        }
      });

      medias.forEach((media) => {
        const firstName = newPhotographer.name.split(" ")[0];
        const id = newPhotographer.id;
        const { photographerId } = media;
        let objectMedia = null;

        if (photographerId === id) {
          if (media.image) {
            objectMedia = new Image(media);
            totalLikes += objectMedia.likes;
            objectMedia.display(firstName);
          }
          if (media.video) {
            objectMedia = new Video(media);
            totalLikes += objectMedia.likes;
            objectMedia.display(firstName);
          }
        }
      });

      totalLikesAndPrice(newPhotographer);

      return response;
    });
}
fetchData("FishEyeData.json");
