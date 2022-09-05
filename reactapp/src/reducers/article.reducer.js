export default function (wishList = [], action) {
  if (action.type === "addArticle") {
    let wishListCopy = [...wishList];
    let checkList = wishListCopy.filter(
      (e) => e.title === action.article.title
    );
    if (checkList.length === 0) {
      wishListCopy.push(action.article);
    }

    return wishListCopy;
  } else if (action.type === "removeArticle") {
    let wishListCopy = [...wishList];
    return wishListCopy.filter((elt) => elt.title !== action.title);
  } else {
    return wishList;
  }
}
