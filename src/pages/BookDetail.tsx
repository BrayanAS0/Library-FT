import { Book_with_detail } from "../interface/Book_with_detail"
import Api from "../services/api"
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';


export default function BookDetail() {
  let url = "https://imgs.search.brave.com/InMzoQqc6SfE-jFfzvASUQ9pDpD5-8qmUU89TBJfjUo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFNnM2/dDh1Y0UvMi8wLzEw/MDN3L2NhbnZhLXBv/cnRhZGEteS1jb250/cmFwb3J0YWRhLWxp/YnJvLWRlLWFtb3It/aWx1c3RyYWRvLWF6/dWwtclFhR3EwbGI2/SncuanBn"
  const location = useLocation()
  const id = location.state.id
  const [book, setBook] = useState<Book_with_detail>()
  useEffect(() => {
    getBookDetail().then((data) => {
      setBook(data)
    })
  }
    , [])
  async function getBookDetail(): Promise<Book_with_detail> {
    try {
      const response = await Api.get(`minilibrary/Book_with_detail?id=${id}`)
      return response
    } catch (error) {
      console.error("Error fetching book details:", error)
      throw error
    }
  }
  function showStars(rating: number) {
    let estrellas = '';
    for (let i = 0; i < rating; i++) {
      estrellas += '★';
    }
    for (let i = rating; i < 5; i++) {
      estrellas += '☆';
    }
    return estrellas;
  }

  return (


    <div className="flex flex-col  gap-8 bg-white shadow-lg rounded-xl p-5 max-w-5xl mx-auto ">

          <div className="flex gap-3  flex-1 flex-col md:flex-row ">
                <img
                  className="min-w-[350px]  h-[330px]  rounded-md shadow-lg  "
                  src={url}
                  alt={book?.title}
                />


                <div className="flex min-w-[350px] flex-col gap-8 flex-1  bg-gray-200 p-5">
                  <h1 className="text-4xl">{book?.title}</h1>
                  <h2 className="text-xl">Author: {book?.author}</h2>
                  <h3>pages: {book?.pages}</h3>
                  <h3>Release: {book?.publication_date}</h3>
                  <h3>
                    Average rating : {
                      book?.reviews && book?.reviews.length > 0 ? 
                     showStars(  book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length )
                      :
                        "there are not reviews"
                    }
                  </h3>
                </div>


          </div>
          <section className="flex-1 flex flex-col gap-2 ">
                <div>
                  <p>Reviews</p>
                </div>
                {book?.reviews.map(review =>
                  <div>
                    <h1>{review.user}</h1>
                    <h2>{showStars(review.rating)}</h2>
                    <h2 className=" bg-gray-300 p-5">{review.text}</h2>
                    <h3>{new Date(review.created_at).toLocaleDateString()}</h3>
                  </div>
                )}
          </section>
    </div>
  );
}