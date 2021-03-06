const ul = document.getElementById('display-books');
const form = document.getElementById('form-books');
let books = [];

class SingleBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function addLocal() {
  localStorage.setItem('books', JSON.stringify(books));
}

function addBook() {
  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const book = new SingleBook(titleValue, authorValue);
  books.push(book);
  addLocal();
}

function getLocal() {
  books = JSON.parse(localStorage.getItem('books'));
}

// REMOVE ELEMENT VIEW
function removeBook(itemToDelete) {
  const deleteItem = document.getElementById(itemToDelete).parentNode;
  const deleteItemIndex = books.findIndex((e) => e.title === itemToDelete);
  deleteItem.remove();
  books.splice(deleteItemIndex, 1);
  addLocal();
}

ul.addEventListener('click', (e) => {
  let itemToDelete;
  if (e.target.classList.contains('remove-button')) {
    itemToDelete = e.target.id;
    // console.log(e.target.id);
  }
  removeBook(itemToDelete);
});

// ADD NEW ELEMENTS VIEW
function AddElement() {
  getLocal();

  const li = document.createElement('li');
  books.forEach((element) => {
    li.innerHTML = `${element.title} by ${element.author} <button id="${element.title}" class="remove-button">Remove</button>`;
    ul.appendChild(li);
  });
}

// SHOW ALL ELEMENTS

function showAll() {
  if (localStorage.getItem('books') !== null) {
    getLocal();
    books.forEach((e) => {
      ul.insertAdjacentHTML(
        'beforeend',
        `<li>${e.title} by ${e.author} <button id="${e.title}" class="remove-button">Remove</button></li>`,
      );
    });
  }
}

// ADD ITEMS EVENT LISTENER
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.currentTarget) {
    addBook();
  }
  AddElement();
});

window.addEventListener('DOMContentLoaded', () => {
  showAll();
});
