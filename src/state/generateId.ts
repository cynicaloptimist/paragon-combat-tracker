export function generateId(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const length = 10;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
