import MediaFactory from "./MediaFactory.js";

const params = new URL(window.location).searchParams;
const pageId = parseInt(params.get("id"), 10);
const mediaGallery = document.getElementById("media-gallery");

fetch("fisheye_data.json")
  .then((response) => response.json())
  .then((data) => {
    const photographerMedia = data.media.filter(
      (m) => m.photographerId === pageId
    );

    photographerMedia.forEach((media) => {
      totalLikes += media.likes;
    });

    const photographer = data.photographers.find((p) => p.id === pageId);
    fillPhotographerBanner(photographer);
    totalLikesAndPrice(photographer);

    photographerMedia.forEach((media) => {
      const newMedia = MediaFactory.createMedia(media);
      mediaGallery.insertAdjacentHTML("beforeend", newMedia.display());
    });

    const heartIcons = document.querySelectorAll(".icon");
    animateAndIncrementLikes(heartIcons);
  });
