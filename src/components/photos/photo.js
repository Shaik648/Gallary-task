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
      arrayLength: imageDownLoad.length,
      // isChecked: false,
      keyGen: []
    };
    this.imageChange = this.imageChange.bind(this);
    this.fileDownloadHandler = this.fileDownloadHandler.bind(this);
    this.cancel = this.cancel.bind(this);
    console.log("dataMatter", this.props);
  }

  //   updateStateList(e, value){
  //     console.log(e.target.checked)
  //     if (e.target.checked){
  //       //append to array
  //       this.setState({
  //         keyGen: this.state.keyGen.concat([value])
  //       })
  //     } else {
  //       //remove from array
  //       this.setState({
  //         keyGen : this.state.keyGen.filter(function(val) {return val!==value})
  //       })
  //    }
  // }

  // Checkbox add and remove

  imageChange = (e, pic) => {
    console.log("pic", pic);
    if (imageDownLoad.includes(pic)) {
      // this.setState({
      //   isChecked: !this.state.isChecked
      // });
      let x = imageDownLoad.indexOf(pic);

      imageDownLoad.splice(x, 1);
    } else if (e.target.checked) {
      imageDownLoad.push(pic);
    }

    console.log("dataMatter---", imageDownLoad);
  };
  // Cancel Button Function
  cancel = () => {
    let x = imageDownLoad.lastIndexOf(1);
    imageDownLoad.splice(x, 1);
    console.log("dataMatter---", imageDownLoad);
  };

  // File Downlaod Function

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
        {this.state.imageGallary ? (
          this.state.imageGallary.map((items, i) => (
            <div>
              <img key={items} src={items.url} />
              <input
                className="checkbox"
                type="checkbox"
                onChange={(e) => this.imageChange(e, items.url)}
              />
            </div>
          ))
        ) : (
          <p style={{ color: "red", fontSize: "18px" }}>
            No related Images Found{" "}
          </p>
        )}
        <div>
          <button onClick={() => this.fileDownloadHandler(imageDownLoad)}>
            DownLoad
          </button>
          <button onClick={() => this.cancel()}>Cancel</button>
        </div>
      </div>
    );
  }
}
