import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const Edit = () => {
    const {id} = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onEditSubmit = async() => {
        setLoading(true);
        try {
            await api.updatePost({
                title, description
            }, id)
            history.push("/admin/");
        } catch (error) {
            alert('Failed to edit post')
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        api.getPostById(id).then(res => {
            const result = res.data;
            const post = result.data;
            setTitle(post.title);
            setDescription(post.description);
        })
    },[])

    return (
        <AppContainer
        title="Edit Item"
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
                        onClick={onEditSubmit}
                        className="btn btn-success"
                        disabled={loading}
                    >{loading ? 'Loading...': 'Edit'}</button>
                </div>
            </form>
        </AppContainer>
    );
};

export default Edit;