import React, { Component } from "react";
import BlogCreator from "./BlogCreator";
import { connect } from "react-redux";
import RenderEntries from "./RenderEntries";
import "../css/mainPage.css";

class MainPage extends Component {
  render() {
    const { blogs } = this.props.blogs;
    return (
      <div className="wrapper">
        <BlogCreator />
        <RenderEntries blogs={blogs} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    blogs: state.blog
  };
};

export default connect(mapStateToProps)(MainPage);
