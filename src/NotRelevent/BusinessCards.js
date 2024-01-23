const BusinessCards = (props) => {
  console.log(props);
  return (
    <>
      <div className="row">
        <div className="col">
          <div className="card m-4">
            <img
              className="card-img-top"
              src={"https://picsum.photos/id/10/200/300"}
              alt="..."
            />
            <div className="card-body"></div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BusinessCards;
