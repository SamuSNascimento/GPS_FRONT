import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import {
  HOLIDAYS_PAGE,
  LOGIN_PAGE,
  MENU_PAGE,
  NEWPASSWORD_PAGE,
  PAYMENT_PAGE,
  POINT_PAGE,
} from './config';
import LoginPage from './pages/login';
import theme from './styles/theme';
import { ThemeProvider } from '@mui/material';
import NewPassword from './pages/newPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';
import MenuPage from './pages';
import PaymentPage from './pages/payment';
import PointPage from './pages/point';
import HolidaysPage from './pages/holidays';
import ProtectedRoutes from './routes/portectedRoutes';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer autoClose={1500} />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={LOGIN_PAGE} element={<LoginPage />} />
            <Route element={<ProtectedRoutes redirect={LOGIN_PAGE} />}>
              <Route path={NEWPASSWORD_PAGE} element={<NewPassword />} />
              <Route path={MENU_PAGE} element={<MenuPage />} />
              <Route path={PAYMENT_PAGE} element={<PaymentPage />} />
              <Route path={POINT_PAGE} element={<PointPage />} />
              <Route path={HOLIDAYS_PAGE} element={<HolidaysPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
