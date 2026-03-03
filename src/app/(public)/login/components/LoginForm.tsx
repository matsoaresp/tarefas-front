'use client';

import { useRouter } from "next/navigation";
import { SyntheticEvent, useRef, useState } from "react";
import { toast, Toaster } from "sonner";

export function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e:SyntheticEvent) => {
        e.preventDefault();

         if (!email.trim() && !password.trim()) {
            toast.error('Nenhum campo foi preenchido')
            return;
        }
        if (!email.trim()) {
            toast.error('O campo e-mail não foi preenchido')
            return;
        }
        if (!password.trim()) {
            toast.error('O campo senha não foi preenchido')
            return;
        }

        if (password.length <= 8) {
            toast.error('A senha deve tem no mínimo 8 caracteres')
            return;
        }

        toast.success('Login realizado com sucesso!')
    };


    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Toaster position="top-right" />
            <form className="border w-[220] h-80 rounded-md" onSubmit={handleSubmit}>
                <div className="flex items-center flex-col gap-5">
                    
                    <div className="flex flex-col gap-2 items-center">
                        <label className="flex items-center" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded  w-64 p-15"
                        />
                    </div>


                    <div className="flex flex-col gap-2 items-center">
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded w-64 p-15"
                        />
                    </div>
                   

                    <div className="flex gap-6">
                    <div className="">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-25"
                        >
                            Enviar
                        </button>
                    </div>

                    <div className="">
                        <button
                            type="button"
                            onClick={() => router.push("/cadastro")}
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-40"
                        >
                            Cadastrar-se
                        </button>
                    </div>
                    </div>
                </div>
            </form>
        </div>
    );
}