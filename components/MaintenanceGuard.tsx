'use client';

import React from 'react';

interface MaintenanceGuardProps {
  children: React.ReactNode;
}

export default function MaintenanceGuard({ children }: MaintenanceGuardProps) {
  // Public live mode: render children directly for all visitors
  return <>{children}</>;
}
