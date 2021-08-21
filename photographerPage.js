const params = new URL(window.location).searchParams;
const pageId = parseInt(params.get("id"), 10);
const mediaGallery = document.getElementById("media-gallery");

const artistBannerId = document.getElementById("photographBanner");

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
    const { name, id, city, country, tags, tagline, price, portrait } =
      photographer;

    const artistBanner = document.createElement("section");
    artistBanner.classList.add("PhotographProfil");

    const artistPhot = document.createElement("img");
    artistPhot.setAttribute("src", portrait);
    artistPhot.setAttribute("alt", `Portrait de ${name}`);
    artistPhot.classList.add("PhotographProfil", "ArtistPhot");

    const artistName = document.createElement("div");
    artistName.innerHTML = name;
    artistName.classList.add("ArtistName");

    const artistDescription = document.createElement("div");
    artistDescription.innerHTML = tagline;
    artistDescription.classList.add("ArtistDescription");

    const photographerTagList = artistBanner.appendChild(
      document.createElement("ul")
    );
    photographerTagList.classList.add("ArtistHashtags");

    artistBanner.appendChild(artistPhot);
    artistBanner.appendChild(artistName);
    artistBanner.appendChild(artistDescription);
    artistBanner.appendChild(photographerTagList);
    artistBannerId.appendChild(artistBanner);
  }
}

function fetchData(url) {
  return fetch(url)
    .then((res) => res.json())
    .then(function (response) {
      const { photographers } = response;
      let newPhotographers = [];

      photographers.forEach((photographer) => {
        const { name, id, city, country, tags, tagline, price, portrait } =
          photographer;
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
        newPhotographers.push(newPhotographer);
      });

      newPhotographers.forEach((photographer) => {
        photographer.renderArtistBanner();
      });

      const tags = document.querySelectorAll(".tag");
      tags.forEach((tag) => {
        filterPhotographers(tag);
      });
      // const tags = document.querySelectorAll(".tag");
      // tags.forEach((tag) => {
      //   filterPhotographers(tag);
      // });

      return response;
    });
}
fetchData("FishEyeData.json");
