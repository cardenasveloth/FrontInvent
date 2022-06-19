import React, { useEffect, useState } from 'react'
import { editarPorId, guardar, obtenerTodos } from '../../services/TipoEquiposService';
import TablaModulos from '../iu/TablaModulos';
import Modal from './Modal';

export default function TipoEquipo() {
  const [tipoEquipos, settipoEquipos] = useState([]);
    const [tipoEquipo, settipoEquipo] = useState({
      _id: '',
      nombre: '',     
      estado: true
    });
    const [error, setError] = useState(false);
    const [hidden] = useState('hidden');
    const [loading, setLoading] = useState(false);
  
    useEffect( () => {
      const gettipoEquipos = () => {
          obtenerTodos()
          .then(r => {
              console.log(r);
              settipoEquipos(r.data)
          }).catch(e => {
              console.log(e)
          })
      }
      gettipoEquipos();
    }, []);
  
    const changetipoEquipo = e => {
      e.preventDefault();
      settipoEquipo({
        ...tipoEquipo,
        [e.target.name]: e.target.value 
      })
    }
  
    const add = e => {
      setLoading(true);
      e.preventDefault();
      console.log(tipoEquipo);
      if(tipoEquipo._id){
        editartipoEquipo();
      }else{
        guardartipoEquipo();
      }
      resettipoEquipo();
    }
  
    const guardartipoEquipo = () => {
      guardar(tipoEquipo)
      .then(r => {
        settipoEquipos([...tipoEquipos, r.data]);
        changeError(false)
        setLoading(false);
      }).catch(e => {
        console.log(e);
        changeError(true);
        setLoading(false);
      })
    }
  
    const closeModal = () => {
      resettipoEquipo()
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
        const tipoEquipoFilter = tipoEquipos.filter(est => est._id == id)[0];
        tipoEquipo({
          ...tipoEquipoFilter
        });
      }, 500)
    }
  
    const editartipoEquipo = () => {
      editarPorId(tipoEquipo._id, tipoEquipo)
      .then(r => {
        console.log(r.data._id)
        const id = r.data._id;
        if(!r.data.estado){
          const activos = tipoEquipos.filter(est => est._id !== id);
          settipoEquipos(activos);
        }
        changeError(false)
        setLoading(false);
      }).catch(e => {
        console.log(e);
        changeError(true);
        setLoading(false);
      })
    }
  
    const resettipoEquipo = () => {
      settipoEquipo({
        _id: '',
        nombre: '',
        email: '',
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
          componentes={tipoEquipos}
          openEditById={openEditById}
        />
        <Modal 
          tipoEquipo={tipoEquipo}
          loading={loading}
          closeModal={closeModal}
          hidden={hidden}
          changetipoEquipo={changetipoEquipo}
          error={error}
          add={add}
        />
      </div>
    )
}
