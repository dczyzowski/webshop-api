import React, { useEffect } from 'react';
import { useState } from 'react'
import Pages from './Pages'
import CardItem from './CardItem'

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

    // setting up pagination
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 3;

    // slice tę tabele
    const currentPageData = (): Product[] => {
        const firstItemIndex: number = (currentPage - 1) * pageSize;
        const lastItemIndex = firstItemIndex + pageSize;
        return allProducts.slice(firstItemIndex, lastItemIndex)
    };

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAllProducts(result);
                },
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
        <div className='products'>
            <span>Is Loading...</span>
        </div>
    }
    return (
        <div>
            <div className='products'>
                {currentPageData().map(item => (
                    <CardItem item={item} />
                ))}
            </div>

            {allProducts.length !== 0 ?
                <Pages pagesCounts={Math.ceil(allProducts.length / pageSize)} currentPage={currentPage} onPageChanged={(selectedPage) => setCurrentPage(selectedPage)} />
                : <div> </div>
            }
        </div>
    )

}

export default Shop