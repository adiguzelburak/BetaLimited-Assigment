import React from 'react'
import Grid from '@mui/material/Grid'
import Search from './search'

export default function Navbar({ onSearchHandle }) {
    return (
        <Grid sx={{
            backgroundColor: 'white',
            p: '1rem 0',
        }}>
            <Grid maxWidth={1360} container sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                margin: '0 auto',
            }}>
                <img src='./logo-dark.png' alt='logo' className='logo' />
                <Search onSearchHandle={onSearchHandle} />
            </Grid>
        </Grid>

    )
}
