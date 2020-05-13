import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCards from '../components/ProductCards/ProductCards'


const ShowCase = (props) => {
	
	const [products, setProducts] = useState([]);
	const categoryId = '5eb84eb4d6bba51028d646e9' //gents fashion

	useEffect(() => {
		axios.get(`http://localhost:8000/api/v1/products?category=${categoryId}`)
			.then(res => setProducts(res.data.data.products))
			.catch(err => console.log(err))
	}, [])
	
	return (
		<div>
			<h3>ShowCase Page</h3>
			<div className="container">
				<ProductCards products={products}/>
			</div>
		</div>
	);
};

export default ShowCase;