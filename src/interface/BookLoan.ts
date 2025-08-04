export interface BookLoan {
    id?:number
    user_id?:number,
    book_id?:number,
    loan_date?:Date,
    return_date?:Date,
    is_returned?:boolean
}