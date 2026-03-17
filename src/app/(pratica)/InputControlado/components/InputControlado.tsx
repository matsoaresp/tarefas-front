'use client';
import { useState } from "react";
import { toast } from "sonner";

export function InputControlado () {

    const [nome, setNome] = useState("");

    const handleNome = () =>{
        if (!nome){
            toast.error('Inform seu nome')
            return
        }

        setNome('')
    }
    return(
        <div>
            <h1>{nome}</h1>
            
        <input type="text"
        placeholder="Informe seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)} />
        </div>
    )
}