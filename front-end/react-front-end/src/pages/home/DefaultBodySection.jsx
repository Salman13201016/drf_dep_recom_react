import UserLocation from "../../components/shared/locationInput/UserLocation";




const BodySection = () => {
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Basic Inputs</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Basic Inputs</li>
              </ul>
              <UserLocation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodySection