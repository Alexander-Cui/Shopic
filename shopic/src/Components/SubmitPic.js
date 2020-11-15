import React from 'react'
import "./SubmitPic.css"

import { Upload, message } from 'antd';
const { Dragger } = Upload;


function SubmitPic() {

    const props = {
        name: 'file',
        multiple: false,
        action: '/upload_file',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                const { response } = info.file
                console.log(`this is the response ${JSON.stringify(response)}`)
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