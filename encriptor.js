const bcrypt = require('bcrypt')
const readline = require('readline')

const saltRounds = 10

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a string to encrypt: ', (answer) => {
  hash = bcrypt.hashSync(answer, saltRounds);
  console.log(`Thank you for your valuable feedback: ${hash}`)

  rl.close()
})
