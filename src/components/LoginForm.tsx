import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { get } from '../services/api';


export default function LoginForm(){
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const authentication = () => {
    if (password && user) {
      get(`minilibrary/verify_user/?user=${user}&password=${password}`).then(data =>
        console.log(data)
      );
    } else {
      console.log('Missing credentials');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-50 to-green-100">


      <main className="flex flex-1 items-center justify-center px-4">
        <section className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 text-center">
          <h1 className="text-2xl font-bold text-green-700 mb-1">Welcome Back</h1>
          <p className="text-gray-600 mb-6">Please log in to continue</p>

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
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
        </section>
      </main>

 
    </div>
  );
}