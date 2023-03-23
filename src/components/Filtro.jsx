import React from 'react'

function Filtro({setFiltroEstado}) {
  return (
    <div> <label htmlFor="filtro" className="m-2"> Filtrar por estado  </label>
    <select 
          
          onChange={(e) => {
              
                            
              setFiltroEstado(e.target.value);
            }}
            className="custom-select my-1 mr-sm-2 mt-5 mb-5 w-25"
          >
           
           <option className="Todos"  value={"Todos"}>Todos</option>
           <option className="Pendiente"  value={"Pendiente"}>Pendiente</option>
           <option className="Procesado"  value={"Procesado"}>En Proceso</option>
          <option className="Tramitado"  value={"Tramitado"}>En Trámite</option>
          <option className="Entregado"  value={"Entregado"}>Entregado </option>
          </select></div>
  )
}

export default Filtro