import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { img_500, unavailableLandscape } from "../../config/config";
import "./Contentmodal.css";

const ContentModal = ({ children, media_type, id }) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=33c1451d78149c6f37c7f351d22f6452&language=en-US`
      );
      setContent(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Button variant="primary" className="media" onClick={handleShow}>
        {children} <span>&times;</span>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        style={{
          margin: "10px",
          border: "3px solid black",
          borderRadius: "10px",
          display: "flex ",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          height: "80%",
          color: "black",
          padding: "10px",
        }}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#eed202" }}>
          <Modal.Title className="ContentModal_title">
            {content && (
              <>
                {content.name || content.title} (
                {content.first_air_date
                  ? content.first_air_date.substring(0, 4)
                  : content.release_date
                  ? content.release_date.substring(0, 4)
                  : ""}
                )
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#eed202",
          }}
        >
          {content && (
            <div className="ContentModal">
              <img
                className="Content__landscape"
                alt={content.name || content.title}
                src={
                  content.poster_path
                    ? `${img_500}/${content.backdrop_path}`
                    : unavailableLandscape
                }
              />
              <div className="ContentModal__about">
                {content.tagline && (
                  <i className="tagline">{content.tagline}</i>
                )}
                <p className="ContentModal__description">{content.overview}</p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContentModal;
