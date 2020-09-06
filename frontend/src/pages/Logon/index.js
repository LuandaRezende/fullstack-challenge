import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import image from '../../assets/img/image.png';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('auth/authenticate', { email, password });

            localStorage.setItem('id', response.data.user._id);
            localStorage.setItem('name', response.data.user.name);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('password', password);
            localStorage.setItem('email', email);
            history.push('/dashboard');

        } catch (error) {
            alert(`Falha no login`);
        }
    }

    return (
        <div className="logo-container">
            <img className="image" src={image} alt="Imagem estatística"></img>
                <section className="form">
                    <form onSubmit={handleLogin}>
                        <h1><center>Faça seu login</center></h1>
                            <input value={email} onChange={event => setEmail(event.target.value)} placeholder="Seu email" />
                            <input value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Sua senha" />
                        <button className="button" type="submit">Entrar</button>
                        <Link style={{ textDecoration: 'none' }} to="/register">
                            <FiLogIn size={16} color="#2842a2" />
                            <span>Não tenho cadastro</span>
                        </Link>
                    </form>
                </section>
        </div>
    );
}