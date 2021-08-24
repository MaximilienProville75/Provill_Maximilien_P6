import MediaGallery from "./mediaGallery.js";

const params = new URL(window.location).searchParams;
const pageId = parseInt(params.get("id"), 10);

const artistBannerId = document.getElementById("photographBanner");
const mediaGallery = document.getElementById("mediaGallery");

let activeTagsArray = [];
let nbOfLikes = 0;
let totalLikes = 0;
let chosenOption = [];

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

// * -- 'ORDER-BY' -- */
// Options closing animation
function openAndCloseDropdown() {
  // Opening dropdown
  if (!orderOptions.classList.contains("open")) {
    orderOptions.classList.toggle("open");
    orderByClick.setAttribute("aria-expanded", "true");
    // Arrow animation
    orderbotArrow.animate([{ transform: "rotate(180deg)" }], {
      duration: 300,
      fill: "forwards",
    });
  } else {
    // Closing dropdown
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

// Dropdown click event
orderByClick.addEventListener("click", (e) => {
  e.preventDefault();
  openAndCloseDropdown();
});

// Closing dropdown if click occurs anywhere else on page
window.addEventListener("click", (e) => {
  if (
    orderOptions.classList.contains("open") &&
    !filterContent.contains(e.target)
  ) {
    openAndCloseDropdown();
  }
});

// Showing selected option in dropdown
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

    // Unselect last selected element
    filterLastSelected.setAttribute("aria-selected", "false");
    filterLastSelected.classList.remove("hidden");

    // Clicked element becomes new slected element
    option.classList.add("hidden");
    option.setAttribute("aria-selected", "true");
    orderSelected.innerText = option.innerText;
  });
});

function fetchData(url) {
  return fetch(url)
    .then((res) => res.json())
    .then(function (response) {
      const { photographers } = response;
      let newPhotographers = [];

      photographers.forEach((photographer) => {
        const { name, id, city, country, tags, tagline, price, portrait } =
          photographer;

        if (pageId === id) {
          const newPhotographer = new Photograph(
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

      return response;
    });
}
fetchData("FishEyeData.json");
