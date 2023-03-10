import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as AddIcone } from '../assets/add.svg'


function AddButton(props) {
    return (
        <Link to='/note/new' className='floating-button'>
            <AddIcone />
        </Link>
    );
}

export default AddButton;