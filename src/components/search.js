import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { productActions } from '../redux/product/productSlice';

export default function Search() {
    const [productName, setProductName] = useState('')

    const dispatch = useDispatch();

    const search = () => {
        dispatch(productActions.getSearchedProductsRequest(productName))
    }
    return (
        <Paper
            component="form"
            sx={{ p: '0px 0px 0px 10px', display: 'flex', alignItems: 'center', width: 700, borderRadius: '20px' }}
        >
            <IconButton sx={{ p: '0 5px 0 5px' }} aria-label="menu">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Searching for..."
                onChange={(e) => setProductName(e.target.value)}
            />
            <IconButton type="button"
                onClick={search}
                sx={[
                    {
                        p: '12.5px 50px',
                        backgroundColor: '#C24B5A',
                        borderRadius: '0px 20px 20px 0px',

                    },
                    {
                        '&:hover': { backgroundColor: '#de3b50' }
                    }
                ]} aria-label="search">
                <div style={{ fontSize: '16px', color: 'white' }}>Search</div>
            </IconButton>
        </Paper>
    );
}