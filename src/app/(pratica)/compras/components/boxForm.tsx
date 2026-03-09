'use client';
import { setRequestMeta } from "next/dist/server/request-meta";
import { useState } from "react";

interface Produto {
    id:number;
    nome: string;
    quantidade: number;
    comprado: boolean;
}

export function BoxForm () {

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState<number>(0);
    const [produtos, setProduto] = useState<Produto[]>([]);

    const handleAddProduct = () => {

        if (!nome.trim()) {
            alert("Digite o nome do produto")
            return;
        }
        if (quantidade <= 0 ){
            alert("Digite a quantidade do produto corretamente")
            return;
        }

        const newProduct = [
            ...produtos,
            {id: Date.now(), nome: nome.trim(), quantidade: quantidade, comprado: false},
        ];

        setNome("")
        setQuantidade(0)
        setProduto(newProduct);
        localStorage.setItem("produto", JSON.stringify(newProduct));
    }
    return (
        <div className="flex justify-center flex-column"> 
        <div>

            <div>
            <label htmlFor="">Nome do produto</label>
            <input 
            placeholder="Adicione um produto" 
            value={nome}
            onChange={(e) => setNome(e.target.value)} 
            type="text" 
            />
            </div>


            <div>
            <label htmlFor="">Quantidade</label>
            <input 
            placeholder="Informe a quantidade" 
            onChange={(e) => setQuantidade(Number(e.target.value))}
            value={quantidade}
            type="number" />  
            </div>  

            <button
            onClick={handleAddProduct}
            >Adicionar produto</button>

            {produtos.map((item)=> 
            
            <li
            key={item.id}>  
                    <div className="flex flex-col">
                    <span>
                        {item.nome}
                    </span>

                    <span>
                        {item.quantidade}
                    </span>
                    </div> 
            </li>

            )}
        </div>
        </div>
    )
}

