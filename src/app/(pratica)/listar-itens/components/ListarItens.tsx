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
  const totalCompleted = itens.filter((item) => item.completed).length;
  const totalPending = itens.filter((item) => !item.completed).length;

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
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
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
    <div className="min-h-screen bg-gray-100 flex justify-center py-16 px-4">
      <div className="w-full max-w-xl flex flex-col gap-8">

        <h1 className="text-4xl font-bold text-gray-900">Lista de Tarefas</h1>

        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Nome</label>
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Adicione um item"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Descrição</label>
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="Descrição do item"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-gray-900 text-white rounded-lg py-2 hover:bg-gray-800 transition"
          >
            {isEditing !== null ? "Atualizar tarefa" : "Adicionar tarefa"}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setFilter("all")}
          >
            Todas
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setFilter("completed")}
          >
            Concluídas
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setFilter("pending")}
          >
            Pendentes
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          {filterItens.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              Nenhum item por aqui ainda
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {filterItens.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border rounded-lg p-3"
                >
                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${
                        item.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {item.name}
                    </span>

                    <span className="text-sm text-gray-500">
                      {item.description}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleCompleted(item.id)}
                    />

                    <button
                      onClick={() => handleUpdateItens(item.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleRemoveItens(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remover
                    </button>

                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-between text-sm text-gray-700 bg-white p-4 rounded-xl shadow">
          <span>Total: {totalItens}</span>
          <span>Concluídos: {totalCompleted}</span>
          <span>Pendentes: {totalPending}</span>
        </div>

      </div>
    </div>
  );
}