import { useState } from "react";

interface Props  {
    handleSubmit: (name: string, description: string) => void;
    name: string;
    description: string;
    setName: (value: string) => void;
    setDescription: (value: string) => void;
    isEditing: number | null;
}


export function ItensForm({
  handleSubmit,
  name,
  description,
  setName,
  setDescription,
  isEditing
}: Props) {
    return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900">Lista de Tarefas</h1>

      <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">

        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Adicione um item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />

        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Descrição do item"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />

        <button
          onClick={() => handleSubmit(name, description)}
          className="bg-gray-900 text-white rounded-lg py-2 hover:bg-gray-800 transition"
        >
          {isEditing !== null ? "Atualizar tarefa" : "Adicionar tarefa"}
        </button>

      </div>
    </div>
  );
}