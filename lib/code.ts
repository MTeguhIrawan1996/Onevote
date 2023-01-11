export const code = (length: number) => {
  var result = "";
  var characters = "ABCDEFGHIZKLMNOPQRSTUVWKYZ0123456789";
  var charactersLength = characters.length;

  for (var index = 0; index < length; index++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
