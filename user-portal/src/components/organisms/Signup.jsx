import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import FormInput from '../molecules/FormInput'
import Button from '../atoms/Button'
import ImgTag from '../atoms/ImgTag'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup';
import SocialIcon from '../molecules/SocialIcon'


function Signup() {

    const initialValues = {
        firstName: '',
        lastName: '',
        emailId: '',
        password: '',
        ReEnterPassword: '',
        contactNumber: ''
    }
    
    const validationSchema = yup.object({
        firstName: yup.string('first-name must be string').required('is required !'),
        lastName: yup.string('last-name must be string').required('is equired !'),
        emailId:yup.string().email('enter valid email').required('is required !'),
        password: yup.string().required('required !'),
        ReEnterPassword : yup.string().required('required !').oneOf([yup.ref('password'), null], 'Passwords must match')
        })
    
        const [msg, setMsg] = useState("");
    let Msg;
        function handlesubmit(values){
            let data = values
            console.log(data)
            fetch("http://localhost:3200/api/user",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            .then(res => res.json())
            .then((result)=>{
                Msg = result.message
               if(result.message){
                console.log("there is a msg for you")
                setMsg(result.message)
               }
            }).catch((error)=>{
                console.log("errorincatch:::::",error)
            })
        }
    

    return (
        
        <div className="main-container d-flex">
            <div className="msg position-absolute w-100">
                {
                   msg && msg==="user created successfully!"?
                   <Alert variant="success" onClose={() => setMsg(false)} dismissible>
                   <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                 </Alert>
                 ?
                 msg 
                 :
                 <Alert variant="danger" onClose={() => setMsg(true)} dismissible>
                 <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
               </Alert>
                 : null
                }
            </div>
            <div className="flex-1 d-flex">
                <ImgTag className="w-100" imgUrl='/assets/images/bac_removed_3.png' altText='backgroud img' />
            </div>
            <div className="d-flex flex-1 align-items-center">
                <div className="user-form d-flex align-items-center justify-content-center">
                    <Formik
                        initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesubmit}>
                        <Form className="form-width">
                            <div className=" d-flex justify-content-between align-items-center">
                                <div className="signup-logo">Sign Up</div>
                                <div className="website-logo d-flex justify-content-center align-items-center">
                                    <ImgTag className="w-100" imgUrl='/assets/images/logo1.png' altText='backgroud img' />
                                </div>
                            </div>
                            <div className="d-flex mt-2 w-100 ">
                                <FormInput outerDivClass='form-fontsize' htmlFor='first-name' label='First name' fieldClass='form-field' iconClass='fa-solid fa-user form-icon' type='text' inputClass='form-control form-para form-br' id='First-name' name='firstName' placeholder="   First Name" />
                                <FormInput outerDivClass='form-fontsize' htmlFor='last-name' label='last name' fieldClass='form-field' iconClass='fa-solid fa-user form-icon' type='text' inputClass='form-control form-para form-br' id='last-name' name='lastName' placeholder="   Last Name" />
                            </div>
                            <FormInput outerDivClass='form-fontsize mt-2' htmlFor='emailId' label='Email ' fieldClass='form-field' iconClass='fa-solid fa-envelope form-icon' type='email' inputClass='form-control form-para form-br' id='emailId' name='emailId' placeholder="   Enter email" />
                            <FormInput outerDivClass='form-fontsize mt-2' htmlFor='password' label='password ' fieldClass='form-field' iconClass='fa-solid fa-lock form-icon' type='password' inputClass='form-control form-para form-br' id='password' name='password' placeholder="   password" />
                            <FormInput outerDivClass='form-fontsize mt-2' htmlFor='Re-Enter' label='Re-Enter ' fieldClass='form-field' iconClass='fa-solid fa-lock fa-repeat form-icon' type='password' inputClass='form-control form-para form-br' id='Re-Enter' name='ReEnterPassword' placeholder="   Re-Enter your password" />
                            <FormInput outerDivClass='form-fontsize mt-2' htmlFor='contactNumber' label='Mobile-Number ' fieldClass='form-field' iconClass='fa-solid fa-lock fa-address-book form-icon' type='text' inputClass='form-control form-para form-br' id='contactNumber' name='contactNumber' placeholder="   Enter your Mobile-Number" />
                            <Button type='submit' className='btn w-100 signup-btn' buttonText='Signup' />
                            <div className="sign-up__badge text-center">
                                <span className="badge badge-secondary badge-bg">OR</span>
                            </div>
                            <SocialIcon divClass='social-icons my-2 text-center' imgClass='w-100' urlArr={['google.png','facebook.png','mail.png']} />
                            <small id="emailHelp" className="form-text text-muted text-center my-2">Already a user? <Link to='/'>login</Link></small>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Signup

