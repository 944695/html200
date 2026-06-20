const suits = ["Clubs", "Diamonds", "Hearts", "Spades"]
const faces = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"]
const deck = [suits, faces]

for(suit of deck[0])
  for(face of deck[1])
    console.log(`${face} of ${suit}`)