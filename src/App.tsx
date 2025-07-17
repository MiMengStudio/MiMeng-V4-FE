import React from 'react';
import './App.css';

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return <main className="app">{children}</main>;
}

export default App;
