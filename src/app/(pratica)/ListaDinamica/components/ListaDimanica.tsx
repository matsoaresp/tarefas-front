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

        if (!nome){
            toast.error("Adicione um item")
            return
        }

       const newItem  = [ 
        ...item,
        {name: nome.trim()}
    ]

        setNome("")
    }

    return  (
        <div>
            <input type="text" />
            <button
            onClick={handleAdd}
            ></button>

            <ul>
                {item.map((itens) => (
                    <li>
                        <div>
                            Nome: {itens.name}
                        </div>
                    </li>
                ))}
                
            </ul>
        </div>
    )
} 