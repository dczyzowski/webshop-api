import React, { useEffect } from 'react';
import { useState } from 'react'

function Shop() {
    return (
        <div className='main'>
            <Products />
        </div>
    )
}

export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

const Products = () => {
    const [error, setError] = useState<Error>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([])


    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAllProducts(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return (
            <span>error {error.message}</span>
        )
    }
    else if (!isLoaded) {
        <span>Is Loading...</span>
    }
    return (
        <div className='products'>
            {allProducts.map(item => (
                <div className='card' style={{ width: "18rem;" }}>
                    <div card-image><img className="card-img-top" src={item.image} alt="Card image cap"/></div>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted item-price">
                            {item.price.toLocaleString(
                                'pl-PL', {
                                style: 'currency',
                                currency: 'PLN',
                            })}
                        </h6>
                        <p className="card-text">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default Shop