import aNightAtTheOpera from "../assets/portadas/a-night-at-the-opera.png";
import afterHours from "../assets/portadas/after-hours.png";
import cancionAnimal from "../assets/portadas/cancion-animal.png";
import dookie from "../assets/portadas/dookie.png";
import forLackOfABetterName from "../assets/portadas/for-lack-of-a-better-name.png";
import goteo from "../assets/portadas/goteo.png";
import homenajeAVioletaParra from "../assets/portadas/homenaje-a-violeta-parra.png";
import randomAccessMemories from "../assets/portadas/random-access-memories.png";
import timeOut from "../assets/portadas/time-out.png";
import unVeranoSinTi from "../assets/portadas/un-verano-sin-ti.png";
import type { Song } from "../types";

export const seedSongs: Song[] = [
  {
    id: "bohemian-rhapsody",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    genre: "Rock",
    cover: aNightAtTheOpera,
  },
  {
    id: "de-musica-ligera",
    title: "De Música Ligera",
    artist: "Soda Stereo",
    album: "Canción Animal",
    genre: "Rock",
    cover: cancionAnimal,
  },
  {
    id: "basket-case",
    title: "Basket Case",
    artist: "Green Day",
    album: "Dookie",
    genre: "Punk rock",
    cover: dookie,
  },
  {
    id: "blinding-lights",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Pop",
    cover: afterHours,
  },
  {
    id: "take-five",
    title: "Take Five",
    artist: "The Dave Brubeck Quartet",
    album: "Time Out",
    genre: "Jazz",
    cover: timeOut,
  },
  {
    id: "get-lucky",
    title: "Get Lucky",
    artist: "Daft Punk",
    album: "Random Access Memories",
    genre: "Electrónica",
    cover: randomAccessMemories,
  },
  {
    id: "ghosts-n-stuff",
    title: "Ghosts 'n' Stuff",
    artist: "deadmau5",
    album: "For Lack of a Better Name",
    genre: "Electrónica",
    cover: forLackOfABetterName,
  },
  {
    id: "goteo",
    title: "Goteo",
    artist: "Duki",
    album: "Goteo",
    genre: "Trap",
    cover: goteo,
  },
  {
    id: "me-porto-bonito",
    title: "Me Porto Bonito",
    artist: "Bad Bunny",
    album: "Un Verano Sin Ti",
    genre: "Reggaetón",
    cover: unVeranoSinTi,
  },
  {
    id: "gracias-a-la-vida",
    title: "Gracias a la vida",
    artist: "Violeta Parra",
    album: "Homenaje a Violeta Parra",
    genre: "Folclore",
    cover: homenajeAVioletaParra,
  },
];