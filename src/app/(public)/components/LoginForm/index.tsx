import { useRef, useState } from "react";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";


export function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
        

        e.preventDefault();
    }
    return (
        <>
            <form className="form" action=" ">
                <div className="formRow">
                    <DefaultInput
                        id="meuInput"
                        type="text"
                        placeholder="Digite seu e-mail"
                    >
                    </DefaultInput>
                </div>
                <div className="formRow">
                    <DefaultInput
                        id="meuInput"
                        type="text"
                        placeholder="Digite sua senha"
                    >
                    </DefaultInput>
                </div>
                <div>
                    <DefaultButton
                       text="Entrar"
                        type="button"
                    >
                    </DefaultButton>
                </div>
            </form>

        </>
    )
}