
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Container, Form,Image } from 'react-bootstrap'


import Email from '../images/Email.svg'
import key from '../images/key.svg'
import person from '../images/person.svg'
import { Redirect } from "react-router-dom";





const ValidatedRegisterForm = () => (

  
  <Formik
    initialValues={{  firstName: '',
    email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {

        
       
      setTimeout(() => {
          alert("Submission Successfull");
         
        console.log("Signingup", values);
        setSubmitting(false);
      
        
      }, 500);
    //   return <Redirect to="/Login" />
    }
}

    //********Handling validation messages yourself*******/
    // validate={values => {
    //   let errors = {};
    //   if (!values.email) {
    //     errors.email = "Required";
    //   } else if (!EmailValidator.validate(values.email)) {
    //     errors.email = "Invalid email address";
    //   }

    //   const passwordRegex = /(?=.*[0-9])/;
    //   if (!values.password) {
    //     errors.password = "Required";
    //   } else if (values.password.length < 8) {
    //     errors.password = "Password must be 8 characters long.";
    //   } else if (!passwordRegex.test(values.password)) {
    //     errors.password = "Invalida password. Must contain one number";
    //   }

    //   return errors;
    // }}
    //********Using Yum for validation********/

    validationSchema={Yup.object().shape({
        firstName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      email: Yup.string()
        .email()
        .required("Email is Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <Container fluid className="d-flex justify-content-center mt-5 w-100 " >
        <Form className=" text-center  mt-5 w-75 d-flex flex-column align-items-center  " onSubmit={handleSubmit}>
            <h1> <b>Sign Up</b> </h1>
            <Form.Group controlId="formBasicName" className="d-inline-flex w-50 mt-5 " >
            <label className="align-bottom mr-2"  htmlFor="email"><Image src={ person } alt="Person-icon" className="mt-2"   /></label>
            <Form.Control
            name="firstName"
            type="text"
            placeholder="Enter your Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.firstName && touched.firstName  && "error"}
          />
           {errors.firstName  && touched.firstName  && (
            <div className="input-feedback  ml-2  ">{errors.firstName }</div>
          )}
           
           {errors.lastName && touched.lastName && (
            <div className="input-feedback  ml-2">{errors.lastName}</div>
          )}
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="d-inline-flex w-50 mt-5 " >
          <label className="align-bottom mr-2"  htmlFor="email"> <Image src={ Email } alt="Email-icon" className="mt-2"   /></label>
          <Form.Control
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback ml-2 ">{errors.email}</div>
          )}
         
          </Form.Group>
          <Form.Text className="text-muted ">
      (We'll never share your email with anyone else.)
         </Form.Text>
          <Form.Group controlId="formBasicpassword" className="d-inline-flex w-50 mt-5 " >
          <label className="align-bottom mr-2"  htmlFor="email"> <Image src={ key } alt="key-icon" className="mt-2"   /> </label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
          />
          {errors.password && touched.password && (
            <div className="input-feedback  ml-2">{errors.password}</div>
          )}
          </Form.Group>
          <Button className="w-25 mt-5 mb-5 "  variant="primary "  type="submit" disabled={isSubmitting}    >
          Sign Up
          </Button>
        </Form>
        </Container>
      );
    }}
  </Formik>
  
);

export default ValidatedRegisterForm;
