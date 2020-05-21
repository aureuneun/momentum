const userForm = document.querySelector(".js-userForm");
const userInput = userForm.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "user";
const SHOWING_CN = "showing";

const saveUser = (text) => {
  localStorage.setItem(USER_LS, text);
};

const handleUserSubmit = (e) => {
  e.preventDefault();
  const value = userInput.value;
  paintGreeting(value);
  saveUser(value);
};

const askForUser = () => {
  userForm.classList.add(SHOWING_CN);
  userForm.addEventListener("submit", handleUserSubmit);
};

const paintGreeting = (text) => {
  userForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML = `Hello ${text}`;
};

const loadUser = () => {
  const loadedUser = localStorage.getItem(USER_LS);
  if (loadedUser) {
    paintGreeting(loadedUser);
  } else {
    askForUser();
  }
};

const greetingInit = () => {
  loadUser();
};

greetingInit();
