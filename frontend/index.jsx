import React from 'react';
import { createRoot } from 'react-dom/client';
import BusApp from './BusApp';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<BusApp />);