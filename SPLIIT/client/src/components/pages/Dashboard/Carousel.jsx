import { React, useState, useEffect } from 'react'
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselCard from './CarouselCard';
import { People } from '../../settings/People';

function Carousel() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    const [debtMatrix_R, setDebtMatrix_R] = useState([]);
    const [debtMatrix_S, setDebtMatrix_S] = useState([]);
    const [error, setError] = useState(null);

    function fetchMatrices() {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        fetch(`${backendURL}/record/owe`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDebtMatrix_R(data[1] || []);
                setDebtMatrix_S(data[2] || []);
            })
            .catch(error => {
                setError('Failed to fetch transactions. Please try again later.');
                console.error('Error fetching data:', error);
            });
    }
    useEffect(() => fetchMatrices(), []);

    const slider_settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        adaptiveHeight: false,
    };

    return (
        <>
            <Box className="carousel" width={'90%'}>
                {/* <Slider {...slider_settings}> */}
                {People.map((person) => (
                    <CarouselCard key={person.identifier} ower={person} matrix={debtMatrix_R[person.identifier]} />
                ))}
                {/* </Slider> */}
            </Box>
        </>
    )
}

export default Carousel