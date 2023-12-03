import HeaderSection from './HeaderSection';
import SideBarSection from './SideBarSection';
import BodySection from './--BodySection'
import { useState } from 'react';
import HospitalBody from './HospitalBody';

const HomePage = () => {
  const [componentShow, setcomponentShow] = useState('primary');
  const selectComponent = (value) =>{
    setcomponentShow(value);
  }

  
  return (
    <div className="main-wrapper">
      <HeaderSection />

      <SideBarSection selectComponent={selectComponent} />

      {componentShow == "primary" ? (
        <BodySection />
      ) : (
        <HospitalBody componentShow={componentShow} />
      )}
    </div>
  );
};

export default HomePage;
