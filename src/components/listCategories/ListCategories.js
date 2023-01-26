import { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';


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


        <ul  className='ml-5 flex gap-5'>
            {

                categories.map((item, index) => {
                    return (
                        <button key={index} className="group w-fit-content bg-[#F5F5F5] cursor-pointer focus:text-white focus:bg-primary-color rounded-md text-black hover:ring p-4 text-base font-normal"  onClick={()=>{
                          
                        //     navigate('/addCategory', { state: {
                        //     id: item.id,
                        // }})
                    }}>
                            {item.title}
                            <Link className='group-focus:ml-3 group-focus:text-red-400 invisible group-focus:visible' onClick={() => {
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
                            }}>X</Link>
                            
                        </button>
                    )
                })
            }
        </ul>
    )
}

export default ListCategories