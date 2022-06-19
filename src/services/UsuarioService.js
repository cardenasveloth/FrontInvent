import { axiosConfig } from "../config/axiosConfig"

export const obtenerTodos = () => {
  return axiosConfig.get(
      '/usuarios'
  );
}

export const guardar = (usuario) => {
  return axiosConfig.post('/usuarios', usuario);
}

export const editarPorId = (id, usuario) => {
  return axiosConfig.put('/usuarios/'+id, usuario);
}