import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../redux/product/productSlice';

export default function Home() {
    const dispatch = useDispatch();
    const productData = useSelector(state => state.product.products);
    const store = useSelector(state => state.product.productsOnChart);


    useEffect(() => {
        dispatch(productActions.getProductsRequest())
        dispatch(productActions.getProductsOnChartRequest())
    }, [])

    const addToCart = (productId) => {
        dispatch(productActions.addToCartRequest(productId))
    }

    return (
        <div>
            {productData?.map(product => (
                <div
                    onClick={() => addToCart(product.id)}
                    key={product.id}>{product.name}</div>
            ))}
        </div>
    )
}
