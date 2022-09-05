import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";
import Banner from "./Banner";
import { connect } from "react-redux";

function ScreenSource(props) {
  const [sourceList, setSourceList] = useState([]);

  // let api1 = "577218c72ab641ef90fc6ef156479b91";
  // let api2 = "e4b22287187447cda83c3d990ca3780f";
  // let api3 = "2ec06aa1f4ff4dae9291a3ab2367d53f";
  // let api4 = "02a13b808b4e40cb9e007762be60c017";
  // let api4 = 1172db39d9a446b9a123cc4e5578144a;
  let tempLang;

  if (props.language === "en") {
    tempLang = ["gb", "en"];
  } else if (props.language === "fr") {
    tempLang = ["fr", "fr"];
  }

  useEffect(() => {
    async function loadSource() {
      let bruteResponse = await fetch(
        `https://newsapi.org/v2/top-headlines/sources?country=${tempLang[0]}&language=${tempLang[1]}&apiKey=577218c72ab641ef90fc6ef156479b91`
      );
      let jsonResponse = await bruteResponse.json();

      setSourceList(jsonResponse.sources);
    }
    loadSource();
  }, [tempLang]);

  return (
    <div>
      <Nav />

      <Banner />

      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src={"https://logo.clearbit.com/" + item.url} />
                }
                title={
                  <Link to={"/screenarticlesbysource/" + item.id}>
                    {item.id}
                  </Link>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return { language: state.language };
}

export default connect(mapStateToProps, null)(ScreenSource);
