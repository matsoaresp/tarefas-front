'use client';
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";

interface Produto {
    id: number
    nome: string;
    preco: number;
    quantidade: number;
    total: number;
}

export function ComprasForm () {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [isEditing, setIsEditing] = useState<number | null>(null)
    const [busca, setBusca] = useState("")
    const [produtos, setProdutos] = useState<Produto[]>([]);


    const incrementar = (id: number) => {
        const updated = produtos.map((produto) => 
            produto.id === id ? {
                ...produto,
                quantidade: produto.quantidade + 1,
                total: (produto.quantidade + 1) * produto.preco
            }
            : produto
        )
        setProdutos(updated);
        localStorage.setItem("produto", JSON.stringify(updated));
    }

    const decrementar = (id: number) => {
        
        const updated = produtos.map((produto) =>
            produto.id === id && produto.quantidade > 1 ? {
                ...produto,
                quantidade: produto.quantidade - 1,
                total: (produto.quantidade - 1) * produto.preco
            }
            :
            produto
        )
        setProdutos(updated);
        localStorage.setItem("produto", JSON.stringify(updated));
    }

    const handleUpdateProduct = (id: number) => {

        const produto = produtos.find((p) => p.id === id)

        if (produto) {
            setNome(produto.nome)
            setPreco(produto.preco)
            setQuantidade(produto.quantidade)
            setIsEditing(id)
        }
    }

    const handleSave = (id: number) => {

        const updated = produtos.map((produto) => 
            produto.id === id ? {...produto, nome,preco,quantidade} : produto
        );

        setProdutos(updated);
        setNome("");
        setPreco(0);
        setQuantidade(0);
        setIsEditing(null);
        toast.success("Produto atualizado")
    };

    const handleSubmit = () => {

        if (isEditing !== null) {
            handleSave(isEditing);
        }else {
            handleAddProduct();
        }
    }

    const revomeProduct = (id: number) => {

        const remove = produtos.filter(p => (p.id !== id))
        setProdutos(remove)


    }


    const handleAddProduct = () => {

        if (!nome.trim()){
            toast.error('Preencha o campo Nome');
            return;
        }

        if (!preco || !quantidade){
            toast.error('Campo Preço ou quantidade estão vazios');
            return;
        }

        const newProduct= [
            ...produtos,
            {id: Date.now(), nome:nome.trim(), preco: preco, quantidade: quantidade, total: preco * quantidade}
        ]
       
        toast.success('Produto cadastrado com sucesso');
        setNome("");
        setPreco(0);
        setQuantidade(0);
        setProdutos(newProduct);
        localStorage.setItem("produto", JSON.stringify(newProduct));
    }

    useEffect(() =>{
        const data = localStorage.getItem("produto");
        if (data) {
            setProdutos(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("produto", JSON.stringify(produtos))

    }, [produtos])

    
return (

<div className="flex flex-col items-center">
    <Toaster position="top-right"/>

    <div className="flex flex-col items-center text-center justify-center gap-4 w-120 box-border">
        <div className="flex flex-col w-full">
            <label>Nome</label>
            <input className="border rounded-md "
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
        </div>

        <div className="flex flex-col w-full">
            <label>Preço</label>
            <input
            className="border rounded-md w-full"
                type="text"
                value={preco}
                onChange={(e) => setPreco(Number(e.target.value))}
            />
        </div>

        <div className="flex flex-col w-full">
            <label>Quantidade</label>
            <input
            className="border rounded-md"
                type="text"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
            />
        </div>

       

        <button className="bg-green-500 rounded-md px-4 py-2 w-40 font-bold"
            onClick={handleSubmit}>
            {isEditing ? "Salvar" : "Adicionar"}
        </button>
    </div>

    <div className="flex gap-20 justify-center w-[480px] ">
    <ul className="space-y-6 w-full">
        {produtos.map((produto) => (
            <li  className=" p-4 rounded-md w-full" key={produto.id}>
                <div>Nome: {produto.nome}</div>
                <div>Preço: R${produto.preco}</div>
                <div>Quantidade: {produto.quantidade}</div>
                <div>Total: R${produto.total}</div>
                
                <div className="flex gap-4 mt-3">
                <button onClick={() => incrementar(produto.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded">
                    Incrementar
                </button>

                <button onClick={() => decrementar(produto.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded">
                    Decrementar
                </button>

                <button onClick={() => handleUpdateProduct(produto.id)}>Atualizar</button>
                </div>
            </li>
        ))}
    </ul>
    </div>
</div>
)}