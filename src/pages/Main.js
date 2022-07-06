import '../App.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("auth");

        if (!token) {
            console.log("vazio");
            navigate("/login");
        }

        else{
            axios.get('http://localhost:1337/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(function (response) {
                if(response) {
                    console.log("Nome: " + response.data.username);
                    console.log(response.data);
                    navigate("/");
                }
            }).catch(function (error) {
                console.log(error);
                navigate("/login");
            });
        }
    }, []);

  return (
    <div className="App">
      <header>
        
      </header>
    </div>
  );
}

export default Main;
