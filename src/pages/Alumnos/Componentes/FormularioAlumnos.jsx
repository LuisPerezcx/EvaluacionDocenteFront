import React, { useState, forwardRef, useImperativeHandle } from 'react';
import '../Formulario.css';

export const FormularioAlumno = forwardRef(({ onAdd, editingAlumno, onCancel, onError = console.error }, ref) => {
  const [formData, setFormData] = useState({
    id_alumno: '',
    nombre_alumno: '',
    apellido_alumno: '',
    matricula: '',
    contrasenia: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (editingAlumno) {
      setFormData(editingAlumno);
    }
  }, [editingAlumno]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    if(name === 'id_alumno') return;
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
    
    const isValid = validateAllFields();
    if (!isValid) {
      return; // Si no es válido, no se envía el formulario
    }    
    
    try {
      const nuevosErrores = await onAdd(formData);
      if (!nuevosErrores) {
        setFormData({
          id_alumno: '',
          nombre_alumno: '',
          apellido_alumno: '',
          matricula: '',
          contrasenia: '',
        });
      }
    } catch (error) {
      onError('Error al agregar el alumno.');
    }
  };


  const handleCancel = () => {
    setFormData({
      id: '',
      nombre_alumno: '',
      apellido_alumno: '',
      matricula: '',
      contrasenia: '',
    });
    if (onCancel) onCancel();
  };

  return (
    <form className="gx-2 align-items-center" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="nombre" className="form-label">Nombre: <span className="text-danger">*</span></label>
          <input type="text" id="nombre" name="nombre_alumno" className="form-control" value={formData.nombre_alumno} onChange={handleChange} />
          {errors.nombre_alumno && <div className="text-danger">{errors.nombre_alumno}</div>}
        </div>

        <div className="col-md-3">
          <label htmlFor="apellidos" className="form-label">Apellidos: <span className="text-danger">*</span></label>
          <input type="text" id="apellidos" name="apellido_alumno" className="form-control" value={formData.apellido_alumno} onChange={handleChange} />
          {errors.apellido_alumno && <div className="text-danger">{errors.apellido_alumno}</div>}
        </div>

        <div className="col-md-3">
          <label htmlFor="matricula" className="form-label">Matrícula: <span className="text-danger">*</span></label>
          <input type="text" id="matricula" name="matricula" className="form-control" value={formData.matricula} onChange={handleChange} />
          {errors.matricula && <div className="text-danger">{errors.matricula}</div>}
        </div>

        <div className="col-md-3">
          <label htmlFor="contraseña" className="form-label">Contraseña: <span className="text-danger">*</span></label>
          <div className="input-group">
            <input type={showPassword ? "text" : "password"} id="contraseña" name="contrasenia" className="form-control" value={formData.contrasenia} onChange={handleChange} />
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
            </button>
          </div>
          {errors.contrasenia && <div className="text-danger">{errors.contrasenia}</div>}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-success" type="submit">{editingAlumno ? "Actualizar Alumno" : "Agregar Alumno"}</button>
        <button className="btn btn-secondary ms-3" type="button" onClick={handleCancel}>Cancelar</button>
      </div>
    </form>
  );
});
export default FormularioAlumno;
