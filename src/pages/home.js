import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/card';
import Navbar from '../components/navbar';
import { productActions } from '../redux/product/productSlice';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const productData = useSelector(state => state.product.productsWithQuantities);
    const dispatch = useDispatch();

    const fetchData = () => {
        setIsLoading(true);
        dispatch(productActions.getProductsWithQuantitiesRequest({
            onSuccess: () => setIsLoading(false),
            onFailure: () => setIsLoading(false)
        }))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Grid>
            <Navbar />
            <Grid maxWidth={1280} margin={'3rem auto 0'}>
                <Grid container>
                    <Grid container gap={10}>
                        {productData?.map(product => (
                            <Grid container key={product.id} width={'auto'} m={'0 auto'} className='mobile-grid'>
                                <ProductCard
                                    title={product.name}
                                    img={product.image}
                                    rating={product.rating}
                                    originalPrice={product.originalPrice}
                                    price={product.price}
                                    discount={product.discount}
                                    id={product.id}
                                    productQuantity={product.productQuantity}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Grid display="flex" justifyContent="center" alignItems="center" width="100%">
                        {productData.length === 0 && !isLoading &&
                            <div className='error-message'>
                                Product could not found
                            </div>
                        }
                    </Grid>
                    <Grid display="flex" justifyContent="center" alignItems="center" width="100%">
                        {isLoading &&
                            <Box>
                                <CircularProgress size="10rem" />
                            </Box>
                        }
                    </Grid>
                </Grid>
                {productData.length > 0 && !isLoading && <div className='load-more-box'>
                    <button className='load-more'>Load More...</button>
                </div>}
            </Grid>
        </Grid >
    )
}
