import React, { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

const perfilData = [
  { nome: "Perfil 01", acerto: 22, alunos: 479 },
  { nome: "Perfil 02", acerto: 44, alunos: 342 },
  { nome: "Perfil 03", acerto: 68, alunos: 151 },
  { nome: "Perfil 04", acerto: 61, alunos: 28 },
  { nome: "Perfil 05", acerto: 21, alunos: 194 },
];

const evolucaoData = [
  { tentativa: 1, p1: 0.2, p2: 0.5, p3: 0.6, p4: 0.3 },
  { tentativa: 5, p1: 0.15, p2: 0.4, p3: 0.75, p4: 0.45 },
  { tentativa: 10, p1: 0.12, p2: 0.35, p3: 0.85, p4: 0.55 },
  { tentativa: 20, p1: 0.1, p2: 0.3, p3: 0.9, p4: 0.65 },
];

const errosData = [
  { nivel: "Inicial", erros: 20000, cor: "#82ca9d" },
  { nivel: "Fácil", erros: 60000, cor: "#ffc658" },
  { nivel: "Médio", erros: 120000, cor: "#ff8042" },
  { nivel: "Difícil", erros: 40000, cor: "#ff4d4d" },
];

const coresBase = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"];

export default function App() {
  const [perfilSelecionado, setPerfilSelecionado] = useState("Todos");

  const dadosFiltrados = useMemo(() => {
    return perfilSelecionado === "Todos" 
      ? perfilData 
      : perfilData.filter(p => p.nome === perfilSelecionado);
  }, [perfilSelecionado]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1>📊 Dashboard de Aprendizagem (FARMA-ALG-IA)</h1>
        <div style={{ margin: "20px 0" }}>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>Filtrar por Perfil:</label>
          <select 
            value={perfilSelecionado}
            onChange={(e) => setPerfilSelecionado(e.target.value)}
            style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="Todos">Todos</option>
            {perfilData.map(p => <option key={p.nome} value={p.nome}>{p.nome}</option>)}
          </select>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "25px" }}>
        
        {/* GRÁFICO COM LÓGICA DE ALERTA */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginTop: 0 }}>🎯 Taxa de Acerto {perfilSelecionado !== "Todos" ? `- ${perfilSelecionado}` : ""}</h3>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>* Barras em vermelho indicam acerto abaixo de 30%</p>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={dadosFiltrados}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nome" />
                <YAxis unit="%" />
                <Tooltip cursor={{fill: '#f0f0f0'}} />
                <Bar dataKey="acerto">
                  {dadosFiltrados.map((entry, index) => (
                    <Cell 
                      key={`cell-acerto-${index}`} 
                      fill={entry.acerto < 30 ? "#ff4d4d" : "#8884d8"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* EVOLUÇÃO */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginTop: 0 }}>📈 Curva de Aprendizagem</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={evolucaoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tentativa" />
                <YAxis />
                <Tooltip />
                <Legend />
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 01") && <Line type="monotone" dataKey="p1" name="P1" stroke="#8884d8" strokeWidth={2} />}
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 02") && <Line type="monotone" dataKey="p2" name="P2" stroke="#82ca9d" strokeWidth={2} />}
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 03") && <Line type="monotone" dataKey="p3" name="P3" stroke="#ffc658" strokeWidth={2} />}
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 04") && <Line type="monotone" dataKey="p4" name="P4" stroke="#ff8042" strokeWidth={2} />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ERROS */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginTop: 0 }}>⚠️ Volume de Erros por Nível</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={errosData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nivel" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="erros">
                  {errosData.map((entry, index) => (
                    <Cell key={`cell-erro-${index}`} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIZZA */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginTop: 0 }}>👥 Distribuição de Alunos</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={perfilData}
                  dataKey="alunos"
                  nameKey="nome"
                  outerRadius={80}
                  label={({nome, percent}) => `${nome} ${(percent * 100).toFixed(0)}%`}
                >
                  {perfilData.map((entry, index) => (
                    <Cell key={`cell-pie-${index}`} fill={coresBase[index % coresBase.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}