import Photograph from "./Class/Photograph.js";
import MediaFactory from "./Class/MediaFactory.js";
import Lightbox from "./Class/LightBox.js";

const params = new URL(window.location).searchParams;
const pageId = parseInt(params.get("id"), 10);

let activeTagsArray = [];
let nbOfLikes = 0;
let totalLikes = 0;
let chosenOption = [];
let mediaList = [];

const filterOrderBy = document.getElementById("filterOrderBy");
const orderByClick = document.getElementById("orderByClick");
const orderOptions = document.querySelector(".orderOptions");
const filterContent = document.getElementById("filterContent");
const orderbotArrow = document.getElementById("orderbotArrow");
const orderSelected = document.getElementById("orderSelected");
const filterOptions = document.querySelectorAll(".option");

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
      ".orderOptions > .hidden"
    );
    filterLastSelected.setAttribute("aria-selected", "false");
    filterLastSelected.classList.remove("hidden");
    option.classList.add("hidden");
    option.setAttribute("aria-selected", "true");
    orderSelected.innerText = option.innerText;
  });
});

function fetchData(url) {
  return fetch(url)
    .then((res) => res.json())
    .then(function (response) {
      const { medias, photographers } = response;
      let newPhotographers = [];
      let newPhotographer;
      let newLightbox;
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
          objectMedia = MediaFactory.createMedia(media, firstName);
          totalLikes += objectMedia.likes;
          objectMedia.display(firstName);
        }
      });

      const sortedTitle = new Lightbox();
      sortedTitle.sortTitleArray();
      const sortedLikes = new Lightbox();
      sortedLikes.sortLikesArray();
      const sortedDate = new Lightbox();
      sortedDate.sortDateArray();

      chosenOption = sortedLikes.sortLikesArray();

      chosenOption.forEach((media) => {
        const id = newPhotographer.id;
        const { photographerId } = media;
        const firstName = newPhotographer.name.split(" ")[0];
        const newMedia = MediaFactory.createMedia(media, firstName);
        if (photographerId === id) {
          console.log(newMedia);
          mediaGallery.insertAdjacentHTML(
            "beforeend",
            newMedia.display(firstName)
          );
        }
      });

      filterOptions.forEach((option) => {
        option.addEventListener("click", () => {
          if (option.attributes === "titre") {
            chosenOption = sortedTitle.sortTitleArray();
            setTimeout(1000, openAndCloseDropdown());
          } else if (option.dataset.value === "date") {
            chosenOption = sortedDate.sortDateArray();
            setTimeout(1000, openAndCloseDropdown());
          } else if (option.dataset.value === "popularite") {
            chosenOption = sortedLikes.sortLikesArray();
            setTimeout(1000, openAndCloseDropdown());
          }
        });
      });

      animateAndIncrementLikes();

      totalLikesAndPrice(newPhotographer);
      return response;
    });
}
fetchData("FishEyeData.json");
