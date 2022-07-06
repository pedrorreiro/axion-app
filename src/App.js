import './App.css';
import bg from './img/bg.jpg';
import logo from './img/logo.png';
import mail from './img/mail.png';
import lock from './img/lock.png';

function App() {
  return (
    <div className="App">
      <div id='loginBox'>
        <img src={logo} alt="logo"></img>

        <p>Email</p>
        <div className='input'>
          <input type='text' placeholder='seunome@email.com'></input>
          <img className="iconInput" src={mail} alt="icone"></img>
        </div>

        <p>Password</p>
        <div className='input'>
          <input type='password' placeholder='Password'></input>
          <img className="iconInput" src={lock} alt="iconez"></img>
        </div>
        
        <div id='check'>
          <input type='checkbox'></input>
          <label>Mostrar a senha.</label>
        </div>

        <p id='problemas'>Problemas para acessar sua conta?</p>

        <div id='button'>
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

export default App;
