import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import Formulario from '../components/Formulario'

const Editarcliente = () => {

  const [cliente,setCliente] = useState({})
  const [cargando,setCargando] = useState(true)
  const {id} = useParams()
  
  useEffect(()=>{
    
    const obtenerCLienteApi = async ()=>{
        try{
            const url = `http://localhost:4000/clientes/${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            setCliente(resultado)
        }catch(error){
            console.log(error)
        }
        setCargando(!cargando)
    }
    obtenerCLienteApi()
  },[])

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900 '>Editar Cliente</h1>
        <p className='mt-3'>Llena los siguientes campos para editar el cliente</p>

        {cliente?.nombre ? (
          <Formulario
            cliente ={cliente}
            cargando = {cargando}
          />
        ): <p>Cliente Id No valido</p> }
        
    </>
  )
}

export default Editarcliente