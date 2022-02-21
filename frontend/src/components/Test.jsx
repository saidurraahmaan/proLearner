import React, {useState} from 'react';
import { CKEditor } from 'ckeditor4-react';

function Test() {
    const [value,setValue] = useState('');

    const onEditorChange = (e) => {
        setValue(e.editor.getData());
    };
    console.log(value);
    return (
        <div className="content-margin">
            <h2>Using CKEditor 4 in React</h2>
            <h2>Hello </h2>
            <CKEditor
                initData={<p>Hello from CKEditor 4!</p>}
                data = {value}
                onChange = {onEditorChange}
            />
        </div>
    );
}

export default Test;
