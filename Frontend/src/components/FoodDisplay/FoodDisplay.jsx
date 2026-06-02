import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list } = useContext(StoreContext)
    // Define the category order
    const categoryOrder = {
        "Rice": 1,
        "Soups": 2,
        "Swallow": 3,
        "Grills": 4,
        "Nigerian Specials": 5,
        "Pasta": 6,
        "Noodles": 7,
        "Sandwich": 8,
        "Desserts": 9
    };

    // Sort food items by category order, then by _id (insertion order)
    const sortedFoodList = [...food_list].sort((a, b) => {
        const categoryDiff = (categoryOrder[a.category] || 999) - (categoryOrder[b.category] || 999);
        if (categoryDiff !== 0) return categoryDiff;
        // If same category, maintain insertion order (compare _id as strings)
        return a._id.localeCompare(b._id);
    });
    
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {sortedFoodList.map((item,index)=>{
            if (category==="All" || category===item.category) {
                return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            }
            
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
