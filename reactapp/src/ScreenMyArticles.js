import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Card, Icon } from "antd";
import Nav from "./Nav";

const { Meta } = Card;

function ScreenMyArticles(props) {
  const [wishListArticles, setWishListArticles] = useState([]);
  useEffect(() => {
    async function loadWishList() {
      let brutResponse = await fetch(`/wishlist/?token=${props.token}`);
      let jsonResponse = await brutResponse.json();
      console.log("boug", jsonResponse);
      setWishListArticles(jsonResponse);
    }
    loadWishList();
  }, [props.token]);

  var handleClickDelArticle = (token, title) => {
    async function delArticle() {
      await fetch("/deleteArticleFromData", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${token}&title=${title}`,
      });
    }
    delArticle();
    setWishListArticles(wishListArticles.filter((elt) => elt.title !== title));
  };

  let myArticles;
  if (wishListArticles.length === 0) {
    myArticles = (
      <p style={{ marginTop: "60px", fontSize: "30px" }}>No Articles</p>
    );
  } else {
    myArticles = wishListArticles.map((e) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            width: 300,
            margin: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          cover={<img alt="example" src={e.img} />}
          actions={[
            <Icon type="read" key="ellipsis2" />,
            <Icon
              onClick={() => handleClickDelArticle(props.token, e.title)}
              type="delete"
              key="ellipsis"
            />,
          ]}
        >
          <Meta title={e.title} description={e.description} />
        </Card>
      </div>
    ));
  }

  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="Card 3">{myArticles}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return { wishListToDisplay: state.wishList, token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromWishList: function (title) {
      dispatch({
        type: "removeArticle",
        title: title,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
