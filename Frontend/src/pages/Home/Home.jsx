import React, {useState, useContext} from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import Loader from '../../components/Loader/Loader'
import { StoreContext } from '../../context/StoreContext'

const Home = () => {
    const [category,setCategory] = useState("All");
    const {food_list} = useContext(StoreContext);

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      {food_list.length === 0 ? <Loader /> : <FoodDisplay category={category}/>}
      <AppDownload />
    </div>
  )
}

export default Home
