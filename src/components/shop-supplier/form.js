import React from 'react';
import PropTypes from 'prop-types';

import Input from '../common/form/input';

const Form = ({
  handleSubmit,
  handleChange,
  errors,
  awardscode,
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
          name="awardscode"
          id="awardscode"
          label="Código no clube de premios "
          value={awardscode}
          handleChange={handleChange}
          showMsgError
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
  awardscode: PropTypes.string.isRequired,
  purchaseCode: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  textBtn: PropTypes.string.isRequired,
};

export default Form;
