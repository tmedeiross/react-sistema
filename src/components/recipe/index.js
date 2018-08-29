import React from 'react';

import RecipeTabs from './recipe-tabs';

import './style.css';

const Recipe = props => (
  <div className="card">
    <div className="card-header">Dados da Receita</div>
    <div className="card-body">
      <RecipeTabs
        {...props}
        handleChange={props.handleChange}
        handleBlur={props.handleBlur}
        handleSubmit={props.handleSubmit}
      />
    </div>
    <div className="card-footer">
      <button
        type="button"
        className="btn btn-primary float-right"
        onClick={props.handleSubmit}
        disabled={props.formInvalid}
      >
        Salvar
      </button>
    </div>
  </div>
);

export default Recipe;
