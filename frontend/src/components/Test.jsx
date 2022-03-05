import React, {useState} from "react";
import {CKEditor} from 'ckeditor4-react';
import HTMLReactParser from "html-react-parser";


const editorConfiguration = {
    toolbar: [ 'bold', 'italic' ]
};

const Test = () => {
    const [value, setValue] = useState('');
    console.log(value);
    return (
        <>
            <div className="content-margin">
                hello

                <CKEditor
                    type='classic'
                    config={{
                        toolbar: [
                            { name: 'styles', items: [ 'Styles' ] },
                            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', '-', 'RemoveFormat' ] },
                            { name: 'clipboard', items: [ 'Undo', 'Redo' ] }
                        ],
                        uiColor:'#9AB8F3'
                    }}
                    initData='Hello'
                    onChange={(e) => {
                        const data = e.editor.getData();
                        setValue(data);
                    }}
                />
            </div>
        </>
    )
}
export default Test;