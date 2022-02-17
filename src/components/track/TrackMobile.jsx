import { Button, Grid, Input, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import sectionPhoto from './sectionPhoto.png';
import displayer from './displayer.png';
import adPhoto from './adPhoto.png';
import { Search } from '@mui/icons-material';
import  TableTrackInfo  from './TableTrackInfo';
const Trackmobile = ({ dataSet }) => {
    const [imeiData, setimeiData] = React.useState(false);
    console.log(imeiData);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('searchIMEI'));
        dataSet.forEach((seller, key) => {
            if (seller.isSeller) {
                seller.sellingHistory.forEach((history, key) => {
                    if (history.imei === data.get('searchIMEI')) {
                        console.log(history);
                        setimeiData({...history, sellerFullName :seller.sellerFirstName+ " " +seller.sellerLastName});
                    }
                });
            }
        });
    }

return (
    <Box maxWidth='xl' margin='50px auto'>
        <Grid container spacing={3} justifyContent={{ xs: 'center', sm: 'space-around' }}>
            <Grid item xs={11} sm={5} spacing={1} mt={5}>
                <img src={adPhoto} alt='ad' width='100%' />
                <Box mt={8} textAlign={{ xs: 'center', sm: 'right' }}>
                    <img src={sectionPhoto} alt='ad' width={'70%'} />
                </Box>
            </Grid>

            <Grid item xs={11} sm={5} mt={{ xs: 10, sm: 5 }} component="form" onSubmit={handleSubmit} alignItems='center' justifyContent={'center'}>
                <Typography fontSize={{ xs: '30px', sm: '35px', md: '45px' }} sx={{ fontWeight: 'bolder' }} mb={2}>
                    Track Phone Records
                </Typography>
                <Input
                    placeholder="Search By IMEI"
                    disableUnderline
                    id="searchIMEI"
                    name='searchIMEI'
                    sx={{
                        textDecoration: "none",
                        height: "50px",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        width: "100%",
                        marginTop: "20px",
                        color: "#C7C3B2",
                        border: "1px solid white",
                        background: '#FFF6DB',
                    }}
                    type="text"
                    endAdornment={
                        <InputAdornment position="end">
                            <Button
                                type='submit'
                                variant="outline"
                                sx={{ color: "tan", backgroundColor: "transparent", borderCollapse: 'collapse' }}
                            >
                                <Search sx={{ color: "#C7C3B2", }} />
                            </Button>
                        </InputAdornment>
                    } />


                <Box mt={5}>
                   {
                       imeiData ? <TableTrackInfo data={imeiData} /> : null
                   } 
                    <img src={displayer} alt='ad' width='100%' />
                </Box>
            </Grid>
        </Grid>
    </Box>
);
}

export default Trackmobile;
