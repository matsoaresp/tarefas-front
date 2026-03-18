'use client'

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Meta {
  id: number;
  nome: string;
  descricao: string;
  horasAtuais: number;
  horasMetas: number;
}

export function Metas() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [horasAtuais, setHorasAtuais] = useState("");
  const [horasMetas, setHorasMetas] = useState("");

  const handleAddMeta = () => {
    if (!nome.trim() || !descricao.trim() || !horasMetas.trim() || !horasAtuais.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }

    const novaMeta: Meta = {
      id: Date.now(),
      nome: nome.trim(),
      descricao: descricao.trim(),
      horasAtuais: Number(horasAtuais) || 0,
      horasMetas: Number(horasMetas) || 0,
    };

    const novasMetas = [...metas, novaMeta];

    setMetas(novasMetas);
    localStorage.setItem("metas", JSON.stringify(novasMetas));

    toast.success("Meta adicionada com sucesso");

    setNome("");
    setDescricao("");
    setHorasAtuais("");
    setHorasMetas("");
  };

  const updateProgress = (id: number) => {

    const meta = metas.find((m) => m.id === id)

    if (meta) {
        setHorasAtuais(meta.horasAtuais.toString())
    }
  }

  const handleSaveMeta  = (id: number) => {

    const updated = metas.map((meta) => 
    meta.id === id ? { ...meta, horasAtuais: Number(horasAtuais) || 0} : meta)

     setMetas(updated)
     localStorage.setItem("metas", JSON.stringify(updated))
     setHorasAtuais("")
  }

 

  const handleRemove = (id: number) => {

    const remove = metas.filter((meta) => meta.id !== id)
    setMetas(remove)
    localStorage.setItem("metas", JSON.stringify(remove))
  }

  useEffect(() => {
    const data = localStorage.getItem("metas");
    if (data) {
      setMetas(JSON.parse(data));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen gap-15">
        <div className="flex flex-col gap-8 w-[400px]">

      <input
       className="px-4 py-4 text-lg h-14 rounded-md bg-white border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xl placeholder:text-xl"
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
      className="px-4 py-4 text-lg h-14 rounded-md bg-white border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xl placeholder:text-xl" 
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

     <div className="flex gap-4">
  <input
    className="flex-1 px-4 py-4 text-lg rounded-md border  border-gray-400 w-full focus:outline-none placeholder:text-xl placeholder:text-xl placeholder:black-gray-500 focus:ring-2 focus:ring-blue-500"
    type="text"
    placeholder="Horas atuais"
    value={horasAtuais}
    onChange={(e) => setHorasAtuais(e.target.value)}
  />
  <input
    className="flex-1 px-4 py-4 h-14 text-lg rounded-md border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xl placeholder:text-xl"
    type="text"
    placeholder="Horas meta"
    value={horasMetas}
    onChange={(e) => setHorasMetas(e.target.value)}
  />
</div>

      <button className="bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors">
  Adicionar Meta
</button>      
      </div>

      <ul className="flex flex-col gap-2">
        {metas.map((meta) => {
          const progresso = Math.min(
            (meta.horasAtuais / meta.horasMetas) * 100 || 0,
            100
          );

          return (
            <li key={meta.id}>
              <p>Nome: {meta.nome}</p>
              <p>Descrição: {meta.descricao}</p>
              <p>Progresso: {progresso.toFixed(0)}%</p>
              <button onClick={() => handleRemove(meta.id)} >Remover</button>
              <button onClick={() => updateProgress(meta.id)} >Atualizar</button>
              <button onClick={() => handleSaveMeta(meta.id)}>
        Salvar Meta
      </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}