import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import Cards from '../cards/Cards';
import { Pagination } from '@mui/material';
import "./home.css"

const Home = ({setText,text}) => {
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    



    ///////////pagination
    const [currentPage,setCurrentPage] = useState(1);
    const productsPerPage = 9;
    const indexOfLastProduct = currentPage*productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct-productsPerPage;
    const currentProduct = products.slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (e,value)=>{
        setCurrentPage(value)
        window.scrollTo({top:0,behavior:'smooth'})
    }




    /////////data fetching






    useEffect(()=>{
        setLoading(true);
        const fetching =  async()=>{
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                const {products} = data
                console.log(products)
                setProducts(products);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);

        }
        fetching();
    },[])



    //////some end cases






    if(loading){
        return<h1>its loading</h1>
    }





    ///////////////return



  return (
    
    <div>
       <div className='home-input'>
            <input placeholder='search the value' value={text} onChange={(e)=>{setText(e.target.value)}} />
            <button ><NavLink to={"/search"}>Search</NavLink></button>
        </div>
        <div className='cards-wrapper'>
        {
            currentProduct.map((product)=>{
                
                return(
                    <Link key = {product.id} to={`/${product.id}`}>
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
      count={Math.ceil(products.length/10)}
      // size='large'
      page={currentPage}
      onChange={paginate}
      ></Pagination>
      
    </div>
    </div>
  )
}

export default Home