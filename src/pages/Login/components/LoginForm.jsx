import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../components/loginEstilos.css'; // Asegúrate de importar el archivo CSS
import LoginService from '../../../services/LoginService';

function App() {
  // Estado para manejar los valores de usuario y contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para el mensaje

  const navigate = useNavigate(); // Crea una instancia de navigate

  // Manejador de eventos para el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Detener el evento submit para evitar redirecciones innecesarias
    // Validación de campos vacíos
    if (!username) {
      setMessage('El campo de usuario no puede estar vacio.');
      return;
    }
    if (!password) {
      setMessage('El campo de contraseña no puede estar vacio.');
      return;
    }

    try{
      const response = await LoginService.login(username, password);
      if (response.status ===200){
        console.log(response);
        const userData = {
          rol: response.data.rol,
          nombre: response.data.nombre
        };
  
        if(response.data.rol===1){
          userData.id = response.data.id;
        }

        localStorage.setItem('userData', JSON.stringify(userData));

        setMessage('¡Inicio de sesión exitoso!'); // Mostrar mensaje de éxito
        // Redirigir a la página principal
        setTimeout(() => {
          navigate('/principal'); // Redirige a PrincipalPage después de 1 segundo
        }, 300);
      } else {
        setMessage('Credenciales incorrectas')
      }

    } catch(error){
      console.error('Error al iniciar sesión: ', error);
      setMessage('Error al iniciar sesión'); // Mostrar mensaje de error en caso de falla en el servicio
      return; // Detener la ejecución del evento submit para evitar redirecciones innecesarias
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
          <button type="submit" className="login-button bg-success">
            Iniciar sesión
          </button>
        </form>
        {message && <p className={`login-message ${getMessageClass()}`}>{message}</p>} {/* Mostrar mensaje con clase dinámica */}
      </div>
    </div>
  );
}

export default App;
