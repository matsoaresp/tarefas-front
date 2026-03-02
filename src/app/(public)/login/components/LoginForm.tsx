import { useRef, useState } from "react";


export function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {


        e.preventDefault();
    }
    return (
        <>
            <form className="flex flex-col gap-4 w-full max-w-sm" action=" ">
                <div>
                    <label htmlFor="">E-mail</label>
                    <input type="text" />
                </div>

                <div>
                    <label htmlFor="">Senha</label>
                    <input type="text" />
                </div>

                <button>
                    Enviar
                </button>
            </form>

        </>
    )
}