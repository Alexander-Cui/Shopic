import "./GalleryPage.css"
import Uploaded from "../images/homepage.jpg"
import Icon from "../images/shopic_logo.png"

const GalleryPage = ({ galleryImages, ...props }) => {
    const first_three = galleryImages.slice(0, 3)
    console.log(first_three)
    return (
        <div>
            <h2 className="title" > SHOPIC</h2>
            <div className="iconContainer">
                {first_three.map(path => {
                    return (

                        <img src={`/img/${path}.jpg`} alt="hello" className="itemIcon" />

                    )
                })}
            </div>
            <img src={Icon} className="icon"></img>
        </div>
    )
}
export default GalleryPage