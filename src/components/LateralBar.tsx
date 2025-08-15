import { Link } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
export default function LateralBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (<>

    <div className="  cursor-pointer">
      <button
        onClick={handleClick}
        className=""
      >
        <PersonIcon sx={{ fontSize: 40 }} className=" hover:cursor-pointer" />
      </button>
      <span className="relative inline-block">
        <span className="absolute left-4 top-1   text-black font-bold text-sm ">
        </span>
      </span>

    </div>
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
      <MenuItem onClick={handleClose}><Link to={"/Profile"}>Profile</Link></MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/login">Logout</Link>
      </MenuItem>
    </Menu>
  </>)

}
