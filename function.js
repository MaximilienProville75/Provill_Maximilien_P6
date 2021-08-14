// 4. HANDLE LOGIC FOR COMPARISON AND DISPLAY
const handlePhotographerClick = (event, id) => {
    event.preventDefault();
    const requiredMedias = compareIds(id);
    displayMedias(requiredMedias);
};

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

  
export {handlePhotographerClick, compareIds, displayMedias};