import React from 'react'
import "./Section2.css"
import Uploaded from "../images/shopic_logo.png"


function Section2(){

    
    return(<div>
        <div className="block">
            <img src={Uploaded} className="selectedImage" alt="testing"></img>
            <h2 className="itemsDetected">Clothing items detected!</h2>
            <h1 className="selectItems">Select the item for which you'd like to shop</h1>

        </div>
    </div>)
}

export default Section2

