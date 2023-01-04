import { v4 as uuidv4 } from "uuid";

const names = [
  "Aaran",
  "Abracham",
  "Aleksander",
  "Bermot",
  "Derin",
  "Derren",
  "Diana",
  "Momooreoluwa",
  "Montague",
  "Montgomery",
  "Monty",
  "Moore",
  "Naomi",
  "Paul",
  "Vanessa",
  "Julia",
  "Zoye"
];

const hobbies = [
  "Acting",
  "Baton twirling",
  "Board games",
  "Book restoration",
  "Cabaret",
  "Calligraphy",
  "Candle making",
  "Computer programming",
  "Coffee roasting",
  "Cooking",
  "Colouring",
  "Cosplaying",
  "Couponing",
  "Creative writing",
  "Crocheting",
  "Cryptography",
  "Dance",
  "Digital arts",
  "Drama",
  "Drawing",
  "Do it yourself",
  "Electronics",
  "Embroidery",
  "Reading",
  "Scrapbooking",
  "Sculpting",
  "Sewing",
  "Singing",
  "Sketching",
  "Soapmaking",
  "Sports",
  "Stand-up comedy",
  "Sudoku",
];

export const users = [];

export const generateUsersArray = async (start, finish) => {
  for (let i = start; i <= finish; i++) {
    users.push({
      id: uuidv4(),
      username: names[getRandomInt(0, names.length)],
      age: getRandomInt(16, 80),
      hobbies: searchRandom(5, hobbies),
    });
  }
  return users
};

function searchRandom(count, arr) {
  let answer = [];
  let counter = 0;

  while (counter < count) {
    let rand = arr[Math.floor(Math.random() * arr.length)];
    if (!answer.some((an) => an === rand)) {
      answer.push(rand);
      counter++;
    }
  }

  return answer;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
