import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/Contentmodal";
import "./content.css";

const Content = ({ id, poster, title, date, media_type }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title_1">{title}</b>
      <span className="subTitle">
        {" "}
        {media_type === "tv" ? "Series" : "Movies"}
      </span>
      <span className="subTitle">{date}</span>
    </ContentModal>
  );
};
export default Content;
