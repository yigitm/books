let books = [];
const form = document.getElementById('form-books');
const divCont = document.getElementById('display-books');

class Library {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = parseInt(new Date().getTime(), 10);
  }

  // set Local
  static setLocal(books) {
    localStorage.setItem('LibraryBooks', JSON.stringify(books));
  }

  // Get items
  static getItems() {
    if (!localStorage.getItem('LibraryBooks')) {
      books = [];
      Library.setLocal();
    } else {
      books = JSON.parse(localStorage.getItem('LibraryBooks'));
    }
  }

  // Add Items
  static addItems(title, author) {
    if (title === '' || author === '') {
      return;
    }
    const book = new Library(title, author);
    books.push(book);
    Library.setLocal(books);
    Library.showBook(title, author, book.id);
  }

  // Remove Items
  static removeItems(removeID) {
    const itemIndex = books.findIndex(
      (elm) => elm.id === parseInt(removeID, 10),
    );
    books.splice(itemIndex, 1);
    Library.setLocal(books);
  }

  static showInitial() {
    books.forEach((e) => {
      divCont.insertAdjacentHTML(
        'beforeend',
        `
              <li>${e.title} by ${e.author}   <button id="${e.id}">remove</button></li>
            `,
      );
    });
  }

  static showBook(title, author, id) {
    const li = document.createElement('li');
    li.innerHTML = `${title} by ${author}   <button id="${id}">remove</button>`;
    divCont.appendChild(li);
  }

  static removeBook(currentID) {
    const currentBtn = document.getElementById(currentID);
    currentBtn.parentElement.remove();
    Library.removeItems(currentID);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const [title, author] = form.elements;
  Library.addItems(title.value, author.value);
  title.value = '';
  author.value = '';
  title.focus();
});

divCont.addEventListener('click', (e) => {
  Library.removeBook(e.target.id);
});

Library.getItems();
Library.showInitial();
