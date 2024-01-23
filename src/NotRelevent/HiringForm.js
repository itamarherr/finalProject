//import NavigationBar from "./NavigationBar";

function HiringForm() {

  return (
    <>
    <div className="container">
      <h1>Apply Form</h1>
      <form>
        <div className="row">
          <div className="col">
            <label className="form-label">First name:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col">
            <label className="form-label">Last name:</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label">Username:</label>
            <input type="text"  visibility="hidden" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label">Email:</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label">Address 1:</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label">Coutry:</label>
            <select className="form-select">
              <option>Israel</option>
              <option>United state</option>
              <option>Spain</option>
              <option>Jorden</option>
              <option>France</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label">city:</label>
            <select className="form-select">
              <option>Haifa</option>
              <option>Tel Aviv</option>
              <option>Alin HaGalil</option>
              <option> Kiryat Tivon</option>
              <option>Jarusalem</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label">field of expertise:</label>
            <select  className="form-select id" >
                <option>Teacher</option>
                <option>Hi Tech</option>
                <option>Diplomacy</option>
                <option>Design</option>
                <option>Criminal</option>
                <option id="TrigerOpenText">Other</option>
            </select>
            <input type="text" id="myInput" />

          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-5 form-check form-switch">
              <input type="checkbox" id="onOff2" className="form-check-input" />
              <label htmlFor="onOff2" className="form-check-label">
                Ship to diferent address
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>Payment details</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-check">
              <input
                type="radio"
                name="PaymentType"
                className="form-check-input"
              />
              <label className="form-check-label">Credit</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="PaymentType"
                className="form-check-input"
              />
              <label className="form-check-label">Cash</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="PaymentType"
                className="form-check-input"
              />
              <label className="form-check-label btn btn ">Other</label>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-8">
            <label className="form-label">Credit card number:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-4">
            <label className="form-label">CVV:</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label">Name on card:</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className="form-label">Exp Year:</label>
            <select className="form-select">
              <option>2023</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label">Exp Month:</label>
            <select className="form-select">
              <option>12</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary mt-3">Send Order</button>
      </form>
    </div>
    </>
  );
}
export default HiringForm;