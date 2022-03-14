import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'


const Formulario = ({cliente,cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3,'El nombre es muy corto')
                    .max(20,'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                  .email('Debe ser un email valido')
                  .required('El email es obligatorio'),
        telefono: Yup.number().typeError('Numero no valido')
                     .positive('El numero debe ser positivo')
                     .integer('Numero no valido')

    })

    const handleSubmit = async(values)=>{
        // console.log(values)
        //Mandando datos a la ApiRest
        try{
            let respuesta
            if(cliente.id){
                //Metodo PUT para editar
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url,{
                    method:'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }else{
                //Nuevo Registro
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url,{
                    method:'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            await respuesta.json()
            navigate('/clientes')

        }catch(error){
            console.log(error)
        }
    }

  return (
      cargando ? <Spinner/> : (

      
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase
                text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
            <Formik 
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? "",
                }}  
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm} )=>{
                    await handleSubmit(values)
                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors,touched})=>{
                    // console.log(data)
                return(
                <Form className='mt-10'>
                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor="nombre">Nombre:</label>
                        <Field 
                            id="nombre"
                            className='block bg-gray-100 mt-2 w-full p-3 rounded-md shadow-md'
                            type ="text"
                            placeholder="Nombre del cliente"
                            name="nombre"/>

                        {errors.nombre && touched.nombre ? (
                            <Alerta> {errors.nombre} </Alerta>
                        ): null}

                    </div>

                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='empresa'>Empresa:</label>
                        <Field 
                            id='empresa'
                            className='block bg-gray-100 mt-2 w-full p-3 rounded-md shadow-md'
                            type ='text'
                            placeholder="Empresa del cliente"
                            name="empresa"/>
                        {errors.empresa && touched.empresa ? (
                            <Alerta> {errors.empresa} </Alerta>
                        ): null}
                    </div>

                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='email'>Email:</label>
                        <Field 
                            id='email'
                            className='block bg-gray-100 mt-2 w-full p-3 rounded-md shadow-md'
                            type ='email'
                            placeholder="Email del cliente"
                            name="email"/>
                        {errors.email && touched.email ? (
                            <Alerta> {errors.email} </Alerta>
                        ): null}
                    </div>

                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='telefono'>Telefono:</label>
                        <Field 
                            id='telefono'
                            className='block bg-gray-100 mt-2 w-full p-3 rounded-md shadow-md'
                            type ='tel'
                            placeholder="Telefono del cliente"
                            name="telefono"/>
                        {errors.telefono && touched.telefono ? (
                            <Alerta> {errors.telefono} </Alerta>
                        ): null}
                    </div>

                    <div className='mb-4'>
                        <label className='text-gray-800' htmlFor='notas'>Notas:</label>
                        <Field 
                            as='textarea'
                            id='notas'
                            className='block bg-gray-100 mt-2 w-full p-3 rounded-md shadow-md'
                            type ='text'
                            placeholder="Notas del cliente"
                            name="notas"/>
                    </div>

                    <input 
                        type="submit" 
                        value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                        className='mt-5 p-3 text-white font-bold bg-blue-900 uppercase text-lg w-full'/>
                    
                </Form>
                )}}
            </Formik>
        </div>
     )
  )
}

Formulario.defaultProps ={
    cliente: {},
    cargando: false
}

export default Formulario