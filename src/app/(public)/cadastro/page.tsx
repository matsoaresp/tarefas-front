'use client';
import { useState } from "react";
import { toast } from 'sonner';
import { LoginForm } from "../login/components/LoginForm";




export default function Regiser() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('')


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(!email.trim()) {
            toast.error('Preencha o campo E-mail');
            return;
        }
        if(!senha.trim()) {
            toast.error('Preencha o campo Senha');
            return;
        }

        if(confirmarSenha !== senha) {
            toast.error('As senhas não coincidem');
            return;
        }
    }
    return (
        <div>
            <form action="
                ">
                <label htmlFor="">Nome</label>
                <input type="text" />

                <label htmlFor="">E-mail</label>
                <input type="text" />

                <label htmlFor="">Senha</label>
                <input type="text" />

                <label htmlFor="">Confirmar senha</label>
                <input type="text" />
            </form>
        </div>

    );
}