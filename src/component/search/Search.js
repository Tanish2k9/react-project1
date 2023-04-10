import React, { useEffect, useState } from 'react'
import Cards from '../cards/Cards';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';

import "./search.css";

const Search = ({text}) => {

//state 
  const [searchProducts,setSearchProducts] = useState([]);
  const [loading,setLoading] = useState(true);



//pagination//////
    const [currentPage,setCurrentPage] = useState(1);
    const productsPerPage = 9;
    const indexOfLastProduct = currentPage*productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct-productsPerPage;
    const currentProduct = searchProducts.slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (e,value)=>{
        setCurrentPage(value)
        window.scrollTo({top:0,behavior:'smooth'})
    }





//data fetching

  useEffect(()=>{
    setLoading(true);
    const fetching =  async()=>{
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${text}`);
            const data = await response.json();
            // console.log(data.products);
            const {products} = data
            // console.log(products)
            setSearchProducts(products);
        } catch (error) {
            console.log("searc me se " + error);
        }
        setLoading(false);

    }
    fetching();
},[text])





//some end cases

if(loading){
    return <h1>its loading...</h1>
}

if(searchProducts.length<1){
return (<h1>no products found</h1>)
}





/////// return


  return (
    <>
    <div className='search'>
        {
            currentProduct.map((product)=>{
                return (
                    <Link key={product.id} to = {`/${product.id}`}>
                        <Cards product={product}/>
                    </Link>
                )
            })
        }
        
    </div>


    <div className='pagi-container'>
        <Pagination
            className='pagi'
            color='primary'
            defaultPage={1}
            count={Math.ceil(searchProducts.length/10)}
            page={currentPage}
            onChange={paginate}
        ></Pagination>
    </div>

    
    </>
  )
}

export default Search