import React, { useState } from 'react';

function AddTaskForm({ addTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ title, description });
        setTitle('');
        setDescription('');
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input
                        className="form-input"
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea
                        className="form-textarea"
                        id="description"
                        rows="3"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Enter task description"
                        required
                    />
                </div>
                <button className="form-button" type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default AddTaskForm;
