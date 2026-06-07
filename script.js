const myLibrary = [];

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}
Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function addBook(title,author,pages,read){
    let obj = new Book(title,author,pages,read);
    myLibrary.push(obj);
}
function display()
{
    show.innerHTML = "";
    for(let obj of myLibrary){
        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <p>${obj.title}</p>
        <p>By: ${obj.author}</p>
        <p>${obj.pages} pages</p>
        `;
        const isRead = document.createElement("button")
        if(obj.read) {
            isRead.classList.add('read');
            isRead.textContent = "Read"
        }
        else{
            isRead.textContent = "Not Read";
        }
        div.appendChild(isRead);

        const del = document.createElement("button")
        del.classList.add("del");
        del.textContent = "Delete";
        div.appendChild(del);

        isRead.addEventListener("click",() => { 
            obj.toggleRead();     
            display();
        });

        del.addEventListener("click",() => {
            const index = myLibrary.findIndex(book => book.id === obj.id)
            myLibrary.splice(index,1);
            display();
        });
        show.appendChild(div);
    }
}
const form = document.querySelector(".form form");
const btn = document.querySelector('.new');
const title = document.querySelector("#Book_title");
const author = document.querySelector("#Author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#isRead");
const show = document.querySelector(".show");

btn.addEventListener("click", () => {
    form.style.display = "block";
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let t = title.value;
    let a = author.value;
    let p = pages.value;
    let r = read.checked;
    addBook(t,a,p,r);
    display();
    form.reset();
    form.style.display = "none";
});