import "./styles/style.css";

let booksArr = [];
const STORED_ARRAYS = "stored-arrays";

class LocalStorage {
  setItem(value) {
    localStorage.setItem(STORED_ARRAYS, JSON.stringify({ arr: value }));
  }

  getItem() {
    if (localStorage.getItem(STORED_ARRAYS)) {
      return JSON.parse(localStorage.getItem(STORED_ARRAYS)).arr;
    } else {
      return [];
    }
  }
}

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Handling UI Tasks
class UI {
  static displayBooks() {
    const ls = new LocalStorage();
    const storedBooks = ls.getItem();
    booksArr = [...booksArr, ...storedBooks];
    const books = storedBooks;
    books.forEach((book, idx) => {
      book.id = idx;
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.isbn}</td>
      <td>${book.author}</td>
      <td><a href="#" class="btn btn-danger btn-smdelete" id="delete-book">X</a></td>
    `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    const ls = new LocalStorage();
    const bookId =
      el.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.textContent;
    booksArr.forEach((el, idx) => {
      console.log(el);
      if (el.id === +bookId) {
        booksArr.splice(idx, 1);
      }
    });
    ls.setItem(booksArr);
    el.parentElement.parentElement.remove();
  }

  static clearAllFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Handlers {
  onFormSubmit(ev) {
    ev.preventDefault();
    console.log("submit");
    const ls = new LocalStorage();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    const errorMessage = document.getElementById("error-message");
    if (title && author && isbn) {
      const newBook = new Book(title, author, isbn);
      const id = booksArr.length;
      booksArr.push(newBook);
      ls.setItem(booksArr);
      UI.addBookToList({ title, author, isbn, id });
      errorMessage.innerHTML = "";
      UI.clearAllFields();
    } else {
      errorMessage.innerHTML = `<p style="color:red">Please fill all the details</p>`;
    }
  }

  onRemoveBook(ev) {
    UI.deleteBook(ev.target);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let submitFormBtn = document.querySelector("#submit-form-btn");
  const handlers = new Handlers();
  UI.displayBooks();
  submitFormBtn.addEventListener("click", handlers.onFormSubmit);
  const list = document.querySelector("#book-list");
  list.addEventListener("click", handlers.onRemoveBook);
});
