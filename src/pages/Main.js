import '../App.css';
import logo from '../img/logo.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main() {

    const navigate = useNavigate();
    const [itens, setItens] = useState([]);
    const [tipo, setTipo] = useState('comidas');
    const [token, setToken] = useState('');

    const carregaItem = async (tipo) => {

        const token = sessionStorage.getItem("auth");

        setTipo(tipo);

        console.log("Token: " + token);

        const result = await axios.get(`http://localhost:1337/${tipo}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(result.data);

        setItens(result.data);

        Array.from(document.getElementsByClassName("op")).forEach(element => {
            element.classList.remove("paginaAtual");
        });

        console.log("tipo: " + tipo);

        document.getElementById(tipo).classList.add("paginaAtual");

    }

    useEffect(() => {
        const token = sessionStorage.getItem("auth");

        if (!token) {
            console.log("vazio");
            navigate("/login");
        }

        else {

            setToken(token);

            axios.get('http://localhost:1337/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(function (response) {
                if (response) {
                    console.log("Nome: " + response.data.username);
                    console.log(response.data);
                    navigate("/");
                    carregaItem("comidas")
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
                <img id="logo" src={logo} alt="logo"></img>

                <div id='options'>
                    <span id='comidas' className="op" onClick={() => carregaItem("comidas")}>COMIDAS</span>
                    <span id='pessoas' className="op" onClick={() => carregaItem("pessoas")}>PESSOAS</span>
                    <span id='locais' className="op" onClick={() => carregaItem("locais")}>LOCAIS</span>
                </div>
            </header>

            <div>
                <div id='titulo'>
                    <p>LISTA DE {tipo.toUpperCase()}</p>
                    <div id="faixa"></div>
                </div>

                <div id="lista">
                    {itens.map(item => {

                        let url = `http://localhost:1337${item.link[0].url}`

                        return (
                            <div key={item.name} className="itemLista">
                                <img src={url}></img>
                                <p>{item.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    );
}

export default Main;
