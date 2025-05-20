function openBookForm () {document.querySelector("#popup-form").style.display  = "block";}
function closeBookForm () {document.querySelector("#popup-form").style.display = "none";}

let bookArray = [];

function Book() {
    this.id = 0
    this.title = "";
    this.author = "";
    this.pages = 0;
    this.read = false;
}

function addBook2Array(title, author, pages, read) {
    const book = new Book();
    book.id = crypto.randomUUID();
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.read = read;
    bookArray.push(book);
}

const subButton = document.querySelector("#form-submit-button").addEventListener("click", addBookForm);


function addBookForm () {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;
    if (title === '' || author === '' || pages === '') {
        alert("Please fill in the form")
    }
    else {
        addBook2Array(title,author,pages,read);
        console.log(bookArray) //just for testing
        updateLibraryDiplay();
        clearInputField();
    }
}

function clearInputField() {
    document.querySelector("#title").value = '';
    document.querySelector("#author").value = '';
    document.querySelector("#pages").value = '';
    document.querySelector("#not-read").checked = true;
}


function removeAbook (event) {
    const newBookArray = bookArray.filter(book => {return book.id !== event.target.id});
    bookArray = newBookArray;
    updateLibraryDiplay();
}

function toggleReadStatus(event) {
    const newBookArray = bookArray.map(book => {
        if (book.id === event.target.id)
            {
                if (book.read === true){book.read = false}
                else (book.read = true)
            }
        else
            {return book}
        return book
    })
    bookArray = newBookArray;
    updateLibraryDiplay();
}

//clone a invisible template then make it visible and fill in the book details and add event listeners
function displayAbook (book) {
    const bookList = document.querySelector(".book-list");
    const bookTemplate = document.querySelector(".book-card-template");
    const book4dispay = bookTemplate.cloneNode(true);
    book4dispay.style.display = "flex";
    book4dispay.setAttribute("id",book.id)
    const removeButton = book4dispay.querySelector(".remove-book");
    removeButton.setAttribute("id",book.id);
    const toggleButton = book4dispay.querySelector(".toggle-read-status");
    toggleButton.setAttribute("id",book.id);
    book4dispay.querySelector("#card-title").innerHTML = book.title;
    book4dispay.querySelector("#card-author").innerHTML = "Author: "+book.author;
    book4dispay.querySelector("#card-pages").innerHTML = "Pages: "+book.pages;
    book4dispay.querySelector("#card-read").innerHTML = "Read: "+book.read;

    removeButton.addEventListener("click", removeAbook);
    toggleButton.addEventListener("click", toggleReadStatus)

    bookList.appendChild(book4dispay);
}

//clean the book-list div then call displayAbook for every books
function updateLibraryDiplay() {
    document.querySelectorAll(".book-card-template[id]").forEach(ele => {ele.remove();});
    bookArray.forEach(displayAbook)
}