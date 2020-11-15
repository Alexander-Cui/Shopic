import React from 'react'
import "./SubmitPic.css"

import { Upload, message } from 'antd';
import { useHistory } from 'react-router-dom';

const { Dragger } = Upload;

function SubmitPic({ setDropDownItems }) {
    const history = useHistory();
    const props = {
        name: 'file',
        multiple: false,
        action: '/mask',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                const { response } = info.file
                let filename = info.file.name

                let fake_response = { '3': 'sweater', '4': 'cardigan', '7': 'pants' }
                let array_object = Object.entries(response)
                setDropDownItems({ 'dropDown': array_object, 'fileName': filename })
                history.push('/choose')
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div className='searchBar'>
            <Dragger className={'upload'} {...props} showUploadList={false}>
                <h1>  Drag and drop here</h1>
            </Dragger>
        </div>
    )
}
export default SubmitPic