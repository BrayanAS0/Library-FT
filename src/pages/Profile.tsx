import { useEffect, useState } from "react";
import Api from "../services/api";
import Dialog from "../components/Dialog";
import ReviewCard from "../components/ReviewCard";
import { BookLoan } from "../interface/BookLoan";
import { Book } from "../interface/Books";
import { BookIndex } from "../interface/Book_index";

interface bookLoans extends Book, BookLoan, Omit<Book, "id"> {
  book_id: Book["id"];
}

export default function Profile() {
  const [loans, setLoans] = useState<bookLoans[]>([]);
  const url = "https://imgs.search.brave.com/InMzoQqc6SfE-jFfzvASUQ9pDpD5-8qmUU89TBJfjUo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFNnM2/dDh1Y0UvMi8wLzEw/MDN3L2NhbnZhLXBv/cnRhZGEteS1jb250/cmFwb3J0YWRhLWxp/YnJvLWRlLWFtb3It/aWx1c3RyYWRvLWF6/dWwtclFhR3EwbGI2/SncuanBn";
  const [showReviewCard, setShowReviewCard] = useState(false);
  const [selectedReviewBookId, setSelectedReviewBookId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState<number>();

  async function getLoans() {
    try {
      let loan_books: any[] = await Api.get(`minilibrary/get_loans_by_user_id`);
      let l = loan_books.filter(x => x.is_returned === false);
      setLoans(l);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => { getLoans() }, []);

  // async function loadReviews(bookId:number) {
  //   const r = await Api.get(`minilibrary/book-reviews?book_id=${bookId}`);
  //   setReviews(r.data);
  // }

  async function returnBook(loan_id?: number) {
    try {
      await Api.post("minilibrary/return_book", { loan_id });
      let data: any = loans.filter(x => x.id !== loan_id);
      setLoans([...data]);
      setDialogOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  function handleOpenReview(bookId: number) {
    setSelectedReviewBookId(bookId);
    setShowReviewCard(true);
  }

  function handleReviewClose() {
    setShowReviewCard(false);
    setSelectedReviewBookId(null);
  }

  return (
    <div className="flex flex-col text-center w-full border">
      <Dialog
        open={dialogOpen}
        body="¿Estás seguro que deseas devolver el libro?"
        onClose={() => setDialogOpen(false)}
        method={() => returnBook(selectedLoanId)}
      />

      {showReviewCard && selectedReviewBookId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <ReviewCard
              bookId={selectedReviewBookId}
              onReviewAdded={handleReviewClose}
            />
            <button
              className="mt-2 text-red-600 text-sm underline"
              onClick={handleReviewClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div>
        <h1 className="font-bold text-3xl text-shadow-lg">Loans</h1>
      </div>

      <div className="flex md:flex-row flex-col flex-wrap p-3 space-y-6 h-135">
        {loans?.length > 0 ?
          loans.map(book => (
            <div key={book.id} className="w-82 mx-auto bg-orange-200 flex rounded-2xl h-135">
              <div className="flex flex-col flex-1 m-3 bg-orange-400 box-border space-y-2 rounded-2xl">
                <img src={url} alt="" className="h-6/10 w-full rounded-2xl" />
                <h1 className="font-bold text-md my-2 p-1 text-wrap">{book.title}</h1>
                <h2 className="font-bold">Author: <span className="font-medium">{book.author}</span></h2>
                <h2 className="font-bold">release date: <span className="font-medium">{book.loan_date?.toString().substring(0, 10)}</span></h2>

                <div className="mt-auto flex justify-between gap-2 p-2 rounded-lg">
                  <button
                    className="bg-amber-700 px-3 py-1 rounded text-white hover:bg-amber-600 hover:cursor-pointer"
                    onClick={() => handleOpenReview(book.book_id )}
                  >
                    Leave review
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLoanId(book.id);
                      setDialogOpen(true);
                    }}
                    className="bg-red-900 px-3 py-1 rounded text-white hover:bg-red-600 hover:cursor-pointer"
                  >
                    Return
                  </button>
                </div>
              </div>
            </div>
          ))
          :
          <h1>no ahi libros</h1>
        }
      </div>
      {/* <div>
        <h1 className="font-bold text-3xl">Returned</h1>
      </div> */}
    </div>
  )
}
