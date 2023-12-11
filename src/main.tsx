import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </StyledEngineProvider>,
);
