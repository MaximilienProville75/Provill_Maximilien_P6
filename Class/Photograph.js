const artistBannerId = document.getElementById("photographBanner");

export default class Photograph {
  constructor(name, id, city, country, tags, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tags = tags;
    this.tagline = tagline;
    this.price = price;
    this.portrait = `./Sample_Photos/Portraits/${portrait}`;
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
