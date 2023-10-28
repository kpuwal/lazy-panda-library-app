const bookNotFoundMessages = [
  "🐼 We've searched far and wide, but it's official: this book is a rebel and won't be found on Google Books! 📚🔍💥",
  "🐼 This book is as elusive as a ninja in the night. It's not in the database and never will be! 📖🥷🚫",
  "🐼 We've consulted with the panda oracle, and it's clear: this book is on a mission to stay hidden from Google Books forever! 🐼🔮🔒",
  "🐼 Sorry, but even our tech-savvy pandas couldn't locate this book. It's officially off the grid! 📚🐼💻",
  "🐼 We've asked every panda in the library, and they agree: this book is a mystery waiting to be solved...or not! 📚🕵️‍♀️🚫",
];

const libraryIsLoadingMessages = [
  "Take a deep breath and channel your inner panda wisdom while we fetch your books.",
  "Close your eyes and imagine a bamboo forest. We'll have your books waiting when you open them.",
  "While you wait, our library pandas are practicing their martial arts. They'll be back with your books soon!",
  "It's panda meditation time! Let's all zen out while your library loads.",
  "Did you know pandas spend most of their day relaxing? So can you while we prepare your library.",
];

export const BACKGROUND = [
  require('./../assets/bg01.jpeg'),
  require('./../assets/bg02.jpeg'),
  require('./../assets/bg05.jpeg'),
  require('./../assets/bg06.jpeg'),
  require('./../assets/bg07.jpeg'),
  require('./../assets/bg10.jpeg'),
  require('./../assets/bg11.jpeg'),
  require('./../assets/bg13.jpeg'),
]

export const LANGUAGES = [
  {'label': "EN", 'value': 'EN'},
  {'label': "NL", 'value': 'NL'},
  {'label': "PL", 'value': 'PL'},
  {'label': "ES", 'value': 'ES'}
];

export const randomBookNotFoundMessage = bookNotFoundMessages[Math.floor(Math.random() * bookNotFoundMessages.length)];

export const randomLibraryIsLoadingMessage =  libraryIsLoadingMessages[Math.floor(Math.random() * libraryIsLoadingMessages.length)];