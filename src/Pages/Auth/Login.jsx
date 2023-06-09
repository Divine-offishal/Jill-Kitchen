import React, { useState } from 'react'
import {auth} from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, NavLink } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'

import { Formik, Form, Field, ErrorMessage} from 'formik'
import { validationSchema } from './utils/validationSchema'

import { IonIcon } from '@ionic/react'
import { arrowBackCircleSharp } from 'ionicons/icons'

const Login = () => {

  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate('/cart')
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorCode, errorMessage)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className='w-screen h-screen '>
      <div className='w-screen h-screen border border-amber-900 z-[99999] fixed top-0 right-0 text-amber-900 bg-primary grid justify-items-center'>
        <Toaster/>

        <NavLink to='/'>
          <span className="fixed left-10 top-10 text-5xl text-green-700">
            <IonIcon icon={arrowBackCircleSharp}/>
          </span>
        </NavLink>

        <h1 className='mt-2 section-header'>Login</h1>

        <Formik 
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({isSubmitting}) => (
              <Form className='grid justify-items-center w-9/12'>
                <div className='w-full grid justify-items-center my-4'>
                  <Field type="email" name="email" placeholder="Email" className='h-10 w-9/12 max-input '/>
                  <ErrorMessage name="email" component="div" className='text-red-500 text-xl font-bold'/>
                </div>
                <div className='w-full grid justify-items-center my-4'>
                  <Field type="password" name="password" placeholder="password" className='h-10 w-9/12 max-input'/>
                  <ErrorMessage name="password" component="div" className='text-red-500 text-xl font-bold'/>
                </div>
                
                <div>
                  <button type='submit' className='bg-green-700 h-8 px-2 text-primary focus-state disabled:bg-green-700/50' disabled={isSubmitting}>Submit</button>
                </div>
              </Form>
            )}

        </Formik>
      </div>
    </div>
  )
}

export default Login