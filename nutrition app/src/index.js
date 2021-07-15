import "./styles/style.css";
import API from "./service/api";

let api = new API();
let savedFoodMap = new Map();
let currentData = {};
let filteredCards;

class GUID {
  static createID(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = hash + key.charCodeAt(i) * i;
    }
    return hash;
  }
}

class ExternalData {
  // get data from API
  async getData(foodname) {
    const t = await api.getFoodData(foodname);
    return t;
  }
}

class Food {
  constructor(title, value, id) {
    this.title = title;
    this.value = value;
    this.id = id;
  }
}

class UI {
  updateCard(i) {
    const item = i[0];
    const title = document.querySelector("#card-title");
    const tableBody = document.querySelector("#nutrition-list");
    title.innerHTML = `<h4>Nutrition for ${item.name}</h4>`;
    const list = "";
    tableBody.innerHTML = "";
    Object.keys(item).forEach((el) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${el}</td>
        <td>${item[el]}</td>`;
      tableBody.appendChild(row);
    });
  }

  showCard(bool) {
    const card = document.querySelector("#show-card");
    card.style.display = bool ? "block" : "none";
  }

  showSavedCardsContainer(bool) {
    const container = document.querySelector("#saved-cards-container");
    container.style.display = bool ? "block" : "none";
  }

  displaySavedCards() {
    const ls = new LocalStorage();
    const items = ls.getSavedCards();
    items.forEach((item) => {
      this.addCardToSavedCards(item);
    });
  }

  addCardToSavedCards(item) {
    this.showSavedCardsContainer(true);
    let ls = new LocalStorage();
    if (!savedFoodMap.has(item.id)) {
      savedFoodMap.set(item.id, item);
      ls.setSavedCards();
      this.addCardToDOM(item);
    }
  }

  addCardToDOM(item) {
    let card = document.createElement("div");
    card.id = item.id;
    let outerdiv = document.querySelector("#saved-cards");
    card.innerHTML = `
      <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
        <div class="card-header">Food</div>
        <div class="card-body">
          <h4 class="card-title">${item.title}</h4>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <a class="btn btn-danger btn-smdelete" id="delete-food">DELETE</a>
      </div>
      `;
    outerdiv.appendChild(card);
  }

  removeCardFromSavedCards(id) {
    let ls = new LocalStorage();
    let outerdiv = document.querySelector("#saved-cards");
    const el = document.getElementById(id);
    outerdiv.removeChild(el);
    savedFoodMap.delete(+id);
    if (savedFoodMap.size === 0) {
      this.showSavedCardsContainer(false);
    }
    ls.setSavedCards();
  }

  searchSavedCardsAndUpdateDOM(searchTerm) {
    let outerdiv = document.querySelector("#saved-cards");
    filteredCards = new Map(savedFoodMap);
    filteredCards.forEach((card) => {
      if (!card.title.toLowerCase().includes(searchTerm))
        filteredCards.delete(card.id);
    });
    outerdiv.innerHTML = "";
    filteredCards.forEach((card) => {
      this.addCardToDOM(card);
    });
  }

  clearFormFields() {
    document.querySelector("#card-title").value = "";
  }
}

class LocalStorage {
  SAVED_CARDS = "saved-cards";
  // add saved itesm to local LocalStorage
  setSavedCards() {
    localStorage.setItem(this.SAVED_CARDS, JSON.stringify([...savedFoodMap]));
  }

  // get items from local storage
  getSavedCards() {
    return new Map(JSON.parse(localStorage.getItem(this.SAVED_CARDS)));
  }
}

class Handlers {
  // on form submit
  async onFormSubmit(ev) {
    let ui = new UI();
    let data = new ExternalData();
    ev.preventDefault();
    const foodname = document.querySelector("#foodname").value;
    const resp = await data.getData(foodname);
    const caloryData = await resp.json();
    currentData = caloryData.items[0];
    if (caloryData) {
      ui.showCard(true);
      ui.clearFormFields();
      ui.updateCard(caloryData.items);
    }
  }

  onSaveFood(ev) {
    let ui = new UI();
    ev.preventDefault();
    const cardId = GUID.createID(currentData.name);
    const newFood = new Food(currentData.name, currentData, cardId);
    ui.addCardToSavedCards(newFood);
  }

  onDeleteSavedFood(ev) {
    let id = ev.target.previousElementSibling.parentElement.parentElement.id;
    let ui = new UI();
    ui.removeCardFromSavedCards(id);
  }

  onFoodSearch() {
    let ui = new UI();
    let timer;
    return function (ev) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        ui.searchSavedCardsAndUpdateDOM(ev.target.value);
      }, 500);
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let ui = new UI();
  let handler = new Handlers();
  ui.displaySavedCards();
  const submitBtn = document.querySelector("#submit-form");
  const saveFoodBtn = document.querySelector("#save-food");
  const savedCards = document.querySelector("#saved-cards");
  const searchFoodInput = document.querySelector("#search-food");
  submitBtn.addEventListener("click", handler.onFormSubmit);
  saveFoodBtn.addEventListener("click", handler.onSaveFood);
  savedCards.addEventListener("click", handler.onDeleteSavedFood);
  searchFoodInput.addEventListener("keyup", handler.onFoodSearch());
});
