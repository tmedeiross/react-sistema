import React from 'react';

import RecipeHeader from '../header';
import RecipeFields from '../fields';
import Prism from '../prism';
import RecipeDigital from '../digital';

import '../style.css';

const RecipeTabs = props => (
  <div>
    <ul className="nav nav-pills nav-justified" id="myTab" role="tablist">
      <li className="nav-item">
        <a
          className="nav-link active"
          id="recipe-tab"
          data-toggle="tab"
          href="#recipe"
          role="tab"
          aria-controls="recipe"
          aria-selected="true"
        >
          Receita
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="prism-tab"
          data-toggle="tab"
          href="#prism"
          role="tab"
          aria-controls="recipe-tab"
          aria-selected="false"
        >
          Prisma
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="digital-tab"
          data-toggle="tab"
          href="#digital"
          role="tab"
          aria-controls="digital-tab"
          aria-selected="false"
        >
          Receita Digital
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div
        className="tab-pane fade show active"
        id="recipe"
        role="tabpanel"
        aria-labelledby="recipe-tab"
      >
        <br />
        <div className="table-responsive">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <RecipeHeader />

              <RecipeFields
                eyeLabel="OD"
                farSphereName="rightFarSpherePower"
                farSphereValue={props.rightFarSpherePower}
                farCylinderName="rightFarCylinderPower"
                farCylinderValue={props.rightFarCylinderPower}
                farAxisName="rightFarAxis"
                farAxisValue={props.rightFarAxis}
                additionName="rightAddition"
                additionValue={props.rightAddition}
                nearSphereName="rightNearSpherePower"
                nearSphereValue={props.rightNearSpherePower}
                nearCylinderName="rightNearCylinderPower"
                nearCylinderValue={props.rightNearCylinderPower}
                nearAxisName="rightNearAxis"
                nearAxisValue={props.rightNearAxis}
                dnpName="rightFarMonocularCentrantionDistance"
                dnpValue={props.rightFarMonocularCentrantionDistance}
                heightName="rightFittingHeight"
                heightValue={props.rightFittingHeight}
                handleChange={props.handleChange}
                handleBlur={props.handleBlur}
              />

              <RecipeFields
                eyeLabel="OE"
                farSphereName="leftFarSpherePower"
                farSphereValue={props.leftFarSpherePower}
                farCylinderName="leftFarCylinderPower"
                farCylinderValue={props.leftFarCylinderPower}
                farAxisName="leftFarAxis"
                farAxisValue={props.leftFarAxis}
                additionName="leftAddition"
                additionValue={props.leftAddition}
                nearSphereName="leftNearSpherePower"
                nearSphereValue={props.leftNearSpherePower}
                nearCylinderName="leftNearCylinderPower"
                nearCylinderValue={props.leftNearCylinderPower}
                nearAxisName="leftNearAxis"
                nearAxisValue={props.leftNearAxis}
                dnpName="leftFarMonocularCentrantionDistance"
                dnpValue={props.leftFarMonocularCentrantionDistance}
                heightName="leftFittingHeight"
                heightValue={props.leftFittingHeight}
                handleChange={props.handleChange}
                handleBlur={props.handleBlur}
              />
            </tbody>
          </table>
        </div>
      </div>
      <div className="tab-pane fade" id="prism" role="tabpanel" aria-labelledby="prism-tab">
        <br />
        <Prism {...props} />
      </div>
      <div className="tab-pane fade" id="digital" role="tabpanel" aria-labelledby="digital-tab">
        <br />
        <RecipeDigital {...props} />
      </div>
    </div>
  </div>
);

export default RecipeTabs;
