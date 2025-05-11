import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/contact', form);
            navigate('/');
            alert('Message sent successfully');
            console.log(res.data);
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <div style={{ backgroundColor: '#F7FAFF', minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container">
                <h1 className='text-center p-4'>Comment Nous Trouver</h1>
                <h4 className='text-center pb-4'>Remplissez le formulaire et posez vos questions</h4>

                <div className="container mt-4">
                    <div className="row">
                        {/* Left Column - Form */}
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm h-100">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Your Name:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name='name' 
                                        value={form.name} 
                                        onChange={handleForm}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Your Email:</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name='email'  
                                        value={form.email} 
                                        onChange={handleForm}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Your Phone:</label>
                                    <input 
                                        type="text"  
                                        className="form-control" 
                                        name='phone' 
                                        value={form.phone} 
                                        onChange={handleForm}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message:</label>
                                    <textarea 
                                        className="form-control" 
                                        name="message" 
                                        rows="5"
                                        value={form.message} 
                                        onChange={handleForm}
                                        required
                                    ></textarea>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Send Now
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column - Google Maps */}
                        <div className="col-md-6">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3465.8795566665067!2d-9.73043707504794!3d29.694271435077823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb47b9d5b53cfc1%3A0x69c7b126f40fe639!2sCentre%20Dentaire%20LARGOU!5e0!3m2!1sar!2sma!4v1746921435273!5m2!1sar!2sma" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}