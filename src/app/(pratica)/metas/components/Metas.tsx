'use client'
import { useEffect, useState } from "react";
import { toast } from "sonner";

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


    const handleAddMeta = () => {


        if(!nome.trim() || !descricao.trim()) {
            toast.error("Preencha todos os campos")
            return
        }

        const newMeta = [
            ...metas,
            { id: Date.now(), nome: nome.trim(), descricao: descricao.trim() }
        ]

        toast.success("Meta adicionada com sucesso");
        setMetas(newMeta)
        localStorage.setItem("metas", JSON.stringify(newMeta))
        setNome("")
        setDescricao("")
        
    }

    useEffect(() => {
        const data = localStorage.getItem("metas");
        if (data){
            setMetas(JSON.parse(data))
        }
    }, [])

    return (
        <div>
            <input type="
            " placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)} />
            <input type="text"
                placeholder="Descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)} />

            <button
                onClick={handleAddMeta}
            >
                Adicionar Meta
            </button>
            <ul className="flex">
                {metas.map((metas) =>(

                    <li className="gap-4" key={metas.id}>
                        Nome: {metas.nome}
                        Descrição: {metas.descricao}
                    </li>
                    
                ))}
            </ul>
        </div>
    )
}