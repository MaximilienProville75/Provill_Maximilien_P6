const pageURL = new URL(window.location).href;
const params = new URL(window.location).searchParams;

const PhotographerList = document.getElementById("PhotographerList");
const crossPageTag = params.get("tag");
let activeTagsArray = [];

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

  printPhotographer() {
    console.log(`Photographer name ${this.portrait}`);
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

  renderHomepage() {
    const photographer = this.computePhotographerVariables();
    const { name, id, city, country, tags, tagline, price, portrait } =
      photographer;

    const photographList = document.createElement("section");
    photographList.classList.add("Artistes");

    const photographProfil = document.createElement("div");
    photographProfil.classList.add("ArtistProfil");

    // const onclickPhotographProfil = photographList.appendChild(
    //   document.createElement("a")
    // );

    const onclickPhotographProfil = document.createElement("a");
    photographList.append(onclickPhotographProfil);
    console.log(onclickPhotographProfil);
    onclickPhotographProfil.classList.add("photographer__link-container");
    onclickPhotographProfil.setAttribute(
      "href",
      `page-photographe.html?id=${id}`
    );
    onclickPhotographProfil.setAttribute("id", `${id}`);
    onclickPhotographProfil.setAttribute("aria-label", `${name}`);
    onclickPhotographProfil.append(photographProfil);

    const profilePhotos = document.createElement("img");
    profilePhotos.setAttribute("src", portrait);
    profilePhotos.setAttribute("alt", `Portrait de ${name}`);
    profilePhotos.classList.add("Artistes", "ArtistPhot");

    const artistName = document.createElement("div");
    artistName.innerHTML = name;
    artistName.classList.add("ArtistName");

    const artistCity = document.createElement("div");
    artistCity.innerHTML = city + " " + country;
    artistCity.classList.add("ArtistCity");

    const artistDescription = document.createElement("div");
    artistDescription.innerHTML = tagline;
    artistDescription.classList.add("ArtistDescription");

    const artistPrice = document.createElement("div");
    artistPrice.innerHTML = price + "€/jour";
    artistPrice.classList.add("ArtistPrix");

    photographProfil.appendChild(profilePhotos);
    photographProfil.appendChild(artistName);
    photographProfil.appendChild(artistCity);
    photographProfil.appendChild(artistDescription);
    photographProfil.appendChild(artistPrice);
    const photographerTagList = photographProfil.appendChild(
      document.createElement("ul")
    );
    photographerTagList.classList.add("ArtistHashtags");

    onclickPhotographProfil.appendChild(photographProfil);
    photographList.appendChild(onclickPhotographProfil);
    PhotographerList.appendChild(photographList);

    photographList.dataset.tags = tags.join(",");
    const navTaglist = document.querySelector(".hashTagsList");
    tags.forEach((tag) => {
      if (!document.querySelector(`.tag[data-tag-name="${tag}"]`)) {
        const navTag = navTaglist.appendChild(document.createElement("li"));
        const navTagSpan = navTag.appendChild(document.createElement("span"));
        navTagSpan.classList.add("screen-navItems-only");
        // navTagSpan.innerText = "Tag";
        const navTagLink = navTag.appendChild(document.createElement("a"));
        navTagLink.setAttribute("href", "#");
        navTagLink.innerText = `#${tag}`;
        navTagLink.classList.add("tag");
        navTagLink.dataset.tagName = tag;
      }
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
  }
}
function filterPhotographers(element) {
  element.addEventListener("click", () => {
    const allSimilarTags = document.querySelectorAll(
      `.tag[data-tag-name="${element.dataset.tagName}"]`
    );
    element.blur();

    if (element.classList.contains("active-tag")) {
      allSimilarTags.forEach((similarTag) => {
        similarTag.classList.remove("active-tag");
      });
      activeTagsArray = activeTagsArray.filter(
        (tag) => !(tag === element.dataset.tagName)
      );
    } else {
      allSimilarTags.forEach((similarTag) => {
        similarTag.classList.add("active-tag");
      });
      activeTagsArray.push(element.dataset.tagName);
    }

    if (activeTagsArray.length <= 0) {
      const elementsToDisplay = document.querySelectorAll("section");
      elementsToDisplay.forEach((elementToDisplay) => {
        elementToDisplay.classList.remove("hidden");
      });
      return;
    }

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("hidden");
    });

    activeTagsArray.forEach((tag) => {
      const elementsToDisplay = document.querySelectorAll(
        `.Artistes[data-tags*="${tag}"]`
      );
      elementsToDisplay.forEach((elementToDisplay) => {
        elementToDisplay.classList.remove("hidden");
      });
    });
  });
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
        photographer.renderHomepage();
      });

      const tags = document.querySelectorAll(".tag");
      tags.forEach((tag) => {
        filterPhotographers(tag);
      });

      return response;
    });
}
fetchData("FishEyeData.json");

// 3. ITERATE AND ADD EVENT LISTENER
// photographers.forEach(({ name, id }) => {
//   const elementText = document.createElement("p");
//   elementText.innerHTML = `This is ${name}`;
//   elementText.classList.add("blue-text");
//   elementText.setAttribute("id", `${id}`);
//   elementText.addEventListener("click", (event) =>
//     handlePhotographerClick(event, id)
//   );
//   document.getElementById("photographers").appendChild(elementText);
// });

// medias.forEach((media) => {
//   //destructure what you need
//   const { title, id, image } = media;
//   //   // element creation
//   const elementText = document.createElement("p");
//   const elementImage = document.createElement("img");
//   //   // add inner content to elements
//   elementText.innerHTML = `This is ${title}`;
//   //   // add attributes (class and id)
//   elementText.classList.add("blue-text");
//   elementText.setAttribute("id", `${id}`);

//   elementImage.setAttribute("src", `${image}`);
//   elementImage.setAttribute("alt", `${title}`);
//   //   // append to body
//   document.body.appendChild(elementText);
// });

// // on one page, load data given a photographerId
// // photographer onClick
// // redirect to correct ID

// // 2. DESTRUCTURE DATA FROM JSON
// const { media: medias, photographers } = data;
