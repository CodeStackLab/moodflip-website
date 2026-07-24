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
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setUsers(data.users);
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

  if (!isAuthenticated) {
    return (
      <section className="admin-card admin-login-card">
        <span className="admin-lock">🔐</span>
        <h1>Private Admin Dashboard</h1>
        <p>Enter the server-configured admin password.</p>
        <form onSubmit={handleLogin} className="admin-login-form">
          <label htmlFor="admin-password">Admin password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Checking…' : 'Access Dashboard'}</button>
        </form>
      </section>
    );
  }

  return (
    <section className="admin-card">
      <div className="admin-heading">
        <div>
          <h1>Admin Control Center</h1>
          <p>Registered users, saved check-ins and purchase status.</p>
        </div>
        <button type="button" onClick={handleExportCSV}>Export CSV</button>
      </div>

      <div className="admin-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Visits</th>
              <th>Check-ins</th>
              <th>Purchases</th>
              <th>Status</th>
              <th>Last active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name || 'Not provided'}</td>
                <td>{user.email}</td>
                <td>{user.visitCount}</td>
                <td>{user.checkinsCount}</td>
                <td>{user.purchasesCount}</td>
                <td><span className={user.isPaid ? 'status-paid' : 'status-free'}>{user.isPaid ? 'ACTIVE PAID' : 'FREE'}</span></td>
                <td>{new Date(user.lastActiveAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && <p className="admin-empty">No profiles have been created yet.</p>}
    </section>
  );
}
