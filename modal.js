// //import data from "/FishEyeData.json" assert { type: "json" };
// const url = "./FishEyeData.json";

// function fetchData(url) {
//   fetch(url)
//     .then(res => res.json())
//     .then(data => console.log(data))
// }

// const data = fetchData(url);
// console.log(data);

//   class Photograph {

    
//   renderHomepage() {
//     const photographProfil = document.createElement('div');
//     photographProfil.classList.add("ArtistProfil");

//     const onclickPhotographProfil = document.createElement('a');
//     onclickPhotographProfil.setAttribute("href", "photograph_page.html?id=243");
//     onclickPhotographProfil.appendChild(photographProfil);

//     const profilPhotos = document.createElement('img');
//     profilPhotos.src = this.profilPhoto;
//     const src = profilPhotos.src;
//     profilPhotos.classList.add("Artistes", "ArtistPhot");
    
//     const artistName = document.createElement('div');
//     artistName.innerHTML = this.name;
//     artistName.classList.add("ArtistName");
    
//     const artistCity = document.createElement('div');
//     artistCity.innerHTML = this.city;
//     artistCity.classList.add("ArtistCity");

//     const artistDescription = document.createElement('div');
//     artistDescription.innerHTML = this.description;
//     artistDescription.classList.add("ArtistDescription");

//     const artistPrice = document.createElement('div');
//     artistPrice.innerHTML = this.price + "e/jour";
//     artistPrice.classList.add("ArtistPrix");

//     const artistHashtags = document.createElement('div');
//     artistHashtags.classList.add("ArtistHashtags");

//       this.hashtags.forEach(item => {let hash = document.createElement('div');
//       hash.innerHTML = "#" + item;
//       hash.classList.add("Hashtag"); 
//       artistHashtags.appendChild(hash);})
      
//     photographProfil.appendChild(profilPhotos);
//     photographProfil.appendChild(artistName);
//     photographProfil.appendChild(artistCity);
//     photographProfil.appendChild(artistDescription);
//     photographProfil.appendChild(artistPrice);
//     photographProfil.appendChild(artistHashtags);
//     onclickPhotographProfil.appendChild(photographProfil);
//     photographList.appendChild(onclickPhotographProfil);
//     document.body.appendChild(photographList);
//   }
// }


// let mimiKeel = new Photograph('Sample Photos/Photographers ID Photos/MimiKeel.jpg', 'Mimi Keel', 'London, UK', 'Voir le beau dans le quotidien', 400, ['portrait', 'events', 'travel', 'animals']);

// let elliRoseWilkens = new Photograph('Sample Photos/Photographers ID Photos/EllieRoseWilkens.jpg', 'Elie-Rose Wilkens', 'Paris, France', 'Travaille sur des compositions complexes', 250, ['sports', 'architecture']);

// let tracyGalindo = new Photograph('Sample Photos/Photographers ID Photos/TracyGalindo.jpg', 'Tracy Galindo', 'Montreal, Canada', 'Photograph Freelance', 500, ['art', 'fashion', 'events']);

// let nabeelBradford = new Photograph('Sample Photos/Photographers ID Photos/NabeelBradford.jpg', 'Nabeel Bradford', 'Mexico City, Mexico', 'Je vais toujours de l\'avant', 350, ['travel', 'portraits']);

// let rhodeDubois = new Photograph('Sample Photos/Photographers ID Photos/RhodeDubois.jpg', 'Rhode Dubois', 'Barcelona, Spain', 'Créatrice de souvenirs', 375, ['sport', 'fashion', 'events', 'animals']);

// let marcelNikolic = new Photograph('Sample Photos/Photographers ID Photos/MarcelNikolic.jpg', 'Marcel Nikolic', 'Berlin, Germany', 'Toujours à la recherche de LA photo', 300, ['travel', 'architecture']); 

// let photographs = [mimiKeel, elliRoseWilkens, tracyGalindo, nabeelBradford, rhodeDubois, marcelNikolic];

// let photographList = document.createElement('div');
//     photographList.classList.add("Artistes")
  
// for (var i = 0; i < photographs.length; i++) { 
//     photographs[i].renderHomepage();
//  }


// 1. FETCH DATA
function fetchData(url) {
    fetch(url)
    .then(res => res.json())
    .then(function(response) {
      return response.blob();
    })
}

let data = fetchData("FishEyeData.json");

// 2. DESTRUCTURE DATA FROM JSON
const { media: medias, photographers } = data;

// 5. COMPARE MEDIAS IDS AND PHOTOGRAPHER IDS
const compareIds = (id) => {
  const photographerMedias = medias.filter(
    ({ photographerId }) => photographerId === id
  );
  return photographerMedias;
};

// 6. ADD MEDIAS WITH CORRECT ID TO THE DOM
const displayMedias = (arrayOfMedias) => {
  document.getElementById("medias").innerHTML = "";
  arrayOfMedias.forEach(({ price, title, likes }) => {
    const elementText = document.createElement("p");
    elementText.innerHTML = `TITLE: ${title}, PRICE: ${price}, LIKES: ${likes}`;
    document.getElementById("medias").appendChild(elementText);
  });
};

// 4. HANDLE LOGIC FOR COMPARISON AND DISPLAY
const handlePhotographerClick = (event, id) => {
  event.preventDefault();
  const requiredMedias = compareIds(id);
  displayMedias(requiredMedias);
};

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

  elementImage.setAttribute('src', `${image}`)
  elementImage.setAttribute("alt", `${title}`);
//   // append to body
  document.body.appendChild(elementText);
});

// on one page, load data given a photographerId
// photographer onClick
// redirect to correct ID

