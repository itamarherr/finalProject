import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { deleteCard } from "./service/apiCard";
import { updateCard } from "./service/apiCard";

function GalleryCard({ item }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [barnches, setBanches] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    users.map(() => {});
  }, []);

  console.log(barnches);
  return (
    <div className="row m-2">
      <div className="col">
        <div>
          <Card>
            <Card.Img
              variant="top"
              src="https://picsum.photos/id/13/2000/3000"
              alt="..."
            />
            <Card.Body>
              <Card.Title>{item.Data.brand}</Card.Title>
              <Card.Text>{item.Data.description}</Card.Text>

              <Button className="m-2" variant="primary" onClick={handleShow}>
                branches
              </Button>
              <Button className="m-2" variant="danger" onClick={deleteCard}>
                delete
              </Button>
              <Button
                className="m-2"
                variant="warning"
                onClick={() => navigate("/editUser")}
              >
                edit
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {barnches.map((data, index) => {
              console.log(data);
              return (
                <>
                  <div className="card m-4">
                    <img
                      className="card-img-top"
                      src={"https://picsum.photos/id/10/200/300"}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title"> </h5>
                    </div>
                    <div className="card-footer"></div>
                  </div>
                </>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
export default GalleryCard;
