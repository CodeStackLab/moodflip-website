'use client';

import React, { useEffect, useState } from 'react';

export default function SiteLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return null;
}
