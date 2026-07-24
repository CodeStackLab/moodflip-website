'use client';

import React, { useState } from 'react';

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  visitCount: number;
  isPaid: boolean;
  checkinsCount: number;
  purchasesCount: number;
  lastActiveAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'x-admin-password': password },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to sign in.');
      setUsers(data.users || []);
      setIsAuthenticated(true);
      setPassword('');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const escapeCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
    const headers = ['Email', 'Name', 'Visits', 'Check-ins', 'Purchases', 'Purchase Status', 'Last Active'];
    const rows = users.map((user) => [
      user.email,
      user.name || '',
      user.visitCount,
      user.checkinsCount,
      user.purchasesCount,
      user.isPaid ? 'ACTIVE_PAID' : 'INACTIVE_FREE',
      user.lastActiveAt,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `moodflip_users_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name && u.name.toLowerCase().includes(search.toLowerCase()))
  );

  const totalUsers = users.length;
  const paidUsers = users.filter((u) => u.isPaid).length;
  const totalCheckins = users.reduce((acc, u) => acc + (u.checkinsCount || 0), 0);

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '440px', margin: '3rem auto', padding: '0 1rem' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid rgba(139, 92, 246, 0.18)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 50px rgba(139, 92, 246, 0.08)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            color: 'white',
            marginBottom: '1rem',
            boxShadow: '0 8px 20px rgba(99, 102, 241, 0.25)'
          }}>
            🔐
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 800, color: '#1e1b4b' }}>
            Private Admin Dashboard
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
            Enter Joy&apos;s admin master security password.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Admin Master Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter Password (admin123)"
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem 0.75rem 1rem',
                    background: '#f8fafc',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error ? (
              <p style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>⚠️ {error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)'
              }}
            >
              {loading ? 'Authenticating...' : 'Access Control Center 🔓'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid rgba(139, 92, 246, 0.15)',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 20px 50px rgba(139, 92, 246, 0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6', background: '#f5f3ff', padding: '0.2rem 0.65rem', borderRadius: '9999px' }}>
              ADMIN CONTROL CENTER
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.85rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.35rem' }}>
              Registered User Profiles & Analytics
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleExportCSV}
              style={{
                padding: '0.65rem 1.25rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>📥 Export CSV / Excel</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              style={{
                padding: '0.65rem 1rem',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '12px',
                color: '#64748b',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Sign Out 🔒
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          <div style={{ background: '#fcfbfe', border: '1.5px solid #ddd6fe', borderRadius: '16px', padding: '1.1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6d28d9' }}>TOTAL USERS</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.2rem' }}>{totalUsers}</div>
          </div>

          <div style={{ background: '#f8fafc', border: '1.5px solid #ecfdf5', borderRadius: '16px', padding: '1.1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>ACTIVE PAID PURCHASES</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#065f46', marginTop: '0.2rem' }}>{paidUsers}</div>
          </div>

          <div style={{ background: '#faf8fc', border: '1.5px solid #fbcfe8', borderRadius: '16px', padding: '1.1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#be185d' }}>TOTAL CHECK-INS</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#831843', marginTop: '0.2rem' }}>{totalCheckins}</div>
          </div>

          <div style={{ background: '#fffbeb', border: '1.5px solid #fef3c7', borderRadius: '16px', padding: '1.1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309' }}>AUTO PURGE INACTIVE</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#92400e', marginTop: '0.5rem' }}>90-Day Cron Active ⚙️</div>
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search users by name or email..."
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '0.65rem 1rem',
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              color: '#0f172a',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>User Email</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Name</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Visits</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Check-ins</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Purchase Status</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#1e1b4b' }}>{user.email}</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{user.name || '—'}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{user.visitCount}</td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#8b5cf6' }}>{user.checkinsCount}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {user.isPaid ? (
                        <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 800, fontSize: '0.74rem' }}>
                          🟢 ACTIVE PAID
                        </span>
                      ) : (
                        <span style={{ background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.74rem' }}>
                          ⚪ FREE LEAD
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                      {new Date(user.lastActiveAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                    No registered user records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
