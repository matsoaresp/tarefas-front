'use client';
import { useState } from "react";
import { toast } from "sonner";

    interface Itens {
        
        name: string;
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
        {name: nome.trim()}
    ]

        setItem(newItem)
        setNome("")
    }

    return  (
        <div>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
            <button
            onClick={handleAdd}
            >Insira um item</button>

            <ul>
                {item.map((itens, index) => (
                    <li key={index}>
        
                            Nome: {itens.name}
                        
                    </li>
                ))}
                
            </ul>
        </div>
    )
} 