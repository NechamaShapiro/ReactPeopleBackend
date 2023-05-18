import React from 'react';

function AddEditPersonRow({ isEditMode, onTextChange, onAddClick, onUpdateClick, onCancelClick, person }) {
    const { firstName, lastName, age } = person;
    return (
        <div className="row" style={{ marginBottom: 20 }}>
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={firstName}
                    onChange={onTextChange}
                    name="firstName" />
            </div>
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={onTextChange}
                    name="lastName" />
            </div>
            <div className="col-md-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Age"
                    value={age}
                    onChange={onTextChange}
                    name="age" />
            </div>
            <div className="col-md-3">
                {!isEditMode && <button className="btn btn-primary w-100" onClick={onAddClick}>Add</button>}
                {isEditMode &&
                    <div>
                        <button className="btn btn-warning w-100" onClick={onUpdateClick}>Update</button>
                        <button className="btn btn-dark w-100 mt-2" onClick={onCancelClick}>Cancel</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default AddEditPersonRow;