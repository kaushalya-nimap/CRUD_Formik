import * as yup from "yup"

const passwordRules=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/

export const basicSchema=yup.object().shape({
    email:yup.string().email("Please enter valid email").required("Required"),
    age:yup.number().positive().integer().required("Required"),
    password:yup.string().min(5).matches(passwordRules,{message:"Please create a stronger password"}).required("Required"),
    confirmPassword:yup.string().oneOf([yup.ref('password'),null],"Passwords must match").required("Required")
})