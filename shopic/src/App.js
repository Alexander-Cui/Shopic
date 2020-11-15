
import './App.css';
import MainText from "./Components/mainText";
import SubmitPic from "./Components/SubmitPic"
import Homepage from "./images/homepage.jpg"
import Section2 from "./Components/Section2"
import {Link, animateScroll as scroll} from "react-scroll"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import 'antd/dist/antd.css'


function App() {

  return (
    <div className="App">
        <h3 className="title"> SHOPIC</h3>
        <MainText/>
        
        
        <SubmitPic></SubmitPic>
        <img src={Homepage} className="homepage_pic"></img>
        <div><Section2></Section2></div>
    </div>
  );
}

export default App;
