import { Book_with_detail } from "../interface/Book_with_detail"
import Api from "../services/api"
import { useEffect, useState } from "react"


export default function BookDetail() {
  let url = "https://imgs.search.brave.com/InMzoQqc6SfE-jFfzvASUQ9pDpD5-8qmUU89TBJfjUo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFNnM2/dDh1Y0UvMi8wLzEw/MDN3L2NhbnZhLXBv/cnRhZGEteS1jb250/cmFwb3J0YWRhLWxp/YnJvLWRlLWFtb3It/aWx1c3RyYWRvLWF6/dWwtclFhR3EwbGI2/SncuanBn"

    const [book, setBook] = useState<Book_with_detail>()
    useEffect(() => {
        getBookDetail().then((data) => {
            setBook(data)
        })
    }
        , [])
    async function getBookDetail(): Promise<Book_with_detail> {
        try {
            const response = await Api.get("minilibrary/Book_with_detail?id=2")
            return response
        } catch (error) {
            console.error("Error fetching book details:", error)
            throw error
        }
    }
function showStars(rating:number) {
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
    <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto">
      <img
        className="w-60 h-[350px] object-cover rounded-md shadow-lg"
        src={url}
        alt={book?.title}
      />
      <div className="flex-1 flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{book?.title}</h1>
        <h2 className="text-lg text-gray-600">Autor: {book?.author}</h2>

        {/* Reviews */}
        <section className="mt-6">
          <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
            <span className="text-yellow-500">⭐</span>
            Reviews <span className="text-gray-400">({book?.reviews?.length || 0})</span>
          </h3>
          {book?.reviews && book.reviews.length === 0 ? (
            <p className="text-gray-400">Aún no hay reseñas.</p>
          ) : (
            <ul>
              {book?.reviews?.map(r => (
                <li key={r.user + r.created_at} className="mb-3 border-b pb-2">
                  <div className="font-semibold">{r.user}</div>
                  <div className="mb-1 text-yellow-400">{showStars(r.rating)}</div>
                  <div className="text-gray-700">{r.text}</div>
                  <div className="text-xs text-gray-500">
                    {(new Date(r.created_at)).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        {/* Recommendations */}
        <section className="mt-6">
          <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
            <span className="text-green-700">📢</span>
            Recomendaciones <span className="text-gray-400">({book?.recommendations?.length || 0})</span>
          </h3>
          {book?.recommendations && book.recommendations.length === 0 ? (
            <p className="text-gray-400">Nadie lo ha recomendado aún.</p>
          ) : (
            <ul>
              {book?.recommendations?.map(r => (
                <li key={r.user + r.recommended_at} className="mb-2">
                  <span className="font-semibold">{r.user}:</span>
                  <span className="text-gray-700"> {r.note}</span>
                  <span className="text-xs text-gray-400 ml-2">
                    {(new Date(r.recommended_at)).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}