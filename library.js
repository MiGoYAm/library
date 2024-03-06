class Book {
  available = true;

  constructor(title, author, rokWydania) {
    this.title = title;
    this.author = author;
    this.rokWydania = rokWydania;
  }

  displayInfo() {
    console.log(
      `Tytuł: ${this.title}, Autor: ${this.author}, Rok wydania: ${this.rokWydania}`
    );
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

  addBook(book) {
    this.books.push(book);
  }

  addReader(reader) {
    this.readers.push(reader);
  }

  loanBook(book, reader) {
    if (
      this.books.some((b) => b === book) &&
      this.readers.some((r) => r === reader) &&
      book.available
    ) {
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
  new Book("Lalka", "Bolesław Prus", "1890"),
  new Book("Chłopi", "Władysław Reymont", "1904"),
];

let selectedReader = null;
let selectedBooks = [];

function render(prefix, list, fn) {
  const ul = document.getElementById(prefix + "List");
  ul.innerHTML = "";

  list.forEach((item, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = prefix + index;

    li.appendChild(input);
    li.innerHTML += fn(item);
    ul.appendChild(li);
  });

  list.forEach((item, index) => {
    const input = document.getElementById(prefix + index);

    input.addEventListener("change", (event) => {
      if (event.target.checked) {
        if (selectedReader !== null) {
          const previousSelected = document.getElementById(
            prefix + selectedReader
          );
          previousSelected.checked = false;
        }
        selectedReader = index;
      } else {
        selectedReader = null;
      }
    });
  });
}

function renderReaders(reader) {
  if (reader) {
    reader = new Reader(reader.name, reader.surname, reader.age);
    readers.push(reader);
  }
  render("reader", readers, (reader) => `${reader.name} ${reader.surname}`);
}

function renderBooks(book) {
  if (book) {
    book = new Book(book.title, book.author, book.rokWydania);
    books.push(book);
  }
  render("book", books, (book) => `${book.title} ${book.author}`);
}

function addForm(prefix, renderFn) {
  const form = document.getElementById(prefix + "Form");
  const modal = document.getElementById(prefix + "Dialog");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const data = {};
    for (let [key, value] of formData) {
      data[key] = value;
    }
    renderFn(data);

    modal.close();
    event.target.reset();
  });
}

function addModal(prefix) {
  const button = document.getElementById(prefix + "Add");
  const dialog = document.getElementById(prefix + "Dialog");

  button.addEventListener("click", () => {
    dialog.showModal();
  });
}

renderReaders();
renderBooks();

addForm("reader", renderReaders);
addForm("book", renderBooks);

addModal("reader");
addModal("book");
