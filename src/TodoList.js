import React from 'react';
import PropTypes from 'prop-types';
/**
 * Adds New TodoList
 * @class TodoList
 */
class TodoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [
                { id: 1, title: 'client meeting', completed: true },
                { id: 2, title: 'business trip', completed: false },
                { id: 3, title: 'bonus addition', completed: false },
                { id: 4, title: 'bike service', completed: true },
                { id: 5, title: 'bills payment', completed: true },
            ],
            title: '',
            completed: false,
            formErrors: {}
        }
    }
    /**
    * Handle Changes in DOM Input Elements
    */
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    /**
    * Check for errors in TodoList form
    */
    handleFormValidation = () => {
        const { title } = this.state;
        let formErrors = {};
        let formIsValid = true;

        //Student name     
        if (!title) {
            formIsValid = false;
            formErrors["titleErr"] = "Title is required.";
        }

        this.setState({ formErrors });
        return formIsValid;
    }
    /**
    * Submits TodoList form
    */
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.handleFormValidation()) {
            alert('Task successfully added')
            const task = {
                id: Number(new Date()),
                title: this.state.title,
                completed: this.state.completed
            }
            // console.log(task)
            this.setState((prevState) => ({
                tasks: [...prevState.tasks, task],
                title: ""
            }))
        }
    }
    /**
    * Removes the selected todo from the list
    */
    handleRemove = (id) => {
        const remove = window.confirm('Are you sure to delete ?')
        if (remove) {
            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.filter(task => task.id !== id)
                }
            })
        }
    }
    /**
    * Checks the checkbox for completed todos
    */
    handleCheck = (id) => {
        this.setState(state => ({
            tasks: state.tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        completed: !task.completed,
                    };
                } else {
                    return task;
                }
            })
        }));
    }
    // Renders TodoList Form
    render() {
        const { titleErr } = this.state.formErrors;

        return (
            <div>
                <h2>Listing Tasks - {this.state.tasks.length}</h2>
                <h2>Add Todos</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input
                            type='text'
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange} />&nbsp;&nbsp;
                        {titleErr && <span style={{ color: "red", paddingBottom: 10 }}>{titleErr}</span>}
                    </label>
                </form>
                <ul>
                    {this.state.tasks.map(task => {
                        return <li key={task.id}>&nbsp;&nbsp;
                            <input type="checkbox" checked={task.completed} onChange={() => this.handleCheck(task.id)} />
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span><span>&nbsp;&nbsp;{task.completed ? <span style={{ color: 'green' }}>complete</span> : <span style={{ color: 'red' }}>incomplete</span>}</span>&nbsp;&nbsp;
                            <button onClick={() => this.handleRemove(task.id)}>remove</button>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}


TodoList.protoTypes = {
    tasks: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
}

export default TodoList
