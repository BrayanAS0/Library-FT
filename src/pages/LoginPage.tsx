import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Api from '../services/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function LoginForm(){
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [warning,setWarning] =useState<string>("")
  const navigate = useNavigate();

  const authentication = () => {
    if (password && username) {
      let data={"username":username,"password":password} 
      Api.post(`minilibrary/login`,data).then(data =>{
        if(data["access"]!="granted"){
      setWarning("User or Password incorrect")

        }
        console.log(data)
        navigate("/index",{ state: { username: username } });
      }
      );
    } else {
      setWarning("All fields are required")
    }
  };

  return (
    <div className="flex  flex-col mt-12 bg-gradient-to-br ">


      <main className="flex   flex-1 items-center justify-center px-4">
        <section className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 text-center">
          <h1 className="text-2xl font-bold text-green-700 mb-1">Welcome Back</h1>
          <p className="text-gray-600 mb-6">Please log in to continue</p>

          <TextField
            fullWidth
            required
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            required
            label="Password"
            variant="outlined"
            type={visible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setVisible(!visible)} edge="end">
                    {visible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <button
            onClick={authentication}
            className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 rounded-lg transition-colors duration-300"
          >
            Get Started
          </button>
          <p className=" text-red-500 mt-3"  >{warning}</p>
        </section>
      </main>

       <div className="text-center mt-5 mb-3">
        <span className="text-gray-700 text-sm">¿No tienes cuenta?</span>{' '}
        <Link to="/signup" className="text-green-700 underline text-sm">
          Crear una cuenta
        </Link>
      </div>
    </div>
  );
}
