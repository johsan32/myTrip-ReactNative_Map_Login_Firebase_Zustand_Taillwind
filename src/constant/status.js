export const status = [
    {
      name: 'Travel',
      value:"travel"
    },
    {
      name: 'Shopping',
      value:"shopping"
    },
    {
      name: 'Food',
      value:"food"
    },
    {
        name:"Hostel",
        value:"hostel"
    }
  ];
  
export  const getStatusIcon = status => {
    switch (status) {
      case 'travel':
        return require('../assets/icons/travel.png');
      case 'shopping':
        return require('../assets/icons/shopping.png');
      case 'food':
        return require('../assets/icons/food.png');
      default:
        return require('../assets/icons/hostel.png');
    }
  };