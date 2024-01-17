import { app } from "./app.js";
import { Book, BookDocumentInterface } from "./models/book.js";
import request from "supertest";

const book_1984 = {
  id: 11,
  description: "1984 es la antiutopía o distopía más célebre de todas cuantas fueron escritas durante la primera mitad del siglo XX. En ella, Orwell presenta un futuro en el que una dictadura totalitaria interfiere hasta tal punto en la vida privada de los ciudadanos que resulta imposible escapar a su control.",
  book_name: "1984",
  author: "George Orwell",
  genres: [" a ", " a "],
  release_year: 1949,
  editorial: "DEBOLSILLO",
  bookcover: "../src/assets/bookcovers/1984_bookcover.jpg",
};

const book_Alicia = {
  id: 12,
  description: "aaa",
  book_name: "Alicia en el País de las Maravillas",
  author: "Lewis Carroll",
  genres: [" a ", " a "],
  release_year: 1865,
  editorial: "Gibraudo",
  bookcover: "../src/assets/bookcovers/Alicia_bookcover.jpg",
};

const book_AnaFrank = {
  id: 13,
  description: "aaa",
  book_name: "1947",
  author: "Ana Frank",
  genres: [" a ", " a "],
  release_year: 1949,
  editorial: "Publimexi",
  bookcover: "../src/assets/bookcovers/AnaFrank_bookcover.jpg",
};

const book_CodigoDaVinci = {
  id: 14,
  description: "aaa",
  book_name: "El Codigo Da Vinci",
  author: "Dan Brown",
  genres: [" a ", " a "],
  release_year: 2003,
  editorial: "Planeta Internacional",
  bookcover: "../src/assets/bookcovers/CodigoDaVinci_bookcover.jpg",
};

const book_ElPrincipito = {
  id: 15,
  description: "aaa",
  book_name: "El Principito",
  author: "Antoine de Saint-Exupéry",
  genres: [" a ", " a "],
  release_year: 1943,
  editorial: "Salamandra",
  bookcover: "../src/assets/bookcovers/ElPrincipito_bookcover.jpg",
};

const book_Hobbit = {
  id: 16,
  description: "aaa",
  book_name: "El Hobbit",
  author: "J.R.R Tolkein",
  genres: [" a ", " a "],
  release_year: 1937,
  editorial: "Minotauro",
  bookcover: "../src/assets/bookcovers/Hobbit_bookcover.jpg",
};

const book_MobyDick = {
  id: 17,
  description: "aaa",
  book_name: "Moby Dick",
  author: "Herman Melville",
  genres: [" a ", " a "],
  release_year: 1851,
  editorial: "Alianza editorial",
  bookcover: "../src/assets/bookcovers/MobyDick_bookcover.jpeg",
};

const book_SombraHueso = {
  id: 18,
  description: "aaa",
  book_name: "Sombra y Hueso",
  author: "Leigh Bardugo",
  genres: [" a ", " a "],
  release_year: 2012,
  editorial: "Hidra",
  bookcover: "../src/assets/bookcovers/SombraHueso_bookcover.jpg",
};

const book_TodoLoQNuncaFuimos = {
  id: 19,
  description: "aaa",
  book_name: "Todo lo que nunca fuimos",
  author: "Alice Kellen",
  genres: [" a ", " a "],
  release_year: 2019,
  editorial: "Planeta",
  bookcover: "../src/assets/bookcovers/TodoLoQNuncaFuimos_bookcover.jpg",
};

const books = [
  { ...book_1984 },
  { ...book_Alicia },
  { ...book_AnaFrank },
  { ...book_CodigoDaVinci },
  { ...book_ElPrincipito },
  { ...book_Hobbit },
  { ...book_MobyDick },
  { ...book_SombraHueso },
  { ...book_TodoLoQNuncaFuimos },
];

books.forEach(async (book) => {
  await request(app).post("/books").send(book);
});
