import React, { useState, forwardRef, useImperativeHandle } from 'react';
import '../Formulario.css';
import { useNavigate } from 'react-router-dom';

export const FormularioMaestro = forwardRef(({ onAdd, editingMaestro, onCancel, onError = console.error }, ref) => {
  const [formData, setFormData] = useState({
    id_maestro: '',
    nombre_maestro: '',
    apellido_maestro: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (editingMaestro) {
      console.log(editingMaestro);
      setFormData({
        id_maestro: editingMaestro.id_maestro || '',
        nombre_maestro: editingMaestro.nombre_maestro || '',
        apellido_maestro: editingMaestro.apellido_maestro || '',
      });
    }
  }, [editingMaestro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value) error = 'Este campo es obligatorio.';
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error || undefined,
    }));
    return error;
  };

  const validateAllFields = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    getValues: () => {
      const isValid = validateAllFields();
      if (!isValid) {
        throw new Error('Hay errores en los campos del formulario.');
      }
      return formData;
    },
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const nuevosErrores = await onAdd(formData);
      if (!nuevosErrores) {
        setFormData({
          id_maestro: '',
          nombre_maestro: '',
          apellido_maestro: '',
        });
      }
    } catch (error) {
      onError('Error al agregar el maestro.');
    }
  };

  const handleCancel = () => {
    setFormData({
      id_maestro: '',
      nombre_maestro: '',
      apellido_maestro: '',
    });
    if (onCancel) onCancel();
  };

  return (
    <form className="gx-2 align-items-center" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="nombre_maestro" className="form-label">Nombre: <span className="text-danger">*</span></label>
          <input
            type="text"
            id="nombre_maestro"
            name="nombre_maestro"
            className="form-control"
            value={formData.nombre_maestro}
            onChange={handleChange}
          />
          {errors.nombre_maestro && <div className="text-danger">{errors.nombre_maestro}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="apellido_maestro" className="form-label">Apellidos: <span className="text-danger">*</span></label>
          <input
            type="text"
            id="apellido_maestro"
            name="apellido_maestro"
            className="form-control"
            value={formData.apellido_maestro}
            onChange={handleChange}
          />
          {errors.apellido_maestro && <div className="text-danger">{errors.apellido_maestro}</div>}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-success" type="submit">{editingMaestro ? "Actualizar Maestro" : "Agregar Maestro"}</button>
        <button className="btn btn-secondary ms-3" type="button" onClick={handleCancel}>Cancelar</button>
      </div>
    </form>
  );
});

export default FormularioMaestro;
