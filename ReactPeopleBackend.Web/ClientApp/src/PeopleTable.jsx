import React from 'react';
import PersonRow from './PersonRow';
import AddEditPersonRow from './AddEditPersonRow';
import axios from 'axios';
import { produce } from 'immer';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isEditMode: false,
        currentEditPersonId: '',
        peopleToDelete: []
    }

    componentDidMount = async () => {
        await this.refreshPeople();
    }

    refreshPeople = async () => {
        const response = await axios.get('/api/people/getall');
        const people = response.data;
        this.setState({ people });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAddPersonClick = async () => {
        await axios.post('/api/people/add', this.state.person);
        await this.refreshPeople();
        this.resetToAddMode();
    }

    onEditClick = person => {
        this.setState({ person, isEditMode: true, currentEditPersonId: person.id });
    }

    onUpdateClick = async () => {
        await axios.post('/api/people/update', { ...this.state.person, id: this.state.currentEditPersonId });
        await this.refreshPeople();
        this.resetToAddMode();
    }

    resetToAddMode = () => {
        this.setState({
            isEditMode: false,
            person: {
                firstName: '',
                lastName: '',
                age: ''
            },
            currentEditPersonId: 0
        })
    }

    onCancelClick = () => {
        this.resetToAddMode();
    }

    onDeleteClick = async id => {
        await axios.post('/api/people/delete', { id });
        await this.refreshPeople();
    }

    onSetToDeleteChange = id => {
        const { peopleToDelete } = this.state;
        let newPeopleToDelete;
        if (peopleToDelete.includes(id)) {
            newPeopleToDelete = peopleToDelete.filter(i => i !== id);
        } else {
            newPeopleToDelete = [...peopleToDelete, id];
        }

        this.setState({ peopleToDelete: newPeopleToDelete });
    }

    onDeleteAllClick = async () => {
        await axios.post('/api/people/deletemany', { ids: this.state.peopleToDelete });
        await this.refreshPeople();

    }

    checkAll = () => {
        this.setState({ peopleToDelete: this.state.people.map(p => p.id) });
    }

    unCheckAll = () => {
        this.setState({ peopleToDelete: [] });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 60 }}>
                <AddEditPersonRow
                    isEditMode={this.state.isEditMode}
                    onTextChange={this.onTextChange}
                    person={this.state.person}
                    onAddClick={this.onAddPersonClick}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                />
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>
                                <button onClick={this.onDeleteAllClick} className="btn btn-danger w-100">Delete All</button>
                                <button onClick={this.checkAll} className="btn btn-outline-danger w-100 mt-2">Check All</button>
                                <button onClick={this.unCheckAll} className="btn btn-outline-danger w-100 mt-2">Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(p =>
                            <PersonRow
                                key={p.id}
                                person={p}
                                onEditClick={() => this.onEditClick(p)}
                                onDeleteClick={() => this.onDeleteClick(p.id)}
                                isSetToDelete={this.state.peopleToDelete.includes(p.id)}
                                onSetToDeleteChange={() => this.onSetToDeleteChange(p.id)}
                            />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PeopleTable;