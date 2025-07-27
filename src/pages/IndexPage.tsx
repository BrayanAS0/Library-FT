import { Link, useLocation } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import { BookIndex } from "../interface/Book_index";
import Api from "../services/api";
import { Button } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';



export default function IndexPage() {
  let url = "https://imgs.search.brave.com/InMzoQqc6SfE-jFfzvASUQ9pDpD5-8qmUU89TBJfjUo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFNnM2/dDh1Y0UvMi8wLzEw/MDN3L2NhbnZhLXBv/cnRhZGEteS1jb250/cmFwb3J0YWRhLWxp/YnJvLWRlLWFtb3It/aWx1c3RyYWRvLWF6/dWwtclFhR3EwbGI2/SncuanBn"
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation()
  const username = location.state.username || ""
  const [books, setBooks] = useState<BookIndex[]>([])
  const open = Boolean(anchorEl);
  console.log(username)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  async function getBooks() {

    try {
      let data = await Api.get("minilibrary/get_book_index")
      setBooks(data)
      console.log(books)
    } catch (e) {
      console.log(e)
      return e
    }
  }

  useEffect(() => {
    getBooks()
  }, [])
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (

    <div className=" border-0 m-0" >
      <button
        onClick={handleClick}
        className="absolute right-1 top-4 text-white flex gap-2 cursor-pointer"
      >
        <h1 className="hidden sm:block">{username}</h1>
        <PersonIcon />
      </button>

      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/login">Logout</Link>
        </MenuItem>
      </Menu>


      <main className="flex flex-wrap w-full gap-1 m-0 ">

        {books.map(book =>
          <div onClick={() => { console.log(book.has_active_loan) }}
           className=" disabled flex-1 min-w-[375px] max-w-[450px] bg-blue-100 box-border h-[350px]
                transition-all duration-300 ease-in-out
                hover:scale-101 hover:shadow-2xl  cursor-pointer"
                
                
                ><div className="w-full h-full ">
              <img src={url} alt="libro" 
              
className={`object-fill w-full h-75/100 transition-opacity duration-300 ${!book.has_active_loan ? 'opacity-100' : 'opacity-60'}`}              
              
              />
              <div className=" p-1 relative">
                <h1>{book.title}</h1>
                <div className=" absolute bottom-1 right-2 ">

                  <Button disabled={book.has_active_loan} onClick={(e) => {
                    e.stopPropagation()
                    console.log(book.has_active_loan)
                  }} variant="contained" endIcon={<AddBoxIcon />}>
                    Add
                  </Button>
                </div>
                <h2>pages : {book.pages}</h2>
                <h3>Publication date: {book.publication_date}</h3>
              </div>
            </div>
          </div>

        )}

      </main>



    </div>
  )

}