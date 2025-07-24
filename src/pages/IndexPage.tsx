import { Link, useLocation } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Fragment, useState } from "react";
export default function IndexPage(){
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const location  = useLocation()
const username =location.state.username || ""
const open = Boolean(anchorEl);
console.log(username)

const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    return(
    
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


<main className="flex flex-wrap w-full m-0 ">

  <div className="flex-1 min-w-[375px]  box-border h-[350px] border-amber-950 border-4 bg-amber-400">1</div>
  <div className="flex-1 min-w-[375px]  box-border h-[350px] border-amber-950 border-4 bg-amber-400">1</div>
  <div className="flex-1 min-w-[375px]  box-border h-[350px] border-amber-950 border-4 bg-amber-400">1</div>
  <div className="flex-1 min-w-[375px]  box-border h-[350px] border-amber-950 border-4 bg-amber-400">1</div>
  <div className="flex-1 min-w-[375px]  box-border h-[350px] border-amber-950 border-4 bg-amber-400">1</div>
  <div className="flex-1 min-w-[375px]  box-border h-[350px] border-amber-950 border-4 bg-amber-400">1</div>

</main>



</div>
  )

}