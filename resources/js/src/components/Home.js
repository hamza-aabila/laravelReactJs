import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const Home = () => {
    const [posts, setPosts] = useState(null);

    const fetchPosts = () => {
        api.getAllPosts().then(res => {
            const result = res.data;
            setPosts(result.data)
        });
    }
    
    useEffect(() => {
        fetchPosts();
    },[])

    const renderPosts = () => {
        if(!posts){
            return(
                <tr>
                    <td>
                        Loading Posts ...
                    </td>
                </tr>
            );
        }
        if(posts.length === 0){
            return(
                <tr>
                    <td>
                        There is no post yet, <Link to="/admin/add" className="btn btn-primary">Add One</Link>.
                    </td>
                </tr>
            );
        }
        return posts.map((post) => (
            <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>
                    <Link to={`/admin/edit/${post.id}`} className="btn btn-warning">Edit</Link>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => {
                            api.deletePost(post.id)
                            .then(fetchPosts)
                            .catch(err => {
                                alert('Failed to delete post with id : ' + post.id);
                            });
                        }}
                    >Delete</button>
                </td>
            </tr>
        ));
    }
    return (
        <AppContainer
        title="Laravel ReactJs - Crud"
        >
            <Link to="/admin/add" className="btn btn-primary">Add Item</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { renderPosts() }
                    </tbody>
                </table>
        </AppContainer>
    );
};

export default Home;