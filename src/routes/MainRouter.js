import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import BarraNav from '../components/iu/BarraNav'
import Estado from '../components/estado/Estado'
import Marca from '../components/marca/Marca'
import TipoEquipo from '../components/tipoequipo/TipoEquipo'
import Inventario from '../components/inventario/Inventario'
import Usuario from '../components/usuario/Usuario'

export default function MainRouter() {
  return (
    <BrowserRouter>
        <BarraNav />
        <Routes>
          <Route path='/' element={<Estado />}/>
          <Route path='/marcas' element={ <Marca />}/>
          <Route path='/tipoequipos' element={ <TipoEquipo />}/>
          <Route path='/usuarios' element={ <Usuario />}/>
          <Route path='/inventarios' element={ <Inventario />}/>
        </Routes>

    </BrowserRouter>
  )
}
