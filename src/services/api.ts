import axios from "axios";
const main_Url="http://127.0.0.1:8000/"
export async function get(url:string){
let data =await axios.get(main_Url+url)
return data.data
}