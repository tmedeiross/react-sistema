import React from 'react';
import PropTypes from 'prop-types';

import Input from '../common/form/input';

const Form = ({
  handleSubmit,
  handleChange,
  errors,
  awardsCode,
  purchaseCode,
  defaultMessage,
  priority,
  textBtn,
}) => (
  <form onSubmit={handleSubmit} autoComplete="off">
    <div className="mdl-grid">
      <div className="mdl-cell mdl-cell--6-col">
        <Input
          type="text"
          name="awardsCode"
          id="awardsCode"
          label="Código no clube de premios "
          value={awardsCode}
          handleChange={handleChange}
          showMsgError
          maxLength="10"
        />
      </div>
      <div className="mdl-cell mdl-cell--6-col">
        <Input
          type="text"
          name="purchaseCode"
          id="purchaseCode"
          label="Código de compra neste fornecedor"
          value={purchaseCode}
          handleChange={handleChange}
          showMsgError
          maxLength="10"
        />
      </div>
      <div className="mdl-cell mdl-cell--8-col">
        <Input
          type="text"
          name="defaultMessage"
          id="defaultMessage"
          label="Mensagem padrão"
          value={defaultMessage}
          handleChange={handleChange}
          showMsgError
          maxLength="65"
        />
      </div>
      <div className="mdl-cell mdl-cell--4-col">
        <Input
          type="text"
          name="priority"
          id="priority"
          label="Prioridade"
          value={priority}
          handleChange={handleChange}
          showMsgError
          maxLength="6"
        />
      </div>
      {/* <div className="mdl-cell mdl-cell--2-col botao">
        <input
          type="submit"
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect bg-primary"
          value={textBtn}
        />
      </div> */}
    </div>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  // errors: PropTypes.object.isRequired,
  awardsCode: PropTypes.string.isRequired,
  purchaseCode: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  textBtn: PropTypes.string.isRequired,
};

export default Form;
