import React from 'react';

import FormInfo from './form-info';
import FormAddress from './form-address';
import FormPicture from './form-picture';
import RecipeTabs from '../../recipe/recipe-tabs';

const ClientData = props => (
  <div className="card">
    <div className="card-header">Dados do Cliente</div>
    <div className="card-body">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="personal-data-tab"
            data-toggle="tab"
            href="#personal-data"
            role="tab"
            aria-controls="personal-data"
            aria-selected="true"
          >
            Dados Pessoais
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="address-tab"
            data-toggle="tab"
            href="#address"
            role="tab"
            aria-controls="address-tab"
            aria-selected="false"
          >
            Endereço
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="recipedata-tab"
            data-toggle="tab"
            href="#recipedata"
            role="tab"
            aria-controls="recipedata-tab"
            aria-selected="false"
          >
            Receita
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="picture-tab"
            data-toggle="tab"
            href="#picture"
            role="tab"
            aria-controls="picture-tab"
            aria-selected="false"
          >
            Foto
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="personal-data"
          role="tabpanel"
          aria-labelledby="personal-data-tab"
        >
          <br />
          <FormInfo
            {...props}
            handleChange={props.handleChange}
            handleBlurCpf={props.handleBlurCpf}
            handleDateBirth={props.handleDateBirth}
          />
        </div>
        <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab">
          <br />
          <FormAddress
            {...props}
            handleChange={props.handleChange}
            handleBlurCep={props.handleBlurCep}
          />
        </div>
        <div
          className="tab-pane fade"
          id="recipedata"
          role="tabpanel"
          aria-labelledby="recipedata-tab"
        >
          <br />
          <RecipeTabs
            {...props}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
            handleSubmit={props.handleSubmit}
          />
        </div>
        <div className="tab-pane fade" id="picture" role="tabpanel" aria-labelledby="picture-tab">
          <br />
          <FormPicture {...props} onImageCaptured={props.onImageCaptured} />
        </div>
      </div>
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

export default ClientData;
