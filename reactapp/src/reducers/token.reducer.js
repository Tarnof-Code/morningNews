export default function (token = "aucun token", action) {
  if (action.type === "addToken") {
    return action.token;
  } else {
    return token;
  }
}
