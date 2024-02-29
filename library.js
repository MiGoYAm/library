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

  const readersList = document.getElementById("readersList");
  const booksList = document.getElementById("booksList");

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
  
  
  function addUser() {
    const newUserFirstName = document.getElementById("new-user-first-name").value;
    const newUserLastName = document.getElementById("new-user-last-name").value;
    const newUserAge = document.getElementById("new-user-age").value;

    if (newUserFirstName && newUserLastName && newUserAge) {
      const newUser = new Reader(newUserFirstName, newUserLastName, parseInt(newUserAge));
      library.addReader(newUser);
      updateReaderList();
      document.getElementById("add-user-form").reset();
      document.getElementById("add-user-form").style.display = "none";
    } else {
      alert("Please fill in all the fields.");
    }
  }