var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var uid2 = require("uid2");
var userModel = require("../models/users");
const wishModel = require("../models/wish");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Backend morningNews" });
});

router.post("/sign-up", async function (req, res, next) {
  let result = false;
  let checkUser = await userModel.findOne({ email: req.body.emailFromFront });
  var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);

  if (
    !checkUser &&
    req.body.emailFromFront &&
    req.body.usernameFromFront &&
    req.body.passwordFromFront
  ) {
    let newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      token: uid2(32),
      password: hash,
    });
    // console.log(newUser);
    let userSaved = await newUser.save();

    result = true;
    res.json({ result: true, token: userSaved.token });
  } else {
    res.json({ result: false });
  }
});

router.post("/sign-in", async function (req, res, next) {
  let result = false;
  let checkUser = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (
    checkUser &&
    bcrypt.compareSync(req.body.passwordFromFront, checkUser.password)
  ) {
    res.json({ result: true, token: checkUser.token });
  } else {
    res.json({ result: false });
  }
});

router.post("/addArticleToData", async function (req, res, next) {
  let checkUser = await userModel
    .findOne({ token: req.body.token })
    .populate("wishList")
    .exec();

  let checkWishesInData = await wishModel.find({ title: req.body.title });
  let filmCheck = checkUser.wishList.filter((e) => e.title == req.body.title);

  // console.log(checkWishesInData);
  if (filmCheck.length === 0 && checkWishesInData.length === 0) {
    let newWish = new wishModel({
      title: req.body.title,
      img: req.body.img,
      desc: req.body.desc,
    });

    newWish = await newWish.save();
    // console.log(checkUser.wishList);

    let addWish = checkUser.wishList;
    addWish.push(newWish.id);

    await userModel.updateOne({ token: req.body.token }, { wishList: addWish });

    res.json({ result: "Article saved in WishList and Data" });
  } else if (filmCheck.length === 0 && checkWishesInData.length > 0) {
    let addData = checkUser.wishList;
    console.log(checkWishesInData[0].id);
    addData.push(checkWishesInData[0].id);
    await userModel.updateOne({ token: req.body.token }, { wishList: addData });
    res.json({ result: "Article saved in WishList" });
  } else {
    res.json({ result: "Article already in WishList" });
  }
});

router.get("/wishlist", async function (req, res, next) {
  let checkUser = await userModel
    .findOne({ token: req.query.token })
    .populate("wishList")
    .exec();

  let wishListData = checkUser.wishList;

  res.json(wishListData);
});

router.post("/deleteArticleFromData", async function (req, res, next) {
  let checkUser = await userModel
    .findOne({ token: req.body.token })
    .populate("wishList")
    .exec();

  let wishListData = checkUser.wishList;
  let newWishList = wishListData.filter((e) => e.title !== req.body.title);
  await userModel.updateOne(
    { token: req.body.token },
    { wishList: newWishList }
  );
  res.json({ result: "Suppr OK!" });
});

module.exports = router;
