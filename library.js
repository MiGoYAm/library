class Book {
  constructor(title, author, rokWydania, available = true) {
    this.title = title;
    this.author = author;
    this.rokWydania = rokWydania;
    this.available = available;
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
      this.history.push(book);
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

  constructor() {
    this.books = JSON.parse(localStorage.getItem("books")) || [];
    this.readers = JSON.parse(localStorage.getItem("readers")) || [];
  }

  addBook(...book) {
    this.books.push(...book);
    this._sortBooks();

    localStorage.setItem("books", JSON.stringify(this.books));
  }

  addReader(...reader) {
    this.readers.push(...reader);

    this.readers.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }

      if (a.surname < b.surname) {
        return -1;
      } else if (a.surname > b.surname) {
        return 1;
      }

      return 0;
    });

    localStorage.setItem("readers", JSON.stringify(this.readers));
  }

  _sortBooks() {
    this.books.sort((a, b) => {
      if (a.available && !b.available) {
        return -1;
      } else if (!a.available && b.available) {
        return 1;
      }

      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      }
      this.books.sort((a, b) => {
        if (a.available && !b.available) {
          return -1;
        } else if (!a.available && b.available) {
          return 1;
        }

        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }

        return 0;
      });
      return 0;
    });
  }

  loanBook(reader, ...books) {
    for (const book of books) {
      if (book.available) {
        reader.history.push(book);
        reader.borrowBook(book);
        book.available = false;
      }
    }
    this._sortBooks();
  }
}

const library = new Library();
// library.addReader(
//   new Reader("Adam", "Nowak", 40),
//   new Reader("Ewa", "Kowalska", 45),
//   new Reader("Jan", "Nowak", 50),
//   new Reader("Bogdan", "Lewandowski", 50),
//   new Reader("Anna", "Wójcik", 35),
//   new Reader("Tomasz", "Kowalczyk", 28),
//   new Reader("Magdalena", "Zielińska", 55),
//   new Reader("Piotr", "Dąbrowski", 60),
//   new Reader("Zofia", "Głowacka", 31),
//   new Reader("Rafał", "Mazurek", 40)
// );
// library.addBook(
//   new Book("Pan Tadeusz", "Adam Mickiewicz", "1834"),
//   new Book("Ogniem i mieczem", "Henryk Sienkiewicz", "1884"),
//   new Book("Lalka", "Bolesław Prus", "1890"),
//   new Book("Chłopi", "Władysław Reymont", "1904"),
//   new Book("Pan Samochodzik i templariusze", "Zbigniew Nienacki", "1962"),
//   new Book("Opowieści z Narnii", "C.S. Lewis", "1950"),
//   new Book("Kroniki rodzinne", "Maria Dąbrowska", "1957"),
//   new Book("Cienka czerwona linia", "James Jones", "1962"),
//   new Book("Wiatr wierzbowy", "Kazimierz Brandys", "1963"),
//   new Book("Zbrodnia i kara", "Fiodor Dostojewski", "1866"),
//   new Book("Mistrz i Małgorzata", "Michaił Bułhakow", "1967"),
//   new Book("Rok 1984", "George Orwell", "1949"),
//   new Book("Ojciec chrzestny", "Mario Puzo", "1969"),
//   new Book("To", "Stephen King", "1986"),
//   new Book("Pan Wołodyjowski", "Henryk Sienkiewicz", "1888"),
//   new Book("Kamienie na szaniec", "Aleksander Kamiński", "1943"),
//   new Book("Szkice węglem", "Stefan Żeromski", "1904"),
//   new Book("W pustyni i w puszczy", "Henryk Sienkiewicz", "1912"),
//   new Book("Potop", "Henryk Sienkiewicz", "1886"),
//   new Book("Sklepy cynamonowe", "Bruno Schulz", "1934"),
//   new Book("Ogniem i słowem", "Henryk Sienkiewicz", "1875"),
//   new Book("Nad Niemnem", "Eliza Orzeszkowa", "1888"),
//   new Book("Ferdydurke", "Witold Gombrowicz", "1937"),
//   new Book("Wiedźmin", "Andrzej Sapkowski", "1993"),
//   new Book("Dżuma", "Albert Camus", "1947"),
//   new Book("Dziady", "Adam Mickiewicz", "1822"),
//   new Book("Quo Vadis", "Henryk Sienkiewicz", "1896"),
//   new Book("Faraon", "Bolesław Prus", "1897"),
//   new Book("Ziemia obiecana", "Władysław Reymont", "1899"),
//   new Book("Kordian", "Juliusz Słowacki", "1833"),
//   new Book("Krzyżacy", "Henryk Sienkiewicz", "1900"),
//   new Book("Wesele", "Stanisław Wyspiański", "1901"),
//   new Book("Balladyna", "Juliusz Słowacki", "1839"),
//   new Book("Przedwiośnie", "Stefan Żeromski", "1924"),
//   new Book("Ludzie bezdomni", "Stefan Żeromski", "1900"),
//   new Book("Przygody Tomka Sawyera", "Mark Twain", "1876")
// );

let selectedReader = null;
let selectedBooks = [];

function render(prefix, list, selectableFn, fn, changeFn) {
  const ul = document.getElementById(prefix + "List");
  ul.innerHTML = "";

  list.forEach((item, index) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.disabled = !selectableFn(item);
    input.id = prefix + index;
    const label = document.createElement("label");

    label.appendChild(input);
    label.innerHTML += fn(item);
    li.appendChild(label);
    ul.appendChild(li);
  });

  list.forEach((item, index) => {
    const input = document.getElementById(prefix + index);

    input.addEventListener("change", (event) => {
      changeFn(item, index, event.target.checked);
    });
  });
}

function renderReaders(reader) {
  if (reader) {
    reader = new Reader(reader.name, reader.surname, reader.age);
    library.readers.push(reader);
  }
  render(
    "reader",
    library.readers,
    (reader) => true,
    (reader) => `<p>${reader.name}</p><p>${reader.surname}</p>`,
    (item, index, checked) => {
      if (checked) {
        if (selectedReader !== null) {
          const previousSelected = document.getElementById(
            "reader" + selectedReader
          );
          previousSelected.checked = false;
        }
        selectedReader = index;
      } else {
        selectedReader = null;
      }
    }
  );
}

function renderBooks(book) {
  if (book) {
    book = new Book(book.title, book.author, book.rokWydania);
    library.books.push(book);
  }
  render(
    "book",
    library.books,
    (book) => book.available,
    (book) =>
      `<p>${book.title}</p><p>${book.author}</p><p>${book.rokWydania}r.</p>`,
    (item, index, checked) => {
      if (checked) {
        selectedBooks.push(item);
      } else {
        const i = selectedBooks.indexOf(item);
        selectedBooks.splice(i, 1);
      }
    }
  );
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

const button = document.getElementById("wypo");
button.addEventListener("click", (event) => {
  library.loanBook(library.readers[selectedReader], ...selectedBooks);
  renderBooks();
});
