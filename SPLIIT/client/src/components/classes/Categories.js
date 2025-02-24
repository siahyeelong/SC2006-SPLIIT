import { Box } from '@mui/material';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import CommuteRoundedIcon from '@mui/icons-material/CommuteRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import AttractionsRoundedIcon from '@mui/icons-material/AttractionsRounded';
import KingBedRoundedIcon from '@mui/icons-material/KingBedRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import DirectionsBoatFilledRoundedIcon from '@mui/icons-material/DirectionsBoatFilledRounded';

const BackgroundBox = ({ colour, icon }) => {
    return (
        <Box sx={{
            width: 40, // Adjust size as needed
            height: 40,
            borderRadius: '50%',
            backgroundColor: colour, // Background color of the circle
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {icon}
        </Box>
    )
}

class Category {
    constructor(name, icon, colour) {
        this.name = name;
        this.icon = <BackgroundBox colour={colour} icon={icon} />;
        this.colour = colour;
    }
}

export const Categories = {};
Categories['Food'] = new Category('Food', <RestaurantRoundedIcon style={{ color: '#f8f9fa' }} />, '#ee9b00');
Categories['Transport'] = new Category('Transport', <CommuteRoundedIcon style={{ color: '#f8f9fa' }} />, '#0a9396')
Categories['Shopping'] = new Category('Shopping', <LocalMallRoundedIcon style={{ color: '#f8f9fa' }} />, '#ae2012')
Categories['Entertainment'] = new Category('Entertainment', <AttractionsRoundedIcon style={{ color: '#f8f9fa' }} />, '#ca6702')
Categories['Accomodation'] = new Category('Accomodation', <KingBedRoundedIcon style={{ color: '#f8f9fa' }} />, '#52796f')
Categories['Others'] = new Category('Others', <SellRoundedIcon style={{ color: '#f8f9fa' }} />, '#6b705c')
Categories['Insurance'] = new Category('Insurance', <HealthAndSafetyRoundedIcon style={{ color: '#f8f9fa' }} />, '#f26a8d')
Categories['Ferry'] = new Category('Ferry', <DirectionsBoatFilledRoundedIcon style={{ color: '#f8f9fa' }} />, '#94d2bd')
// append more as needed