import star from './assets/star.png';
import star_selected from './assets/star_selected.png';

interface Logo {
    name: string;
    selected: string;
    default: string;
}

const logos: Logo[] = [
    {
        name: 'star',
        selected: star_selected,
        default: star
    }
];

export default logos;
