const artistMediaGallery = document.getElementById("mediaGallery");

export default class Video {
  constructor({ id, photographerId, title, video, tags, likes, date, price }, videoLightBox) {
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.video = video;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
  }

  display(firstName) {
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("videoContainer");

    const videoVideo = document.createElement("video");
    const videoSource = document.createElement("source");
    videoVideo.controls = true;
    videoSource.setAttribute("src", `Sample_Photos/${firstName}/${this.video}`);
    videoSource.setAttribute("type", "video/mp4");
    videoSource.setAttribute("data-title", this.title);
    videoVideo.classList.add("media");
    videoVideo.appendChild(videoSource);

    const videoDescription = document.createElement("div");
    videoDescription.classList.add("videoDescription");

    const videoTitle = document.createElement("div");
    videoTitle.innerHTML = this.title;
    videoTitle.classList.add("videoTitle");

    const videoLikes = document.createElement("div");
    videoLikes.setAttribute("arial-label", "likes");
    videoLikes.classList.add("totalLikesBox");
    const videoLikesCount = document.createElement("span");
    videoLikesCount.innerHTML = this.likes;
    videoLikesCount.classList.add("videoLikes");
    videoLikes.appendChild(videoLikesCount);

    const videoHeart = document.createElement("a");
    videoHeart.classList.add("heart");
    const videoHeartClick = document.createElement("i");
    videoHeartClick.classList.add("fas", "fa-heart", "icon", "empty");

    videoContainer.appendChild(videoVideo);
    videoDescription.appendChild(videoTitle);
    videoHeart.appendChild(videoHeartClick);
    videoLikes.appendChild(videoHeart);
    videoDescription.appendChild(videoLikes);
    videoContainer.appendChild(videoDescription);

    artistMediaGallery.appendChild(videoContainer);
  }
}
