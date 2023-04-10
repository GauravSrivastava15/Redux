import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {add} from '../store/CartSlice'
import { fetchProducts } from '../store/productSlice'
import { STATUSES } from '../store/productSlice'

const Product = () => {
    const dipatch = useDispatch()
    const {data: products, status} = useSelector((state) => state.product)
    useEffect(() =>{

        dipatch(fetchProducts())

        // const fetchProducts = async () => {
        //     const res = await fetch('https://fakestoreapi.com/products')
        //     const data = await res.json()
        //     console.log(data);
        //     setProducts(data);
        // }
        // fetchProducts();

    }, [])

    const handleAdd = (product) => {
        dipatch(add(product))
    }

    if(status === STATUSES.LOADING){
        return <h2>Loading...</h2>
    }

    if(status === STATUSES.ERROR){
        return <h2>Something went wrong...</h2>
    }

  return (
    <div className='productsWrapper'>
        {
            products.map(product =>(
                <div className='card' key={product.id}>
                    <img src={product.image} alt="img" />
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    <button onClick={() => handleAdd(product)} className='btn'>Add to cart</button>
                </div>
            ))
        }
    </div>
  )
}

export default Product