import React, { useEffect, useState } from 'react'
import { editarPorId, guardar, obtenerTodos } from '../../services/UsuarioService';
import Modal from './Modal';
import TablaModulos from './TablaUsuarios';

export default function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState({
      _id: '',
      nombre: '',
      email: '',
      estado: true
    });
    const [error, setError] = useState(false);
    const [hidden] = useState('hidden');
    const [loading, setLoading] = useState(false);
  
    useEffect( () => {
      const getUsuarios = () => {
          obtenerTodos()
          .then(r => {
              console.log(r);
              setUsuarios(r.data)
          }).catch(e => {
              console.log(e)
          })
      }
      getUsuarios();
    }, []);
  
    const changeUsuario = e => {
      e.preventDefault();
      setUsuario({
        ...usuario,
        [e.target.name]: e.target.value 
      })
    }
  
    const add = e => {
      setLoading(true);
      e.preventDefault();
      console.log(usuario);
      if(usuario._id){
        editarUsuario();
      }else{
        guardarUsuario();
      }
      resetUsuario();
    }
  
    const guardarUsuario = () => {
      guardar(usuario)
      .then(r => {
        setUsuarios([...usuarios, r.data]);
        changeError(false)
        setLoading(false);
      }).catch(e => {
        console.log(e);
        changeError(true);
        setLoading(false);
      })
    }
  
    const closeModal = () => {
      resetUsuario()
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
        const usuarioFilter = usuarios.filter(est => est._id == id)[0];
        setUsuario({
          ...usuarioFilter
        });
      }, 500)
    }
  
    const editarUsuario = () => {
      editarPorId(usuario._id, usuario)
      .then(r => {
        console.log(r.data._id)
        const id = r.data._id;
        if(!r.data.estado){
          const activos = usuarios.filter(est => est._id !== id);
          setUsuarios(activos);
        }
        changeError(false)
        setLoading(false);
      }).catch(e => {
        console.log(e);
        changeError(true);
        setLoading(false);
      })
    }
  
    const resetUsuario = () => {
      setUsuario({
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
          componentes={usuarios}
          openEditById={openEditById}
        />
        <Modal 
          usuario={usuario}
          loading={loading}
          closeModal={closeModal}
          hidden={hidden}
          changeUsuario={changeUsuario}
          error={error}
          add={add}
        />
      </div>
    )
}
