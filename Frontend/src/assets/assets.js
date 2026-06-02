import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'
import menu_9 from './menu_9.png'

import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'
import food_9 from './food_9.png'
import food_10 from './food_10.png'
import food_11 from './food_11.png'
import food_12 from './food_12.png'
import food_13 from './food_13.png'
import food_14 from './food_14.png'
import food_15 from './food_15.png'
import food_16 from './food_16.png'
import food_17 from './food_17.png'
import food_18 from './food_18.png'
import food_19 from './food_19.png'
import food_20 from './food_20.png'
import food_21 from './food_21.png'
import food_22 from './food_22.png'
import food_23 from './food_23.png'
import food_24 from './food_24.png'
import food_25 from './food_25.png'
import food_26 from './food_26.png'
import food_27 from './food_27.png'
import food_28 from './food_28.png'
import food_29 from './food_29.png'
import food_30 from './food_30.png'
import food_31 from './food_31.png'
import food_32 from './food_32.png'
import food_33 from './food_33.png'
import food_34 from './food_34.png'
import food_35 from './food_35.png'
import food_36 from './food_36.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Rice",
        menu_image: menu_1
    },
    {
        menu_name: "Soups",
        menu_image: menu_2
    },
    {
        menu_name: "Swallow",
        menu_image: menu_3
    },
    {
        menu_name: "Grills",
        menu_image: menu_4
    },
    {
        menu_name: "Nigerian Specials",
        menu_image: menu_5
    },
    {
        menu_name: "Pasta",
        menu_image: menu_6
    },
    {
        menu_name: "Noodles",
        menu_image: menu_7
    },
    {
        menu_name: "Sandwich",
        menu_image: menu_8
    },
    {
        menu_name: "Desserts",
        menu_image: menu_9
    }
]

export const food_list = [
    // RICE (food_1 to food_4)
    {
        _id: "1",
        name: "Chinese Rice",
        image: food_1,
        price: 2200,
        description: "Fried rice with mixed vegetables. High in carbs for energy, contains fiber and vitamins",
        category: "Rice"
    },
    {
        _id: "2",
        name: "Jollof Rice",
        image: food_2,
        price: 2400,
        description: "Classic Nigerian jollof with tomato sauce. Rich in carbs, vitamins A & C from tomatoes",
        category: "Rice"
    },
    {
        _id: "3",
        name: "Coconut Rice",
        image: food_3,
        price: 2100,
        description: "Rice in coconut milk with spices. Provides healthy fats and sustained energy",
        category: "Rice"
    },
    {
        _id: "4",
        name: "Ofada Rice",
        image: food_4,
        price: 2800,
        description: "Local rice with green pepper sauce. High in fiber, aids digestion and heart health",
        category: "Rice"
    },

    // SOUPS (food_5 to food_8)
    {
        _id: "5",
        name: "Efo Riro",
        image: food_5,
        price: 2300,
        description: "Spinach stew with assorted meat. Rich in iron, vitamins A, C, and protein",
        category: "Soups"
    },
    {
        _id: "6",
        name: "Egusi Soup",
        image: food_6,
        price: 2500,
        description: "Melon seed soup with vegetables. High in protein, healthy fats and minerals",
        category: "Soups"
    },
    {
        _id: "7",
        name: "Banga Soup",
        image: food_7,
        price: 2700,
        description: "Palm nut soup with catfish. Contains healthy oils, omega-3 and vitamins",
        category: "Soups"
    },
    {
        _id: "8",
        name: "Pepper Soup",
        image: food_8,
        price: 2000,
        description: "Spicy goat meat soup with herbs. Boosts immunity and aids digestion",
        category: "Soups"
    },

    // SWALLOW (food_9 to food_12)
    {
        _id: "9",
        name: "Pounded Yam & Egusi",
        image: food_9,
        price: 3000,
        description: "Smooth pounded yam with egusi soup. High in carbs, fiber and complete protein",
        category: "Swallow"
    },
    {
        _id: "10",
        name: "Eba & Efo Riro",
        image: food_10,
        price: 2500,
        description: "Garri eba with vegetable soup. Good source of energy, iron and vitamins",
        category: "Swallow"
    },
    {
        _id: "11",
        name: "Amala & Ewedu",
        image: food_11,
        price: 2600,
        description: "Yam flour with jute leaf soup. Rich in fiber, aids digestion and gut health",
        category: "Swallow"
    },
    {
        _id: "12",
        name: "Fufu & Okra Soup",
        image: food_12,
        price: 2800,
        description: "Cassava fufu with okra soup. Provides energy, mucilage for digestive health",
        category: "Swallow"
    },

    // GRILLS (food_13 to food_16)
    {
        _id: "13",
        name: "Grilled Chicken",
        image: food_13,
        price: 3500,
        description: "Seasoned grilled chicken. High in lean protein, supports muscle growth",
        category: "Grills"
    },
    {
        _id: "14",
        name: "Grilled Tilapia",
        image: food_14,
        price: 4000,
        description: "Whole grilled tilapia with peppers. Rich in omega-3, protein and minerals",
        category: "Grills"
    },
    {
        _id: "15",
        name: "Asun (Goat Meat)",
        image: food_15,
        price: 3800,
        description: "Spicy grilled goat meat. High in protein, iron and vitamin B12",
        category: "Grills"
    },
    {
        _id: "16",
        name: "Peppered Gizzard",
        image: food_16,
        price: 2500,
        description: "Spicy grilled gizzard. Good source of protein, zinc and B vitamins",
        category: "Grills"
    },

    // NIGERIAN SPECIALS (food_17 to food_20)
    {
        _id: "17",
        name: "Moi Moi",
        image: food_17,
        price: 1500,
        description: "Steamed bean pudding with eggs. High in plant protein and fiber",
        category: "Nigerian Specials"
    },
    {
        _id: "18",
        name: "Pap & Bean Cake",
        image: food_18,
        price: 1200,
        description: "Corn pudding with fried bean cakes. Provides energy and essential nutrients",
        category: "Nigerian Specials"
    },
    {
        _id: "19",
        name: "Suya",
        image: food_19,
        price: 2000,
        description: "Spicy grilled beef skewers. Rich in protein, iron and B vitamins",
        category: "Nigerian Specials"
    },
    {
        _id: "20",
        name: "Plantain & Beans",
        image: food_20,
        price: 1800,
        description: "Ripe plantain with beans stew. Balanced carbs, fiber and plant protein",
        category: "Nigerian Specials"
    },

    // PASTA (food_21 to food_24)
    {
        _id: "21",
        name: "Cheese Pasta",
        image: food_21,
        price: 2500,
        description: "Creamy cheese pasta. Good source of calcium, protein and energy",
        category: "Pasta"
    },
    {
        _id: "22",
        name: "Tomato Pasta",
        image: food_22,
        price: 2300,
        description: "Classic pasta in tomato sauce. Contains lycopene and antioxidants",
        category: "Pasta"
    },
    {
        _id: "23",
        name: "Creamy Pasta",
        image: food_23,
        price: 2800,
        description: "Fettuccine in white sauce with chicken. High in protein and calcium",
        category: "Pasta"
    },
    {
        _id: "24",
        name: "Chicken Pasta",
        image: food_24,
        price: 3000,
        description: "Pasta with grilled chicken. Balanced protein, carbs and nutrients",
        category: "Pasta"
    },

    // NOODLES (food_25 to food_28)
    {
        _id: "25",
        name: "Butter Noodles",
        image: food_25,
        price: 2000,
        description: "Simple butter noodles. Quick energy source with healthy fats",
        category: "Noodles"
    },
    {
        _id: "26",
        name: "Veg Noodles",
        image: food_26,
        price: 2200,
        description: "Stir-fried noodles with vegetables. Rich in fiber and vitamins",
        category: "Noodles"
    },
    {
        _id: "27",
        name: "Somen Noodles",
        image: food_27,
        price: 2500,
        description: "Japanese thin wheat noodles. Light, easily digestible carbs",
        category: "Noodles"
    },
    {
        _id: "28",
        name: "Cooked Noodles",
        image: food_28,
        price: 2300,
        description: "Classic seasoned noodles. Provides quick energy and B vitamins",
        category: "Noodles"
    },

    // SANDWICH (food_29 to food_32)
    {
        _id: "29",
        name: "Chicken Sandwich",
        image: food_29,
        price: 2200,
        description: "Grilled chicken sandwich. High in protein, low in fat",
        category: "Sandwich"
    },
    {
        _id: "30",
        name: "Vegan Sandwich",
        image: food_30,
        price: 1800,
        description: "Vegetable sandwich with hummus. Plant-based protein and fiber",
        category: "Sandwich"
    },
    {
        _id: "31",
        name: "Grilled Sandwich",
        image: food_31,
        price: 2400,
        description: "Toasted sandwich with cheese. Good source of calcium and protein",
        category: "Sandwich"
    },
    {
        _id: "32",
        name: "Bread Sandwich",
        image: food_32,
        price: 2000,
        description: "Classic fresh sandwich. Balanced carbs and nutrients",
        category: "Sandwich"
    },

    // DESSERTS (food_33 to food_36)
    {
        _id: "33",
        name: "Cup Cake",
        image: food_33,
        price: 1500,
        description: "Delicious cupcake with frosting. Quick energy boost treat",
        category: "Desserts"
    },
    {
        _id: "34",
        name: "Vegan Cake",
        image: food_34,
        price: 2000,
        description: "Plant-based cake. No dairy, healthier dessert option",
        category: "Desserts"
    },
    {
        _id: "35",
        name: "Butterscotch Cake",
        image: food_35,
        price: 2200,
        description: "Rich butterscotch layered cake. Sweet indulgent treat",
        category: "Desserts"
    },
    {
        _id: "36",
        name: "Sliced Cake",
        image: food_36,
        price: 1800,
        description: "Fresh cake with creamy frosting. Perfect celebration dessert",
        category: "Desserts"
    }
]