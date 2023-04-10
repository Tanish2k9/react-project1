import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./single.css"
const Single = () => {
  const [singleProduct,setSingleProduct] = useState({});
  const [loading,setLoading] = useState(false);
  const box = useRef();
  const {id} = useParams();
  
  const handleprev=(e)=>{
    const width = box.current.clientWidth;
    box.current.scrollLeft=box.current.scrollLeft - width;
  }
  const handlenext=(e)=>{
    const width = box.current.clientWidth;
    box.current.scrollLeft=box.current.scrollLeft + width;
  }


  ////////data fetching



  useEffect(()=>{
    
    setLoading(true);
    const fetching =  async(req,res)=>{
      // const id = req.params;
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await response.json();
            if(data.message){
              setSingleProduct(null);
            }else{
              setSingleProduct(data);
            }
            
            
        } catch (error) {
            // console.log(error);
            setSingleProduct(null);
        }
        setLoading(false);

    }
    fetching();
  },[id]);




/////some end cases



  console.log( singleProduct)
  if(loading){
    return <h1>its loading</h1>
  }
  if(!singleProduct){
    return <h1>no products found</h1>
  }

 const {brand,category,description,discountPercentage,price,rating,stock,thumbnail,title,images} = singleProduct


  //////////////return
  return (
    <div className='single' >
      <div className='single-poster'>

        <div className='single-poster-info'>
          <h1>{description}</h1>
          <span>{brand}</span>
        </div>

        <div className='single-poster-image'>
          <img src= {thumbnail} alt='thumbnail'/>
        </div>

      </div>
      <div className='single-info'>
        <div className='single-scroll'>
          <button className='single-btn btn-prev' onClick={handleprev}><span>&lt;</span></button>
          <button className='single-btn btn-next' onClick={handlenext}><span>&gt;</span></button>
          <div ref={box} className='single-images'>
            {images&&images.map((image,idx)=>{
                return <img key={idx} src= {image} alt="products"></img>
              })}
          
          </div>
        </div>
        <div className='single-desc'>
          <h3>{title}</h3>
          <h4>discount - {discountPercentage}</h4>
          <h4>price after discount - ${price}</h4>
          <h4>rating -{rating}</h4>
          <h4>stock -{stock}</h4>
          <h4>category -{category}</h4>
        </div>
      </div>
    </div>
  )
}

export default Single