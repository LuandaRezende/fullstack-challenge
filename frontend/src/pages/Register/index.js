import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function notifySuccess(){
        toast('Cadastrado com sucesso!');
    }

    function notifyError(){
        toast('Email já existe!');
    }

    async function handleRegister(event) {
        event.preventDefault();

        const data = ({
            name,
            email,
            password,
        });

       
        try {
            const response = await api.post('auth/register', data);
            notifySuccess();
            setTimeout(() => {
                history.push('/')
            }, 5000);
        } catch (error) {
            notifyError();
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro para entrar na plataforma!</p>
                    <Link style={{ textDecoration: 'none' }} to="/">
                        <FiArrowLeft size={16} color="#006600" />
                        <span>Já tenho cadastro</span>
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input type="name" value={name} onChange={event => setName(event.target.value)} placeholder="Nome" />
                    <input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="e-mail" />
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Senha" />
                    <button className="button" type="submit">Cadastrar</button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}