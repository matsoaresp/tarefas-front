'use client';
import { useState } from "react";

interface Task {
  id: number;
  name: string;
  descricao: string;
}

export function CriarTask() {
  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (!name.trim()) return;

    const newTasks = [
      ...tasks,
      { id: Date.now(), name: name.trim(), descricao: descricao.trim() },
    ];

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setName("");
    setDescricao("");
  };

  const handleRemoveTask = (id: number) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const handleSaveEdit = (id: number) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, name, descricao } : task
    );

    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));

    setName("");
    setDescricao("");
    setIsEditing(null);
  };

  const handleUpdateTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);

    if (task) {
      setName(task.name);
      setDescricao(task.descricao);
      setIsEditing(id);
    }
  };

  const handleSubmit = () => {
    if (isEditing !== null) {
      handleSaveEdit(isEditing);
    } else {
      handleAddTask();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-16 px-4 sm:px-6 font-sans">
      <div className="max-w-xl w-full flex flex-col gap-10">

        <div className="flex flex-col gap-1">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            Suas Tarefas
          </h1>
          <p className="text-2xl text-gray-500">
            Organize seu dia de forma simples e rápida.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">

          <div className="flex flex-col gap-5">
            <div>
              <label className="text-3xl font-medium text-gray-700 mb-1.5 block">
                Nome
              </label>
              <input
                placeholder="Ex: Estudar para a prova"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 text-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="text-2xl font-medium text-gray-700 mb-1.5 block">
                Descrição
              </label>
              <textarea
                placeholder="Detalhes opcionais..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full h-24 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 text-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gray-900 text-white font-medium h-11 w-full rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all mt-2 shadow-sm"
            >
              {isEditing !== null ? "Atualizar tarefa" : "Adicionar tarefa"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-gray-900 tracking-tight">
              Lista
            </h2>
          </div>

          {tasks.length === 0 ? (
            <div className="border border-dashed border-gray-300 rounded-2xl py-14 flex flex-col items-center gap-3 bg-gray-50/50">
              <p className="text-2xl text-gray-500 font-medium">
                Nenhuma tarefa por aqui ainda.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex justify-between items-start gap-4"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {task.name}
                    </div>
                    {task.descricao && (
                      <div className="text-gray-500 mt-1">
                        {task.descricao}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveTask(task.id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    ❌
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateTask(task.id)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    ✏️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}