import Photograph from "./Class/Photograph.js";
import MediaFactory from "./Class/MediaFactory.js";
import Lightbox from "./Class/LightBox.js";

const params = new URL(window.location).searchParams;
const pageId = parseInt(params.get("id"), 10);
const mediaGallery = document.getElementById("mediaGallery");

const filterOrderBy = document.getElementById("filterOrderBy");
const orderByClick = document.getElementById("orderByClick");
const orderOptions = document.querySelector(".orderOptions");
const filterContent = document.getElementById("filterContent");
const orderbotArrow = document.getElementById("orderbotArrow");
const orderSelected = document.getElementById("orderSelected");
const filterOptions = document.querySelectorAll(".option");

const photographerTotalLikes = document.getElementById("totalLikes");
const photographerPrice = document.getElementById("price");

let activeTagsArray = [];
let nbOfLikes = 0;
let totalLikes = 0;
let chosenOption = [];
let mediaList = [];

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
      const photographerMedia = medias.filter(
        (m) => m.photographerId === pageId
      );
      let newPhotographers = [];
      let newPhotographer;
      let newLightbox;
      console.log(photographerMedia);

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

      const sortedByTitle = [...photographerMedia].sort((a, b) =>
        a.title.toUpperCase().localeCompare(b.title.toUpperCase())
      );
      const sortedByDate = [...photographerMedia].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const sortedByPopularity = [...photographerMedia].sort(
        (a, b) => b.likes - a.likes
      );

      chosenOption = sortedByPopularity;
      chosenOption.forEach((media) => {
        const firstName = newPhotographer.name.split(" ")[0];
        const newMedia = MediaFactory.createMedia(media, firstName);
        mediaGallery.insertAdjacentHTML(
          "beforeend",
          newMedia.display(firstName)
        );
      });

      animateAndIncrementLikes();

      filterOptions.forEach((option) => {
        const firstName = newPhotographer.name.split(" ")[0];
        option.addEventListener("click", () => {
          // Choosing the correct parameter
          if (option.dataset.value === "titre") {
            chosenOption = sortedByTitle;
            setTimeout(1000, openAndCloseDropdown());
          } else if (option.dataset.value === "date") {
            chosenOption = sortedByDate;
            setTimeout(1000, openAndCloseDropdown());
          } else if (option.dataset.value === "popularite") {
            chosenOption = sortedByPopularity;
            setTimeout(1000, openAndCloseDropdown());
          }
          mediaGallery.innerHTML = "";
          totalLikes = 0;
          chosenOption.forEach((media) => {
            const newMedia = MediaFactory.createMedia(media, firstName);
            mediaGallery.insertAdjacentHTML(
              "beforeend",
              newMedia.display(firstName)
            );
            totalLikes += media.likes;
          });

          animateAndIncrementLikes();
        });
      });

      animateAndIncrementLikes();

      totalLikesAndPrice(newPhotographer);
      return response;
    });
}
fetchData("FishEyeData.json");
