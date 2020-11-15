
import '../App.css';
import MainText from "./mainText";
import SubmitPic from "./SubmitPic"
import Homepage from "../images/homepage.jpg"
import "./Index.css"
import 'antd/dist/antd.css'
import Section2 from "./Section2"
import { Link, animateScroll as scroll } from "react-scroll"
import AnchorLink from 'react-anchor-link-smooth-scroll'

function Index({ setDropDownItems, ...props }) {

    let test_object = { '3': 'sweater', '4': 'cardigan', '7': 'pants' }
    return (
        <div className="App">
            <h3 className="title"> SHOPIC</h3>
            <MainText />

            <img src={Homepage} className="homepage_pic"></img>
            <SubmitPic setDropDownItems={setDropDownItems} id="dragdrop"></SubmitPic>
        </div>
    );
}

export default Index;