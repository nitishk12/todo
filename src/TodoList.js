import React from 'react'

class TodoList extends React.Component {
    constructor() {
        super()
        this.state = {
            tasks: [],
            title: '',
            completed: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const task = {
            id: Number(new Date()),
            title: this.state.title,
            completed: this.state.completed
        }
        console.log(task)
        this.setState((prevState) => ({
            tasks: [...prevState.tasks, task],
            title: ""
        }))
    }
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
    render() {
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
                            onChange={this.handleChange} />
                    </label>
                </form>
                <ul>
                    {this.state.tasks.map(task => {
                        return <li key={task.id}>&nbsp;&nbsp;
                            <input type="checkbox" checked={task.completed} onChange={() => this.handleCheck(task.id)} />
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>&nbsp;&nbsp;
                            <button onClick={() => this.handleRemove(task.id)}>remove</button>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

export default TodoList
