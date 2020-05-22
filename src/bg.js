const UNSPLASH_API_KEY = `cb58b5b55ecbceaef8215c585cc7ac82768fff400e940ac23c49e7f4ff1d6ae7`;
const UNSPLASH_API = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const bgBody = document.querySelector("body");
const bgLocation = document.querySelector(".js-location");
const bgImages = document.querySelector(".js-bgImage");

const BGIMAGE_LS = "bgImage";
const BGIMAGE_CN = "bgImage";

const saveBgImage = (image) => {
  localStorage.setItem(BGIMAGE_LS, JSON.stringify(image));
};

const getBgImage = () => {
  fetch(UNSPLASH_API)
    .then((res) => res.json())
    .then((json) => {
      const {
        location: { title },
        urls: { full: url },
      } = json;

      const expires = new Date();
      expires.setHours(expires.getHours() + 1);

      const image = {
        title,
        url,
        expires,
      };
      saveBgImage(image);
      loadBgImage();
    });
};

const paintBgImage = (bgImage) => {
  bgImages.classList.add(BGIMAGE_CN);
  bgImages.src = bgImage.url;
  bgBody.appendChild(bgImages);
  bgLocation.innerHTML = bgImage.title ? bgImage.title : "null";
};

const loadBgImage = () => {
  const loadedImage = localStorage.getItem(BGIMAGE_LS);
  if (loadedImage) {
    const parsedImage = JSON.parse(loadedImage);
    const today = new Date();
    const expires = new Date(parsedImage.expires);
    console.log(today, expires);
    if (today > expires) {
      getBgImage();
    } else {
      paintBgImage(parsedImage);
    }
  } else {
    getBgImage();
  }
};

const bgInit = () => {
  loadBgImage();
};

bgInit();
