import React from 'react'
import "./Section2.css"
import Uploaded from "../images/shopic_logo.png"
import Dropdown from "../Components/Dropdown"

function Section2({ image, setImage, dropDownItems, setGalleryImages, ...props }) {


    const onDropDownSelect = async (id, filename) => {
        let f = 'data:image/jpeg;base64,'
        let response = await fetch('/predict', {
            method: 'POST',
            body: '',
            contentTransferEncoding: 'Base64'
        })

    }

    return (<div>
        <div className="block">
            <img src={Uploaded} className="selectedImage" alt="testing"></img>
            <h2 className="itemsDetected">Clothing items detected!</h2>
            <h1 className="selectItems">Select the item for which you'd like to shop</h1>
            <Dropdown dropDownItems={dropDownItems}
                onDropDownSelect={onDropDownSelect}></Dropdown>
        </div>
    </div>)
}

export default Section2

