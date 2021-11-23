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
        localStorage.setItem('Library',JSON.stringify(books));
    }
    // Get items
    getItems(){
        if(!localStorage.getItem('LibraryBooks')){
            setLocal();
        }
        else{
            books = JSON.parse(localStorage.getItem('LibraryBooks'));
        }
    }

    // Add Items


    // Remove Items
}