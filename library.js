class Book {
    available = true;

    constructor(title, author, rokWydania) {
        this.title = title;
        this.author = author;
        this.rokWydania = rokWydania;
    }

    displayInfo() {
        console.log(`Tytuł: ${this.title}, Autor: ${this.author}, Rok wydania: ${this.rokWydania}`);
    }
}

class Reader {
    history = [];

    constructor(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    borrowBook(book) {
        if (book.available) {
            book.available = false;
        }
    }

    returnBook(book) {
        if (!book.available) {
            book.available = true;
        }
    }
}

class Library {
    books = [];
    readers = [];

    constructor() {}

    searchBook(title) {
        return this.books.filter(book => book.title.startsWith(title) && book.available);
    }

    addBook(book) {
        this.books.push(book);
    }

    addReader(reader) {
        this.readers.push(reader);
    }

    loanBook(book, reader) {
        if (this.books.some(b => b === book) && this.readers.some(r => r === reader) && book.available) {
            reader.history.push(book);
            reader.borrowBook(book);
        }
    }
}

const readers = [
    new Reader("Adam", "Nowak", 40),
    new Reader("Ewa", "Kowalska", 45),
    new Reader("Jan", "Nowak", 50),
    new Reader("Bogdan", "Lewandowski", 50),
];

const books = [
    new Book("Pan Tadeusz", "Adam Mickiewicz", "1834"),
    new Book("Ogniem i mieczem", "Henryk Sienkiewicz", "1884"),
];

  const readersList = document.getElementById("readersList");
  const booksList = document.getElementById("booksList");

for (let i = 0; i < 100; i++) {
    readers.forEach((reader) => {
        const li = document.createElement("li");
        li.textContent = `${reader.name} ${reader.surname}`;
        readersList.appendChild(li);
    });
}

books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} - ${book.author}`;
    booksList.appendChild(li);
});
