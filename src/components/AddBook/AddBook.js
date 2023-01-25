import { useState, useEffect } from 'react'

import moment from 'moment'
import { useLocation, useNavigate } from 'react-router-dom';

const AddBook = () => {
    const intialValues = { title: "", author: "", publishedOn: "" };
    const [formValues, setFormValues] = useState(intialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isNew, setIsNew] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    const url = "https://books-api-production-4673.up.railway.app/api/v1/books"

    useEffect(() => {
        const intialValues = { title: "", author: "", publishedOn: "" }
        if (location.state) {
            fetch(url + "/" + location.state.id)
                .then(response => response.json())
                .then(data => {
                    // data.data.publishedOn = moment(data.data.publishedOn).format('YYYY-MM-DD')
                    intialValues.author = data.data.author
                    intialValues.title = data.data.title
                    intialValues.publishedOn = data.data.publishedOn
                    setFormValues(intialValues)
                    setIsNew(false)
                }).catch((e)=>{
                    console.log(e.message)
                })
        } else {
            setFormValues(intialValues)
        }

    }, [location.state])


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    }
    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
        }
    }, [formErrors, isSubmit, formValues])

    const validate = (values) => {
        const errors = {}
        if (!values.title) {
            errors.title = "title is required"
        } else if (values.title.length < 3) {
            errors.title = "title most be more than 3 characters"
        }

        if (!values.author) {
            errors.author = "author is required"
        } else if (values.author.length < 3) {
            errors.author = "author most be more than 3 characters"
        }

        if (!values.publishedOn) {
            errors.publishedOn = "date is required"
        }
        return errors

    }

    const postForm = () => {
        formValues.publishedOn = moment(formValues.publishedOn).format('DD/MM/YYYY')
        if (isNew) {
        
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(formValues)
            }
            )
                .then((response) => {
                    console.log("response", response)
                    if (response.status === 201) {
                        alert("success")
                        navigate('/books')
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
           
            fetch(url + "/" + location.state.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(formValues)
            }
            )
                .then((response) => {
                    console.log("response", response)
                  
                    if (response.status === 200) {
                        alert("success")
                        navigate('/books')
                    } 
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }


    return (
        <>
            {(Object.keys(formErrors).length === 0 && isSubmit) ? <div>Book added successfully</div> : <pre>{JSON.stringify(formValues, undefined, 2)}</pre>}

            <form className='w-[60%] max-w-lg mt-4' onSubmit={handleSubmit}>
                <h1 className='mb-3 leading-normal font-medium text-lg'>Add to Book</h1>
                <div className='ml-4'>
                    <div className='mb-8 text-base'>
                        <label className='block mb-2'>Title:</label>
                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-black rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-10" type="text"
                            name="title"
                            placeholder='title'
                            onChange={handleChange}
                            value={formValues.title} />
                        <p>{formErrors.title}</p>
                    </div>

                    <div className='mb-8 text-base'>
                        <label className='block mb-2'>Author:</label>
                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-black rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-10" type="text"
                            name="author"
                            placeholder='author'
                            onChange={handleChange}
                            value={formValues.author} />
                        <p>{formErrors.author}</p>
                    </div>

                    <div className='mb-8 text-base'>
                        <label className='block mb-2'>Date:</label>
                        <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-black rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-10" type="date"
                            name="publishedOn"
                            onChange={handleChange}
                            value={formValues.publishedOn} />
                        <p>{formErrors.publishedOn}</p>
                    </div>

                    <button className='w-32 h-10 bg-primary-color mt-3 rounded-md text-white' onClick={postForm}>Add</button>
                </div>
            </form>
        </>
    )
}

export default AddBook