import { useEffect, useState } from 'react'
import { Navigate, useNavigate} from 'react-router-dom';


const ListCategories = () => {

    const [categories, setCategories] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState(false)


    const navigate = useNavigate();


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


        <ul>
            {

                categories.map((item, index) => {
                    return (
                        <li key={index} className="flex gap-3">
                            <p>{index + 1}</p>
                            <p >{item.title}</p>
                            <p>{item.description}</p>
                            <button className='ml-3 italic text-red-400' onClick={() => {
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
                            }}>Delete</button>
                            <button className='ml-3 italic text-blue-400' onClick={()=>navigate('/addCategory', { state: {
                                id: item.id,
                            }})}>Edit</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ListCategories