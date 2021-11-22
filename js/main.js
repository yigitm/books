const formButton = document.querySelectorAll('form');

let books = [];

class SingleBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function addBook() {
  titleValue = document.getElementById('title').value;
  authorValue = document.getElementById('author').value;
  book = new SingleBook(titleValue, authorValue);
  books.push(book);
  addLocal();
  //console.log(books);
}

function addLocal() {
  localStorage.setItem('books', JSON.stringify(books));
}

function getLocal() {
  books = JSON.parse(localStorage.getItem('books'));
}

function remove() {}

function show() {
  getLocal();
  const ul = document.getElementById('display-books');
  books.forEach(element => {
    const li = document.createElement('li');
    ul.append(li);
    li.innerText = element.title;
    li.innerText = '<br />';
    li.innerText = element.author;
  });
}
addEventListener('submit', e => {
  e.preventDefault();
  if (e.currentTarget) {
    addBook();
  }
  show();
});

window.addEventListener('DOMContentLoaded', event => {});
