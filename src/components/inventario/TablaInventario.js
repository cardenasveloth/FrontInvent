import React from 'react'
import { editarPorId } from '../../services/UsuarioService';
import Usuario from '../usuario/Usuario';

export default function TablaModulos({componentes, openEditById}) {
  return (
    <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Serial</th>
          <th scope="col">Modelo</th>
          <th scope="col">Descripción</th>
          <th scope="col">Foto</th>
          <th scope="col">Color</th>
          <th scope="col">Fecha Compra</th>
          <th scope="col">Usuario</th>
          <th scope="col">Marca</th>
          <th scope="col">Estado</th>
          <th scope="col">TipoEquipo</th>          
          <th scope="col"></th>          
        </tr>
      </thead>
      <tbody>
        {
          componentes.map((inv, index) => {
            const date = new Date(inv.fechaCompra);
            const fcompra = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();
            
            return(
              <tr key={inv._id}>
                <th scope="row">{index + 1}</th>
                <td>{inv.serial}</td>
                <td>{inv.modelo}</td>
                <td>{inv.descripcion}</td>
                <td>{inv.foto}</td>
                <td>{inv.color}</td>
                <td>{fcompra}</td>
                <td>{inv.usuario}</td>
                <td>{inv.marca}</td>
                <td>{inv.estado ? 'Activo' : 'Inactivo'}</td>                
                <td>
                  <button 
                    type="button" 
                    className="btn btn-outline-success"
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                    data={inv._id}
                    onClick={openEditById}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                    -
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                    -
                  </button>
                </td>
                <td></td>
            </tr>
            );
          })
        }
      </tbody>
    </table>
  </div>
  )
}