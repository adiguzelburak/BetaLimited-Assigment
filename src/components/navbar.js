import React from 'react'
import Grid from '@mui/material/Grid'
import Search from './search'

export default function Navbar() {
    return (
        <Grid container sx={{
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: '0 auto 2rem',
            p: '1rem 0'
        }}>
            <img src='./logo-dark.png' alt='logo' className='logo' />
            <Search />
        </Grid>
    )
}
