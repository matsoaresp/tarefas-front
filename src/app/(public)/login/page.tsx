'use client';
import { useState} from "react";
import { toast } from 'sonner';
import { LoginForm} from "./components/LoginForm";

export default function Login() {
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('')


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(!email.trim()) {
            toast.error('Preencha o campo E-mail');
            return;
        }   
        if (!senha.trim()) {
            toast.error('Preencha o campo Senha');
            return;
        }
    }
    return (
            
                <LoginForm>

                </LoginForm>
                
    );
}