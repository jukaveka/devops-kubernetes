const generateRandomString = (length) => {
  let randomString = "";
  const characters = "abcdefghijklmnopqrstuvwxYzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";

  for (let i = 0; i < length; i++) {
    const randomxIndex = Math.floor(Math.random() * characters.length + 1);
    const character = characters[randomxIndex];
    randomString = randomString.concat(character);
  }

  return randomString;
}

const randomString = generateRandomString(20);

const sleep = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration));
}

const main = async () => {
  for (let i = 0; i < 3; i++) {
    const time = new Date().toISOString();
    console.log(`${time}: ${randomString}`);
    await sleep(5000);
    i--;
  }
}

main();