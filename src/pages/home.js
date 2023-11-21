import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../redux/product/productSlice';
import ProductCard from '../components/card';
import Grid from '@mui/material/Grid';

export default function Home() {
    const dispatch = useDispatch();
    const productData = useSelector(state => state.product.products);


    useEffect(() => {
        dispatch(productActions.getProductsRequest())
        // dispatch(productActions.getProductsOnChartRequest())
    }, [])

    const addToCart = (productId) => {
        // dispatch(productActions.addToCartRequest(productId))
    }

    return (
        <Grid maxWidth={1280} margin={'0 auto'}>
            <Grid container rowGap={4}>
                {productData?.map(product => (
                    <Grid container key={product.id} width={'auto'} margin={'0 auto'}>
                        <ProductCard
                            title={product.name}
                            img={product.image}
                            rating={product.rating}
                            originalPrice={product.originalPrice}
                            price={product.price}
                            discount={product.discount}
                            onClick={() => addToCart(product.id)}
                        />
                    </Grid>
                ))}

            </Grid>
            <div className='load-more-box'>
                <button className='load-more'>Load More...</button>
            </div>
        </Grid>
    )
}
