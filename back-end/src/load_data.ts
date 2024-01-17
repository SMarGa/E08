import { app } from "./app.js";
import { Book, BookDocumentInterface } from "./models/book.js";
import request from "supertest";

const response = await Book.deleteMany();

console.log(response);

const book_1984 = {
  id: 11,
  description: "1984 es la antiutopía o distopía más célebre de todas cuantas fueron escritas durante la primera mitad del siglo XX. En ella, Orwell presenta un futuro en el que una dictadura totalitaria interfiere hasta tal punto en la vida privada de los ciudadanos que resulta imposible escapar a su control.",
  book_name: "1984",
  author: "George Orwell",
  genres: [" a ", " a "],
  release_year: 1949,
  editorial: "DEBOLSILLO",
  bookcover: "1984_bookcover.jpg",
};

const book_Alicia = {
  id: 12,
  description:
    "Alicia es una niña que ve a un conejo trajeado que consulta un reloj de bolsillo y parece que va con prisa. Intrigada, lo sigue y cae por un agujero. Su caída la llevará a un mundo fantástico y extraño, en el cual nada parece desentonar: un gato que aparece y desaparece, setas y bebidas de efectos curiosísimos, una reina absolutamente cruel... una tropa de personajes estrafalarios para llenar un país de maravillas.",
  book_name: "Alicia en el País de las Maravillas",
  author: "Lewis Carroll",
  genres: [" a ", " a "],
  release_year: 1865,
  editorial: "Gibraudo",
  bookcover: "Alicia_bookcover.jpg",
};

const book_AnaFrank = {
  id: 13,
  description: "aaa",
  book_name: "Diario de Ana Frank",
  author: "Ana Frank",
  genres: [" a ", " a "],
  release_year: 1949,
  editorial: "Publimexi",
  bookcover: "AnaFrank_bookcover.jpg",
};

const book_CodigoDaVinci = {
  id: 14,
  description: "aaa",
  book_name: "El Codigo Da Vinci",
  author: "Dan Brown",
  genres: [" a ", " a "],
  release_year: 2003,
  editorial: "Planeta Internacional",
  bookcover: "CodigoDaVinci_bookcover.jpg",
};

const book_ElPrincipito = {
  id: 15,
  description: "aaa",
  book_name: "El Principito",
  author: "Antoine de Saint-Exupéry",
  genres: [" a ", " a "],
  release_year: 1943,
  editorial: "Salamandra",
  bookcover: "ElPrincipito_bookcover.jpg",
};

const book_Hobbit = {
  id: 16,
  description: "aaa",
  book_name: "El Hobbit",
  author: "J.R.R Tolkein",
  genres: [" a ", " a "],
  release_year: 1937,
  editorial: "Minotauro",
  bookcover: "Hobbit_bookcover.jpg",
};

const book_MobyDick = {
  id: 17,
  description: "aaa",
  book_name: "Moby Dick",
  author: "Herman Melville",
  genres: [" a ", " a "],
  release_year: 1851,
  editorial: "Alianza editorial",
  bookcover: "MobyDick_bookcover.jpeg",
};

const book_SombraHueso = {
  id: 18,
  description: "aaa",
  book_name: "Sombra y Hueso",
  author: "Leigh Bardugo",
  genres: [" a ", " a "],
  release_year: 2012,
  editorial: "Hidra",
  bookcover: "SombraHueso_bookcover.jpg",
};

const book_TodoLoQNuncaFuimos = {
  id: 19,
  description: "aaa",
  book_name: "Todo lo que nunca fuimos",
  author: "Alice Kellen",
  genres: [" a ", " a "],
  release_year: 2019,
  editorial: "Planeta",
  bookcover: "TodoLoQNuncaFuimos_bookcover.jpg",
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
