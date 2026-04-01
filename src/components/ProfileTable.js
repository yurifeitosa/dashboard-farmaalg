import React, { useState } from 'react';
import data from '../data/profiles.json';

const ProfileTable = () => {
  const [filter, setFilter] = useState('');

  const filteredData = data.filter(row => 
    row.Métrica.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <input 
        type="text" 
        placeholder="Filtrar métricas..." 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Métrica</th>
              <th style={{ padding: '12px', color: '#007bff' }}>Perfil 01</th>
              <th style={{ padding: '12px', color: '#28a745' }}>Perfil 02</th>
              <th style={{ padding: '12px', color: '#6f42c1' }}>Perfil 03</th>
              <th style={{ padding: '12px', color: '#fd7e14' }}>Perfil 04</th>
              <th style={{ padding: '12px', color: '#dc3545' }}>Perfil 05</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{row.Métrica}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{row['Perfil 01']}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{row['Perfil 02']}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{row['Perfil 03']}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{row['Perfil 04']}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{row['Perfil 05']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileTable;