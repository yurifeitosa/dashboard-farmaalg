import React, { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

// --- DADOS DOS GRÁFICOS ---
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

// --- DADOS DA TABELA (EXTRAÍDOS DO SEU CSV) ---
const métricasTableData = [
  { "Métrica": "👥 Quantidade de alunos", "Perfil 01": "479", "Perfil 02": "342", "Perfil 03": "151", "Perfil 04": "28", "Perfil 05": "194" },
  { "Métrica": "📈 % dos alunos", "Perfil 01": "~40%", "Perfil 02": "~29%", "Perfil 03": "~13%", "Perfil 04": "~2%", "Perfil 05": "~16%" },
  { "Métrica": "🎯 Taxa de acerto", "Perfil 01": "~22%", "Perfil 02": "~44%", "Perfil 03": "~68%", "Perfil 04": "~61%", "Perfil 05": "~21%" },
  { "Métrica": "🔁 Submissões totais", "Perfil 01": "~132.000", "Perfil 02": "~78.000", "Perfil 03": "~28.500", "Perfil 04": "~9.200", "Perfil 05": "~24.000" },
  { "Métrica": "📊 Média de submissões/aluno", "Perfil 01": "~275", "Perfil 02": "~228", "Perfil 03": "~189", "Perfil 04": "~328", "Perfil 05": "~124" },
  { "Métrica": "📈 Tipo de aprendizagem", "Perfil 01": "Não consolida", "Perfil 02": "Parcial", "Perfil 03": "Consolidada", "Perfil 04": "Por esforço", "Perfil 05": "Incompleta" },
  { "Métrica": "📊 Evolução (probabilidade)", "Perfil 01": "🔻 Baixa", "Perfil 02": "⚖️ Média", "Perfil 03": "🔼 Alta", "Perfil 04": "🔼 Média/Alta", "Perfil 05": "❌ Nula" },
  { "Métrica": "🧠 Principais erros", "Perfil 01": "Sintaxe, estrutura", "Perfil 02": "Lógica", "Perfil 03": "Refinamento", "Perfil 04": "Ajustes finos", "Perfil 05": "Básicos" },
  { "Métrica": "🎯 Potencial de intervenção", "Perfil 01": "🔥 Muito alto", "Perfil 02": "🔥🔥 Máximo", "Perfil 03": "🔽 Baixa", "Perfil 04": "🔼 Média", "Perfil 05": "🔥 Alto" },
  { "Métrica": "🔍 Comportamento típico", "Perfil 01": "Tenta e não aprende", "Perfil 02": "Quase aprende", "Perfil 03": "Aprende rápido", "Perfil 04": "Esforçado", "Perfil 05": "Para cedo" }
];

const coresBase = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"];

export default function App() {
  const [perfilSelecionado, setPerfilSelecionado] = useState("Todos");
  const [filtroTexto, setFiltroTexto] = useState("");

  const dadosGraficoFiltrados = useMemo(() => {
    return perfilSelecionado === "Todos" 
      ? perfilData 
      : perfilData.filter(p => p.nome === perfilSelecionado);
  }, [perfilSelecionado]);

  // Filtra a tabela por texto e também oculta colunas se um perfil específico for selecionado
  const dadosTabelaFiltrados = useMemo(() => {
    return métricasTableData.filter(row => 
      row.Métrica.toLowerCase().includes(filtroTexto.toLowerCase())
    );
  }, [filtroTexto]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1>📊 Dashboard FARMA-ALG-IA</h1>
        <div style={{ background: "#fff", display: "inline-block", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>Selecione o Perfil para Análise:</label>
          <select 
            value={perfilSelecionado}
            onChange={(e) => setPerfilSelecionado(e.target.value)}
            style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", cursor: "pointer" }}
          >
            <option value="Todos">Visualização Geral</option>
            {perfilData.map(p => <option key={p.nome} value={p.nome}>{p.nome}</option>)}
          </select>
        </div>
      </header>

      {/* GRID DE GRÁFICOS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "25px", marginBottom: "40px" }}>
        
        {/* GRÁFICO DE ACERTOS */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginTop: 0 }}>🎯 Taxa de Acerto {perfilSelecionado !== "Todos" ? `- ${perfilSelecionado}` : ""}</h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={dadosGraficoFiltrados}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nome" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="acerto">
                  {dadosGraficoFiltrados.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.acerto < 30 ? "#ff4d4d" : "#8884d8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CURVA DE APRENDIZAGEM */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginTop: 0 }}>📈 Evolução de Tentativas</h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={evolucaoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tentativa" />
                <YAxis />
                <Tooltip />
                <Legend />
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 01") && <Line type="monotone" dataKey="p1" name="P1" stroke="#8884d8" />}
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 02") && <Line type="monotone" dataKey="p2" name="P2" stroke="#82ca9d" />}
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 03") && <Line type="monotone" dataKey="p3" name="P3" stroke="#ffc658" />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SEÇÃO DA TABELA ITERATIVA */}
      <div style={{ background: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: 0 }}>📋 Detalhamento Científico por Perfil</h3>
          <input 
            type="text" 
            placeholder="Filtrar métrica..." 
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            style={{ padding: "10px", borderRadius: "20px", border: "1px solid #ddd", width: "250px" }}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left", borderBottom: "2px solid #eee" }}>
                <th style={{ padding: "15px" }}>Métrica</th>
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 01") && <th style={{ padding: "15px", color: "#8884d8" }}>Perfil 01</th>}
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 02") && <th style={{ padding: "15px", color: "#82ca9d" }}>Perfil 02</th>}
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 03") && <th style={{ padding: "15px", color: "#ffc658" }}>Perfil 03</th>}
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 04") && <th style={{ padding: "15px", color: "#ff8042" }}>Perfil 04</th>}
                {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 05") && <th style={{ padding: "15px", color: "#d0ed57" }}>Perfil 05</th>}
              </tr>
            </thead>
            <tbody>
              {dadosTabelaFiltrados.map((row, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #f1f1f1" }}>
                  <td style={{ padding: "12px", fontWeight: "bold", fontSize: "0.9rem" }}>{row.Métrica}</td>
                  {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 01") && <td style={{ padding: "12px" }}>{row["Perfil 01"]}</td>}
                  {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 02") && <td style={{ padding: "12px" }}>{row["Perfil 02"]}</td>}
                  {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 03") && <td style={{ padding: "12px" }}>{row["Perfil 03"]}</td>}
                  {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 04") && <td style={{ padding: "12px" }}>{row["Perfil 04"]}</td>}
                  {(perfilSelecionado === "Todos" || perfilSelecionado === "Perfil 05") && <td style={{ padding: "12px" }}>{row["Perfil 05"]}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}