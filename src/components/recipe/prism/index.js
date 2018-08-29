import React from 'react';

import PrismFields from './fields';

const Prism = props => (
  <div className="table-responsive">
    <table cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td />
          <td align="center">Prisma</td>
          <td align="center">Eixo</td>
          <td align="center" />
          <td align="center">Prisma</td>
          <td align="center">Eixo</td>
        </tr>

        {/* right eye */}
        <PrismFields
          eyeLabel="OD"
          prism1Name="rightPrism1"
          prism1Value={props.rightPrism1}
          prism1AxisName="rightPrism1Axis"
          prism1AxisValue={props.rightPrism1Axis}
          prism2Name="rightPrism2"
          prism2Value={props.rightPrism2}
          prism2AxisName="rightPrism2Axis"
          prism2AxisValue={props.rightPrism2Axis}
          handleChange={props.handleChange}
        />

        {/* left eye */}
        <PrismFields
          eyeLabel="OE"
          prism1Name="leftPrism1"
          prism1Value={props.leftPrism1}
          prism1AxisName="leftPrism1Axis"
          prism1AxisValue={props.leftPrism1Axis}
          prism2Name="leftPrism2"
          prism2Value={props.leftPrism2}
          prism2AxisName="leftPrism2Axis"
          prism2AxisValue={props.leftPrism2Axis}
          handleChange={props.handleChange}
        />
      </tbody>
    </table>
  </div>
);

export default Prism;
