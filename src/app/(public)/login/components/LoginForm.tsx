import { SyntheticEvent, useRef, useState } from "react";
import { toast, Toaster } from "sonner";

export function LoginForm() {
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

        toast.success('Login realizado com sucesso!')
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Toaster position="top-right" />
            <form 
                onSubmit={handleSubmit}
            >
                <div className="flex items-center flex-col ">
                    <div className="flex flex-col gap-2 ">
                        <label className="flex items-cemte" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded px-3 py-2 w-64"
                        />
                    </div>


                    <div className="flex flex-col gap-2">
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded px-3 py-2 w-64"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-64"
                        >
                            Enviar
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}