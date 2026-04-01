import React, { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

// --- 1. DADOS DOS PERFIS (PÁGINA 3) ---
const perfilInfo = [
  { id: "Perfil 01", nome: "Dificuldade Inicial", desc: "Baixa base, muitos erros, pouca evolução", cor: "#8884d8" },
  { id: "Perfil 02", nome: "Intermediário", desc: "Entende parcialmente, mas não consolida", cor: "#82ca9d" },
  { id: "Perfil 03", nome: "Bom Desempenho", desc: "Evolui rápido e mantém acertos", cor: "#ffc658" },
  { id: "Perfil 04", nome: "Persistente", desc: "Aprende com esforço (muitas tentativas)", cor: "#ff8042" },
  { id: "Perfil 05", nome: "Desistente", desc: "Abandona cedo", cor: "#d0ed57" },
];

// --- 2. PANORAMA GERAL (PÁGINA 4) ---
const situacaoGeral = [
  { name: "❌ Nunca resolve", value: 61, cor: "#ff4d4d" },
  { name: "🔁 Aprende/Tentativas", value: 28, cor: "#ffc658" },
  { name: "✅ Acerta direto", value: 11, cor: "#82ca9d" },
];

// --- 3. DADOS DE DESEMPENHO UNIFICADOS ---
const perfilStats = [
  { nome: "Perfil 01", acerto: 22, alunos: 479, médiaSub: 275 },
  { nome: "Perfil 02", acerto: 44, alunos: 342, médiaSub: 228 },
  { nome: "Perfil 03", acerto: 68, alunos: 151, médiaSub: 189 },
  { nome: "Perfil 04", acerto: 61, alunos: 28, médiaSub: 328 },
  { nome: "Perfil 05", acerto: 21, alunos: 194, médiaSub: 124 },
];

// --- 4. CURVA DE APRENDIZAGEM ---
const evolucaoData = [
  { tentativa: "Início", p1: 0.1, p2: 0.2, p3: 0.5, p4: 0.1, p5: 0.1 },
  { tentativa: "T5", p1: 0.15, p2: 0.35, p3: 0.7, p4: 0.2, p5: 0.05 },
  { tentativa: "T10", p1: 0.18, p2: 0.4, p3: 0.85, p4: 0.4, p5: 0.02 },
  { tentativa: "T20", p1: 0.22, p2: 0.44, p3: 0.95, p4: 0.61, p5: 0.01 },
];

const errosData = [
  { nivel: "Inicial", erros: 20000, cor: "#82ca9d" },
  { nivel: "Fácil", erros: 60000, cor: "#ffc658" },
  { nivel: "Médio", erros: 120000, cor: "#ff8042" },
  { nivel: "Difícil", erros: 40000, cor: "#ff4d4d" },
];

// --- 5. TABELA COMPLETA COM AS 18 MÉTRICAS ---
const métricasCompletas = [
  {"Métrica": "👥 Quantidade de alunos", "P1": "479", "P2": "342", "P3": "151", "P4": "28", "P5": "194"},
  {"Métrica": "📈 % dos alunos", "P1": "~40%", "P2": "~29%", "P3": "~13%", "P4": "~2%", "P5": "~16%"},
  {"Métrica": "🎯 Taxa de acerto", "P1": "~22%", "P2": "~44%", "P3": "~68%", "P4": "~61%", "P5": "~21%"},
  {"Métrica": "🔁 Submissões totais", "P1": "~132k", "P2": "~78k", "P3": "~28k", "P4": "~9k", "P5": "~24k"},
  {"Métrica": "📊 Média de submissões/aluno", "P1": "~275", "P2": "~228", "P3": "~189", "P4": "~328", "P5": "~124"},
  {"Métrica": "📈 Curva de aprendizagem", "P1": "Estagnada", "P2": "Oscilatória", "P3": "Crescente", "P4": "Lenta", "P5": "Interrompida"},
  {"Métrica": "🧠 Tipo de aprendizagem", "P1": "Não consolida", "P2": "Parcial", "P3": "Consolidada", "P4": "Esforço", "P5": "Incompleta"},
  {"Métrica": "📊 Evolução (probabilidade)", "P1": "🔻 Baixa", "P2": "⚖️ Média", "P3": "🔼 Alta", "P4": "🔼 Média", "P5": "❌ Nula"},
  {"Métrica": "🔁 Oscilação", "P1": "🔼 Alta", "P2": "Muito alta", "P3": "🔽 Baixa", "P4": "🔼 Média", "P5": "❌"},
  {"Métrica": "📉 Regressão", "P1": "🔼 Média", "P2": "🔼 Média", "P3": "🔽 Baixa", "P4": "🔽 Baixa", "P5": "❌"},
  {"Métrica": "❌ Nunca resolve questões", "P1": "Alto (70%)", "P2": "Alto (55%)", "P3": "Baixo (20%)", "P4": "Médio (40%)", "P5": "Muito alto"},
  {"Métrica": "🔁 Aprende após tentativas", "P1": "20%", "P2": "35%", "P3": "30%", "P4": "50%", "P5": "M. Baixo"},
  {"Métrica": "✅ Acerta de primeira", "P1": "M. Baixo", "P2": "Baixo", "P3": "Alto", "P4": "Baixo", "P5": "M. Baixo"},
  {"Métrica": "🧠 Principais erros", "P1": "Sintaxe/Estr.", "P2": "Lógica", "P3": "Complexos", "P4": "Ajustes", "P5": "Abandono"},
  {"Métrica": "⚠️ Ponto crítico", "P1": "Início", "P2": "Condic.", "P3": "Vetores", "P4": "Loops", "P5": "Iniciais"},
  {"Métrica": "📉 Momento de desistência", "P1": "Tardio", "P2": "Médio", "P3": "Raro", "P4": "Raro", "P5": "Precoce"},
  {"Métrica": "🔍 Comportamento típico", "P1": "Tenta/Não", "P2": "Quase", "P3": "Rápido", "P4": "Esforçado", "P5": "Cedo"},
  {"Métrica": "🎯 Potencial de intervenção", "P1": "Muito Alto", "P2": "Máximo", "P3": "Baixo", "P4": "Médio", "P5": "Alta"}
];

export default function App() {
  const [perfil, setPerfil] = useState("Todos");

  const filteredStats = useMemo(() => {
    return perfil === "Todos" ? perfilStats : perfilStats.filter(p => p.nome === perfil);
  }, [perfil]);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#1a3353" }}>📊 Dashboard Analítico FARMA-ALG-IA</h1>
        <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", display: "inline-block", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          <label style={{ fontWeight: "bold" }}>Filtro: </label>
          <select value={perfil} onChange={(e) => setPerfil(e.target.value)} style={{ padding: "5px" }}>
            <option value="Todos">Ver Todos os Perfis</option>
            {perfilInfo.map(p => <option key={p.id} value={p.id}>{p.id} - {p.nome}</option>)}
          </select>
        </div>
      </header>

      {/* 6 GRÁFICOS ORGANIZADOS EM GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        
        {/* 1. Panorama Geral */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>🌐 Panorama de Aprendizagem</h4>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={situacaoGeral} dataKey="value" nameKey="name" outerRadius={60} label>
                {situacaoGeral.map((entry, i) => <Cell key={i} fill={entry.cor} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Distribuição por Perfil */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>👥 Distribuição por Perfil</h4>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={perfilStats} dataKey="alunos" nameKey="nome" outerRadius={60} label>
                {perfilStats.map((entry, i) => <Cell key={i} fill={perfilInfo[i].cor} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Taxa de Acerto */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>🎯 Taxa de Acerto (%)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={filteredStats}>
              <XAxis dataKey="nome" />
              <YAxis unit="%" domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="acerto">
                {filteredStats.map((e, i) => <Cell key={i} fill={e.acerto < 30 ? "#ff4d4d" : "#4e73df"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 4. Média de Submissões */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>📊 Média de Submissões/Aluno</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={filteredStats}>
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="médiaSub" fill="#1cc88a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 5. Curva de Aprendizagem */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>📈 Curva de Aprendizagem</h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={evolucaoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tentativa" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              {(perfil === "Todos" || perfil === "Perfil 01") && <Line name="P1" type="monotone" dataKey="p1" stroke="#8884d8" />}
              {(perfil === "Todos" || perfil === "Perfil 02") && <Line name="P2" type="monotone" dataKey="p2" stroke="#82ca9d" />}
              {(perfil === "Todos" || perfil === "Perfil 03") && <Line name="P3" type="monotone" dataKey="p3" stroke="#ffc658" />}
              {(perfil === "Todos" || perfil === "Perfil 04") && <Line name="P4" type="monotone" dataKey="p4" stroke="#ff8042" />}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 6. Volume de Erros */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>⚠️ Erros por Nível</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={errosData}>
              <XAxis dataKey="nivel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="erros">
                {errosData.map((e, i) => <Cell key={i} fill={e.cor} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABELA DETALHADA COM 18 MÉTRICAS */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <h3>📋 Tabela Detalhada (18 Métricas Científicas)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#1a3353", color: "#fff" }}>
                <th style={{ padding: "12px" }}>Métrica</th>
                <th style={{ padding: "12px" }}>P1</th>
                <th style={{ padding: "12px" }}>P2</th>
                <th style={{ padding: "12px" }}>P3</th>
                <th style={{ padding: "12px" }}>P4</th>
                <th style={{ padding: "12px" }}>P5</th>
              </tr>
            </thead>
            <tbody>
              {métricasCompletas.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #eee", backgroundColor: idx % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                  <td style={{ padding: "10px", fontWeight: "bold", fontSize: "0.9rem" }}>{row.Métrica}</td>
                  <td style={{ padding: "10px" }}>{row.P1}</td>
                  <td style={{ padding: "10px" }}>{row.P2}</td>
                  <td style={{ padding: "10px" }}>{row.P3}</td>
                  <td style={{ padding: "10px" }}>{row.P4}</td>
                  <td style={{ padding: "10px" }}>{row.P5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}