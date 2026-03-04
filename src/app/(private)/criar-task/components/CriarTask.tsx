import { useState } from "react";

interface Task {
  id: number;
  name: string;
  descricao: string;
}

export function CriarTask() {
  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if(!name.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), name: name.trim(), descricao: descricao.trim() },
    ]);
    setName("");
    setDescricao("");
  };

  const handleRemoveTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
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
              onClick={handleAddTask}
              className="bg-gray-900 text-white font-medium  h-11 w-full rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all mt-2 shadow-sm"
            >
              Adicionar tarefa
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className=" font-semibold text-gray-900 tracking-tight">
              Lista
            </h2>
          </div>

          {tasks.length === 0 ? (
            <div className="border border-dashed border-gray-300 rounded-2xl py-14 flex flex-col items-center gap-3 bg-gray-50/50">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-2xl text-gray-500 font-medium">
                Nenhuma tarefa por aqui ainda.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex justify-between items-start gap-4 group hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {task.name}
                    </div>
                    {task.descricao && (
                      <div className="text-gray-500 mt-1 line-clamp-2">
                        {task.descricao}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveTask(task.id)}

                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-100"
                    aria-label="Excluir tarefa"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
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