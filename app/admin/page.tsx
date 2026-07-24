'use client';

import React, { useState, useEffect } from 'react';

interface MockUser {
  id: string;
  email: string;
  name: string;
  visitCount: number;
  isPaid: boolean;
  checkinsCount: number;
  lastActiveAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<MockUser[]>([]);

  useEffect(() => {
    // Load mock or live user data from local checkins / API
    const mockData: MockUser[] = [
      { id: '1', email: 'joy@moodflip.coach', name: 'Joy Admin', visitCount: 5, isPaid: true, checkinsCount: 12, lastActiveAt: new Date().toISOString() },
      { id: '2', email: 'user1@example.com', name: 'Alex Johnson', visitCount: 2, isPaid: true, checkinsCount: 3, lastActiveAt: new Date(Date.now() - 86400000).toISOString() },
      { id: '3', email: 'user2@example.com', name: 'Sam Taylor', visitCount: 3, isPaid: false, checkinsCount: 5, lastActiveAt: new Date(Date.now() - 172800000).toISOString() },
    ];
    setUsers(mockData);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect admin password!');
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Email', 'Name', 'Visits', 'Paid Status', 'Checkins Count', 'Last Active'];
    const rows = users.map(u => [u.id, u.email, u.name || 'Anonymous', u.visitCount, u.isPaid ? 'ACTIVE_PAID' : 'FREE', u.checkinsCount, u.lastActiveAt]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moodflip_users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '400px', margin: '4rem auto', background: 'rgba(18,24,44,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
        <span style={{ fontSize: '2.5rem' }}>🔐</span>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', margin: '0.5rem 0 1rem 0' }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            placeholder="Enter Admin Password (admin123)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: 'white', outline: 'none' }}
          />
          <button
            type="submit"
            style={{ padding: '0.75rem', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', fontWeight: 700, borderRadius: '10px', border: 'none', cursor: 'pointer' }}
          >
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', background: 'rgba(18,24,44,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>Admin Control Center</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Registered Users, Saved Check-ins & CSV Exporter</p>
        </div>

        <button
          onClick={handleExportCSV}
          style={{ padding: '0.75rem 1.5rem', background: '#10b981', color: 'white', fontWeight: 700, borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          📥 Export Users to CSV
        </button>
      </div>

      {/* User Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>Name</th>
              <th style={{ padding: '0.75rem' }}>Email</th>
              <th style={{ padding: '0.75rem' }}>Visits</th>
              <th style={{ padding: '0.75rem' }}>Check-ins</th>
              <th style={{ padding: '0.75rem' }}>Purchase Status</th>
              <th style={{ padding: '0.75rem' }}>Last Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600, color: 'white' }}>{u.name || 'Anonymous'}</td>
                <td style={{ padding: '0.75rem', color: '#a855f7' }}>{u.email}</td>
                <td style={{ padding: '0.75rem' }}>{u.visitCount}</td>
                <td style={{ padding: '0.75rem' }}>{u.checkinsCount}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, background: u.isPaid ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: u.isPaid ? '#34d399' : '#fbbf24' }}>
                    {u.isPaid ? 'ACTIVE PAID ($7)' : 'INACTIVE (FREE)'}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#94a3b8' }}>{new Date(u.lastActiveAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
