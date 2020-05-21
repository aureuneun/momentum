const form = document.querySelector(".js-userForm");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "user";
const SHOWING_CN = "showing";

const saveUser = (text) => {
  localStorage.setItem(USER_LS, text);
};

const handleUserSubmit = (e) => {
  e.preventDefault();
  const value = input.value;
  paintGreeting(value);
  saveUser(value);
};

const askForUser = () => {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleUserSubmit);
};

const paintGreeting = (text) => {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML = `Hello ${text}`;
};

const loadUser = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser) {
    paintGreeting(currentUser);
  } else {
    askForUser();
  }
};

const greetingInit = () => {
  loadUser();
};

greetingInit();
