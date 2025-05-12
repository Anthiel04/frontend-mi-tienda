import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "../CSS/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_URL;

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Limpiar errores previos

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      const data = await response.json();
      localStorage.setItem("Authorization", data.token); // Almacenar el token en localStorage
      alert("Registro exitoso");
      navigate("/"); // Redirigir al usuario a la página principal
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
    }
  };

  return (
    <>
      <Link replace to="/" className="home-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 9L12 2L21 9V20A2 2 0 0 1 19 22H5A2 2 0 0 1 3 20V9Z"></path>
          <path d="M9 22V12H15V22"></path>
        </svg>
        Inicio
      </Link>
      <div className="login-container">
        <div className="login-box">
          <h2>Crear Cuenta</h2>
          <form id="registerForm" onSubmit={handleRegister}>
            <div className="input-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {error && <span className="error-message">{error}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <div className="password-container">
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" id="togglePassword">
                  👁️
                </button>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <div className="password-container">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="button" id="toggleConfirmPassword">
                  👁️
                </button>
              </div>
            </div>
            <button type="submit" className="btn">
              Registrarse
            </button>
            <p className="register-link">
              ¿Ya tienes cuenta?{" "}
              <Link replace to="/login">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
