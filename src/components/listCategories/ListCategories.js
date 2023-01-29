import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const ListCategories = () => {

    const [categories, setCategories] = useState([]);
    
    const navigate = useNavigate()
    const category =[]
    const [deleteStatus, setDeleteStatus] = useState(false)


    // const navigate = useNavigate();


    useEffect(() => {

        async function getList() {
            fetch('https://books-api-production-4673.up.railway.app/api/v1/categories',

            )
                .then((response) => response.json())
                .then((data) => {
                    setCategories(data.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        getList()
    }, [deleteStatus]);


    return (

        <div className='w-[70%] grid grid-rows-2'>
            <ul className='mt-10 ml-5 grid grid-cols-3 gap-5'>
                {

                    categories.map((item, index) => {
                        return (

                            <button key={index} className="group w-fit-content bg-[#F5F5F5] cursor-pointer focus:text-white focus:bg-primary-color rounded-md text-black hover:ring p-4 text-base font-normal drop-shadow-md" onClick={() => {
                                
                                category.id = item.id
                                category.title = item.title
                                category.description = item.description
                                category.books = item.books
                            
                            }}>
                                {item.title}
                                <span className='group-focus:ml-3 group-focus:text-red-400 invisible group-focus:visible pl justify-self-end' onClick={() => {
                                    console.log("deleting the category...", item.id)
                                    fetch('https://books-api-production-4673.up.railway.app/api/v1/categories/' + item.id,
                                        {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        }
                                    )
                                        .then((response) => {
                                            if (!response.ok) {
                                                throw new Error("Something is wrong");
                                            }
                                            setDeleteStatus(!deleteStatus)
                                            alert("Deleted Successfully!!")
                                        })
                                        .catch((err) => {
                                            console.log(err.message);
                                        });
                                }}>X</span>
                            </button>

                        )
                    })
                }
            </ul>

            <span className='mt-10 ml-5'> <button className='w-fit-content bg-white cursor-pointer focus:text-white focus:bg-primary-color rounded-md text-blue-400 hover:text-primary-color ring hover:ring-blue hover:ring-primary-color p-4 text-base font-normal drop-shadow-md' onClick={()=>{
                    navigate('/viewCategory', { state: {
                                    category: category,
                                }})
            }}>View Category</button></span>

        </div>
    )
}

export default ListCategories