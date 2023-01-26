import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AddBookToCategory = () => {

    const [categories, setCategories] = useState([]);
    const location = useLocation()
    const navigate = useNavigate()
    const book = location.state.book
   
    const url = "https://books-api-production-4673.up.railway.app/api/v1/categories"

    useEffect(() => {


        fetch(url,
        )
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
        , []);

    //    function TaskHandler(id, bookId){
    //     const bookObj ={}
    //     bookObj.id = id
    //     console.log(bookObj)

    //       useEffect(()=>{
    //             fetch(url + `/${id}/books`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(bookObj),
    //             })
    //             .then(resp => {
    //                 console.log("catResponse", resp.json())
    //                 if(resp.status === 200){
    //                         alert("Succcessful")
    //                 }
    //             })
    //             .catch((e)=>{
    //                 console.log(e.message)
    //             })
    //       })
    //    }

    const [id, setId] = useState("")
    
    // bookObj.id = id
    // console.log(bookObj)

    useEffect(() => {
        
        const bookObj = {}
        bookObj.id = book.id
        if(id){
            console.log(url + `/${id}/books`)
            fetch(url + `/${id}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookObj),
            })
                .then(resp => {
                    resp.json()
                    if (resp.status === 201) {
                        alert("Succcessful")
                        navigate('/books')
                    }
                    console.log(resp)
                })
                .catch((e) => {
                    console.log(e.message)
                })
        }else{
            console.log("welcome to add book to category page")
        }
     
    },[id, book.id, navigate])


    return (
        < >
            <div className='flex gap-3'>
                <p>{book.title}</p>
                <p>{book.author}</p>
                <p>{book.publishedOn}</p>
            </div>
            <div className='flex mt-5'>
                <h1 className='text-[#8EAEFF] text-4xl'>Add to:</h1>
                <ul className='ml-5 flex gap-5'>
                    {categories.map((items, index) => {
                        return (
                            <button key={index} className="w-fit-content bg-[#F5F5F5] cursor-pointer focus:text-white focus:bg-primary-color rounded-md text-black hover:ring p-4 text-base foont-normal" onClick={() => { setId(items.id) }}>{items.title}</button>
                        )
                    })}
                </ul>
            </div>

        </>
    )

}

export default AddBookToCategory