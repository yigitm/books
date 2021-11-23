const form = document.getElementById('form-books');
const divCont = document.getElementById('display-books');


class Book{
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = parseInt(new Date().getTime(), 10);
  }
}
class Library {
  constructor(library= []){
    this.library = library;
  }

  // set Local
  setLocal(library) {
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
    console.log('test')
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
    console.log(itemIndex)
    this.library.splice(itemIndex, 1);
    this.setLocal(this.library);
  }

  showInitial() {
    this.library.forEach((e) => {
      divCont.insertAdjacentHTML(
        'beforeend',
        `
              <li>${e.title} by ${e.author}   <button id="${e.id}">remove</button></li>
            `,
      );
    });
  }

  showBook(title, author, id) {
    const li = document.createElement('li');
    li.innerHTML = `${title} by ${author}   <button id="${id}">remove</button>`;
    divCont.appendChild(li);
  }

  removeBook(currentID) {
    const currentBtn = document.getElementById(currentID);
    currentBtn.parentElement.remove();
    console.log(this.library)
    this.removeItems(currentID);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const [title, author] = form.elements;
  lib.addItems(title.value, author.value);
  title.value = '';
  author.value = '';
  title.focus();
});

divCont.addEventListener('click', (e) => {
  lib.removeBook(e.target.id);
});


const lib = new Library()
lib.getItems();
lib.showInitial();
