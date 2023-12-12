import HeaderSection from './HeaderSection';
import SideBarSection from './SideBarSection';
import BodySection from './DefaultBodySection'
import { useState } from 'react';
import HospitalBody from './HospitalBody';

const HomePage = () => {
  const [isDisplayNone, setisDisplayNone] = useState(true);
  const [componentShow, setcomponentShow] = useState('primary');
  const selectComponent = (value) =>{
    setcomponentShow(value);
  }

  return (
    <div className="main-wrapper">
      <HeaderSection
        isDisplayNone={isDisplayNone}
        setisDisplayNone={setisDisplayNone}
      />

      <SideBarSection
        selectComponent={selectComponent}
        isDisplayNone={isDisplayNone}
        setisDisplayNone={setisDisplayNone}
      />

      {componentShow == "primary" ? (
        <BodySection />
      ) : (
        <HospitalBody componentShow={componentShow} />
      )}
    </div>
  );
};

export default HomePage;
