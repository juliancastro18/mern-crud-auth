import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/NoteContext";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesPage from "./pages/NotesPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <AuthProvider>
      <NoteProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<NotesPage />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;
