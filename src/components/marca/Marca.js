import React, { useEffect, useState } from 'react'
import { editarPorId, guardar, obtenerTodos } from '../../services/MarcaService';
import TablaModulos from '../iu/TablaModulos';
import Modal from './Modal';

export default function Marca() {
  const [marcas, setMarcas] = useState([]);
  const [marca, setMarca] = useState({
    _id: '',
    nombre: '',
    estado: true
  });
  const [error, setError] = useState(false);
  const [hidden] = useState('hidden');
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    const getMarcas = () => {
        obtenerTodos()
        .then(r => {
            console.log(r);
            setMarcas (r.data)
        }).catch(e => {
            console.log(e)
        })
    }
    getMarcas();
  }, []);

  const changeMarca = e => {
    e.preventDefault();
    setMarca({
      ...marca,
      [e.target.name]: e.target.value 
    })
  }

  const add = e => {
    setLoading(true);
    e.preventDefault();
    console.log(marca);
    if(marca._id){
      editarMarca();
    }else{
      guardarMarca();
    }
    resetMarca();
  }

  const guardarMarca = () => {
    guardar(marca)
    .then(r => {
      setMarcas([...marcas, r.data]);
      changeError(false)
      setLoading(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
      setLoading(false);
    })
  }

  const closeModal = () => {
    resetMarca()
    changeError(false)
  }

  const changeError = e => {
    setError(e);
  }

  const openEditById = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const id = e.target.getAttribute('data');
      console.log(id)
      const marcaFilter = marcas.filter(est => est._id == id)[0];
      setMarca({
        ...marcaFilter
      });
    }, 500)
  }

  const editarMarca = () => {
    editarPorId(marca._id, marca)
    .then(r => {
      console.log(r.data._id)
      const id = r.data._id;
      if(!r.data.marca){
        const activos = marcas.filter(est => est._id !== id);
        setMarcas(activos);
      }
      changeError(false)
      setLoading(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
      setLoading(false);
    })
  }

  const resetMarca = () => {
    setMarca({
      _id: '',
      nombre: '',
      estado: true
    })
  }

  return (
    <div className='container'>
      <button 
        type="button" 
        className="btn btn-outline-primary"
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal"
      >
        <i className="fa-solid fa-plus"></i>
        Agregar
      </button>
      <TablaModulos 
        componentes={marcas}
        openEditById={openEditById}
      />
      <Modal 
        marca={marca}
        loading={loading}
        closeModal={closeModal}
        hidden={hidden}
        changeMarca={changeMarca}
        error={error}
        add={add}
      />
    </div>
  )
}
