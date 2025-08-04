import {create} from "zustand"

interface BookLoanState{
    bookLoan:string
    setBookLoan: (bookLoanName:string)=>void
}

export const useBookLoan =create<BookLoanState>((set )=>({
    bookLoan:"",
    setBookLoan:(newValue:string)=>set({bookLoan:newValue})
    
}))