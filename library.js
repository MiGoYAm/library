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

const readers = [
    new Reader("Adam", "Nowak", 40),
    new Reader("Ewa", "Kowalska", 45),
    new Reader("Jan", "Nowak", 50),
    new Reader("bogdan", "lewandowski", 50),
  ];

  const books = [
    new Book("Pan Tadeusz", "Adam Mickiewicz", "1834"),
    new Book("Ogniem i mieczem", "Henryk Sienkiewicz", "1884"),
  ];

  const readersList = document.getElementById("readers");
  const booksList = document.getElementById("books");

  for (let i = 0; i < 100; i++) {
    readers.forEach((reader) => {
      const li = document.createElement("li");
      li.textContent = `${reader.name} ${reader.surename}`;
      readersList.appendChild(li);
    });
  }

  books.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} - ${book.author}`;
    booksList.appendChild(li);
  });

const readerAddButton = document.getElementById("readerAdd");
const readerDialog = document.getElementById("readerDialog");

readerAddButton.addEventListener("click", () => {
    readerDialog.showModal();
}); 