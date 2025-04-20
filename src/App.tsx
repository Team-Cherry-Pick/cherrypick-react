import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/global';
import MainPage from '@/pages/main/MainPage';
import LoginPage from '@/pages/login/LoginPage';
// import UserPage from '@/pages/user/UserPage';
import ProductDetailPage from '@/pages/product-detail/ProductDetailPage';
import ProductUploadPage from '@/pages/product-upload/ProductUploadPage';
import ErrorPage from '@/pages/error/ErrorPage';
import { ErrorModal } from '@/components/common/ErrorModal';
import { lightTheme, darkTheme } from '@/styles/theme';

function App() {
  const isDark = false; // 추후 상태관리 연결 예정

  return (
    <RecoilRoot>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router>
          <ErrorModal />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/user" element={<UserPage />} /> */}
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/upload" element={<ProductUploadPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/error?code=404" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
