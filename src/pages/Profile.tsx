import { useEffect, useState } from "react"
import { BookLoan } from "../interface/BookLoan"
import Api from "../services/api"

export default function Profile() {
    const [loans, setLoans] = useState<BookLoan[]>([])

    async function getLoans() {

        try {
            let data: BookLoan[] = await Api.get(`minilibrary/get_loans_by_user_id?user_id=${4}`)
            console.log(data)
            return data
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{getLoans()},[])


    return (<>
        <div className=" flex flex-col text-center w-full">
            <div className="">
                <span className=" font-bold text-3xl text-shadow-lg ">Loans</span>
            </div>
            <div>
                <h1 className=" font-bold text-3xl">Returned</h1>
            </div></div>
    </>)
}