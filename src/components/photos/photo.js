import React from "react";
import Observer from "react-intersection-observer";

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.placeholderUrl = "//via.placeholder.com/350x350?text=loading";
    this.state = {
      imageDownLoad: [],
      visibility: false
    };
    this.imageChange = this.imageChange.bind(this);
  }

  componentDidMount(pic) {
    this.imageChange(pic);
  }

  imageChange = (pic) => {
    if (this.state.imageDownLoad.includes(pic)) {
      let x = this.state.imageDownLoad.indexOf(pic);
      this.setState({
        imageDownLoad: this.state.imageDownLoad.splice(x, 1)
      });
    } else {
      this.setState((prevState) => ({
        imageDownLoad: [...prevState.imageDownLoad, pic]
      }));
    }

    console.log("dataMatter", this.state.imageDownLoad, prevState);
  };

  render() {
    const { photo, onImageClick } = this.props;
    return (
      <div>
        <img src={photo.url} />
        <input type="checkbox" onChange={() => this.imageChange(photo.url)} />
      </div>
    );
  }
}
