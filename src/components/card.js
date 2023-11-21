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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ProductCard({ img, title, rating, originalPrice, price, discount }) {
    const [starQuantity] = useState(rating && 5 - rating)
    const [productQuantity, setProductQuantity] = useState(0);

    const incrementQuantity = () => {
        setProductQuantity(prevQuantity => prevQuantity + 1);
    }

    const decrementQuantity = () => {
        if (productQuantity >= 1) {
            setProductQuantity(prevQuantity => prevQuantity - 1);
        }
    }
    return (
        <Card>
            <div className='product-image' style={{ backgroundColor: '#EFEFEF', position: 'relative' }}>
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
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <div className='product-card-title'>
                        {title}
                    </div>
                    <CardContent color="text.secondary" style={{ display: 'flex', alignItems: 'center', paddingLeft: '0' }}>
                        {Array.from(Array(rating)).map((_, index) => (
                            <StarIcon className='star' sx={{ color: 'yellow' }} alt={index} key={index} />
                        ))}
                        {starQuantity !== 0 &&
                            Array.from(Array(starQuantity)).map((_, index) => (
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
                    {productQuantity !== 0 && <IndeterminateCheckBoxOutlinedIcon onClick={decrementQuantity} sx={{ color: '#C24B5A', cursor: 'pointer' }} />}
                    {productQuantity !== 0 && <div style={{ textAlign: 'center', margin: '5px 0' }}>{productQuantity}</div>}
                    <AddBoxOutlinedIcon onClick={incrementQuantity} sx={{ color: '#C24B5A', cursor: 'pointer' }} />
                </div>
            </CardContent>
        </Card>
    );
}