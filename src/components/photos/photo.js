import React from "react";
import Observer from "react-intersection-observer";
const imageDownLoad = [];
export default class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.placeholderUrl = "//via.placeholder.com/350x350?text=loading";
    this.state = {
      // imageDownLoad: [],
      imageGallary: this.props.photos,
      visibility: false,
      indexValue: 0,
      isChecked: false
    };
    this.imageChange = this.imageChange.bind(this);
    this.fileDownloadHandler = this.fileDownloadHandler.bind(this);
    console.log("dataMatter", this.props);
  }

  imageChange = (pic) => {
    console.log("pic", pic);

    if (imageDownLoad.includes(pic)) {
      this.setState({
        isChecked: !this.state.isChecked
      });
      let x = imageDownLoad.indexOf(pic);
      //  alert(x)
      imageDownLoad.splice(x, 1);
    } else {
      imageDownLoad.push(pic);
    }

    console.log("dataMatter---", imageDownLoad);
  };

  fileDownloadHandler = async (pictures) => {
    console.log("picts", pictures);
    for (var i = 0; i < pictures.length; i++) {
      const response = await fetch(pictures[i]);
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "picture.jpeg";
        a.click();
      });
    }
  };

  render() {
    const { photo, onImageClick } = this.props;

    return (
      <div>
        {console.log("dataInside", this.state.imageGallary)}
        {this.state.imageGallary
          ? this.state.imageGallary.map((items) => (
              <div>
                <img key={items.id} src={items.url} />
                <input
                  type="checkbox"
                  checked={this.state.isChecked}
                  onChange={() => this.imageChange(items.url)}
                />
              </div>
            ))
          : ""}
        <div>
          <button onClick={() => this.fileDownloadHandler(imageDownLoad)}>
            DownLoad{" "}
          </button>
          <button
          // // onClick={() => this.fileDownloadHandler(imageDownLoad)}
          
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
