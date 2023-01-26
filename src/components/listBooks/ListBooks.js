import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ListBooks = () => {
    const [books, setBooks] = useState([])
    const [deleteStatus, setDeleteStatus] = useState(false)


    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://books-api-production-4673.up.railway.app/api/v1/books',)
            .then((response) => response.json())
            .then((data) => {
                setBooks(data.data)
                console.log(data.data)
            }).catch((err) => {
                console.log(err.message)
            })
    }, [deleteStatus])
    return (
        <ul>
            {books.map((items, index) => {
                return (
                    <li key={index} className="flex gap-3">
                        <p>{index + 1}</p>
                        <p>{items.title}</p>
                        <p>{items.author}</p>
                        <p>{items.publishedOn}</p>
                        <button className='ml-3 italic text-red-400' onClick={() => {
                            console.log("deleting the category...", items.id)
                            fetch('https://books-api-production-4673.up.railway.app/api/v1/books/' + items.id,
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
                        <button className='ml-3 italic text-blue-400' onClick={() => navigate('/addBook', {
                            state: {
                                id: items.id,
                            }
                        })}>Edit</button>
                        <button className='ml-3 italic text-purple-400' onClick={()=> navigate('/addBookToCategory',{
                            state: {
                                book: items,
                            }
                        })}>Add to Category</button>
                    </li>
                )
            })}
        </ul>
    )
}

export default ListBooks