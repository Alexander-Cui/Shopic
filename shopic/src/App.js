
import './App.css';
import MainText from "./Components/mainText";
import SubmitPic from "./Components/SubmitPic"
import Homepage from "./images/homepage.jpg"

function App() {
  return (
    <div className="App">
        <h3 className="title"> SHOPIC</h3>
        <MainText/>
        <SubmitPic></SubmitPic>
        <img src={Homepage} className="homepage_pic"></img>
    </div>
  );
}

export default App;
