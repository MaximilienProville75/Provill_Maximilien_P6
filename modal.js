import {
  handlePhotographerClick,
  compareIds,
  displayMedias,
} from "./function.js";

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

    const photographList = document.createElement("div");
    photographList.classList.add("Artistes");

    const photographProfil = document.createElement("div");
    photographProfil.classList.add("ArtistProfil");

    const onclickPhotographProfil = document.createElement("a");
    onclickPhotographProfil.setAttribute(
      "href",
      `photograph_page.html?id=${id}`
    );
    onclickPhotographProfil.appendChild(photographProfil);

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

    const artistHashtags = document.createElement("div");
    artistHashtags.classList.add("ArtistHashtags");

    tags.forEach((item) => {
      let hash = document.createElement("div");
      hash.innerHTML = "#" + item;
      hash.classList.add("Hashtag");
      artistHashtags.appendChild(hash);
    });

    photographProfil.appendChild(profilePhotos);
    photographProfil.appendChild(artistName);
    photographProfil.appendChild(artistCity);
    photographProfil.appendChild(artistDescription);
    photographProfil.appendChild(artistPrice);
    photographProfil.appendChild(artistHashtags);
    onclickPhotographProfil.appendChild(photographProfil);
    photographList.appendChild(onclickPhotographProfil);
    document.body.appendChild(photographList);
  }
}

class Photos {
  constructor(id, photographerId, title, image, tags, likes, date, price) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.image = `/Sample_Photos/${Photograph}/${image}`;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.photographer = new Photograph();
  }

  computerPhotosVariables() {
    return {
      id: this.id,
      photographerId: this.photographerId,
      title: this.title,
      image: this.image,
      tags: this.tags,
      likes: this.likes,
      date: this.date,
      price: this.price,
    };
  }

  renderPhotographGalleryProfil() {
    //Photograph Profil Top part
    const photoraphersProfil = document.createElement("div");
    photoraphersProfil.classList.add("PhotographProfil");

    const photograhersProfilePhoto = document.createElement("img");
    photograhersProfilePhoto.setAttribute("src", photographer.portrait);
    photograhersProfilePhoto.classList.add("PhotographProfil", "ArtistPhot");

    const photographersName = document.createElement("div");
    photographersName.innerHTML = photographer.name;
    photographersName.classList.add("ArtistName");

    const photographersCity = document.createElement("div");
    photographersCity.innerHTML =
      photographer.city + " " + photographer.country;
    photographersCity.classList.add("ArtistCity");

    const photographersDescription = document.createElement("div");
    photographersDescription.innerHTML = photographer.tagline;
    photographersDescription.classList.add("ArtistDescription");

    const photographerTags = document.createElement("div");
    photographersTags.classList.add("ArtistHashtags");

    photographer.tags.forEach((item) => {
      let hash = document.createElement("div");
      hash.innerHTML = "#" + item;
      hash.classList.add("Hashtag");
      photographerTags.appendChild(hash);
    });

    photoraphersProfil.appendChild(photograhersProfilePhoto);
    photoraphersProfil.appendChild(photographersName);
    photoraphersProfil.appendChild(photographersCity);
    photoraphersProfil.appendChild(photographersDescription);
    photoraphersProfil.appendChild(photographerTags);
    // onclickPhotographProfil.appendChild(photographProfil);
    // photographList.appendChild(onclickPhotographProfil);
    document.ProfilGallery.appendChild(photoraphersProfil);
  }

  renderPhotographerGallery() {
    const photoGallery = this.computerPhotosVariables();
    const { id, photographerId, title, image, tags, likes, date, price } =
      photoGallery;
    //Gallery
    const photographerGallery = document.createElement("div");
    photographerGallery.classList.add("PhotographGallery");

    photos;
  }
}
// 1. FETCH DATA

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
        newPhotographer.printPhotographer();
      });

      newPhotographers.forEach((photographer) => {
        photographer.renderHomepage();
      });

      newPhotographers.forEach((photographer) => {
        photographer.renderPhotographGalleryProfil();
      });

      return response;
    });
}

let data = fetchData("FishEyeData.json");

// 3. ITERATE AND ADD EVENT LISTENER
photographers.forEach(({ name, id }) => {
  const elementText = document.createElement("p");
  elementText.innerHTML = `This is ${name}`;
  elementText.classList.add("blue-text");
  elementText.setAttribute("id", `${id}`);
  elementText.addEventListener("click", (event) =>
    handlePhotographerClick(event, id)
  );
  document.getElementById("photographers").appendChild(elementText);
});

medias.forEach((media) => {
  //destructure what you need
  const { title, id, image } = media;
  //   // element creation
  const elementText = document.createElement("p");
  const elementImage = document.createElement("img");
  //   // add inner content to elements
  elementText.innerHTML = `This is ${title}`;
  //   // add attributes (class and id)
  elementText.classList.add("blue-text");
  elementText.setAttribute("id", `${id}`);

  elementImage.setAttribute("src", `${image}`);
  elementImage.setAttribute("alt", `${title}`);
  //   // append to body
  document.body.appendChild(elementText);
});

// on one page, load data given a photographerId
// photographer onClick
// redirect to correct ID

// 2. DESTRUCTURE DATA FROM JSON
const { media: medias, photographers } = data;
