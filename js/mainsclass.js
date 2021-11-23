const books = []

class CreateBook{
    constructor(){
        this.title = title;
        this.author = author;
        this.id = new Date().getTime;
    }
}

class Library {
    //set Local
    static setLocal(){
        localStorage.setItem('LibraryBooks',JSON.stringify(books));
    }
    // Get items
    static getItems(){
        if(!localStorage.getItem('LibraryBooks')){
            setLocal();
        }
        else{
            books = JSON.parse(localStorage.getItem('LibraryBooks'));
        }
    }

    // Add Items
    static addItems(title, author){
        books.push(new CreateBook(title, author));
    }
    // Remove Items
    static removeItems(){

    }
    
}