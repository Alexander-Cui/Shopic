import React from 'react'
import "./SubmitPic.css"

function SubmitPic (){
    return (
        <div>
            <form>
                <input className="textForm" type="text"/>
                <input className="chooseFileForm" type="file"/>

            </form>
        </div>
    )
}
export default SubmitPic