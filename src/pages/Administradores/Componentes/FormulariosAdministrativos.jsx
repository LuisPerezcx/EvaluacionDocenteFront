import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Button  from '../../../components/Boton.js';
import Boton from '../../../components/Boton.js';
import '../../Administradores/FormularioA.css';

export const FormularioAdministrativo = forwardRef(({ onAdd, editingAdmin, onCancel, onError = console.error }, ref) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    contrasena: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (editingAdmin) {
      setFormData(editingAdmin);
    }
  }, [editingAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value) error = 'Este campo es obligatorio.';
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error || undefined }));
    return error;
  };

  const validateAllFields = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    getValues: () => {
      const isValid = validateAllFields();
      if (!isValid) throw new Error('Hay errores en los campos del formulario.');
      return formData;
    },
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevosErrores = await onAdd(formData);
      if (!nuevosErrores) {
        setFormData({ id: '', nombre: '', contrasena: '' });
      }
    } catch (error) {
      onError('Error al agregar el administrador.');
    }
  };

  const handleCancel = () => {
    setFormData({ id: '', nombre: '', contrasena: '' });
    if (onCancel) onCancel();
  };

  return (
    <form className="gx-2 align-items-center" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">Nombre: <span className="text-danger">*</span></label>
          <input type="text" id="nombre" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} />
          {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="contrasena" className="form-label">Contraseña: <span className="text-danger">*</span></label>
          <div className="input-group">
            <input type={showPassword ? "text" : "password"} id="contrasena" name="contrasena" className="form-control" value={formData.contrasena} onChange={handleChange} />
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
            </button>
          </div>
          {errors.contrasena && <div className="text-danger">{errors.contrasena}</div>}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-success" type="submit">{editingAdmin ? "Actualizar Administrador" : "Agregar Administrador"}</button>
        <button className="btn btn-secondary ms-3" type="button" onClick={handleCancel}>Cancelar</button>
      </div>
    </form>
  );
});
