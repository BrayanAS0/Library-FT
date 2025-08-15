import { useEffect, useState } from "react"
import { BookLoan } from "../interface/BookLoan"
import Api from "../services/api"
import { Book } from "../interface/Books"
import { BookIndex } from "../interface/Book_index"
interface bookLoans extends Book ,BookLoan ,Omit<Book,"id">{
book_id:Book["id"]
}
export default function Profile() {
  const [loans, setLoans] = useState<bookLoans[]>([])
  let url = "https://imgs.search.brave.com/InMzoQqc6SfE-jFfzvASUQ9pDpD5-8qmUU89TBJfjUo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFNnM2/dDh1Y0UvMi8wLzEw/MDN3L2NhbnZhLXBv/cnRhZGEteS1jb250/cmFwb3J0YWRhLWxp/YnJvLWRlLWFtb3It/aWx1c3RyYWRvLWF6/dWwtclFhR3EwbGI2/SncuanBn"

  async function getLoans() {

    try {
      let loan_books:any[] = await Api.get(`minilibrary/get_loans_by_user_id`);
      let l = loan_books.filter(x=>x.is_returned===false )
      setLoans(l)

      console.log("Préstamos:", loans);



    } catch (e) {
      console.error(e);
    }

  }

  useEffect(() => { getLoans() }, [])


  return (<>
    <div className=" flex flex-col text-center w-full">
      <div className="">
        <h1 className=" font-bold text-3xl text-shadow-lg ">Loans</h1>
      </div>

      <div className=" flex md:flex-row  flex-col   p-3 space-y-6 ">
        {loans.length > 0 ? loans.map(book => (
          <div key={book.id} className=" w-82  mx-auto bg-orange-200 flex rounded-2xl">
            <div  className=" flex flex-col flex-1  m-3 bg-orange-400 box-border space-y-2 rounded-2xl  ">
              <img src={url} alt="" className=" h-5/10 w-full rounded-2xl " />
              <h1 className=" font-bold text-lg my-2 p-1">{book.title}</h1>
              <h2 className=" font-bold">Author: <span className=" font-medium">{book.author}</span></h2>
              <h2 className=" font-bold">release date: <span className=" font-medium">{book.loan_date?.toString().substring(0,10)}</span></h2>

<div className=" bg-amber-950"> <button>Leave review</button> <button>Return</button></div>
            </div>
          </div>
        )) :
          <h1>no ahi libros</h1>
        }
      </div>
      <div>
        <h1 className=" font-bold text-3xl">Returned</h1>
      </div></div>
  </>)
}