'use client';

import React from 'react';
import { usePreviewMode } from '@/_libs/_nextjs/v15/hooks/use-preview-mode';

export default function BuilderActivatePreviewMode() {
  const { setPreviewMode } = usePreviewMode();

  React.useEffect(() => {
    setPreviewMode(true);
  }, []);

  return null;
}
