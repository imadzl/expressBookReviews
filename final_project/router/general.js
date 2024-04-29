const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) { 
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
        return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop

public_users.get('/',function (req, res) {
    //res.send(JSON.stringify(books));
    const booksList = new Promise((resolve,reject)=>{
        let LoB = books;
        try {
          resolve(LoB);
        } catch(err) {
          reject(err)
        }
    });
    booksList.then(
        (LoB) => res.send(JSON.stringify(LoB)),
        (err) => res.send("Error geeting books")
        );
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //const isbn = req.params.isbn;
    //res.send(books[isbn]) 
    const isbn = req.params.isbn;
    const bookByIsbn = new Promise((resolve,reject)=>{
        let BbI = books[isbn];
        try {
          resolve(BbI);
        } catch(err) {
          reject(err)
        }
    });
    bookByIsbn.then(
        (BbI) => res.send(BbI),
        (err) => res.send("Error geeting book")
        );
});


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    /*const author = req.params.author;
    let foundBooks = [];
    for (let id in books) {
        if (books[id].author === author) {
            foundBooks.push(books[id]);
        }
    }
    res.send(JSON.stringify(foundBooks))*/
    const author = req.params.author;
    const bookByAuthor = new Promise((resolve,reject)=>{
        let foundBooks = [];
        for (let id in books) {
            if (books[id].author === author) {
                foundBooks.push(books[id]);
            }
        }
        try {
          resolve(foundBooks);
        } catch(err) {
          reject(err)
        }
    });
    bookByAuthor.then(
        (foundBooks) => res.send(JSON.stringify(foundBooks)),
        (err) => res.send("Error geeting book")
        );
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    /*const title = req.params.title;
    let foundBooks = [];
    for (let id in books) {
        if (books[id].title === title) {
            foundBooks.push(books[id]);
        }
    }
    res.send(JSON.stringify(foundBooks))*/
    const title = req.params.title;
    const bookByTitle = new Promise((resolve,reject)=>{
        let foundBooks2 = [];
        for (let id in books) {
            if (books[id].title === title) {
                foundBooks2.push(books[id]);
            }
        }
        try {
          resolve(foundBooks2);
        } catch(err) {
          reject(err)
        }
    });
    bookByTitle.then(
        (foundBooks2) => res.send(JSON.stringify(foundBooks2)),
        (err) => res.send("Error geeting book")
        );
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews) 
});

module.exports.general = public_users;
