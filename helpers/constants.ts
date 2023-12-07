const bookNotFoundMessages = [
  "We've searched far and wide, but it's official: this book is a rebel and won't be found on Google Books! 📚🔍💥\n",
  "This book is as elusive as a ninja in the night. It's not in the database and never will be! 📖🥷🚫\n",
  "We've consulted with the panda oracle, and it's clear: this book is on a mission to stay hidden from Google Books forever! 🐼🔮🔒\n",
  "Sorry, but even our tech-savvy pandas couldn't locate this book. It's officially off the grid! 📚🐼💻\n",
  "We've asked every panda in the library, and they agree: this book is a mystery waiting to be solved...or not! 📚🕵️‍♀️🚫\n",
];

const libraryIsLoadingMessages = [
  "Take a deep breath and channel your inner panda wisdom while we fetch your books.",
  "Close your eyes and imagine a bamboo forest. We'll have the library waiting when you open them.",
  "While you wait, our library pandas are practicing their martial arts. They'll be back with your books soon!",
  "It's panda meditation time! Let's all zen out while the library loads.",
  "Did you know pandas spend most of their day relaxing? So can you while the library is being prepared.",
];

export const BACKGROUND = [
  require('@assets/bg01.jpeg'),
  require('@assets/bg05.jpeg'),
  require('@assets/bg06.jpeg'),
  require('@assets/bg07.jpeg'),
  require('@assets/bg10.jpeg'),
  require('@assets/bg11.jpeg'),
  require('@assets/bg14.jpeg'),
  require('@assets/bg13.jpeg'),
  require('@assets/bg_02.png'),
]

// export const LANGUAGES = [
//   {'label': "EN", 'value': 'EN'},
//   {'label': "NL", 'value': 'NL'},
//   {'label': "PL", 'value': 'PL'},
//   {'label': "ES", 'value': 'ES'}
// ];

export const LANGUAGES = [
  "EN", "NL", "PL", "ES"
];

export const CATEGORY_IMAGES = [
  { id: 'img1', source: require("@assets/series.png") },
  { id: 'img2', source: require("@assets/world.png") },
  { id: 'img3', source: require("@assets/handover.png") },
  { id: 'img4', source: require("@assets/gift-box.png") },
  { id: 'img5', source: require("@assets/genre.png") },
  { id: 'img6', source: require("@assets/glasses.png") },
  { id: 'img7', source: require("@assets/language.png") },
  { id: 'img8', source: require("@assets/openbook.png") },
  { id: 'img9', source: require("@assets/reader.png") },
  { id: 'img10', source: require("@assets/science.png") },
  { id: 'img11', source: require("@assets/tech.png") },
  { id: 'img12', source: require("@assets/wizard.png") },
  { id: 'img13', source: require("@assets/knight.png") },
  { id: 'img14', source: require("@assets/writing.png") },
  { id: 'img15', source: require("@assets/magician.png") },
  { id: 'img16', source: require("@assets/science-fiction.png") },
  { id: 'img17', source: require("@assets/feather.png") },
  { id: 'img18', source: require("@assets/open-book.png") },
  { id: 'img19', source: require("@assets/library-books.png") },
  { id: 'img20', source: require("@assets/married.png") },
  { id: 'img21', source: require("@assets/jester.png") },


]

export const randomBookNotFoundMessage = bookNotFoundMessages[Math.floor(Math.random() * bookNotFoundMessages.length)];

export const randomLibraryIsLoadingMessage =  libraryIsLoadingMessages[Math.floor(Math.random() * libraryIsLoadingMessages.length)];

// BookItem and library constants
export const SPACING = 1;
export const ITEM_HEIGHT = 95;
export const SECTION_ITEM_HEIGHT = 26;
export const HEADER_HEIGHT = 222;
