import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useState } from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux'
import { productActions } from '../redux/product/productSlice';

export default function ProductCard({ img, title, rating, originalPrice, price, discount, id, productQuantity }) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();

    const incrementQuantity = () => {
        setIsDisabled(true);
        dispatch(productActions.addToCartRequest({
            id: id,
            onSuccess: () => {
                setIsDisabled(false)
            },
            onFailure: () => {
                setIsError(true)
            }
        }))
    }

    const decrementQuantity = () => {
        setIsDisabled(true);
        if (productQuantity >= 1) {
            dispatch(productActions.substractFromCartRequest({
                id: id,
                onSuccess: () => {
                    setIsDisabled(false)
                },
                onFailure: () => {
                    setIsError(true)
                }
            }))
        }
    }
    return (
        <Card>
            <div className='product-image'>
                <div className='discount-badge'>
                    {discount}
                </div>
                <div className='back'>
                    <ArrowBackOutlinedIcon sx={{ color: '#C24B5A', cursor: 'pointer', height: '24px', width: '24px' }} />
                </div>
                <div className='icon-set'>
                    <Grid container >
                        <RemoveRedEyeIcon sx={{ color: 'gray', cursor: 'pointer' }} />
                        <FavoriteIcon sx={{ color: 'gray', cursor: 'pointer', margin: '0 20px' }} />
                        <ShoppingCartIcon sx={{ color: 'gray', cursor: 'pointer' }} />
                    </Grid>
                </div>
                <CardMedia
                    component="img"
                    height="350"
                    image={img}
                    alt={title}
                />
            </div>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <div className='product-card-title'>
                        {title}
                    </div>
                    <CardContent color="text.secondary" style={{ display: 'flex', alignItems: 'center', paddingLeft: '0' }}>
                        {Array.from(Array(rating)).map((_, index) => (
                            <StarIcon className='star' sx={{ color: 'yellow' }} alt={index} key={index} />
                        ))}
                        {
                            Array.from(Array(5 - rating)).map((_, index) => (
                                <StarBorderIcon sx={{ color: 'gray' }} alt={index} key={index} />
                            ))}
                        <span style={{ color: 'gray' }}>({rating})</span>
                    </CardContent>
                    <CardContent style={{ display: 'flex', alignItems: 'center', paddingLeft: '0', paddingBottom: '0' }}>
                        <div className='discount-price'>${price}</div>
                        <div className='original-price'>${originalPrice.toFixed(2)}</div>
                    </CardContent>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {productQuantity !== 0 &&
                        <Button disabled={isDisabled} onClick={decrementQuantity}
                            sx={{ minWidth: 'fit-content', minHeight: 'fit-content', p: '0px' }}>
                            <IndeterminateCheckBoxOutlinedIcon sx={{ color: '#C24B5A', cursor: 'pointer' }} />
                        </Button>
                    }
                    {productQuantity !== 0 && <div style={{ textAlign: 'center' }}>{productQuantity}</div>}
                    <Button disabled={isDisabled} onClick={() => incrementQuantity()}
                        sx={{ minWidth: 'fit-content', minHeight: 'fit-content', p: '0px' }}>
                        <AddBoxOutlinedIcon sx={{ color: '#C24B5A', cursor: 'pointer' }} />
                    </Button>

                </div>
            </CardContent>
            {isError && <div className='error-message'>Something went wrong...</div>}
        </Card>
    );
}