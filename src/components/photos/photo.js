import React from "react";
import Observer from "react-intersection-observer";

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.placeholderUrl = "//via.placeholder.com/350x350?text=loading";
    this.state = {
      // imageDownLoad: [],
      imageGallary: this.props.photos,
      visibility: false,
      indexValue: 0
    };
    // this.imageChange = this.imageChange.bind(this);
    console.log("dataMatter", this.props);
  }

  imageChange = (pic) => {
    var imageDownLoad = [];
    if (imageDownLoad.includes(pic)) {
      let x = imageDownLoad.indexOf(pic);
      alert(x);
      // imageDownLoad.splice(x, 1);
    } else {
      imageDownLoad.push(pic);
    }

    console.log("dataMatter---", imageDownLoad);
  };

  render() {
    const { photo, onImageClick } = this.props;

    return (
      <div>
        {console.log("dataInside", this.state.imageGallary)}
        {this.state.imageGallary.length > 0
          ? this.state.imageGallary.map((items) => (
              <div>
                <img key={items.id} src={items.url} />
                <input
                  type="checkbox"
                  onChange={() => this.imageChange(items.url)}
                />
              </div>
            ))
          : ""}
      </div>
    );
  }
}
