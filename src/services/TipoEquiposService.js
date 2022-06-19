import { axiosConfig } from "../config/axiosConfig"

export const obtenerTodos = () => {
  return axiosConfig.get('/tiposequipo');
}

export const guardar = (tipoEquipo) => {
  return axiosConfig.post('/tiposequipo', tipoEquipo);
}

export const editarPorId = (id, tipoEquipo) => {
  return axiosConfig.put('/tiposequipo/'+id, tipoEquipo);
}