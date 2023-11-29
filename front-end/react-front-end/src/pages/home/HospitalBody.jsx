
import DistrictInput from './Input/DistrictInput';
import DivisionInput from './Input/DivisionInput';

import PropTypes from 'prop-types'



const HospitalBody = ({ isShowDistrict }) => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <DivisionInput />

            {isShowDistrict && <DistrictInput />}
          </div>
        </div>
      </div>
    </div>
  );
};


HospitalBody.propTypes = {
  isShowDistrict : PropTypes.bool,
};


export default HospitalBody;
