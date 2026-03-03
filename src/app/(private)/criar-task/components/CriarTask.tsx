'use client'
import { useEffect, useState } from "react";


type Tasks = {

    id: number;
    name: string;
    descricao: string;

}
export function CriarTask() {

    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [name, setName] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {

        const saved = localStorage.getItem("tasks")
        if(saved) {
            setTasks(JSON.parse(saved))
        }
    }, [])


    const handleAddTask = () => {

        if(!name.trim() || !descricao.trim()) return


        const newTask: Tasks = {
            id: Date.now(),
            name: name,
            descricao: descricao
        }

        const updatedTasks = [...tasks, newTask]

        setTasks(updatedTasks)
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))

        setName("")
        setDescricao("")
    }

    const handleRemoveTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id)

        setTasks(updatedTasks)
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    }

    return (

        <div>

            <input
                placeholder="Nome"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Descrição"
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />
            <button
                type="button"
                onClick={handleAddTask}
            >Enviar
            </button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <strong>{task.name}</strong>
                        <p>{task.descricao}</p>

                        <button
                            type="button"
                            onClick={() => handleRemoveTask(task.id)}
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}