import React from 'react';
import './App.css';
import ThemeProvider from './theme/ThemeProvider';
import { FluentUIAdapter } from './theme/adapter/fluent.adapter';
import { MduiAdapter } from './theme/adapter';

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <ThemeProvider adapters={[FluentUIAdapter, MduiAdapter]}>
      <main className="app">{children}</main>
    </ThemeProvider>
  );
}

export default App;
