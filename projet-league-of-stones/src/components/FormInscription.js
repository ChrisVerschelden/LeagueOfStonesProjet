import React from "react";
import { render } from "react-dom";
import { Form, Field } from "react-final-form";
import 'bootstrap/dist/css/bootstrap.min.css';

const onSubmit = async values => {
    fetch('http://localhost:3001/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name" :values.username, "email" : values.mail, "password" : values.confirm})

    }).then(response => {
      if (response.status !== 200) {
        alert("Ce pseudo ou cet email existe déjà");
      }else if (response.status === 200) {
        document.location.href = '/success';
      }
    })
};

const FormInscription = () => (
  <div className='container-fluid'>
    <h1> ❤inscriptions❤ </h1>
    <Form onSubmit={onSubmit} validate={values => {
        const errors = {};
        if (!values.username) {
          errors.username = "Required";
        }
        if (!values.mail) {
            errors.mail = "Required";
          }
        if (!values.password) {
          errors.password = "Required";
        }
        if (!values.confirm) {
          errors.confirm = "Required";
        } else if (values.confirm !== values.password) {
          errors.confirm = "Must match";
        }
        return errors;
      }}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="username" className='form-group vw-100'>
            {({ input, meta }) => (
              <div className='form-group'>
                <label>pseudo</label>
                <input {...input} type="text" placeholder="pseudo" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="mail" className='form-group m-3'>
            {({ input, meta }) => (
              <div className='form-group'>
                <label>e-mail</label>
                <input {...input} type="text" placeholder="e-mail" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="password">
            {({ input, meta }) => (
              <div className='form-group'>
                <label>mot de passe</label>
                <input {...input} type="password" placeholder="mot de passe" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="confirm" >
            {({ input, meta }) => (
              <div className='form-group'>
                <label>confirmer</label>
                <input {...input} type="password" placeholder="mot de passe" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting} className="btn btn-rounded btn-primary">
              S'inscrire
            </button>
            <button type="button" onClick={reset} disabled={submitting || pristine} className="btn btn-rounded btn-secondary">
              effacer
            </button>
          </div>
        </form>
      )}
    />
  </div>
);

export default FormInscription
