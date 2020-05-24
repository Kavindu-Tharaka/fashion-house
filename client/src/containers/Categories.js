import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Session from '../util/Session';
import { storage } from '../firebase/config';

const Categories = () => {

    const [getCategories, setGetCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => { //retrieve categories on pg load
        const fetchData = async () => {
            const resp = await axios.get('http://localhost:8000/api/v1/categories');
            setGetCategories([...resp.data.data.categories]);//ufjhv
        }
        fetchData();
    }, []);
    
	const onImageChange = (e) => {
		// Check for only image files 
		if (e.target.files[0].type.startsWith('image/')) {
			setImage(e.target.files[0]);
		} else {
			setImage(null);
		}
    };
    const onImageUpload = () => {
        console.log("fn called")
        setProgress(5);
		const uploadTask = storage.ref(`images/${image}`).put(image);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				setProgress(
					Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					)
				);
			},
			(err) => {
				console.error(err);
			},
			() => {
				storage
					.ref('images')
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						setImageURL(url);
                        setProgress(0);
					});
			}
		);
	};

    const addNewCategory = (e) => {
        e.preventDefault();
        onImageUpload();
        axios({
            method: 'post',
            url: `http://localhost:8000/api/v1/products`,
            data: {
                title: title,
                description: description,
                image: imageURL
            },
            headers: {
                Authorization: `Bearer ${Session.getToken()}`,
            }
        });
       // window.location.reload()
    }


    return (
        <div className="mt-5">
            <div className="container">

                {/* modal */}
                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Add a New Category To The Store</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Add Title</label>
                                        <input type="text" className="form-control" id="exampleInputTitle"
                                            autoComplete="off"
                                            value={title}
                                            onChange={e => setTitle(e.target.value)} />
                                        <small id="emailHelp" className="form-text text-muted">Give a name to new Category</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type="text" className="form-control" id="exampleInputDescription"
                                            autoComplete="off"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Choose an image</label>
                                        <input type='file'
                                            accept='image/*'
                                            className='form-control'
                                            onChange={onImageChange} 
                                            />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={(e) => { addNewCategory(e) }}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal ends */}

                <table className="table  table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"><button data-toggle="modal" data-target="#staticBackdrop" type="button" className="btn btn-primary">Add Category</button></th>
                            <th scope="col">Image url</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getCategories.map((category, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{<img className="img-thumbnail" src={category.images[0]} width="100" height="80" alt="category" />}</td>
                                <td>{category.title}</td>
                                <td>{category.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Categories