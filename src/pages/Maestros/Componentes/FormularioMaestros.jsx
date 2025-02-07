import React, { useState, forwardRef, useImperativeHandle } from 'react';
import '../Formulario.css';

export const FormularioMaestro = forwardRef(({ onAdd, editingMaestro, onCancel, onError = console.error }, ref) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    apellidos: '',
  });

  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (editingMaestro) {
      setFormData(editingMaestro);
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
          id: '',
          nombre: '',
          apellidos: '',
        });
      }
    } catch (error) {
      onError('Error al agregar el maestro.');
    }
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      nombre: '',
      apellidos: '',
    });
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
          <label htmlFor="apellidos" className="form-label">Apellidos: <span className="text-danger">*</span></label>
          <input type="text" id="apellidos" name="apellidos" className="form-control" value={formData.apellidos} onChange={handleChange} />
          {errors.apellidos && <div className="text-danger">{errors.apellidos}</div>}
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
