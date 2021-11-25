/* eslint-disable max-classes-per-file */
document.addEventListener('DOMContentLoaded', () =>{
  const form = document.getElementById('form-books');
const divCont = document.getElementById('display-books');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = parseInt(new Date().getTime(), 10);
  }
}
class Library {
  constructor(library = []) {
    this.library = library;
  }

  // set Local
  setLocal(library) {
    this.library = library;
    localStorage.setItem('LibraryBooks', JSON.stringify(library));
  }

  // Get items
  getItems() {
    if (!localStorage.getItem('LibraryBooks')) {
      this.library = [];
      this.setLocal();
    } else {
      this.library = JSON.parse(localStorage.getItem('LibraryBooks'));
    }
  }

  // Add Items
  addItems(title, author) {
    if (title === '' || author === '') {
      return;
    }
    const book = new Book(title, author);
    this.library.push(book);
    this.setLocal(this.library);
    this.showBook(title, author, book.id);
  }

  // Remove Items
  removeItems(removeID) {
    const itemIndex = this.library.findIndex(
      (elm) => elm.id === parseInt(removeID, 10),
    );
    this.library.splice(itemIndex, 1);
    this.setLocal(this.library);
  }

  showInitial() {
    this.library.forEach((e) => {
      divCont.insertAdjacentHTML(
        'beforeend',
        `
              <li>${e.title} by ${e.author}   <button id="${e.id}">Remove</button></li>
            `,
      );
    });
  }

  showBook(title, author, id) {
    this.title = title;
    this.author = author;
    const li = document.createElement('li');
    li.innerHTML = `${title} by ${author}   <button id="${id}">remove</button>`;
    divCont.appendChild(li);
  }

  removeBook(currentID) {
    const currentBtn = document.getElementById(currentID);
    currentBtn.parentElement.remove();
    this.removeItems(currentID);
  }
}

const lib = new Library();
const menuItem = document.querySelectorAll('ul>li>a');
const navMenu = document.querySelector('.nav-items');
const closeButton = document.querySelector('.fa-window-close');
const openMenu = document.querySelector('.fa-bars');
const hourPlace = document.querySelector('.hour > p');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const [title, author] = form.elements;
  lib.addItems(title.value, author.value);
  title.value = '';
  author.value = '';
  title.focus();
});

divCont.addEventListener('click', (e) => {
  if(e.target.id && e.target.id !== 'display-books'){
    console.log(e.target.id)
    lib.removeBook(e.target.id);
  }
});

lib.getItems();
lib.showInitial();

menuItem.forEach((item) => {
  item.addEventListener('click', () => {
    const href = item.getAttribute('href');
    const clickedHref = document.querySelector(href);
    const removeClass = document.querySelectorAll('section');

    removeClass.forEach((c) => {
      c.classList.remove('visible');
    });

    clickedHref.classList.add('visible');

    if (navMenu.classList.contains('visible-mobile-nav')) {
      navMenu.classList.remove('visible-mobile-nav');
    }
  });

  openMenu.addEventListener('click', () => {
    navMenu.classList.add('visible-mobile-nav');
  });

  closeButton.addEventListener('click', () => {
    navMenu.classList.remove('visible-mobile-nav');
  });
});
/* eslint-disable no-undef */
const { DateTime } = luxon;

setInterval(() => {
  hourPlace.innerHTML = `${DateTime.now().toLocaleString(DateTime.DATETIME_MED)}`;
}, 1000);
})
