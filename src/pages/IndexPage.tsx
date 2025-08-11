
import { useEffect, useState } from "react";
import { BookIndex } from "../interface/Book_index";
import Api from '../services/api';
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import { useBookLoan } from "../store/BookLoan";
import { BookLoan } from "../interface/BookLoan";

export default function IndexPage() {
  const [showDialog, setShowDialog] = useState(false)
  let url = "https://imgs.search.brave.com/InMzoQqc6SfE-jFfzvASUQ9pDpD5-8qmUU89TBJfjUo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFNnM2/dDh1Y0UvMi8wLzEw/MDN3L2NhbnZhLXBv/cnRhZGEteS1jb250/cmFwb3J0YWRhLWxp/YnJvLWRlLWFtb3It/aWx1c3RyYWRvLWF6/dWwtclFhR3EwbGI2/SncuanBn"
  const [books, setBooks] = useState<BookIndex[]>([])
  const navigate = useNavigate()

  const [book,setBook]=useState<BookLoan>()
  const setBookLoan = useBookLoan(state => state.setBookLoan)
  const bookLoan = useBookLoan(state => state.bookLoan)

  async function loanBook() {



   await Api.post("minilibrary/loan_books", book)
let books =await getBooks()
setBooks(books)
  }


  async function getBooks() {

    try {
      let data = await Api.get("minilibrary/get_book_index")
      return data
    } catch (e) {
      return e
    }
  }

  useEffect(() => {
    getBooks().then(data => {
      setBooks(data)
      setBooks(data)
    })
  }, [])

  return (

    <div className=" border-0 m-0 w-full h-full" >


      {showDialog ? <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        body={`¿Do you wan to take ${bookLoan} book?`}
        method={() => {
          loanBook()
          setShowDialog(false);
        }} /> : <></>}


      <main className="    ">

        <section className="     flex  justify-center    " >

<Autocomplete
  className="w-screen xl:w-1/2"
  disablePortal
  options={books.map(book => book.title)}
  onChange={(_, value) => {
    const selectedBook = books.find(book => book.title === value);
    if (selectedBook) {
      navigate("/index/BookDetail", { state: { id: selectedBook.id } });
    }
  }}
  renderInput={(params) => <TextField {...params} label="Title" />}
/>

        </section>



<div
  className={`
    flex flex-wrap justify-center align-text-top h-full items-center 
    md:min-w-4/5  m-0 
     `}
>
          {books.map(book =>
            <div key={book.id} onClick={() => {

              navigate("/index/BookDetail", { state: { "id": book.id } })
            }}
className="w-full sm:w-62  lg:w-83 rounded-t-xl mx-auto bg-blue-100 h-100 transition-all ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer "

            ><div className="w-full h-full  text-sm">
                <img src={url} alt="libro"

                  className={`object-fill rounded-t-xl w-full h-75/100 transition-opacity duration-300 ${!book.has_active_loan ? 'opacity-100' : 'opacity-60'}`}

                />
                <div className=" p-1 relative">
                  <h1>{book.title}</h1>
                  <div className=" absolute bottom-0 right-1 w-16 h-8  ">

                    <button className="w-full h-full  text-sm border-3 shadow-2xl shadow-blue-950 rounded-xl cursor-pointer   bg-blue-500 disabled:opacity-40" disabled={book.has_active_loan} onClick={(e) => {
                      e.stopPropagation()
                      setBookLoan(book.title)
                      setBook({"book_id":book.id,"user_id":1})
                      setShowDialog(true)
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