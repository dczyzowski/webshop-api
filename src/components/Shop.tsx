import React, { useEffect } from 'react';
import { useState } from 'react'
import Pages from './Pages'
import CardItem from './CardItem'

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

let searchInArray = (searchQuery : string, array : Product[]) => {
    const results : Product[] = []
    if(searchQuery.length > 2){
        array.forEach(element => {
            if(element.title.toLocaleLowerCase().search(searchQuery.toLocaleLowerCase()) > -1)
                results.push(element)
        }) 
        return results
    }
    else
        return array
  }

const Shop = (props: {searchValue: string}) => {
    const [error, setError] = useState<Error>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([])
    let resultProducts : Product[] = []
    var pageNumbers = 0
    // setting up pagination
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6;

    // slice tę tabele
    const currentPageData = (e: Product[]): Product[] => {
        const firstItemIndex: number = (currentPage - 1) * pageSize;
        const lastItemIndex = e.length > pageSize ? firstItemIndex + pageSize : e.length ;
        return e.slice(firstItemIndex, lastItemIndex)
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

    resultProducts = searchInArray(props.searchValue, allProducts);
    pageNumbers = Math.ceil(resultProducts.length / pageSize)
    if(currentPage > pageNumbers && pageNumbers > 0){
        setCurrentPage(1)
    }
    return (
        <div>
            <div className='products'>
                {currentPageData(resultProducts).map(item => (
                    <div key={item.id}><CardItem item={item} /></div>
                ))}
            </div>

            {allProducts.length !== 0 ?
                <Pages pagesCounts={pageNumbers} currentPage={currentPage} onPageChanged={(selectedPage) => setCurrentPage(selectedPage)} />
                : <div> </div>
            }
        </div>
    )

}

export default Shop