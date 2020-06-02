import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

//Três conceitos base sobre o react:
//Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação.
//Propriedade: (props) Informações que um componente PAI passam para o componente FILHO.
//Estado: Informações mantidas pelo componente (Curiosidade: conceito de imultabilidade).

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  async function handleDelete() {
    const response = await api.delete('/devs');
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map((dev) => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
