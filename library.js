class Book {
    constructor(title, author, year) {
      this.title = title;
      this.author = author;
      this.year = year;
      this.available = true;
    }

    displayInfo() {
      console.log(`Title: ${this.title}, Author: ${this.author}, Year: ${this.year}, Available: ${this.available}`);
    }
  }

  class Reader {
    constructor(firstName, lastName, age) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.borrowedBooks = [];
    }

    borrowBook(book) {
      if (book.available) {
        book.available = false;
        this.borrowedBooks.push(book);
        console.log(`${this.firstName} ${this.lastName} borrowed ${book.title}.`);
      } else {
        console.log(`${book.title} is not available for borrowing.`);
      }
    }

    returnBook(book) {
      const index = this.borrowedBooks.indexOf(book);
      if (index !== -1) {
        this.borrowedBooks.splice(index, 1);
        book.available = true;
        console.log(`${this.firstName} ${this.lastName} returned ${book.title}.`);
      } else {
        console.log(`${this.firstName} ${this.lastName} does not have ${book.title} on loan.`);
      }
    }
  }

  class Library {
    constructor() {
      this.books = [];
      this.readers = [];
    }

    addBook(book) {
      this.books.push(book);
    }

    addReader(reader) {
      this.readers.push(reader);
    }

    loanBooks(reader, books) {
      books.forEach(book => {
        if (this.readers.includes(reader) && this.books.includes(book)) {
          reader.borrowBook(book);
        } else {
          console.log("Reader or book not found in the library.");
        }
      });
    }

    returnBooks(reader, books) {
      books.forEach(book => {
        if (this.readers.includes(reader) && this.books.includes(book)) {
          reader.returnBook(book);
        } else {
          console.log("Reader or book not found in the library.");
        }
      });
    }
  }

  const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);
  const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 1960);
  const book3 = new Book("1984", "George Orwell", 1949);

  const reader1 = new Reader("John", "Doe", 25);
  const reader2 = new Reader("Alice", "Smith", 30);

  const library = new Library();

  library.addBook(book1);
  library.addBook(book2);
  library.addBook(book3);

  library.addReader(reader1);
  library.addReader(reader2);

  function updateReaderList() {
    const readerList = document.getElementById("reader-list");
    readerList.innerHTML = "";
    library.readers.forEach(reader => {
      const li = document.createElement("li");
      li.textContent = `${reader.firstName} ${reader.lastName} (Age: ${reader.age}) - Borrowed Books: ${reader.borrowedBooks.length}`;
      readerList.appendChild(li);
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
  function updateBookList() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    library.books.forEach(book => {
      const li = document.createElement("li");
      li.textContent = `${book.title} by ${book.author} (${book.year}) - Availability: `;
      
      const availabilitySpan = document.createElement("span");
      availabilitySpan.textContent = book.available ? "Available" : "Unavailable";
      availabilitySpan.classList.add(book.available ? "available" : "unavailable");
      
      li.appendChild(availabilitySpan);
      
      bookList.appendChild(li);
    });
  }

  function displayAvailableBooks() {
    const bookSelection = document.getElementById("book-selection");
    bookSelection.innerHTML = "";

    library.books.forEach((book, index) => {
      if (book.available) {
        const option = document.createElement("option");
        option.value = index.toString();
        option.textContent = `${book.title} by ${book.author}`;
        bookSelection.appendChild(option);
      }
    });

    if (bookSelection.options.length > 0) {
      bookSelection.style.display = "block";
    } else {
      alert("No available books to borrow.");
    }
  }

  function displayReaders() {
    const readerSelection = document.getElementById("reader-selection");
    readerSelection.innerHTML = "";

    library.readers.forEach((reader, index) => {
      const option = document.createElement("option");
      option.value = index.toString();
      option.textContent = `${reader.firstName} ${reader.lastName}`;
      readerSelection.appendChild(option);
    });

    if (readerSelection.options.length > 0) {
      readerSelection.style.display = "block";
    } else {
      alert("No readers available.");
    }
  }

  function borrowBooks() {
    const bookSelection = document.getElementById("book-selection");
    const readerSelection = document.getElementById("reader-selection");

    const selectedBookIndexes = Array.from(bookSelection.selectedOptions).map(option => parseInt(option.value));
    const selectedReaderIndexes = Array.from(readerSelection.selectedOptions).map(option => parseInt(option.value));

    const selectedBooks = selectedBookIndexes.map(index => library.books[index]);
    const selectedReaders = selectedReaderIndexes.map(index => library.readers[index]);

    if (selectedBooks.length > 0 && selectedReaders.length > 0) {
      library.loanBooks(selectedReaders[0], selectedBooks);

      updateBookList();
      updateReaderList();
      bookSelection.style.display = "none";
      readerSelection.style.display = "none";
    } else {
      alert("Invalid book or reader selection.");
    }
  }

  function displayBorrowedBooks() {
    const returnBookSelection = document.getElementById("return-book-selection");
    returnBookSelection.innerHTML = "";

    library.readers.forEach((reader, index) => {
      reader.borrowedBooks.forEach((borrowedBook, bookIndex) => {
        const option = document.createElement("option");
        option.value = `${index}-${bookIndex}`;
        option.textContent = `${reader.firstName} ${reader.lastName} - ${borrowedBook.title} by ${borrowedBook.author}`;
        returnBookSelection.appendChild(option);
      });
    });

    if (returnBookSelection.options.length > 0) {
      returnBookSelection.style.display = "block";
    } else {
      alert("No borrowed books to return.");
    }
  }

  function returnBooks() {
    const returnBookSelection = document.getElementById("return-book-selection");

    const selectedBorrowedBookIndexes = Array.from(returnBookSelection.selectedOptions).map(option => option.value.split('-'));
    
    if (selectedBorrowedBookIndexes.length > 0) {
      selectedBorrowedBookIndexes.forEach(([readerIndex, bookIndex]) => {
        const reader = library.readers[parseInt(readerIndex)];
        const borrowedBook = reader.borrowedBooks[parseInt(bookIndex)];
        library.returnBooks(reader, [borrowedBook]);
      });

      updateBookList();
      updateReaderList();
      returnBookSelection.style.display = "none";
    } else {
      alert("Invalid borrowed book selection.");
    }
  }
  
  function displayAddBookForm() {
    const addBookForm = document.getElementById("add-book-form");
    addBookForm.style.display = "block";
  }

  function addBook() {
    const newBookTitle = document.getElementById("new-book-title").value;
    const newBookAuthor = document.getElementById("new-book-author").value;
    const newBookYear = document.getElementById("new-book-year").value;

    if (newBookTitle && newBookAuthor && newBookYear) {
      const newBook = new Book(newBookTitle, newBookAuthor, parseInt(newBookYear));
      library.addBook(newBook);
      updateBookList();
      document.getElementById("add-book-form").reset();
      document.getElementById("add-book-form").style.display = "none";
    } else {
      alert("Please fill in all the fields.");
    }
  }

  function displayAddUserForm() {
    const addUserForm = document.getElementById("add-user-form");
    addUserForm.style.display = "block";
  }

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

  updateBookList();
  updateReaderList();
