import React from 'react';

const analiseData = [
  { "Questão": "Q1 – Inicial", "P1": "🔴 ~20%", "P2": "🟡 ~45%", "P3": "🟢 ~75%", "P4": "🟡 ~50%", "P5": "⚫ ~10%" },
  { "Questão": "Q2 – Condicional", "P1": "🔴 ~18%", "P2": "🔴 ~38%", "P3": "🟢 ~72%", "P4": "🟡 ~48%", "P5": "⚫ ~8%" },
  { "Questão": "Q3 – Iterativo", "P1": "🔴 ~22%", "P2": "🟡 ~48%", "P3": "🟢 ~80%", "P4": "🟢 ~68%", "P5": "⚫ ~5%" },
  { "Questão": "Q4 – Estruturado", "P1": "⚫ ~10%", "P2": "🔴 ~28%", "P3": "🟡 ~62%", "P4": "🔴 ~35%", "P5": "⚫ ~2%" },
  { "Questão": "Q5 – Composto", "P1": "⚫ ~8%", "P2": "🔴 ~22%", "P3": "🟡 ~55%", "P4": "🟡 ~30%", "P5": "⚫ ~1%" }
];

export default function TabelaAnaliseDetalhada() {
  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", marginTop: "30px" }}>
      <h3 style={{ color: "#1a3353", borderBottom: "2px solid #f0f2f5", paddingBottom: "10px", marginTop: 0 }}>
        📊 Análise Detalhada sobre a taxa de acertos (Questões × Perfis de Aluno)
      </h3>
      
      {/* LEGENDA DA ESCALA */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px", fontSize: "0.9rem", color: "#555", backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "8px" }}>
        <strong>📌 Escala:</strong>
        <span>🟢 Alto desempenho</span>
        <span>🟡 Médio</span>
        <span>🔴 Baixo desempenho</span>
        <span>⚫ Crítico (quase não acerta)</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#1a3353", color: "#fff" }}>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Questão \ Perfil</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>P1: Dif. Inicial</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>P2: Intermediário</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>P3: Bom Desemp.</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>P4: Persistente</th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>P5: Desistente</th>
            </tr>
          </thead>
          <tbody>
            {analiseData.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee", backgroundColor: idx % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                <td style={{ padding: "12px", fontWeight: "bold", color: "#333" }}>{row.Questão}</td>
                <td style={{ padding: "12px", fontSize: "1.05rem" }}>{row.P1}</td>
                <td style={{ padding: "12px", fontSize: "1.05rem" }}>{row.P2}</td>
                <td style={{ padding: "12px", fontSize: "1.05rem" }}>{row.P3}</td>
                <td style={{ padding: "12px", fontSize: "1.05rem" }}>{row.P4}</td>
                <td style={{ padding: "12px", fontSize: "1.05rem" }}>{row.P5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}