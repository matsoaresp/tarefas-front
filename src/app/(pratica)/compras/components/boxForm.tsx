'use client';
import { setRequestMeta } from "next/dist/server/request-meta";
import { useEffect, useState } from "react";

interface Produto {
    id:number;
    nome: string;
    quantidade: number;
    comprado: boolean;
}

export function BoxForm () {

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState<number>(0);
    const [filter, setFilter] = useState<"todos" | "comprado" | "pendente">("todos")
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const totalProdutos  = produtos.length;
    const totalBuy = produtos.filter((produto) => produto.comprado).length;
    const totalPending = produtos.filter((produto) => !produto.comprado).length;

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

        setNome("");
        setQuantidade(0);
        setProdutos(newProduct);
        localStorage.setItem("produto", JSON.stringify(newProduct));
    }

    const removeProduct = (id: number) => {

        const remove = produtos.filter((item ) => item.id !== id)
        setProdutos(remove)
        localStorage.setItem("produto", JSON.stringify(remove))

    }

    const handleCompleted = (id: number) => {

        const updated = produtos.map((item) => 
        item.id === id ? {...item,comprado: !item.comprado } : item)

        setProdutos(updated)
    }

    useEffect(() => {

            const data = localStorage.getItem("produto");
            if (data) {
                setProdutos(JSON.parse(data))
            }}, [])
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
            <ul>
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

                    <div>
                       <input 
                       type="checkbox"
                        checked= {item.comprado}
                        onChange={()=> handleCompleted(item.id)}
                       />
                    </div>

                    <div>
                    <button
                    type="button"
                    onClick={() => removeProduct(item.id)}
                    >Remover</button>
                    </div>
            </li>
            )}
            </ul>
            <div>
                <span>Total: {totalProdutos}</span>
                <span>Comprados: {totalBuy}</span>
                <span>Pendentes: {totalPending}</span>
            </div>
        </div>
        </div>
    )
}

