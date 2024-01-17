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
  genres: ["Distopía", "Ciencia ficción política"],
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
  genres: ["Literatura infantil", "Literatura fantástica"],
  release_year: 1865,
  editorial: "Gibraudo",
  bookcover: "Alicia_bookcover.jpg",
};

const book_AnaFrank = {
  id: 13,
  description: "El diario de Ana Frank recoge las vivencias de Ana Frank durante los años 1942 y 1944, tiempo que pasó escondida de los nazis con su familia alemana de origen judío en la ciudad de Ámsterdam. Se trata de una historia autobiográfica, escrita de su puño y letra.",
  book_name: "Diario de Ana Frank",
  author: "Ana Frank",
  genres: ["Diario Autobiográfico", "Literatura histórica"],
  release_year: 1949,
  editorial: "Publimexi",
  bookcover: "AnaFrank_bookcover.jpg",
};

const book_CodigoDaVinci = {
  id: 14,
  description: "Un asesinato en el Louvre y una serie de pistas en los cuadros de Leonardo conducen a un misterio que podría sacudir los cimientos del cristianismo.",
  book_name: "El Codigo Da Vinci",
  author: "Dan Brown",
  genres: ["Misterio", "Thriller conspirativo"],
  release_year: 2003,
  editorial: "Planeta Internacional",
  bookcover: "CodigoDaVinci_bookcover.jpg",
};

const book_ElPrincipito = {
  id: 15,
  description: "El Principito es una obra que narra las experiencias y reflexiones de un pequeño príncipe que viaja por diferentes planetas, explorando temas profundos como la amistad, el amor y la naturaleza humana.",
  book_name: "El Principito",
  author: "Antoine de Saint-Exupéry",
  genres: ["Fábula", "Literatura Infantil"],
  release_year: 1943,
  editorial: "Salamandra",
  bookcover: "ElPrincipito_bookcover.jpg",
};

const book_Hobbit = {
  id: 16,
  description: "Es la historia de Bilbo Bolsón, un hobbit que se embarca en una inesperada aventura para recuperar un tesoro guardado por el dragón Smaug, experimentando valentía y descubriendo un mundo de magia y criaturas fantásticas.",
  book_name: "El Hobbit",
  author: "J.R.R Tolkein",
  genres: ["Fantasía épica", "Aventura"],
  release_year: 1937,
  editorial: "Minotauro",
  bookcover: "Hobbit_bookcover.jpg",
};

const book_MobyDick = {
  id: 17,
  description: "Moby Dick es la epopeya marina que sigue al obsesionado capitán Ahab en su búsqueda vengativa del gigantesco cachalote blanco, Moby Dick, explorando temas como la obsesión, la naturaleza humana y la lucha contra fuerzas imponentes de la naturaleza.",
  book_name: "Moby Dick",
  author: "Herman Melville",
  genres: ["Aventuras marinas", "Literatura clásica"],
  release_year: 1851,
  editorial: "Alianza editorial",
  bookcover: "MobyDick_bookcover.jpeg",
};

const book_SombraHueso = {
  id: 18,
  description: "Novela que sigue a Alina Starkov, una cartógrafa militar, en su viaje a través de un mundo dividido por la Sombra, donde descubre un poder extraordinario que podría cambiar el destino de su nación, desentrañando intrigas políticas y enfrentándose a fuerzas oscuras.",
  book_name: "Sombra y Hueso",
  author: "Leigh Bardugo",
  genres: ["Fantasía oscura", "Literatura juvenil"],
  release_year: 2012,
  editorial: "Hidra",
  bookcover: "SombraHueso_bookcover.jpg",
};

const book_TodoLoQNuncaFuimos = {
  id: 19,
  description: "Es una historia que explora las complejidades del amor y la identidad, siguiendo a los personajes en su viaje de autodescubrimiento mientras enfrentan las expectativas sociales y luchan por ser fieles a sí mismos.",
  book_name: "Todo lo que nunca fuimos",
  author: "Alice Kellen",
  genres: ["Contemporánea", "Romance"],
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
