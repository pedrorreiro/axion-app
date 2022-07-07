import '../App.css';
import logo from '../img/logo.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main() {

    const navigate = useNavigate();
    const [itens, setItens] = useState([]);
    const [tipo, setTipo] = useState('comidas');

    const carregaItem = async (tipo) => {

        const token = sessionStorage.getItem("auth");

        setTipo(tipo);

        const result = await axios.get(`http://localhost:1337/${tipo}`, { // buscando os itens do tipo {tipo}, ex: comida, lugares, etc.
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setItens(result.data);

        Array.from(document.getElementsByClassName("op")).forEach(element => { // tirando o efeito de página atual de todos os itens do menu
            element.classList.remove("paginaAtual");
        });

        if (document.getElementById(tipo)) { // adicionando o efeito de página atual ao item do menu clicado
            document.getElementById(tipo).classList.add("paginaAtual");
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("auth");

        if (!token) { // se não existir nenhum token, redireciona para a página de login
            navigate("/login");
        }

        else {

            axios.get('http://localhost:1337/users/me', { // caso exista um token, busca o usuário logado
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(function (response) {
                if (response) {
                    // aqui dentro,caso a aplicação precisasse, poderia armazenar o usuário em um state, por exemplo.
                    navigate("/"); // navega logado para a página inicial.
                    carregaItem("comidas") // carrega automaticamente o menu de comidas.
                }
            }).catch(function (error) {
                console.log(error);
                navigate("/login");
            });
        }
    }, [navigate]);

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
                                <img src={url} alt="foto"></img>
                                <span>{item.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div >
    );
}

export default Main;
