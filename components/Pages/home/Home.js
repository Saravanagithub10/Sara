import axios from "axios";
import { useEffect, useState } from "react";

import "./Home.css";
import Content from "../../Content/content";

const Home = () => {
  const [content, setContent] = useState([]);

  const fetchHome = async () => {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=33c1451d78149c6f37c7f351d22f6452"
      );

      console.log(data);

      setContent(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <div>
      <span className="title" style={{ color: "black" }}>
        Home Page
      </span>
      <div className="home">
        {content &&
          content.map((c) => (
            <Content
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.name || c.title}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              overview={c.overview}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
