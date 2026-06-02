import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader'


const List = ({url}) => {


    const [list, setList] = useState([]);

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

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        if (response.data.success) {
            // Sort the data before setting state
            const sortedData = [...response.data.data].sort((a, b) => {
                const categoryDiff = (categoryOrder[a.category] || 999) - (categoryOrder[b.category] || 999);
                if (categoryDiff !== 0) return categoryDiff;
                // If same category, maintain insertion order (compare _id as strings)
                return a._id.localeCompare(b._id);
            });
            setList(sortedData);
        }
        else {
            toast.error("error")
        }
    }

    const removeFood = async(foodId) => {
        const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message)
        }else {
            toast.error("error")
        }
    }

    useEffect(()=>{
        fetchList();
    },[])

  return (
    <div className='list add flex-col'>
    <p>All Foods List</p>
    {list.length === 0 ? (
      <Loader />
    ) : (
    <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=> {
            return (
                <div key={index} className='list-table-format'>
                    <img src={`${url}/images/` + item.image} alt={item.name} loading="lazy" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>₦{item.price}</p>
                    <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                </div>
            )
        })}
    </div>
    )}
    </div>
  )
}

export default List
