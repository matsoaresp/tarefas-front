'use client';
import { setRequestMeta } from "next/dist/server/request-meta";
import { useEffect, useState } from "react";

interface Produto {
    id: number;
    nome: string;
    quantidade: string;
    comprado: boolean;
}

export function BoxForm() {

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [filter, setFilter] = useState<"todos" | "comprado" | "pendente">("todos")
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [busca, setBusca] = useState("");
    const totalProdutos = produtos.length;
    const totalBuy = produtos.filter((produto) => produto.comprado).length;
    const totalPending = produtos.filter((produto) => !produto.comprado).length;

    const filtrarProdutos = produtos.filter((produto) => produto.nome.toLowerCase().startsWith(busca.toLowerCase()))

    const handleAddProduct = () => {

        if(!nome.trim() || !quantidade.trim()) {
            alert("Digite o nome e quantidade do produto")
            return;
        }

        const newProduct = [
            ...produtos,
            { id: Date.now(), nome: nome.trim(), quantidade: quantidade, comprado: false },
        ];

        setNome("");
        setQuantidade("");
        setProdutos(newProduct);
        localStorage.setItem("produto", JSON.stringify(newProduct));
    }

    const removeProduct = (id: number) => {

        const remove = produtos.filter((item) => item.id !== id)
        setProdutos(remove)
        localStorage.setItem("produto", JSON.stringify(remove))

    }

    const handleCompleted = (id: number) => {

        const updated = produtos.map((item) =>
            item.id === id ? { ...item, comprado: !item.comprado } : item)

        setProdutos(updated)
    }

    const removerComprados = () => {
        const removeComprado = produtos.filter((item) => !item.comprado)

        setProdutos(removeComprado)
        localStorage.setItem("produto", JSON.stringify(removeComprado))
    }

    useEffect(() => {

        const data = localStorage.getItem("produto");
        if(data) {
            setProdutos(JSON.parse(data))
        }
    }, [])
    return (
        <div className="flex justify-center flex-column">
            <div>

                <div>
                    <label htmlFor="">Nome do produto</label>
                    <input
                        placeholder=" Adicione um produto"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        type="text"
                    />
                </div>


                <div>
                    <label htmlFor="">Quantidade</label>
                    <input
                        placeholder=" Informe a quantidade"
                        onChange={(e) => setQuantidade(e.target.value)}
                        value={quantidade}
                        type="text" />
                </div>
                <div>


                    <button
                        onClick={handleAddProduct}
                    >Adicionar produto
                    </button>
                </div>
                <ul>
                    <input 
                type="text" 
                placeholder="Pesquisar produto"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                 />
                    {filtrarProdutos.map((produto) =>

                        <li
                            key={produto.id}>
                            <div className="flex flex-row gap-6">
                                <span>
                                    Nome: {produto.nome}
                                </span>

                                <span>
                                    Quantidade: {produto.quantidade}
                                </span>

                                <input
                                    type="checkbox"
                                    checked={produto.comprado}
                                    onChange={() => handleCompleted(produto.id)}
                                />
                                <span>
                                    {produto.comprado ? "Comprado" : "Pendente"}
                                </span>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => removeProduct(produto.id)}
                                    >Remover</button>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
                <div className="flex gap-4 mt-20">
                    <span>Total: {totalProdutos}</span>
                    <span>Comprados: {totalBuy}</span>
                    <span>Pendentes: {totalPending}</span>
                </div>
            </div>
        </div>
    )
}
