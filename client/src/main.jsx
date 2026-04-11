import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

window.addEventListener('error', (e) => {
  console.error('Global Runtime Error:', e.message, 'at', e.filename, 'line', e.lineno);
});

console.log('Rendering app...')

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<h1 style="color: red;">ERROR: Root element not found!</h1>';
} else {
  console.log('Root element found, rendering...');
  createRoot(rootElement).render(
    <ErrorBoundary>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
