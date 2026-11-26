import bohemianRhapsody from "../assets/portadas/bohemian-rhapsody.jpg";
import hotelCalifornia from "../assets/portadas/hotel-california.jpg";
import deMusicaLigera from "../assets/portadas/de-musica-ligera.jpg";
import flaca from "../assets/portadas/flaca.jpg";
import billieJean from "../assets/portadas/billie-jean.jpg";
import blindingLights from "../assets/portadas/blinding-lights.jpg";
import shapeOfYou from "../assets/portadas/shape-of-you.jpg";
import getLucky from "../assets/portadas/get-lucky.jpg";
import strobe from "../assets/portadas/strobe.jpg";
import takeFive from "../assets/portadas/take-five.jpg";
import basketCase from "../assets/portadas/basket-case.jpg";
import titiMePregunto from "../assets/portadas/titi-me-pregunto.jpg";
import goteo from "../assets/portadas/goteo.jpg";
import milHoras from "../assets/portadas/mil-horas.jpg";
import graciasALaVida from "../assets/portadas/gracias-a-la-vida.jpg";

import type { Song, User } from "../types";

export const seedSongs: Song[] = [
  {
    id: "bohemian-rhapsody",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    year: 1975,
    genre: "Rock",
    cover: bohemianRhapsody,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "hotel-california",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    year: 1976,
    genre: "Rock",
    cover: hotelCalifornia,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "de-musica-ligera",
    title: "De Música Ligera",
    artist: "Soda Stereo",
    album: "Canción Animal",
    year: 1990,
    genre: "Rock nacional",
    cover: deMusicaLigera,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "mil-horas",
    title: "Mil horas",
    artist: "Los Abuelos de la Nada",
    album: "Vasos y besos",
    year: 1983,
    genre: "Rock nacional",
    cover: milHoras,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "flaca",
    title: "Flaca",
    artist: "Andrés Calamaro",
    album: "Alta Suciedad",
    year: 1997,
    genre: "Rock nacional",
    cover: flaca,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "billie-jean",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    year: 1982,
    genre: "Pop",
    cover: billieJean,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "blinding-lights",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    year: 2020,
    genre: "Pop",
    cover: blindingLights,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "shape-of-you",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    year: 2017,
    genre: "Pop",
    cover: shapeOfYou,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "get-lucky",
    title: "Get Lucky",
    artist: "Daft Punk",
    album: "Random Access Memories",
    year: 2013,
    genre: "Electrónica",
    cover: getLucky,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "strobe",
    title: "Strobe",
    artist: "deadmau5",
    album: "For Lack of a Better Name",
    year: 2009,
    genre: "Electrónica",
    cover: strobe,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "take-five",
    title: "Take Five",
    artist: "The Dave Brubeck Quartet",
    album: "Time Out",
    year: 1959,
    genre: "Jazz",
    cover: takeFive,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "basket-case",
    title: "Basket Case",
    artist: "Green Day",
    album: "Dookie",
    year: 1994,
    genre: "Punk",
    cover: basketCase,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "gracias-a-la-vida",
    title: "Gracias a la vida",
    artist: "Mercedes Sosa",
    album: "Gracias a la vida",
    year: 1971,
    genre: "Folklore",
    cover: graciasALaVida,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "titi-me-pregunto",
    title: "Tití Me Preguntó",
    artist: "Bad Bunny",
    album: "Un Verano Sin Ti",
    year: 2022,
    genre: "Reggaetón",
    cover: titiMePregunto,
    audioUrl: "",
    duration: 0,
  },
  {
    id: "goteo",
    title: "Goteo",
    artist: "Duki",
    album: "Goteo (single)",
    year: 2019,
    genre: "Trap",
    cover: goteo,
    audioUrl: "",
    duration: 0,
  },
];

export const seedUsers: User[] = [
  {
    id: "admin-sonora",
    name: "Administrador",
    email: "admin@sonora.com",
    password: "admin123",
    role: "admin",
  },
];
