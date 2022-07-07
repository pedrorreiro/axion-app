import '../App.css';
import bg from '../img/bg.jpg';
import logo from '../img/logo.png';
import mail from '../img/mail.png';
import lock from '../img/lock.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const logar = () => {
        axios.post('http://localhost:1337/auth/local', {
            identifier: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
            if(response.data.jwt) {
                sessionStorage.setItem("auth", response.data.jwt);
                navigate("/");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Erro no login");
        });
    }

  return (
    <div className="App">
      <div id='loginBox'>
        <img src={logo} alt="logo"></img>

        <p>Email</p>
        <div className='input'>
          <input type='text' placeholder='seunome@email.com' onChange={handleEmail}></input>
          <img className="iconInput" src={mail} alt="icone"></img>
        </div>

        <p>Password</p>
        <div className='input'>
          <input type='password' placeholder='Password' onChange={handlePassword}></input>
          <img className="iconInput" src={lock} alt="iconez"></img>
        </div>
        
        <div id='check'>
          <input type='checkbox'></input>
          <label>Mostrar a senha.</label>
        </div>

        <p id='problemas'>Problemas para acessar sua conta?</p>

        <div id='button' onClick={logar}>
          Acessar
        </div>

        <div id='or'>
          <div className="linha"></div>
          ou
          <div className="linha"></div>
        </div>

        <div id='cadastrar'>
          Cadastrar
        </div>

        <p>Termos de uso · Política de privacidade</p>
        

      </div>
      <img src={bg} id="fundo" alt='background'></img>

    </div>
  );
}

export default Login;
