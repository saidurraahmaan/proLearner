import React, {useState} from 'react';
import { CKEditor } from 'ckeditor4-react';

function Test(props) {
    console.log(props);
    return (
        <div className="content-margin">
            <h2>Using CKEditor 4 in React</h2>
            <h2>Hello </h2>
        </div>
    );
}

export default Test;
