import "./GalleryPage.css"
import Uploaded from "../images/homepage.jpg"
import Icon from "../images/shopic_logo.png"

const GalleryPage = ({ ...props }) => {
const images = ['./images/homepage.jpg', 'path2', Uploaded, Uploaded, Uploaded]

    return (
        <div>
            <h2 className="title" > SHOPIC</h2>
            <div className="iconContainer">
            {images.map(path => {
                return(
           
                    <img src={Uploaded} alt="hello" className="itemIcon"/>
    
                )
            })}
            </div>
            <img src={Icon} className="icon"></img>
        </div>
    )
}
export default GalleryPage