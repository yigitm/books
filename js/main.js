const formButton = document.querySelectorAll('form');

let books = [];

const singleBook = {
  title: '',
  author: '',
};

function addBook() {
  singleBook.title = document.getElementById('title').value;
  singleBook.author = document.getElementById('author').value;
  books.push(singleBook);
  console.log(books);
}

addEventListener('submit', e => {
  e.preventDefault();
  if (e.currentTarget) {
    addBook();
  }
});
