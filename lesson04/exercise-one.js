let animals = ["dogs", "cats", "frogs", "birds", "horses", "goats", "donkeys"]

console.log()

for(animal of animals)
  console.log(animal)

console.log()

animals.push("rabbits")

for(animal of animals)
  console.log(animal)

console.log()

animals.splice(2, 1)

for(animal of animals)
  console.log(animal)

console.log()

animals = animals.join(",")

console.log(animals)