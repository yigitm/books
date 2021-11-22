const formButton = document.querySelectorAll('form');
const ul = document.getElementById('display-books');
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

//ADD NEW ELEMENTS VIEW
function AddElement() {
  getLocal();
  
  const li = document.createElement('li');
  books.forEach(element => {
    li.innerHTML = `<li>${element.title}</li><li>${element.author}</li>`
    ul.appendChild(li)
  }); 
}

//SHOW ALL ELEMENTS

function showAll(){
  getLocal();
  books.forEach(e => {
    ul.insertAdjacentHTML('beforeend',
     `<li>${e.title}</li><li>${e.author}</li>`
    )
  })
}

//ADD ITEMS EVENT LISTNER
addEventListener('submit', e => {
  e.preventDefault();
  if (e.currentTarget) {
    addBook();
  }
  AddElement()
});

window.addEventListener('DOMContentLoaded', event => {
  showAll();
  
});
