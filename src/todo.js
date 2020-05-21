const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

const deleteToDo = (e) => {
  const btn = e.target;
  const li = btn.parentElement;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  toDos = cleanToDos;
  saveToDos();
};

const saveToDos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
};

const handleToDosSubmit = (e) => {
  e.preventDefault();
  const value = toDoInput.value;
  paintToDo(value);
  saveToDos();
  toDoInput.value = "";
};

const paintToDo = (text, id) => {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerHTML = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  const newId = id ? id : Date.now();
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    id: newId,
    text,
  };
  toDos.push(toDoObj);
};

const loadToDos = () => {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo) => paintToDo(toDo.text, toDo.id));
    saveToDos();
  }
};

const toDoInit = () => {
  loadToDos();
  toDoForm.addEventListener("submit", handleToDosSubmit);
};

toDoInit();
