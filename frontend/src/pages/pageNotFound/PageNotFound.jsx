import './pageNotFound.css'
import {Container} from '@mui/material'
import React from "react";
import {Link} from 'react-router-dom'

const PageNotFound = () => {

    return (
        <>
            <section className="page_404 content-margin">
                <Container maxWidth='sm'>
                    <div >
                        <div>
                            <div className='text-center'>
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center ">404</h1>
                                </div>
                                <div className="content_box_404">
                                    <h3 className="h2">
                                        Look like you're lost
                                    </h3>
                                    <p>the page you are looking for not available!</p>
                                    <Link to='/' className="link_404">Go to Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}

export default PageNotFound;