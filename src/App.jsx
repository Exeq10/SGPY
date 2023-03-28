import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ListadoPedidos from './components/ListadoPedidos';
import { BrowserRouter,Routes,Route, Link } from 'react-router-dom'; 
import CreatePedido from './components/CreatePedido';
import EditPedido from './components/EditPedido';
import ShowCompletePedido from './components/ShowCompletePedido';
import AddProveedor from './components/compProveedores/addProveedor';



function App() {

  const [pedidos, setpedidos] = useState([]);

  const [pedidosFiltrados , setpedidosFiltrados] = useState([])

 

  return (
    <div>

    <header className='container  p-1  header  d-flex justify-content-center' >

    <img  className=' w-25'  src="/SGP.svg" alt="" />

    </header>

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListadoPedidos  pedidos={pedidos}  setpedidos={setpedidos}  
        pedidosFiltrados = {pedidosFiltrados}
        setpedidosFiltrados = {setpedidosFiltrados} />} />
        <Route path='/create' element={<CreatePedido/>} />
        <Route path='/addProv' element={<AddProveedor/>} />
        <Route path='/edit/:id' element={<EditPedido/>} />
        <Route path='/show/:id' element={<ShowCompletePedido pedidos={pedidos}/>} />
      


    
      </Routes>
      

 
      </BrowserRouter>

    </div>
  )
}

export default App
