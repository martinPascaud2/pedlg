import num from '@iconify/icons-mdi/numeric-9-plus-circle';
import sproutOutline from '@iconify/icons-mdi/sprout-outline';
import sproutIcon from '@iconify/icons-mdi/sprout';
import gram from '@iconify/icons-mdi/weight-gram';
import grassIcon from '@iconify/icons-mdi/grass';
import spaIcon from '@iconify/icons-mdi/spa';
import sackIcon from '@iconify/icons-mdi/sack';

const formattedQuantity = (unit, quantity) => {
    if (unit === 'gram' && quantity > 999) {
        return Math.round((quantity / 1000 + Number.EPSILON) * 100) / 100;
    }

    return quantity;
};

const units = {
    number: {
        symbol: value => (value > 1 ? ' graines' : ' graine'),
        icon: num,
    },
    gram: {
        symbol: value => (value > 999 ? 'kg' : 'g'),
        icon: gram,
    },
    packet: {
        symbol: value => (value > 1 ? ' pochons' : ' pochon'),
        icon: sackIcon,
    },
    bulb: {
        symbol: value => (value > 1 ? ' bulbes' : ' bulbe'),
        icon: spaIcon,
    },
    stolon: {
        symbol: value => (value > 1 ? ' stolons' : ' stolon'),
        icon: grassIcon,
    },
    plant: {
        symbol: value => (value > 1 ? ' plants' : ' plant'),
        icon: sproutOutline,
    },
    cutting: {
        symbol: value => (value > 1 ? ' boutures' : ' bouture'),
        icon: sproutIcon,
    },
};

export { formattedQuantity, units };
