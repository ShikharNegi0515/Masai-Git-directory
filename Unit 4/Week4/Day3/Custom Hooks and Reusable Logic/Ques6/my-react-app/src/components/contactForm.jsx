import React from 'react'
import useForm from '../hooks/useForm'

const ContactForm = () => {
    const {values, handleChange, resetForm} = useForm({
        name: "",
        email: "",
        message: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", values)
        resetForm()
    }
    return (
        <>
            <h1>contact Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={values.name} onChange={handleChange} placeholder='Enter Your Name' />
                <br />
                <input type="email" name="email" value={values.email} onChange={handleChange} placeholder='Enter Your Email' />
                <br />
                <input type="text" name="message" value={values.message} onChange={handleChange} placeholder='Enter Your Message' />
                <button type='submit'>Send</button>
            </form>
        </>
    )
}
export default ContactForm