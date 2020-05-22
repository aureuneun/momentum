const WEATHER_API_KEY = "049e77411f0a31b8b2a4e2653b968699";
const WEAEHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".js-weather");

const COORDS_LS = "coords";

const getWeather = (coords) => {
  const { latitude, longitude } = coords;
  fetch(
    `${WEAEHER_API}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((json) => {
      const {
        name,
        main: { temp },
      } = json;

      weather.innerHTML = `${temp} @ ${name}`;
    });
};

const saveCoords = (coords) => {
  localStorage.setItem(COORDS_LS, JSON.stringify(coords));
};

const handleSuccess = (position) => {
  const {
    coords: { latitude, longitude },
  } = position;
  const coords = {
    latitude,
    longitude,
  };
  saveCoords(coords);
  loadCoords();
};

const handleError = (e) => {
  console.log(e.message);
};

const getCoords = () => {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
};

const loadCoords = () => {
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if (loadedCoords) {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords);
  } else {
    getCoords();
  }
};

const weatherInit = () => {
  loadCoords();
};

weatherInit();
