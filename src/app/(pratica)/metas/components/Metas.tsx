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
    if (!nome.trim() || !descricao.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }

    const novaMeta: Meta = {
      id: Date.now(),
      nome: nome.trim(),
      descricao: descricao.trim(),
      horasAtuais: Number(horasAtuais) || 0,
      horasMetas: Number(horasMetas) || 0
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

  useEffect(() => {
    const data = localStorage.getItem("metas");
    if (data) {
      setMetas(JSON.parse(data));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col gap-2 w-[400px]">
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <input
        type="number"
        placeholder="Horas atuais"
        value={horasAtuais}
        onChange={(e) => setHorasAtuais(e.target.value)}
      />

      <input
        type="number"
        placeholder="Horas meta"
        value={horasMetas}
        onChange={(e) => setHorasMetas(e.target.value)}
      />

      <button onClick={handleAddMeta}>
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}