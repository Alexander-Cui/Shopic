import React from 'react'
import { useState } from 'react'
import "./Section2.css"
import Uploaded from "../images/preview.jpg"
import Dropdown from "../Components/Dropdown"
import { useHistory } from 'react-router-dom';
import { Button } from 'antd'
import { AnimatePresence, motion } from "framer-motion"

function Section2({ dropDownItems, setGalleryImages, ...props }) {
    let prefix = 'data:image/jpeg;base64,'
    const history = useHistory();

    let filename = dropDownItems['fileName']
    const [sideImage, setImage] = useState('')
    const [base_64, setbase64] = useState('')

    const onConfirm = async () => {

        try {
            let dataBody = {
                'base64': base_64
            }
            let response = await fetch('/predict', {
                method: 'POST',
                body: JSON.stringify(dataBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Transfer-Encoding': 'Base64'
                },
            });

            let data = await response.json()
            let status = await response.status
            if (status === 200) {
                let images = data['data'].map(obj => {
                    return (
                        obj['imageName'].split('/').pop()
                    )
                })
                setGalleryImages(images)
                history.push('/shop')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const onDropDownSelect = async (id) => {
        let data = {
            'filename': filename,
            'id': id
        }
        try {
            let response = await fetch('/segment', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Transfer-Encoding': 'Base64'
                },
            })

            let status = await response.status
            console.log('calling!')

            if (response.status === 200) {
                console.log('called!')
                let data = await response.json()
                let base64 = data['imageData']
                setImage(`data:image/jpeg;base64,${base64}`)
                setbase64(base64)

            }
            else {
                setImage('sm')
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    return (<motion.div exit={{ opacity:0, x:"-100vw"}} animate={{opacity:1, x:0}} initial={{opacity:0, x:"-100vw"}} >
        <div className="block">
            {sideImage === '' ? <img src={`/img/${filename}`} className="selectedImage" alt="testing"></img> :
                <img src={sideImage} className="selectedImage" alt="testing"></img>}
            <h2 className="itemsDetected">Clothing items detected!</h2>
            <h1 className="selectItems">Select the item for which you'd like to shop</h1>
            <Dropdown dropDownItems={dropDownItems}
                onDropDownSelect={onDropDownSelect}></Dropdown>

        </div>
        <Button onClick={onConfirm} style={sideImage === '' ? { 'display': 'none' } : { 'display': '' }} className='confirm' size='large'>Confirm</Button>
    </motion.div>)
}

export default Section2

