import React from 'react'

export default function Modal({inventario, loading, closeModal, hidden, changeInventario, error, add}) {
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
          <h5 className="modal-title" id="exampleModalLabel">{inventario._id ? 'Editar inventario': 'Nuevo inventario'}</h5>
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
            <input type={hidden} name="_id" value={inventario._id}></input>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Serial:
              </label>
              <input 
                disabled={inventario._id ? true : false}
                readOnly={inventario._id ? true : false}
                required
                value={inventario.serial}
                name="serial"
                type="text" 
                className="form-control"
                onChange={changeInventario}                
              />
            </div>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Modelo:
              </label>
              <input 
                disabled={inventario._id ? true : false}
                readOnly={inventario._id ? true : false}
                required
                value={inventario.modelo}
                name="modelo"
                type="text" 
                className="form-control"
                onChange={changeInventario}                
              />
            </div>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Descripción:
              </label>
              <input 
                disabled={inventario._id ? true : false}
                readOnly={inventario._id ? true : false}
                required
                value={inventario.descripcion}
                name="descripcion"
                type="text" 
                className="form-control"
                onChange={changeInventario}                
              />
            </div>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Foto:
              </label>
              <input 
                disabled={inventario._id ? true : false}
                readOnly={inventario._id ? true : false}
                required
                value={inventario.foto}
                name="foto"
                type="text" 
                className="form-control"
                onChange={changeInventario}                
              />
            </div>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Color:
              </label>
              <input 
                disabled={inventario._id ? true : false}
                readOnly={inventario._id ? true : false}
                required
                value={inventario.color}
                name="color"
                type="text" 
                className="form-control"
                onChange={changeInventario}                
              />
            </div>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Fecha Compra:
              </label>
              <input 
                disabled={inventario._id ? true : false}
                readOnly={inventario._id ? true : false}
                required
                value={inventario.fechaCompra}
                name="fechaCompra"
                type="date" 
                className="form-control"
                onChange={changeInventario}                
              />
            </div>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Usuario:
              </label>
              <input 
                disabled={inventario._id ? true : false}
                readOnly={inventario._id ? true : false}
                required
                value={inventario.usuario}
                name="usuario"
                type="text" 
                className="form-control"
                onChange={changeInventario}                
              />
            </div>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Marca:
              </label>
              <input 
                disabled={inventario._id ? true : false}
                readOnly={inventario._id ? true : false}
                required
                value={inventario.marca}
                name="foto"
                type="text" 
                className="form-control"
                onChange={changeInventario}                
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">Estado:</label>
              <select
                disabled={inventario._id ? false : true}
                readOnly={inventario._id ? false : true}
                required
                className="form-select" 
                aria-label="Default select example"
                value={inventario.estado}
                name="estado"
                onChange={changeInventario}
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>
            <div className="modal-footer">
            <div className={error ? 'alert alert-danger': 'd-none'} role="alert">
              ¡Ha ocurrido un error!
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