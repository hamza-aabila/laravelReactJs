import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const Add = () => {
    
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onAddSubmit = async() => {
        setLoading(true);
        try {
            await api.addPost({
                title, description
            })
            history.push("/admin/");
        } catch (error) {
            alert('Failed to add post')
        } finally{
            setLoading(false);
        }
    };

    return (
        <AppContainer
        title="Add Item"
        >
            
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="form-control" ></textarea>
                </div>
                <div className="form-group">
                    <button 
                        type="button" 
                        onClick={onAddSubmit}
                        className="btn btn-success"
                        disabled={loading}
                    >{loading ? 'Loading...': 'Add'}</button>
                </div>
            </form>
        </AppContainer>
    );
};

export default Add;