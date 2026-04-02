import React from 'react';

const questoesData = [
  { "Métrica": "📌 Descrição", "Q1": "Saída simples, variáveis", "Q2": "if/else", "Q3": "for, while", "Q4": "Vetores/arrays", "Q5": "Combinação de estruturas" },
  { "Métrica": "🧠 Justificativa", "Q1": "Sintaxe básica", "Q2": "Introduz decisão lógica", "Q3": "Controle de fluxo", "Q4": "Abstração de dados", "Q5": "Integração de conceitos" },
  { "Métrica": "📊 Qtde de Questões", "Q1": "58", "Q2": "1.120", "Q3": "3.450", "Q4": "620", "Q5": "241" },
  { "Métrica": "📝 Respondidas", "Q1": "12.400", "Q2": "82.000", "Q3": "162.000", "Q4": "13.800", "Q5": "2.222" },
  { "Métrica": "✅ Acertos", "Q1": "3.000", "Q2": "21.300", "Q3": "50.500", "Q4": "2.600", "Q5": "442" },
  { "Métrica": "❌ Erros", "Q1": "9.400", "Q2": "60.700", "Q3": "111.500", "Q4": "11.200", "Q5": "1.780" },
  { "Métrica": "🎯 Taxa de Acerto", "Q1": "~24%", "Q2": "~26%", "Q3": "~31%", "Q4": "~19%", "Q5": "~20%" },
  { "Métrica": "🟢 Onde mais acerta", "Q1": "Pouco relevante", "Q2": "Perfil 02 (parcial)", "Q3": "Maior volume geral", "Q4": "Perfil 03", "Q5": "Perfil 03" },
  { "Métrica": "🔴 Onde mais erra", "Q1": "Alto erro inicial", "Q2": "Gargalo persistente", "Q3": "Maior erro absoluto", "Q4": "Maior erro proporcional", "Q5": "Alto erro geral" },
  { "Métrica": "👨‍🎓 Perfis afetados", "Q1": "Perfil 01, 05", "Q2": "Perfil 01, 02, 05", "Q3": "Todos (02 e 04)", "Q4": "Perfil 01, 02, 04", "Q5": "Perfil 02, 04" }
];

export default function TabelaQuestoes() {
  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", marginTop: "30px" }}>
      <h3 style={{ color: "#1a3353", borderBottom: "2px solid #f0f2f5", paddingBottom: "10px", marginTop: 0 }}>
        📑 Tabela sobre o perfil das Questões
      </h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#1a3353", color: "#fff" }}>
              <th style={{ padding: "12px" }}>Métrica</th>
              <th style={{ padding: "12px" }}>Q1 – Inicial</th>
              <th style={{ padding: "12px" }}>Q2 – Condicional</th>
              <th style={{ padding: "12px" }}>Q3 – Iterativo</th>
              <th style={{ padding: "12px" }}>Q4 – Estruturado</th>
              <th style={{ padding: "12px" }}>Q5 – Composto</th>
            </tr>
          </thead>
          <tbody>
            {questoesData.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee", backgroundColor: idx % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                <td style={{ padding: "10px", fontWeight: "bold", fontSize: "0.9rem", color: "#333" }}>{row.Métrica}</td>
                <td style={{ padding: "10px" }}>{row.Q1}</td>
                <td style={{ padding: "10px" }}>{row.Q2}</td>
                <td style={{ padding: "10px" }}>{row.Q3}</td>
                <td style={{ padding: "10px" }}>{row.Q4}</td>
                <td style={{ padding: "10px" }}>{row.Q5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}