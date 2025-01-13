import { useFormik } from 'formik'
import React from 'react'
import "./app.css"
import { basicSchema } from './schema'

const onSubmit=()=>{
  console.log("Form submitted")
}

const App = () => {
  const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:{
      email:'',
      age:'',
      password:'',
      confirmPassword:''
    },
    validationSchema:basicSchema,
    onSubmit,
  })
  console.log("errors",errors)
  return (
    <form onSubmit={handleSubmit} autoComplete='off' style={{display:"flex",flexDirection:"column"}}>
      <label htmlFor='email'> Email</label>
        <input
          id='email'
          type='email'
          placeholder='Please enter your mail'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email? "error-class":""} 
        />
        {errors.email&&touched.email&&<p className='error'>{errors.email}</p>}
     
      <label htmlFor='age'>Age</label>
        <input
          id='age'
          type='number'
          placeholder='Enter your age'
          value={values.age}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.age && touched.email? "error-class":""}
        />
       {errors.age&&touched.age&&<p className='error'>{errors.age}</p>} 
      
      <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          placeholder='Enter a password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && touched.email? "error-class":""}
        />
      {errors.password&&touched.password&&<p className='error'>{errors.password}</p>}  
      
      <label htmlFor='confirm-password'>Confirm Password</label>
      <input
        id='confirmPassword'
        type='password'
        placeholder='Confirm password'
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.confirmPassword && touched.email? "error-class":""}
      />
      {errors.confirmPassword&&touched.confirmPassword&&<p className='error'>{errors.confirmPassword}</p>}
      <button type='submit'>Submit</button>

    </form>
  )
}

export default App