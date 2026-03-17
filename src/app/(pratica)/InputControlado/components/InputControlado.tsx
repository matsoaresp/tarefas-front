'use client';
import { useState } from "react";

export function InputControlado () {

    const [nome, setNome] = useState("");

   
    return(
        <div>
            <h1>Resultado: Olá {nome}</h1>
            
        <input type="text"
        placeholder="Informe seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)} />
        </div>
    )
}