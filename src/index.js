import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/output.css';
import App from './App';


const root = createRoot(document.getElementById('root'));
root.render(<App tab="home" />);

