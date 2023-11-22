import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/card';
import Navbar from '../components/navbar';
import { productActions } from '../redux/product/productSlice';

export default function Home() {
    const productData = useSelector(state => state.product.productsFiltred);
    const searchedData = useSelector(state => state.product.searchedProductsFiltred);
    const [isSearched, setIsSearched] = useState(false)
    const dispatch = useDispatch();

    const fetchData = () => {
        dispatch(productActions.getProductsRequest())
        dispatch(productActions.getProductsOnCartRequest())
    }

    useEffect(() => {
        fetchData();
    }, [])

    const onChangeFetch = () => {
        fetchData();
    }

    const onSearchHandle = (handle) => {
        if (handle) {
            setIsSearched(true)
        } else {
            setIsSearched(false)
        }
    }

    return (
        <Grid>
            <Navbar onSearchHandle={(e) => onSearchHandle(e)} />
            <Grid maxWidth={1280} margin={'0 auto'}>
                <Grid container rowGap={4}>
                    {isSearched
                        ? <>
                            {searchedData?.map(product => (
                                <Grid container key={product.id} width={'auto'} margin={'0 auto'}>
                                    <ProductCard
                                        title={product.name}
                                        img={product.image}
                                        rating={product.rating}
                                        originalPrice={product.originalPrice}
                                        price={product.price}
                                        discount={product.discount}
                                        id={product.id}
                                        productQuantity={product.productQuantity}
                                        onChangeHandler={() => onChangeFetch()}
                                    />
                                </Grid>
                            ))}
                        </>
                        : <>
                            {productData?.map(product => (
                                <Grid container key={product.id} width={'auto'} margin={'0 auto'}>
                                    <ProductCard
                                        title={product.name}
                                        img={product.image}
                                        rating={product.rating}
                                        originalPrice={product.originalPrice}
                                        price={product.price}
                                        discount={product.discount}
                                        id={product.id}
                                        productQuantity={product.productQuantity}
                                        onChangeHandler={() => onChangeFetch()}
                                    />
                                </Grid>
                            ))}
                        </>
                    }


                </Grid>
                <div className='load-more-box'>
                    <button className='load-more'>Load More...</button>
                </div>
            </Grid>
        </Grid>
    )
}
