'use strict';

(function initMenuPage() {
  const sectionsRoot = document.querySelector('#menu-sections');
  const pillsRoot = document.querySelector('#menu-pills');
  const searchInput = document.querySelector('#menu-search');
  const clearButton = document.querySelector('#menu-search-clear');
  const noResults = document.querySelector('#menu-no-results');

  if (!sectionsRoot || !pillsRoot || !searchInput || !clearButton || !noResults) return;

  const pillConfig = [
    { key: 'salads', label: 'Salads', target: 'salads' },
    { key: 'soups', label: 'Soups', target: 'soups' },
    { key: 'tandoori-starters', label: 'Tandoori', target: 'tandoori-starters' },
    { key: 'chinese-starters', label: 'Chinese', target: 'chinese-starters' },
    { key: 'south-indian-costal', label: 'South Indian', target: 'south-indian-costal' },
    { key: 'egg-starters', label: 'Egg', target: 'egg-starters' },
    { key: 'main-course', label: 'Main Course', target: 'main-course-nonveg' },
    { key: 'fried-rice-noodles', label: 'Fried Rice', target: 'fried-rice-noodles' },
    { key: 'biryant', label: 'Biryani', target: 'biryant' },
    { key: 'wet', label: 'Wet', target: 'non-veg-wet' },
    { key: 'pasta', label: 'Pasta', target: 'pasta' },
    { key: 'breads', label: 'Breads', target: 'breads' },
    { key: 'desserts-ice-creams', label: 'Desserts', target: 'desserts-ice-creams' }
  ];

  const sections = [
    {
      id: 'salads',
      navKey: 'salads',
      title: 'Salads',
      subtitle: 'Non Veg & Veg',
      items: [
        { name: 'Grill Chicken Salad', price: '₹299', type: 'nonveg' },
        { name: 'Chinese Chicken Salad', price: '₹299', type: 'nonveg' },
        { name: 'Tandoori Chicken Salad', price: '₹299', type: 'nonveg' },
        { name: 'Lamb Salad', price: '₹349', type: 'nonveg' },
        { name: 'Seafood Salad', price: '₹349', type: 'nonveg' },
        { name: 'Egg & Capsicum Salad', price: '₹179', type: 'egg' },
        { name: 'Green Salad', price: '₹199', type: 'veg' },
        { name: 'Fruit Salad', price: '₹199', type: 'veg' },
        { name: 'Three Bean Salad', price: '₹199', type: 'veg' },
        { name: 'Greek Salad', price: '₹249', type: 'veg' },
        { name: 'Kosambari Salad', price: '₹249', type: 'veg' },
        { name: 'Kimchi Salad', price: '₹299', type: 'veg' },
        { name: 'Aloo Chana Chaat', price: '₹299', type: 'veg' }
      ]
    },
    {
      id: 'soups',
      navKey: 'soups',
      title: 'Soups',
      subtitle: 'Non Veg & Veg',
      items: [
        { name: 'Chicken Manchow Soup', price: '₹229', type: 'nonveg' },
        { name: 'Chicken Hot N Sour Soup', price: '₹229', type: 'nonveg' },
        { name: 'Chicken Corn Soup', price: '₹229', type: 'nonveg' },
        { name: 'Cream of Chicken Soup', price: '₹229', type: 'nonveg' },
        { name: 'Seafood Tom Yum Soup', price: '₹249', type: 'nonveg' },
        { name: 'Garlic Chicken Rasam', price: '₹249', type: 'nonveg' },
        { name: 'Badam Chicken Rasam', price: '₹249', type: 'nonveg' },
        { name: 'Cream of Tomato Soup', price: '₹199', type: 'veg' },
        { name: 'Cream of Broccoli Soup', price: '₹199', type: 'veg' },
        { name: 'Veg Manchow Soup', price: '₹199', type: 'veg' },
        { name: 'Veg Corn Soup', price: '₹199', type: 'veg' },
        { name: 'Veg Hot N Sour Soup', price: '₹199', type: 'veg' },
        { name: 'Veg Lemon Coriander Soup', price: '₹199', type: 'veg' }
      ]
    },
    {
      id: 'tandoori-starters',
      navKey: 'tandoori-starters',
      title: 'Tandoori Starters',
      subtitle: 'Non Veg & Veg',
      items: [
        { name: 'Tandoori Chicken Half/Full', price: '₹459 / ₹859', type: 'nonveg' },
        { name: 'Tangdi Kabab Half/Full', price: '₹199 / ₹399', type: 'nonveg' },
        { name: 'Chicken Tikka', price: '₹399', type: 'nonveg' },
        { name: 'Nawabi Chicken Tikka', price: '₹399', type: 'nonveg' },
        { name: 'Murg Malai Tikka', price: '₹399', type: 'nonveg' },
        { name: 'Chicken Angara Kabab', price: '₹429', type: 'nonveg' },
        { name: 'Murg Kaali Mirch Kabab', price: '₹399', type: 'nonveg' },
        { name: 'Murgh Lazeez Kabab', price: '₹399', type: 'nonveg' },
        { name: 'Chicken Sholay Kabab', price: '₹399', type: 'nonveg' },
        { name: 'Murg Banjara Kabab', price: '₹399', type: 'nonveg' },
        { name: 'Chicken Lollipop Kabab', price: '₹429', type: 'nonveg' },
        { name: 'Gongura Chicken Kabab', price: '₹399', type: 'nonveg' },
        { name: 'Ulavacharu Chicken Kabab', price: '₹399', type: 'nonveg' },
        { name: 'Hari Mirch Chicken Kabab', price: '₹399', type: 'nonveg' },
        { name: 'Chicken Seekh Kabab', price: '₹399', type: 'nonveg' },
        { name: 'Mutton Seekh Kabab', price: '₹499', type: 'nonveg' },
        { name: 'Mutton Awadhi Kebab', price: '₹499', type: 'nonveg' },
        { name: 'Tandoori Fish Tikka', price: '₹399', type: 'nonveg' },
        { name: 'Tandoori Pomfret', price: '₹549', type: 'nonveg' },
        { name: 'Tandoori Prawns', price: '₹599', type: 'nonveg' },
        { name: 'Tandoori Chicken Platter', price: '₹1159', type: 'nonveg', special: true },
        { name: 'Tandoori Mix Non Veg Platter', price: '₹1299', type: 'nonveg', special: true },
        { name: 'Paneer Tikka', price: '₹299', type: 'veg' },
        { name: 'Malai Paneer Tikka', price: '₹299', type: 'veg' },
        { name: 'Tandoori Stuffing Mushroom', price: '₹299', type: 'veg' },
        { name: 'Tandoori Hari Mirch Gobi', price: '₹249', type: 'veg' },
        { name: 'Hara Bhara Kabab', price: '₹199', type: 'veg' },
        { name: 'Tandoori Cheese Malai Broccoli', price: '₹329', type: 'veg' }
      ]
    },
    {
      id: 'chinese-starters',
      navKey: 'chinese-starters',
      title: 'Chinese Starters',
      subtitle: 'Non Veg & Veg',
      items: [
        { name: 'Chicken Drumsticks', price: '₹379', type: 'nonveg' },
        { name: 'Chicken Lollipops', price: '₹379', type: 'nonveg' },
        { name: 'Lemon Chicken', price: '₹399', type: 'nonveg' },
        { name: 'Chicken Spring Roll', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Manchurian', price: '₹349', type: 'nonveg' },
        { name: 'Chilly Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Chicken 65', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Majestic', price: '₹349', type: 'nonveg' },
        { name: 'Murg Kali Mirch Kabab', price: '₹349', type: 'nonveg' },
        { name: 'Ginger Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Chicken 555', price: '₹349', type: 'nonveg' },
        { name: 'Devil Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Red Hot Chicken Wings', price: '₹349', type: 'nonveg' },
        { name: 'Pepper Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Dragon Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Thai Chicken Red', price: '₹349', type: 'nonveg' },
        { name: 'Thai Chicken Green', price: '₹349', type: 'nonveg' },
        { name: 'Mongolian Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Hong Kong Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Kung Pao Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Honey Chilly Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Apollo Fish', price: '₹399', type: 'nonveg' },
        { name: 'Chilly Fish', price: '₹399', type: 'nonveg' },
        { name: 'Fish Manchurian', price: '₹399', type: 'nonveg' },
        { name: 'Fish Mongolian', price: '₹399', type: 'nonveg' },
        { name: 'Ginger Fish', price: '₹399', type: 'nonveg' },
        { name: 'Shanghai Fish', price: '₹399', type: 'nonveg' },
        { name: 'Loose Prawns', price: '₹399', type: 'nonveg' },
        { name: 'Chilly Prawns', price: '₹399', type: 'nonveg' },
        { name: 'Prawns Manchurian', price: '₹399', type: 'nonveg' },
        { name: 'Cheese Corn Roll', price: '₹309', type: 'veg' },
        { name: 'Veg Spring Roll', price: '₹309', type: 'veg' },
        { name: 'Veg Mongolian Balls', price: '₹309', type: 'veg' },
        { name: 'Veg Manchurian', price: '₹309', type: 'veg' },
        { name: 'Corn Kaju Fry', price: '₹229', type: 'veg' },
        { name: 'Corn Kernel', price: '₹229', type: 'veg' },
        { name: 'French Fry', price: '₹199', type: 'veg' },
        { name: 'Paneer 65', price: '₹309', type: 'veg' },
        { name: 'Chilly Paneer', price: '₹309', type: 'veg' },
        { name: 'Paneer Manchurian', price: '₹309', type: 'veg' },
        { name: 'Kaju Fry', price: '₹309', type: 'veg' },
        { name: 'Ginger Paneer', price: '₹309', type: 'veg' },
        { name: 'Schezwan Paneer', price: '₹309', type: 'veg' },
        { name: 'Paneer Majestic', price: '₹309', type: 'veg' },
        { name: 'Classic Mushroom', price: '₹309', type: 'veg' },
        { name: 'Mushroom With Salt And Pepper', price: '₹309', type: 'veg' },
        { name: 'Baby Corn Manchurian', price: '₹309', type: 'veg' },
        { name: 'Baby Corn Majestic', price: '₹309', type: 'veg' },
        { name: 'Baby Corn 65', price: '₹309', type: 'veg' },
        { name: 'Chilly Baby Corn', price: '₹309', type: 'veg' }
      ]
    },
    {
      id: 'south-indian-costal',
      navKey: 'south-indian-costal',
      title: 'South Indian & Coastal Starters',
      subtitle: 'Non Veg & Veg',
      items: [
        { name: 'Konashema Chicken Pakodi', price: '₹349', type: 'nonveg' },
        { name: 'Garlic Chicken Fry', price: '₹349', type: 'nonveg' },
        { name: 'Ginger Chicken Wings', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Chips', price: '₹349', type: 'nonveg' },
        { name: 'Pepper Chicken Dry', price: '₹349', type: 'nonveg' },
        { name: 'Coriander Chicken Dry', price: '₹349', type: 'nonveg' },
        { name: 'Green Chilli Chicken Dry', price: '₹349', type: 'nonveg' },
        { name: 'Curry Leaves Chicken Dry', price: '₹349', type: 'nonveg' },
        { name: 'Guntur Chicken Fry', price: '₹349', type: 'nonveg' },
        { name: 'Mandagini Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Kuchipudi Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Ginger Chicken Dry', price: '₹349', type: 'nonveg' },
        { name: 'Gongura Kodi Vepudu', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Leg Roast', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Ghee Roast', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Sukka', price: '₹349', type: 'nonveg' },
        { name: 'Chettinad Chicken Fry', price: '₹349', type: 'nonveg' },
        { name: 'South Indian Chicken Platter', price: '₹949', type: 'nonveg', special: true },
        { name: 'Mutton Sukka', price: '₹529', type: 'nonveg' },
        { name: 'Mutton Ghee Roast', price: '₹529', type: 'nonveg' },
        { name: 'Mutton Fry', price: '₹529', type: 'nonveg' },
        { name: 'Mutton Roast', price: '₹529', type: 'nonveg' },
        { name: 'Garlic Mutton Fry', price: '₹529', type: 'nonveg' },
        { name: 'Tawa Fish', price: 'Seasonal', type: 'nonveg' },
        { name: 'Fish Fry', price: 'Seasonal', type: 'nonveg' },
        { name: 'Rawa Fish Fry', price: 'Seasonal', type: 'nonveg' },
        { name: 'Fish Sukka', price: 'Seasonal', type: 'nonveg' },
        { name: 'Kuchipudi Fish', price: 'Seasonal', type: 'nonveg' },
        { name: 'Pomfret Fry', price: 'Seasonal', type: 'nonveg' },
        { name: 'Full Fish Fry', price: 'Seasonal', type: 'nonveg' },
        { name: 'Banga Fish Fry', price: '₹429', type: 'nonveg' },
        { name: 'Prawns Fry', price: '₹429', type: 'nonveg' },
        { name: 'Kaju Prawns Pakodi', price: '₹429', type: 'nonveg' },
        { name: 'Prawns Ghee Roast', price: '₹429', type: 'nonveg' },
        { name: 'Neer Dosa', price: '₹99', type: 'veg' },
        { name: 'Appam', price: '₹99', type: 'veg' },
        { name: 'Ginger Mushroom Vepudu', price: '₹329', type: 'veg' },
        { name: 'Baby Corn Roast', price: '₹329', type: 'veg' },
        { name: 'Konaseema Paneer Pakodi', price: '₹329', type: 'veg' },
        { name: 'Paneer Kurkure', price: '₹329', type: 'veg' },
        { name: 'Kaju Mushroom Fried Pakodi', price: '₹329', type: 'veg' },
        { name: 'Stuffing Pan Bajji', price: '₹349', type: 'veg' },
        { name: 'Paneer Ghee Roast', price: '₹349', type: 'veg' },
        { name: 'Pinger Podi Paneer', price: '₹349', type: 'veg' }
      ]
    },
    {
      id: 'egg-starters',
      navKey: 'egg-starters',
      title: 'Egg Starters',
      subtitle: 'Egg Selection',
      items: [
        { name: 'Egg Ghee Roast', price: '₹279', type: 'egg' },
        { name: 'Egg Spring Onion Bujji', price: '₹279', type: 'egg' },
        { name: 'Chilly Egg', price: '₹249', type: 'egg' },
        { name: 'Devil Egg', price: '₹249', type: 'egg' },
        { name: 'Egg Manchurian', price: '₹249', type: 'egg' },
        { name: 'Egg 65', price: '₹249', type: 'egg' }
      ]
    },
    {
      id: 'main-course-nonveg',
      navKey: 'main-course',
      title: 'Main Course Curries',
      subtitle: 'Non-Veg',
      items: [
        { name: 'Afghani Murgh Masala', price: '₹349', type: 'nonveg' },
        { name: 'Butter Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Chatpat', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Tikka Masala', price: '₹349', type: 'nonveg' },
        { name: 'Punjabi Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Palak Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Methi Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Kadhai Chicken', price: '₹349', type: 'nonveg' },
        { name: 'Mughlai Chicken Masala', price: '₹349', type: 'nonveg' },
        { name: 'Murg Adraki', price: '₹349', type: 'nonveg' },
        { name: 'Andhra Chicken Curry', price: '₹349', type: 'nonveg' },
        { name: 'Rayalavari Chicken Curry', price: '₹349', type: 'nonveg' },
        { name: 'Kori Gassi', price: '₹349', type: 'nonveg' },
        { name: 'Kodi Iguru', price: '₹349', type: 'nonveg' },
        { name: 'Drumstick Chicken Curry', price: '₹349', type: 'nonveg' },
        { name: 'Nellore Fish Pulusu', price: 'Seasonal', type: 'nonveg' },
        { name: 'Bommidayalu Igrau', price: 'Seasonal', type: 'nonveg' },
        { name: 'Fish Curry', price: 'Seasonal', type: 'nonveg' },
        { name: 'Prawns Curry', price: '₹399', type: 'nonveg' },
        { name: 'Prawns Iguru', price: '₹449', type: 'nonveg' },
        { name: 'Zinga Masala', price: '₹449', type: 'nonveg' },
        { name: 'Gongura Chicken Curry', price: '₹349', type: 'nonveg' },
        { name: 'Ulavacharu Kodi Kura', price: '₹349', type: 'nonveg' },
        { name: 'Green Chilly Chicken Curry', price: '₹349', type: 'nonveg' },
        { name: 'Curry Leaf Chicken Curry', price: '₹349', type: 'nonveg' },
        { name: 'Ginger Chicken Curry', price: '₹349', type: 'nonveg' },
        { name: 'Mutton Rara Gosht', price: '₹529', type: 'nonveg' },
        { name: 'Mutton Masala', price: '₹529', type: 'nonveg' },
        { name: 'Andhra Mutton Curry', price: '₹529', type: 'nonveg' },
        { name: 'Mutton Lajawab', price: '₹529', type: 'nonveg' },
        { name: 'Mutton Duganwala', price: '₹529', type: 'nonveg' },
        { name: 'Keema Masala', price: '₹529', type: 'nonveg' },
        { name: 'Mutton Gassi', price: '₹529', type: 'nonveg' },
        { name: 'Prawns Masala', price: '₹399', type: 'nonveg' },
        { name: 'Egg Masala', price: '₹249', type: 'egg' }
      ]
    },
    {
      id: 'main-course-veg',
      navKey: 'main-course',
      title: 'Main Course Curries',
      subtitle: 'Veg',
      items: [
        { name: 'Dal Tadka', price: '₹249', type: 'veg' },
        { name: 'Dal Fry', price: '₹249', type: 'veg' },
        { name: 'Methi Dal', price: '₹249', type: 'veg' },
        { name: 'Palak Dal', price: '₹249', type: 'veg' },
        { name: 'Tomato Dal', price: '₹249', type: 'veg' },
        { name: 'Paneer Butter Masala', price: '₹349', type: 'veg' },
        { name: 'Kadhai Paneer', price: '₹349', type: 'veg' },
        { name: 'Paneer Chatpata', price: '₹349', type: 'veg' },
        { name: 'Paneer Finger Masala', price: '₹349', type: 'veg' },
        { name: 'Methi Paneer', price: '₹349', type: 'veg' },
        { name: 'Palak Paneer', price: '₹349', type: 'veg' },
        { name: 'Baby Corn Masala', price: '₹329', type: 'veg' },
        { name: 'Mushroom Masala', price: '₹329', type: 'veg' },
        { name: 'Kadhai Baby Corn Mushroom', price: '₹329', type: 'veg' },
        { name: 'Paneer Corn Bhurji', price: '₹329', type: 'veg' },
        { name: 'Meloni Sabzi', price: '₹329', type: 'veg' },
        { name: 'Veg Korma', price: '₹329', type: 'veg' },
        { name: 'Paneer Tikka Masala', price: '₹349', type: 'veg' },
        { name: 'Malai Kofta', price: '₹349', type: 'veg' },
        { name: 'Veg Kofta', price: '₹329', type: 'veg' },
        { name: 'Veg Kolhapuri', price: '₹329', type: 'veg' },
        { name: 'Veg Jaipuri', price: '₹329', type: 'veg' },
        { name: 'Kaju Masala', price: '₹349', type: 'veg' },
        { name: 'Aloo Capsicum Masala', price: '₹299', type: 'veg' },
        { name: 'Jeera Aloo', price: '₹249', type: 'veg' },
        { name: 'Paneer Begum Babar', price: '₹349', type: 'veg' },
        { name: 'Kadhai Veg', price: '₹349', type: 'veg' }
      ]
    },
    {
      id: 'fried-rice-noodles',
      navKey: 'fried-rice-noodles',
      title: 'Fried Rice & Noodles',
      subtitle: 'Non Veg & Veg',
      items: [
        { name: 'Schezwan Chicken Fried Rice', price: '₹329', type: 'nonveg' },
        { name: 'Egg Fried Rice', price: '₹279', type: 'egg' },
        { name: 'Schezwan Egg Fried Chicken', price: '₹389', type: 'nonveg' },
        { name: 'Mancho Chicken Fried Rice', price: '₹399', type: 'nonveg' },
        { name: 'Mix Non Veg Fried Rice', price: '₹349', type: 'nonveg' },
        { name: 'Seafood Fried Rice', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Soft Noodles', price: '₹299', type: 'nonveg' },
        { name: 'Chicken Hakka Noodles', price: '₹329', type: 'nonveg' },
        { name: 'Schezwan Chicken Noodles', price: '₹329', type: 'nonveg' },
        { name: 'Singapore Chicken Noodles', price: '₹339', type: 'nonveg' },
        { name: 'American Chopsuey', price: '₹339', type: 'nonveg' },
        { name: 'Veg Fried Rice', price: '₹389', type: 'veg' },
        { name: 'Schezwan Veg Fried Rice', price: '₹299', type: 'veg' },
        { name: 'Veg Manchow Fried Rice', price: '₹299', type: 'veg' },
        { name: 'Corn Fried Rice', price: '₹299', type: 'veg' }
      ]
    },
    {
      id: 'biryant',
      navKey: 'biryant',
      title: 'Biryani',
      subtitle: 'Non Veg & Veg',
      items: [
        { name: 'Chicken Biryani (Nati Style)', price: '₹349', type: 'nonveg' },
        { name: 'Hyderabadi Chicken Dum Biryani', price: '₹349', type: 'nonveg' },
        { name: 'Hyderabadi Mutton Dum Biryani', price: '₹429', type: 'nonveg' },
        { name: 'Mutton Biryani (Nati Style)', price: '₹429', type: 'nonveg' },
        { name: 'Fried Chicken Biryani', price: '₹349', type: 'nonveg' },
        { name: 'Mughlai Chicken Biryani', price: '₹349', type: 'nonveg' },
        { name: 'Joint Roast Chicken Biryani', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Tikka Biryani', price: '₹379', type: 'nonveg' },
        { name: 'Chicken Tandoori Leg Biryani', price: '₹379', type: 'nonveg' },
        { name: 'Spl Chicken Biryani', price: '₹399', type: 'nonveg', special: true },
        { name: 'Fried Mutton Biryani', price: '₹429', type: 'nonveg' },
        { name: 'Spl Mutton Biryani', price: '₹449', type: 'nonveg', special: true },
        { name: 'Fish Biryani', price: '₹449', type: 'nonveg' },
        { name: 'Prawns Biryani', price: '₹449', type: 'nonveg' },
        { name: 'Veg Dum Biryani', price: '₹399', type: 'veg' },
        { name: 'Kaju Biryani', price: '₹349', type: 'veg' },
        { name: 'Mushroom Biryani', price: '₹299', type: 'veg' },
        { name: 'Baby Corn Biryani', price: '₹249', type: 'veg' },
        { name: 'Paneer Biryani', price: '₹279', type: 'veg' },
        { name: 'Andhra Veg Pulao', price: '₹329', type: 'veg' },
        { name: 'Curd Rice', price: '₹199', type: 'veg' },
        { name: 'Chicken Sambar Rice', price: '₹299', type: 'nonveg' },
        { name: 'Sambar Rice', price: '₹199', type: 'veg' },
        { name: 'White Rice', price: '₹149', type: 'veg' },
        { name: 'Jeera Rice', price: '₹199', type: 'veg' }
      ]
    },
    {
      id: 'non-veg-wet',
      navKey: 'wet',
      title: 'Non Veg Wet',
      subtitle: 'Signature Saucy Plates',
      items: [
        { name: 'Chilly Chicken Wet', price: '₹349', type: 'nonveg' },
        { name: 'Chicken Manchurian Wet', price: '₹349', type: 'nonveg' },
        { name: 'Ginger Chicken Wet', price: '₹349', type: 'nonveg' }
      ]
    },
    {
      id: 'veg-wet',
      navKey: 'wet',
      title: 'Veg Wet',
      subtitle: 'Signature Saucy Plates',
      items: [
        { name: 'Ginger Paneer Wet', price: '₹349', type: 'veg' },
        { name: 'Chilly Paneer Wet', price: '₹339', type: 'veg' },
        { name: 'Baby Corn Manchurian Wet', price: '₹339', type: 'veg' },
        { name: 'Chilly Baby Corn Wet', price: '₹339', type: 'veg' }
      ]
    },
    {
      id: 'pasta',
      navKey: 'pasta',
      title: 'Pasta',
      subtitle: 'Non Veg & Veg',
      items: [
        { name: 'Chicken Arrabiata', price: '₹399', type: 'nonveg' },
        { name: 'Chicken Alfredo Pasta (White Sauce)', price: '₹399', type: 'nonveg' },
        { name: 'Pasta (Red Sauce)', price: '₹399', type: 'veg' },
        { name: 'Spinach Corn Pasta', price: '₹349', type: 'veg' },
        { name: 'Macaroni Alfredo Pasta', price: '₹349', type: 'veg' },
        { name: 'Penne Pasta (White Sauce)', price: '₹349', type: 'veg' },
        { name: 'Penne Pasta (Pink Sauce)', price: '₹349', type: 'veg' }
      ]
    },
    {
      id: 'breads',
      navKey: 'breads',
      title: 'Breads',
      subtitle: 'Non Veg & Veg',
      items: [
        { name: 'Chicken Keema Paratha', price: '₹149', type: 'nonveg' },
        { name: 'Mutton Keema Paratha', price: '₹179', type: 'nonveg' },
        { name: 'Tandoori Roti', price: '₹79', type: 'veg' },
        { name: 'Butter Roti', price: '₹89', type: 'veg' },
        { name: 'Plain Naan', price: '₹79', type: 'veg' },
        { name: 'Butter Naan', price: '₹99', type: 'veg' },
        { name: 'Garlic Naan', price: '₹109', type: 'veg' },
        { name: 'Pulka', price: '₹99', type: 'veg' },
        { name: 'Ghee Pulka', price: '₹129', type: 'veg' },
        { name: 'Lacha Paratha', price: '₹99', type: 'veg' },
        { name: 'Aloo Paratha', price: '₹109', type: 'veg' },
        { name: 'Pudina Paratha', price: '₹109', type: 'veg' },
        { name: 'Paneer Paratha', price: '₹119', type: 'veg' },
        { name: 'Plain Kulcha', price: '₹99', type: 'veg' },
        { name: 'Pudina Kulcha', price: '₹109', type: 'veg' }
      ]
    },
    {
      id: 'desserts-ice-creams',
      navKey: 'desserts-ice-creams',
      title: 'Desserts & Ice Creams',
      subtitle: 'Sweet Finish',
      items: [
        { name: 'Apricot Whisper', price: '₹299', type: 'veg', special: true },
        { name: 'Brownie With Ice Cream', price: '₹299', type: 'veg', special: true },
        { name: 'Dablka Metta', price: '₹229', type: 'veg' },
        { name: 'Carrot Halwa', price: '₹199', type: 'veg' },
        { name: 'Gulab Jamun (2pc)', price: '₹199', type: 'veg' }
      ]
    }
  ];

  const renderPills = () => {
    pillsRoot.innerHTML = pillConfig
      .map((pill, index) => {
        const activeClass = index === 0 ? ' is-active' : '';
        return '<button class="menu-pill' + activeClass + '" type="button" data-target="' + pill.target + '" data-key="' + pill.key + '">' + pill.label + '</button>';
      })
      .join('');
  };

  const formatPrice = (price) => {
    if (price.toLowerCase() === 'seasonal') {
      return '<span class="menu-price menu-price--seasonal">Seasonal</span>';
    }
    return '<span class="menu-price">' + price + '</span>';
  };

  const renderSections = () => {
    sectionsRoot.innerHTML = sections
      .map((section, i) => {
        const items = section.items
          .map((item) => {
            const special = item.special ? '<span class="menu-special">✦ Special</span>' : '';
            return (
              '<article class="menu-item" data-name="' + item.name.toLowerCase() + '" data-type="' + item.type + '">' +
                special +
                '<div class="menu-item__row">' +
                  '<span class="menu-dot menu-dot--' + item.type + '" aria-hidden="true"></span>' +
                  '<h3>' + item.name + '</h3>' +
                  formatPrice(item.price) +
                '</div>' +
              '</article>'
            );
          })
          .join('');

        return (
          '<section class="menu-section" id="' + section.id + '" data-number="' + String(i + 1).padStart(2, '0') + '" data-nav-key="' + section.navKey + '">' +
            '<header class="menu-section__head">' +
              '<h2>' + section.title + '</h2>' +
              '<p>' + section.subtitle + '</p>' +
            '</header>' +
            '<div class="menu-grid">' + items + '</div>' +
          '</section>'
        );
      })
      .join('');
  };

  const setActivePill = (key) => {
    const all = Array.from(document.querySelectorAll('.menu-pill'));
    all.forEach((pill) => {
      const isActive = pill.dataset.key === key;
      pill.classList.toggle('is-active', isActive);
      if (isActive) {
        pill.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      }
    });
  };

  const initPillNavigation = () => {
    const pills = Array.from(document.querySelectorAll('.menu-pill'));
    const navOffset = () => (document.querySelector('.nav')?.offsetHeight || 0) + 84;

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const targetId = pill.dataset.target;
        if (!targetId) return;
        const target = document.getElementById(targetId);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - navOffset();
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    const sectionNodes = Array.from(document.querySelectorAll('.menu-section'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.getAttribute('data-nav-key');
          if (!key) return;
          setActivePill(key);
        });
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.1 }
    );

    sectionNodes.forEach((section) => observer.observe(section));
  };

  const applySearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    const allItems = Array.from(document.querySelectorAll('.menu-item'));
    const allSections = Array.from(document.querySelectorAll('.menu-section'));

    let visibleCount = 0;

    allItems.forEach((item) => {
      const name = item.dataset.name || '';
      const matched = !query || name.includes(query);
      item.style.display = matched ? 'block' : 'none';
      if (matched) visibleCount += 1;
    });

    allSections.forEach((section) => {
      const visibleItems = section.querySelectorAll('.menu-item[style="display: block;"]').length;
      section.style.display = visibleItems === 0 && query ? 'none' : 'block';
    });

    noResults.hidden = visibleCount > 0;
    clearButton.hidden = !query;
  };

  renderPills();
  renderSections();
  initPillNavigation();

  searchInput.addEventListener('input', applySearch);
  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    applySearch();
    searchInput.focus();
  });
})();
