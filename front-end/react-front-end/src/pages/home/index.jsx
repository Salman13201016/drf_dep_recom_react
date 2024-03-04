import HeaderSection from './HeaderSection';
import SideBarSection from './SideBarSection';
import { useEffect, useState } from 'react';
import HospitalBody from './HospitalBody';
import { useParams } from 'react-router';



const HomePage = () => {
  const [isDisplayNone, setisDisplayNone] = useState(true);
  const [ishospitalLocationMenuDisplay, setIsHospitalLocationMenuDisplay] = useState(false);
  const [ishospitalMenuDisplay, setIsHospitalMenuDisplay] = useState(false);
  const [isSymptomMenuDisplay, setIsSymptomMenuDisplay] = useState(false);
  const [isRoleMenuDisplay, setIsRoleMenuDisplay] = useState(false);
  const [isMenuDisplay, setIsMenuDisplay] = useState(false);
  const [componentShow, setcomponentShow] = useState('primary');

  const {input} = useParams();

  useEffect(() => {
    setcomponentShow(input);
  }, [input]);
  

  const changeDisplayMenu = (menu) => {
    if(menu == "hospitalLocation"){
      setIsHospitalLocationMenuDisplay(!ishospitalLocationMenuDisplay);
    }else if (menu == "hospitalMenu") {
      setIsHospitalMenuDisplay(!ishospitalMenuDisplay)
    }else if(menu == "symptomMenu"){
      setIsSymptomMenuDisplay(!isSymptomMenuDisplay)
    }else if(menu == "roleMenu"){
      setIsRoleMenuDisplay(!isRoleMenuDisplay)
    }else if(menu == "Menu"){
      setIsMenuDisplay(!isMenuDisplay);
    }
  }

  const makeDefaultMenu = () =>{
    if (ishospitalLocationMenuDisplay) {
      setIsHospitalLocationMenuDisplay(false);
    }
    if (ishospitalMenuDisplay) {
      setIsHospitalMenuDisplay(false)
    }
    if(isSymptomMenuDisplay){
      setIsSymptomMenuDisplay(false);
    }
    if(isRoleMenuDisplay){
      setIsRoleMenuDisplay(false);
    }
  }

  return (
    <div className="main-wrapper">
      <HeaderSection
        makeDefaultMenu={makeDefaultMenu}
        isDisplayNone={isDisplayNone}
        setisDisplayNone={setisDisplayNone}
      />

      <SideBarSection
        isDisplayNone={isDisplayNone}
        setisDisplayNone={setisDisplayNone}
        ishospitalLocationMenuDisplay={ishospitalLocationMenuDisplay}
        ishospitalMenuDisplay={ishospitalMenuDisplay}
        isSymptomMenuDisplay={isSymptomMenuDisplay}
        isRoleMenuDisplay={isRoleMenuDisplay}
        isMenuDisplay={isMenuDisplay}
        changeDisplayMenu={changeDisplayMenu}
      />

      {/* body section */}
      <HospitalBody componentShow={componentShow} />
    </div>
  );
};

export default HomePage;
