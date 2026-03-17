import { useState } from "react";

    interface Metas {

        id: number;
        nome: string;
        descricao: string;
        horasAtuais?: number;
        horasMetas?: number;
    }

export function Metas() {

    const [metas, setMetas] = useState<Metas[]>([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");


    

    return (
        <div>
            <input type="
            " placeholder="Nome"/>
            <input type="text"
            placeholder="Descricao" />
        </div>
    )
}