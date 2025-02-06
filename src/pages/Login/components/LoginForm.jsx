import React, { useState } from 'react';
import '../components/loginEstilos.css'; // Asegúrate de importar el archivo CSS

function App() {
  // Estado para manejar los valores de usuario y contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para el mensaje

  // Manejador de eventos para el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!username) {
      setMessage('El campo de usuario no puede estar vacio.');
      return;
    }
    if (!password) {
      setMessage('El campo de contraseña no puede estar vacio.');
      return;
    }

    // Validación de usuario y contraseña correctos
    if (username === 'admin' && password === 'admin123') {
      setMessage('¡Inicio de sesión exitoso!'); // Mostrar mensaje de éxito
    } else {
      // Si el usuario existe pero la contraseña es incorrecta
      if (username === 'admin') {
        setMessage('Contraseña incorrecta');
      } else {
        setMessage('Usuario no encontrado');
      }
    }
  };

  // Determinar el tipo de mensaje (error o éxito)
  const getMessageClass = () => {
    // Mensajes de error (campos vacíos, incorrecto, no encontrado)
    if (message === 'El campo de usuario no puede estar vacio.' || message === 'El campo de contraseña no puede estar vacio.' || 
        message === 'Usuario no encontrado' || message === 'Contraseña incorrecta') {
      return 'error'; // Mensajes de error
    } else if (message === '¡Inicio de sesión exitoso!') {
      return 'success'; // Mensaje de éxito
    }
    return ''; // Sin clase si no hay mensaje o no es de éxito o error
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">EVALUACION DOCENTE</h2> {/* Aquí se agrega el texto arriba del formulario */}
        <h1 className="login-title">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">Usuario</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Ingresa tu usuario"
              className="login-input" 
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password" className="login-label">Contraseña</label>
            <input  
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Ingresa tu contraseña"
              className="login-input" 
            />
          </div>
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
        {message && <p className={`login-message ${getMessageClass()}`}>{message}</p>} {/* Mostrar mensaje con clase dinámica */}
      </div>
    </div>
  );
}

export default App;
