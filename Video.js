const artistMediaGallery = document.getElementById("mediaGallery");

export default class video {
  constructor(media) {
    Object.assign(this, media);
  }

  display() {
    const videoContainer = createElement("div");

    const videoVideo = createElement("video");
    videoVideo.setAttribute(
      "src",
      `assets/${this.photographerId}/${this.video}`
    );
    videoVideo.setAttribute("type", "video/mp4");

    const videoDescription = createElement("div");

    const videoTitle = createElement("div");
    videoTitle.innerHTML = this.title;

    const videoLikes = createElement("div");
    videoLikes.innerHTML = this.likes;

    const videoHeart = createElement("a");
    const videoHeartClick = createElement("i");
    videoHeartClick.classList.add("fas fa-heart icon empty");

    videoContainer.appendChild(videoVideo);
    videoDescription.appendChild(videoTitle);
    videoHeart.appendChild(videoHeartClick);
    videoLikes.appendChild(videoHeart);
    videoDescription.appendChild(videoLikes);
    videoContainer.appendChild(videoDescription);

    artistMediaGallery.appendChild(videoContainer);
  }
}
