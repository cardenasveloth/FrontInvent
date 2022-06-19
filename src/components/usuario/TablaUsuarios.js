import React from 'react'

export default function TablaModulos({componentes, openEditById}) {
  return (
    <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Estado</th>
          <th scope="col">Fecha Creación</th>
          <th scope="col">Fecha Actualización</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {
          componentes.map((usu, index) => {
            const date = new Date(usu.fechaCreacion);
            const creacion = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();
            return(
              <tr key={usu._id}>
                <th scope="row">{index + 1}</th>
                <td>{usu.nombre}</td>
                <td>{usu.email}</td>
                <td>{usu.estado ? 'Activo' : 'Inactivo'}</td>
                <td>{creacion}</td>
                <td>{usu.fechaActualizacion}</td>
                <td>
                  <button 
                    type="button" 
                    className="btn btn-outline-success"
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal"
                    data={usu._id}
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