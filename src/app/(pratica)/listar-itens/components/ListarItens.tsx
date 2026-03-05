import { useState } from "react";


interface Itens {
    id: number;
    name: string;
    description: string;
}

export function ListarItens() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [itens, setItens] = useState<Itens[]>([])
    const [isEditing, setIsEditing] = useState<number | null>(null)

    const handleAddItens = () => {

        const newItens = [
            ...itens,
            { id: Date.now(), name: name.trim(), description: description.trim() },
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
    return (
        <div>
            <div>
                <label htmlFor="">Nome do Item</label>
                <input
                    placeholder="Adicione um item"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" />
            </div>

            <div>

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
                        {isEditing !== null ? "Atualizar tarefa" : "Aditionar tarefa"}
                    </button>
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
                        <li
                            key={item.id}
                        >
                        <div>
                        <div>
                            {item.name}
                        </div>
                        <div>
                            {item.description}
                        </div>
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

                        </li>
                    ))}

                    </ul>
                  )}
                </div>
            </div>
        </div>
    )
}