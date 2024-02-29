class Book {
    available = true

    constructor(title, autor, rokWydania) {
        this.title = title
        this.autor = autor
        this.rokWydania = rokWydania
    }

    displayInfo() {
        console.log(`Tytuł: ${this.title}, Autor: ${this.autor}, Rok wydania: ${this.rokWydania}`)
    }
}

class Reader {
    history = []

    constructor(name, surename, age) {
        this.name = name;
        this.surename = surename
        this.age = age
    }

    borrowBook(book) {
        if (book.available) {
            book.available = false
        }
    }
}

class Library {
    books = []
    readers = []

    constructor() {}

    searchBook(title) {
        return this.books.filter(book => book.title.startsWith(title)).filter(book => book.available)
    }


    addBook(book) {
        this.books.push(book)
    }

    addReader(reader) {
        this.readers.push(reader)
    }

    loanBook(book, reader) {
        if (this.books.contains(book) && this.readers.contains(reader) && book.available) {
            reader.history.push(book)
            reader.addBook(book)
        }
    }
}