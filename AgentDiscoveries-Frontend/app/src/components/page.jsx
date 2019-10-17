import * as React from 'react';

import NavigationBar from './nav';

import ThemeButton from './ThemeButton';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";

export default class Page extends React.Component {

    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <div className='container'>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}
