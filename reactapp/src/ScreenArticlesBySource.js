import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  var { id } = useParams();
  const [articleList, setArticleList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showArticle, setShowArticle] = useState({});

  const showModal = (name, desc) => {
    setIsModalVisible(true);
    setShowArticle({ name, desc });
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // let api1 = "577218c72ab641ef90fc6ef156479b91";
  // let api2 = "e4b22287187447cda83c3d990ca3780f";
  // let api3 = "2ec06aa1f4ff4dae9291a3ab2367d53f";
  // let api4 = "02a13b808b4e40cb9e007762be60c017";
  // let api4 = 1172db39d9a446b9a123cc4e5578144a;

  useEffect(() => {
    async function loadArticle() {
      let bruteResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=e4b22287187447cda83c3d990ca3780f`
      );
      let jsonResponse = await bruteResponse.json();

      setArticleList(jsonResponse.articles);
    }
    loadArticle();
  });

  var handleClickAddArticle = (title, img, desc, token) => {
    async function addArticle() {
      console.log(props.token);
      await fetch("/addArticleToData", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `title=${title}&img=${img}&desc=${desc}&token=${token}`,
      });
    }

    addArticle();
  };

  let cardMap = articleList.map((elt) => (
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
        cover={<img alt={elt.title} src={elt.urlToImage} />}
        actions={[
          <Icon
            type="read"
            key="ellipsis2"
            onClick={() => showModal(elt.title, elt.description)}
          />,
          <Icon
            onClick={
              () =>
                handleClickAddArticle(
                  elt.title,
                  elt.urlToImage,
                  elt.description,
                  props.token
                )
              // props.addToWishList(elt.title, elt.description, elt.urlToImage)
            }
            type="like"
            key="ellipsis"
          />,
        ]}
      >
        <Meta title={elt.title} description={elt.description} />
      </Card>
      <Modal
        title={showArticle.name}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{showArticle.desc}</p>
      </Modal>
    </div>
  ));

  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="Card 3">{cardMap}</div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (title, description, img) {
      dispatch({
        type: "addArticle",
        article: { title: title, description: description, img: img },
      });
    },
  };
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
