import { addCollectionItem } from "../scripts/todo";

const modal = document.getElementById("myModal");
const closeButton = document.getElementsByClassName("close")[0];
const addBtn = document.querySelector('#add');
const inputValue = document.querySelector('#collection-input');

addBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    addCollectionItem(inputValue.value);
    inputValue.value = "";
    closeModal();
})

closeButton.onclick =  () => {
  closeModal();
};

window.onclick = (event) => {
  if (event.target == modal) {
    closeModal();
  }
};

export const openModal = () => {
    modal.style.display = "block";
};

export const closeModal = () => {
    modal.style.display = "none";
};
