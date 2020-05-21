const clockContainer = document.querySelector(".js-clock");
const clockTitle = document.querySelector(".js-clockTitle");

const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const init = () => {
  getCurrentTime();
  setInterval(getCurrentTime, 1000);
};

init();
