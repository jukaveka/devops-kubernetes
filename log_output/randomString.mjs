const generateRandomString = (length) => {
  let randomString = "";
  const characters = "abcdefghijklmnopqrstuvwxYzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor((Math.random() * characters.length + 1) - 1);
    const character = characters[randomIndex];
    randomString = randomString.concat(character);
  }

  return randomString;
};

const randomString = generateRandomString(20);

export default randomString;