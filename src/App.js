import React, { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

import TabelaQuestoes from "./components/TabelaQuestoes"; 
import TabelaAnaliseDetalhada from "./components/TabelaAnaliseDetalhada";

// --- 1. DADOS DOS PERFIS ---
const perfilInfo = [
  { id: "Perfil 01", nome: "Dificuldade Inicial", desc: "Baixa base, muitos erros, pouca evolução", cor: "#8884d8" },
  { id: "Perfil 02", nome: "Intermediário", desc: "Entende parcialmente, mas não consolida", cor: "#82ca9d" },
  { id: "Perfil 03", nome: "Bom Desempenho", desc: "Evolui rápido e mantém acertos", cor: "#ffc658" },
  { id: "Perfil 04", nome: "Persistente", desc: "Aprende com esforço (muitas tentativas)", cor: "#ff8042" },
  { id: "Perfil 05", nome: "Desistente", desc: "Abandona cedo", cor: "#d0ed57" },
];

const situacaoGeral = [
  { name: "❌ Nunca resolve", value: 61, cor: "#ff4d4d" },
  { name: "🔁 Aprende/Tentativas", value: 28, cor: "#ffc658" },
  { name: "✅ Acerta direto", value: 11, cor: "#82ca9d" },
];

const perfilStats = [
  { nome: "Perfil 01", acerto: 22, alunos: 479, médiaSub: 275 },
  { nome: "Perfil 02", acerto: 44, alunos: 342, médiaSub: 228 },
  { nome: "Perfil 03", acerto: 68, alunos: 151, médiaSub: 189 },
  { nome: "Perfil 04", acerto: 61, alunos: 28, médiaSub: 328 },
  { nome: "Perfil 05", acerto: 21, alunos: 194, médiaSub: 124 },
];

const errosData = [
  { nivel: "Inicial", erros: 20000, cor: "#82ca9d" },
  { nivel: "Fácil", erros: 60000, cor: "#ffc658" },
  { nivel: "Médio", erros: 120000, cor: "#ff8042" },
  { nivel: "Difícil", erros: 40000, cor: "#ff4d4d" },
];

// --- 4. NOVO GRÁFICO: EVOLUÇÃO POR TIPO DE QUESTÃO ---
const dificuldade = ["Q1", "Q2", "Q3", "Q4", "Q5"];
const dadosPerfisEvolucao = [
  { perfil: "Perfil 01", Q1: 0.20, Q2: 0.18, Q3: 0.22, Q4: 0.10, Q5: 0.08 },
  { perfil: "Perfil 02", Q1: 0.45, Q2: 0.38, Q3: 0.48, Q4: 0.28, Q5: 0.25 },
  { perfil: "Perfil 03", Q1: 0.75, Q2: 0.72, Q3: 0.80, Q4: 0.62, Q5: 0.65 },
  { perfil: "Perfil 04", Q1: 0.50, Q2: 0.48, Q3: 0.68, Q4: 0.35, Q5: 0.42 },
  { perfil: "Perfil 05", Q1: 0.10, Q2: 0.08, Q3: 0.05, Q4: 0.03, Q5: 0.02 }
];

const dadosGraficoEvolucao = dificuldade.map((nivel) => {
  const linha = { nivel };
  dadosPerfisEvolucao.forEach((p) => {
    linha[p.perfil] = p[nivel];
  });
  return linha;
});

const crescimentoPerfis = dadosPerfisEvolucao.map((p) => ({
  perfil: p.perfil,
  crescimento: p.Q5 - p.Q1
}));

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
    <div style={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      
      <header style={{ textAlign: "center", marginBottom: "30px", marginTop: "10px" }}>
        <h1 style={{ color: "#1a3353", marginBottom: "10px" }}>📊 Dashboard Analítico FARMA-ALG-IA</h1>
        
        <p style={{ color: "#555", fontSize: "1.1rem", maxWidth: "800px", margin: "0 auto 20px auto", lineHeight: "1.5" }}>
          Análise de mais de 300.000 códigos desenvolvidos por alunos da UFPR na disciplina de Algoritmos e Estrutura de Dados I
        </p>

        <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", display: "inline-block", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          <label style={{ fontWeight: "bold" }}>Filtro Analítico: </label>
          <select value={perfil} onChange={(e) => setPerfil(e.target.value)} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", outline: "none", cursor: "pointer" }}>
            <option value="Todos">Visualizar Todos os Perfis</option>
            {perfilInfo.map(p => <option key={p.id} value={p.id}>{p.id} - {p.nome}</option>)}
          </select>
        </div>
      </header>

      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", marginBottom: "40px" }}>
        <h3 style={{ margin: "0 0 15px 0", color: "#1a3353", borderBottom: "2px solid #f0f2f5", paddingBottom: "10px" }}>
          📚 Definição dos Perfis de Aprendizagem
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa", color: "#333" }}>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Perfil</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Classificação</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Característica Central Mapeada</th>
              </tr>
            </thead>
            <tbody>
              {perfilInfo.map((p, idx) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ display: "inline-block", width: "14px", height: "14px", borderRadius: "50%", backgroundColor: p.cor }}></span>
                    {p.id}
                  </td>
                  <td style={{ padding: "12px", fontWeight: "500", color: "#444" }}>{p.nome}</td>
                  <td style={{ padding: "12px", color: "#666" }}>{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        
        {/* 1. Panorama Geral */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>🌐 Panorama de Aprendizagem</h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={situacaoGeral} dataKey="value" nameKey="name" outerRadius={70} labelLine={true} label={({ value }) => `${value}%`}>
                {situacaoGeral.map((entry, i) => <Cell key={`cell-a-${i}`} fill={entry.cor} />)}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Distribuição por Perfil */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>👥 Distribuição por Perfil</h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={perfilStats} dataKey="alunos" nameKey="nome" outerRadius={70} label>
                {perfilStats.map((entry, i) => <Cell key={`cell-b-${i}`} fill={perfilInfo[i].cor} />)}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Taxa de Acerto */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>🎯 Taxa de Acerto (%)</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={filteredStats}>
              <XAxis dataKey="nome" />
              <YAxis unit="%" domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="acerto">
                {filteredStats.map((e, i) => <Cell key={`bar-a-${i}`} fill={e.acerto < 30 ? "#ff4d4d" : "#4e73df"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 4. Média de Submissões */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
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

        {/* 5. NOVO GRÁFICO: Evolução por Tipo de Questão */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>📈 Evolução por Tipo de Questão (Q1 a Q5)</h4>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={dadosGraficoEvolucao}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nivel" />
              <YAxis domain={[0, 1]} tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />   
              <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
              {(perfil === "Todos" || perfil === "Perfil 01") && <Line name="P1" type="monotone" dataKey="Perfil 01" stroke="#8884d8" strokeWidth={2} />}
              {(perfil === "Todos" || perfil === "Perfil 02") && <Line name="P2" type="monotone" dataKey="Perfil 02" stroke="#82ca9d" strokeWidth={2} />}
              {(perfil === "Todos" || perfil === "Perfil 03") && <Line name="P3" type="monotone" dataKey="Perfil 03" stroke="#ffc658" strokeWidth={2} />}
              {(perfil === "Todos" || perfil === "Perfil 04") && <Line name="P4" type="monotone" dataKey="Perfil 04" stroke="#ff8042" strokeWidth={2} />}
              {(perfil === "Todos" || perfil === "Perfil 05") && <Line name="P5" type="monotone" dataKey="Perfil 05" stroke="#d0ed57" strokeWidth={2} />}
            </LineChart>
          </ResponsiveContainer>
          
          {/* Taxa de Crescimento embaixo do gráfico */}
          <div style={{ marginTop: "10px", fontSize: "0.85rem", color: "#555" }}>
            <strong>📊 Taxa de Crescimento (Q1 para Q5):</strong>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "5px" }}>
              {crescimentoPerfis.map((p, i) => {
                if (perfil !== "Todos" && perfil !== p.perfil) return null;
                const isPositive = p.crescimento > 0;
                return (
                  <span key={i} style={{ background: "#f8f9fa", padding: "4px 8px", borderRadius: "4px", border: "1px solid #eee" }}>
                    {p.perfil.replace("Perfil ", "P")}: <span style={{ color: isPositive ? "#28a745" : "#dc3545", fontWeight: "bold" }}>{(p.crescimento * 100).toFixed(1)}%</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* 6. Volume de Erros */}
        <div style={{ background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <h4 style={{ margin: "0 0 10px 0" }}>⚠️ Erros por Nível de Dificuldade</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={errosData}>
              <XAxis dataKey="nivel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="erros">
                {errosData.map((e, i) => <Cell key={`bar-b-${i}`} fill={e.cor} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", marginBottom: "30px" }}>
        <h3 style={{ color: "#1a3353", borderBottom: "2px solid #f0f2f5", paddingBottom: "10px", marginTop: 0 }}>
          📋 Tabela Detalhada sobre os Perfis dos Alunos
        </h3>
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
                  <td style={{ padding: "10px", fontWeight: "bold", fontSize: "0.9rem", color: "#333" }}>{row.Métrica}</td>
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

      <TabelaQuestoes />
      <TabelaAnaliseDetalhada />

      <footer style={{ textAlign: "center", padding: "30px 20px 10px 20px", marginTop: "20px", color: "#888", fontSize: "0.95rem" }}>
        Desenvolvido por Yuri Feitosa
      </footer>

    </div>
  );
}