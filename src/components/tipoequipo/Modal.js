import React from 'react'

export default function Modal({tipoEquipo, loading, closeModal, hidden, changetipoEquipo, error, add}) {
  return (
<div 
    className="modal fade" id="exampleModal" 
    tabIndex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{tipoEquipo._id ? 'Editar tipoEquipo': 'Nuevo tipoEquipo'}</h5>
          {
            (loading && <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>)
          }
          
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            onClick={closeModal}
          >
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={add}>
            <input type={hidden} name="_id" value={tipoEquipo._id}></input>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Nombre:
              </label>
              <input 
                disabled={tipoEquipo._id ? true : false}
                readOnly={tipoEquipo._id ? true : false}
                required
                value={tipoEquipo.nombre}
                name="nombre"
                type="text" 
                className="form-control"
                onChange={changetipoEquipo}                
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">tipoEquipo:</label>
              <select
                disabled={tipoEquipo._id ? false : true}
                readOnly={tipoEquipo._id ? false : true}
                required
                className="form-select" 
                aria-label="Default select example"
                value={tipoEquipo.tipoEquipo}
                name="tipoEquipo"
                onChange={changetipoEquipo}
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>
            <div className="modal-footer">
            <div className={error ? 'alert alert-danger': 'd-none'} role="alert">
              ??Ha ocurrido un error!
            </div>
              <button 
                type="button" 
                className="btn btn-secondary" data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
              {
                loading ? (<button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
                  </button>) : (<button type="submit" className="btn btn-primary">
                    Guardar
                  </button>)
              }
            </div>
          </form>
            </div>
        </div>
        </div>
    </div>
  )
}