import React from 'react';
import PropTypes from 'prop-types';

import WebcamCapture from '../../../common/webcam';
import If from '../../../common/if';

const FormPicture = ({ image, errors, onImageCaptured }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-md-8">
        <div className="card w-50 mx-auto">
          <If test={image}>
            <img className="card-img-top img-fluid rounded mx-auto" src={image} alt="captured" />
          </If>
        </div>
      </div>
      <div className="col-md-4">
        <WebcamCapture onImageCaptured={onImageCaptured} />
      </div>
    </div>
  </React.Fragment>
);

FormPicture.propTypes = {
  photo: PropTypes.string,
  errors: PropTypes.object.isRequired,
  onImageCaptured: PropTypes.func.isRequired,
};

export default FormPicture;
