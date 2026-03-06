import { useState } from "react";


interface Itens {
    id: number;
    name: string;
    description: string;
    completed: boolean;
}

export function ListarItens() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
    const [itens, setItens] = useState<Itens[]>([])
    const [isEditing, setIsEditing] = useState<number | null>(null)
    const totalItens = itens.length;
    const totalCompleted = itens.filter((item) => item.completed === true).length;
    const totalPending = itens.filter((item) => item.completed === false).length;

    const handleAddItens = () => {
        if (!name && !description) return

        const newItens = [
            ...itens,
            { id: Date.now(), name: name.trim(), description: description.trim(), completed:false },
        ];

        setItens(newItens);
        localStorage.setItem("itens", JSON.stringify(newItens));

        setName("");
        setDescription("");
    }

    const handleRemoveItens = (id: number) => {

        const remove = itens.filter((i) => i.id !== id)
        setItens(remove)
        localStorage.setItem("itens", JSON.stringify(remove))
    }

    const handleUpdateItens = (id: number) => {

        const item = itens.find((t) => t.id === id)

        if (item) {
            setName(item.name);
            setDescription(item.description);
            setIsEditing(id);
        }
    };

    const filterItens = itens.filter((item) => {

        if (filter === "completed") return item.completed === true;
        if (filter === "pending") return item.completed === false;
        return true;
    });

    const handleSaveItem = (id:number) => {

        const updated = itens.map((item) =>
            item.id === id ? {...item, name, description} : item);

        setItens(updated);
        localStorage.setItem("itens", JSON.stringify(updated));

        setName("")
        setDescription("")
        setIsEditing(null)
    }

    const handleSubmit = () => {

        if(isEditing !== null){
            handleSaveItem(isEditing);
        }else {
            handleAddItens();
        }
    }

    const handleCompleted = (id: number) => {

        const updated = itens.map((item) => 
        item.id === id ? {...item,completed: !item.completed} : item
    );

        setItens(updated)
       
    }
    return (
        <div className="flex justify-center">
            <div>
            <div>
                <label htmlFor="">Nome do Item</label>
                <input
                    placeholder="Adicione um item"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" />
            </div>

            
            <label htmlFor="">Descrição do Item</label>
            <input
                placeholder="Decrição do item"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text" />


                <div>
                    <button
                        onClick={handleSubmit}
                    >
                        {isEditing !== null ? "Atualizar tarefa" : "Adicionar tarefa"}
                    </button>
                </div>
                </div>
            <div>

                <div>
                    <div>
                        <h2>
                            Lista de Itens
                        </h2>
                    </div>

                  {itens.length === 0 ? (
                    <div>
                        <p>Nenhum item por aqui ainda</p>
                    </div>
                  ): (
                    <ul>    
                    {itens.map((item) => (
                        <li className="flex gap-4 "
                            key={item.id}
                        >

                        <div>
                            {item.name}
                        </div>
                        <div>
                            {item.description}
                        </div>
                        
                        <button
                    type="button"
                    onClick={() => handleRemoveItens(item.id)}
                    >
                        Remover
                    </button>
                   

                    <button
                        type="button"
                        onClick={() => handleUpdateItens(item.id)}
                    >
                        Atualizar
                    </button>

                    <input type="checkbox"
                    checked= {item.completed} 
                    onChange={() => handleCompleted(item.id)}
                    />

                    <span>Concluído</span>

                        </li>
                    ))}

                    </ul>
                  )}

                    
                    <div className="flex gap-4">  
                    <button onClick={() => setFilter("all")}>Todas</button>
                    <button onClick={() => setFilter("completed")}>Concluídas</button>
                    <button onClick={() => setFilter("pending")}>Pendentes</button>

                    
                    </div>

                    <ul>
                        {filterItens.map((item) => (
                            <li key={item.id}>
                                {item.name}
                            </li>
                        ))}
                    </ul>

                    <p>Total: {totalItens}</p>
                    <p>Concluídos: {totalCompleted}</p>
                    <p>Pendentes: {totalPending}</p>
                </div>
            </div>
        </div>
    )
}