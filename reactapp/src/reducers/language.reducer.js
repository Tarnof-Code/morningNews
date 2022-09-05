export default function (language = "fr", action) {
  if (action.type === "english") {
    return "en";
  } else if (action.type === "french") {
    return "fr";
  } else {
    return language;
  }
}
