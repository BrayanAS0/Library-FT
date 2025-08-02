
import { useEffect, useState } from "react";
import { BookIndex } from "../interface/Book_index";
import Api from "../services/api";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCounterLoan from '../store/CounterLoans';


export default function IndexPage() {
  let url = "https://imgs.search.brave.com/InMzoQqc6SfE-jFfzvASUQ9pDpD5-8qmUU89TBJfjUo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFNnM2/dDh1Y0UvMi8wLzEw/MDN3L2NhbnZhLXBv/cnRhZGEteS1jb250/cmFwb3J0YWRhLWxp/YnJvLWRlLWFtb3It/aWx1c3RyYWRvLWF6/dWwtclFhR3EwbGI2/SncuanBn"
  const [books, setBooks] = useState<BookIndex[]>([])
  const [filterdBook, setFilterdBooks] = useState<BookIndex[]>([])
  const navigate = useNavigate()
  const setCounterLoans =useCounterLoan(state=> state.setCounterLoan)
  const counterLoans = useCounterLoan(state => state.counterLoan)
  function filterBook(input: string) {
    const filtered_books = books.filter(book =>
      book.title.toLowerCase().includes(input.toLowerCase() ?? "")
    );
    setFilterdBooks(filtered_books);
  }

  async function getBooks() {

    try {
      let data = await Api.get("minilibrary/get_book_index")
      return data
    } catch (e) {
      console.log(e)
      return e
    }
  }

  useEffect(() => {
    getBooks().then(data => {
      setBooks(data)
      setFilterdBooks(data)
    })
  }, [])

  return (

    <div className=" border-0 m-0" >



      <main className="flex flex-1">

        <section className="mt-2 mx-1 hidden md:block" >

          <Autocomplete
          className="w-50"
  disablePortal
  options={filterdBook.map(book=> book.title)}
  onInputChange={(_, value) => {
    filterBook(value || "");
  }}
  renderInput={(params) => <TextField {...params} label="Title" />}
/>
        </section>



        <div className="flex flex-wrap w-full gap-1 m-0 ">

          {filterdBook.map(book =>
            <div key={book.id} onClick={() => {

              navigate("/index/BookDetail", { state: { "id": book.id } })
            }}
              className=" disabled flex-1 min-w-65 max-w-105 bg-blue-100 box-border h-[350px]
                transition-all duration-300 ease-in-out
                hover:scale-101 hover:shadow-2xl  cursor-pointer"


            ><div className="w-full h-full  text-sm">
                <img src={url} alt="libro"

                  className={`object-fill w-full h-75/100 transition-opacity duration-300 ${!book.has_active_loan ? 'opacity-100' : 'opacity-60'}`}

                />
                <div className=" p-1 relative">
                  <h1>{book.title}</h1>
                  <div className=" absolute bottom-0 right-1 w-16 h-8  ">

                    <button className="w-full h-full  text-sm border-3 shadow-2xl shadow-blue-950 rounded-xl cursor-pointer   bg-blue-500 disabled:opacity-40" disabled={book.has_active_loan} onClick={(e) => {
                      e.stopPropagation()
                      setCounterLoans([...counterLoans,book.id])
                      console.log("add")
                    }} 
                    
                    >
                      Add
                    </button>
                  </div>
                  <h2>pages : {book.pages}</h2>
                  <h3>Publication date: {book.publication_date}</h3>
                </div>
              </div>
            </div>

          )}

        </div>
      </main>


    </div>
  )

}