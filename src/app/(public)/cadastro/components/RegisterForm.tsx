'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from 'sonner';


interface User{
    id: number;
    name: string;
    email: string;
}
export default function RegiserForm() {
    const router = useRouter();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState<User[]>([])
    const [password, setPassword] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('')


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!name.trim()){
            toast.error('O campo nome não foi preenchido')
            return;
        }

        if(!email.trim()) {
            toast.error('Preencha o campo E-mail');
            return;
        }
        if(!password.trim()) {
            toast.error('Preencha o campo Senha');
            return;
        }
        if (password.length <= 8){
            toast.error('A senha deve ter no mínimo 8 caracteres')
            return;
        }

        if(confirmarSenha !== password) {
            toast.error('As senhas não coincidem');
            return;
        }

        const newUser = [
            ...users,
            {id: Date.now(), name: name.trim(), email: email.trim()}
        ]
        setUsers(newUser)
        localStorage.setItem("users", JSON.stringify(newUser));
        setName("");
        setEmail("");
        setPassword("");
        setConfirmarSenha("");

        toast.success('Cadastro realizado com sucesso')
        setTimeout(() => {
        console.log("Redirecionando para login...");
        router.push('/login');
      }, 1500);

        
    }
   return (
           <div className="flex items-center justify-center min-h-screen p-4">
               <Toaster position="top-right" />
               <form className="border w-[220] h-130 rounded-md" onSubmit={handleSubmit}>
                   <div className="flex items-center flex-col gap-5">

                        <div className="flex flex-col gap-2 items-center">
                           <label htmlFor="senha">Nome</label>
                           <input
                               id="nome"
                               type="text"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               className="border rounded w-64 p-15"
                           />
                       </div>
                       
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


                       <div className="flex flex-col gap-2 items-center">
                           <label htmlFor="senha">Confirmar Senha</label>
                           <input
                               id="senha"
                               type="password"
                               value={confirmarSenha}
                               onChange={(e) => setConfirmarSenha(e.target.value)}
                               className="border rounded w-64 p-15"
                           />
                       </div>
                      
   
                       <div className="">
                           <button
                               type="submit"
                               className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-25"
                           >
                               Enviar
                           </button>
                       </div>
   
                   </div>
               </form>
           </div>
       );
}