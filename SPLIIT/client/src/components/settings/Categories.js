import { Box } from '@mui/material';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import CommuteRoundedIcon from '@mui/icons-material/CommuteRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import AttractionsRoundedIcon from '@mui/icons-material/AttractionsRounded';
import KingBedRoundedIcon from '@mui/icons-material/KingBedRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import DirectionsBoatFilledRoundedIcon from '@mui/icons-material/DirectionsBoatFilledRounded';

class CategoriesClass {
    constructor() {
        this.category = {}
    }
    // setCategoryIcon(cat, icon) {
    //     this.category[cat] = { icon: icon };
    // }
    setCategoryIcon(cat, icon, colour) {
        this.category[cat] = { icon: <BackgroundBox colour={colour} icon={icon} /> };
        this.category[cat].colour = colour
    }
    getCategoryIcon(cat) {
        return this.category[cat] ? this.category[cat].icon : "no icon";
    }
    getCategoryColour(cat) {
        return this.category[cat].colour || "grey";
    }
}

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

export const Categories = new CategoriesClass()
Categories.setCategoryIcon('Food', <RestaurantRoundedIcon style={{ color: '#f8f9fa' }} />, '#ee9b00')
Categories.setCategoryIcon('Transport', <CommuteRoundedIcon style={{ color: '#f8f9fa' }} />, '#0a9396')
Categories.setCategoryIcon('Shopping', <LocalMallRoundedIcon style={{ color: '#f8f9fa' }} />, '#ae2012')
Categories.setCategoryIcon('Entertainment', <AttractionsRoundedIcon style={{ color: '#f8f9fa' }} />, '#ca6702')
Categories.setCategoryIcon('Accomodation', <KingBedRoundedIcon style={{ color: '#f8f9fa' }} />, '#52796f')
Categories.setCategoryIcon('Others', <SellRoundedIcon style={{ color: '#f8f9fa' }} />, '#6b705c')
Categories.setCategoryIcon('Insurance', <HealthAndSafetyRoundedIcon style={{ color: '#f8f9fa' }} />, '#f26a8d')
Categories.setCategoryIcon('Ferry', <DirectionsBoatFilledRoundedIcon style={{ color: '#f8f9fa' }} />, '#94d2bd')