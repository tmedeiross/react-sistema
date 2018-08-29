import React from 'react';

const RecipeHeader = () => (
  <React.Fragment>
    <tr>
      <td />
      <td colSpan="3">
        <span className="badge badge-pill badge-secondary recipe__label">Longe</span>
      </td>
      <td colSpan="3" />
      <td colSpan="3">
        <span className="badge badge-pill badge-secondary recipe__label">Perto</span>
      </td>
    </tr>
    <tr>
      <td />
      <td align="center">Esf.</td>
      <td align="center">Cil.</td>
      <td align="center">Eixo</td>
      <td align="center" />
      <td align="center">Adição</td>
      <td align="center" />
      <td align="center">Esf.</td>
      <td align="center">Cil.</td>
      <td align="center">Eixo</td>
      <td align="center" />
      <td align="center">DNP</td>
      <td align="center">Alt.</td>
    </tr>
  </React.Fragment>
);

export default RecipeHeader;
