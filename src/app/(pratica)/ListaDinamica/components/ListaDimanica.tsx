'use client';
import { useState } from "react";
import { toast } from "sonner";

    interface Itens {
        id:number;
        name: string;
        purchased?: boolean
    }
export function ListaDinamica (){   

    const [item, setItem] = useState<Itens[]>([]);
    const [nome, setNome] = useState("");

    const handleAdd = () => {

        if (!nome.trim()){
            toast.error("Adicione um item")
            return;
        }

       const newItem  = [ 
        ...item,
        {id: Date.now(), name: nome.trim()}
    ]

        setItem(newItem)
        setNome("")
    }

    const removeItem = (id: number) => {

        const remove = item.filter(p => (p.id !== id))
        setItem(remove)
    }

    return  (
        <div>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>

            <div>
            <button
            onClick={handleAdd}
            >Insira um item</button>
            
            </div>

            <ul>
                {item.map((itens) => (
                    <li key={itens.id}>
        
                        Nome: {itens.name}
                        <button onClick={() =>removeItem (itens.id)}>Remover item</button>
                    </li>
                ))}
                
            </ul>
        </div>
    )
} 