import React, { useEffect, useState } from 'react'
import { editarPorId, guardar, obtenerTodos } from '../../services/InventarioService';
import Modal from './Modal';
import TablaModulos from './TablaInventario';

export default function Inventario() {
    const [inventarios, setInventarios] = useState([]);
    const [inventario, setInventario] = useState({
      _id: '',
      serial:'',
      modelo:'',
      descripcion:'',
      foto:'',
      color:'',
      fechaCompra:'',
      marca: '',
      estado: true
    });
    const [error, setError] = useState(false);
    const [hidden] = useState('hidden');
    const [loading, setLoading] = useState(false);
  
    useEffect( () => {
      const getInventarios = () => {
          obtenerTodos()
          .then(r => {
              console.log(r);
              setInventarios(r.data)
          }).catch(e => {
              console.log(e)
          })
      }
      getInventarios();
    }, []);
  
    const changeInventario = e => {
      e.preventDefault();
      setInventario({
        ...inventario,
        [e.target.name]: e.target.value 
      })
    }
  
    const add = e => {
      setLoading(true);
      e.preventDefault();
      console.log(inventario);
      if(inventario._id){
        editarInventario();
      }else{
        guardarInventario();
      }
      resetInventario();
    }
  
    const guardarInventario = () => {
      guardar(inventario)
      .then(r => {
        setInventarios([...inventarios, r.data]);
        changeError(false)
        setLoading(false);
      }).catch(e => {
        console.log(e);
        changeError(true);
        setLoading(false);
      })
    }
  
    const closeModal = () => {
      resetInventario()
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
        const inventarioFilter = inventarios.filter(est => est._id == id)[0];
        setInventario({
          ...inventarioFilter
        });
      }, 500)
    }
  
    const editarInventario = () => {
      editarPorId(inventario._id, inventario)
      .then(r => {
        console.log(r.data._id)
        const id = r.data._id;
        if(!r.data.inventario){
          const activos = inventarios.filter(est => est._id !== id);
          setInventarios(activos);
        }
        changeError(false)
        setLoading(false);
      }).catch(e => {
        console.log(e);
        changeError(true);
        setLoading(false);
      })
    }
  
    const resetInventario = () => {
      setInventario({
        _id: '',
        serial:'',
        modelo:'',
        descripcion:'',
        foto:'',
        color:'',
        fechaCompra:'',
        marca: '',
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
          componentes={inventarios}
          openEditById={openEditById}
        />
        <Modal 
          inventario={inventario}
          loading={loading}
          closeModal={closeModal}
          hidden={hidden}
          changeInventario={changeInventario}
          error={error}
          add={add}
        />
      </div>
    )
}
