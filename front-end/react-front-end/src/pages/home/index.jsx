import HeaderSection from './HeaderSection';
import SideBarSection from './SideBarSection';
import BodySection from './BodySection'
import { useState } from 'react';
import HospitalBody from './HospitalBody';

const HomePage = () => {
  const [isPrimaryBodyShow, setisPrimaryBodyShow] = useState(true);
  const [isShowDistrict, setisShowDistrict] = useState(false);

  
  return (
    <div className="main-wrapper">
      <HeaderSection />

      <SideBarSection
        setisPrimaryBodyShow={setisPrimaryBodyShow}
        setisShowDistrict={setisShowDistrict}
      />

      {isPrimaryBodyShow ? (
        <BodySection />
      ) : (
        <HospitalBody isShowDistrict={isShowDistrict} />
      )}
    </div>
  );
};

export default HomePage;
