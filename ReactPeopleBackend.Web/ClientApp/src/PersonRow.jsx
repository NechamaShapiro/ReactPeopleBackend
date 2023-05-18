import React from 'react';

function PersonRow(props) {
    const { onEditClick, onDeleteClick, isSetToDelete, onSetToDeleteChange } = props;
    const { firstName, lastName, age } = props.person;

    return (
        <tr>
            <td>
                <div className='d-flex justify-content-center align-items-center'>
                <input
                    checked={isSetToDelete}
                    onChange={onSetToDeleteChange}
                    type="checkbox"
                    style={{transform: "scale(1.5)"}}
                    className="form-check-input mt-2" />
                    </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                <button style={{ marginLeft: 10 }} onClick={onDeleteClick} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    );
}

export default PersonRow;