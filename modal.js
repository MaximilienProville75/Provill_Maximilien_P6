var photograph = function(profilPhoto, name, city, description, price, hashtags,) {
  this.profilPhoto = profilPhoto;
  this.name = name;
  this.city = city;
  this.description = description;
  this.price = price;
  this.hashtags = hashtags;
}

var mimiKeel = new photograph('Sample Photos/Photographers ID Photos/MimiKeel.jpg', 'Mimi Keel', 'London, UK', 'Voir le beau dans le quotidien', 400, ['portrait', 'events', 'travel', 'animals']);
var elliRoseWilkens = new photograph('Sample Photos/Photographers ID Photos/EllieRoseWilkens.jpg', 'Elie-Rose Wilkens', 'Paris, France', 'Travaille sur des compositions complexes', 250, ['sports', 'architecture']);
var tracyGalindo = new photograph('Sample Photos/Photographers ID Photos/TracyGalindo.jpg', 'Tracy Galindo', 'Montreal, Canada', 'Photograph Freelance', 500, ['art', 'fashion', 'events']);
var nabeelBradford = new photograph('Sample Photos/Photographers ID Photos/NabeelBradford.jpg', 'Nabeel Bradford', 'Mexico City, Mexico', 'Je vais toujours de l\'avant', 350, ['travel', 'portraits']);
var rhodeDubois = new photograph('Sample Photos/Photographers ID Photos/RhodeDubois.jpg', 'Rhode Dubois', 'Barcelona, Spain', 'Créatrice de souvenirs', 375, ['sport', 'fashion', 'events', 'animals']);
var marcelNikolic = new photograph('Sample Photos/Photographers ID Photos/MarcelNikolic.jpg', 'Marcel Nikolic', 'Berlin, Germany', 'Toujours à la recherche de LA photo', 300, ['travel', 'architecture']); 

var photographs = [mimiKeel, elliRoseWilkens, tracyGalindo, nabeelBradford, rhodeDubois, marcelNikolic];

let photographList = document.createElement('div');
    photographList.classList.add("Artistes")
  

for (var i = 0; i < photographs.length; i++) {  
    let photographProfil = document.createElement('div');
    photographProfil.classList.add("ArtistProfil");

    let onclickPhotographProfil = document.createElement('a');
    onclickPhotographProfil.setAttribute("href", "photograph_page.html");
    onclickPhotographProfil.appendChild(photographProfil);


    let profilPhotos = document.createElement('img');
    profilPhotos.src = photographs[i].profilPhoto;
    let src = profilPhotos.src;
    profilPhotos.classList.add("Artistes", "ArtistPhot");
    
    let artistName = document.createElement('div');
    artistName.innerHTML = photographs[i].name;
    artistName.classList.add("ArtistName");
    
    let artistCity = document.createElement('div');
    artistCity.innerHTML = photographs[i].city;
    artistCity.classList.add("ArtistCity");

    let artistDescription = document.createElement('div');
    artistDescription.innerHTML = photographs[i].description;
    artistDescription.classList.add("ArtistDescription");

    let artistPrice = document.createElement('div');
    artistPrice.innerHTML = photographs[i].price + "e/jour";
    artistPrice.classList.add("ArtistPrix");

    let artistHashtags = document.createElement('div');
    artistHashtags.classList.add("ArtistHashtags");

      photographs[i].hashtags.forEach(item => {let hash = document.createElement('div');
      hash.innerHTML = "#" + item;
      hash.classList.add("Hashtag"); 
      artistHashtags.appendChild(hash);})
      
    photographProfil.appendChild(profilPhotos);
    photographProfil.appendChild(artistName);
    photographProfil.appendChild(artistCity);
    photographProfil.appendChild(artistDescription);
    photographProfil.appendChild(artistPrice);
    photographProfil.appendChild(artistHashtags);
    onclickPhotographProfil.appendChild(photographProfil);
    photographList.appendChild(onclickPhotographProfil);
    document.body.appendChild(photographList);
}

