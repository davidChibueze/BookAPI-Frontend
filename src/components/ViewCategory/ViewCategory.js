
import { useLocation } from 'react-router-dom'


const ViewCategory = () => {

    const location = useLocation()
    const category = location.state.category
    console.log(category.books)
    
    

    return (

        <div className='mt-5'>
            <h2 className="font-bold text-4xl leading-loose font-['Merriweather'] text-primary-color">{category.title}</h2>
            <p className="mb-7 text-lg text-[#BEBEBE] leading-relaxed font-['Inter'] font-normal">{category.description}</p>

            <h2 className="font-bold text-4xl leading-loose font-['Merriweather'] text-primary-color">Books</h2>
            { category.books.length !== 0 ?
              category.books.map((book, index) => {
                    return (
                        <li key={index} className="text-lg text-[#BEBEBE] leading-loose font-['Inter'] font-normal">
                            <p className='inline-block'>{book.title} <span>by</span> {book.author}</p>
                        </li>
                    )
                })
                :
                <p className="text-lg text-[#BEBEBE] leading-loose font-['Inter'] font-normal text-center italic">Books not available</p>
            }

        </div>
    )
}

export default ViewCategory