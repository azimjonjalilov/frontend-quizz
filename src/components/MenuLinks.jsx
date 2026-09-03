// rrd import
import { Link } from "react-router-dom";

// custom hooks
import { useFetch } from "../hooks/useFetch";

function MenuLinks() {
  const {
    data: quizzes,
    isPending,
    error,
  } = useFetch(
    "https://json-api.uz/api/project/azimjon-frontend-quizz/quizzes"
  );

  return (
    <div>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="menu-list">
        {quizzes &&
          quizzes.data.map((item) => {
            const iconPath = item.icon ? item.icon.replace(/^\./, "") : "";
            return (
              <Link
                to={`/quiz/${item.title}`}
                key={item.title}
                className="menu-item header-logo"
              >
                <figure style={{ backgroundColor: item.color }}>
                  <img src={iconPath} alt={item.title} />
                </figure>
                <span>{item.title}</span>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default MenuLinks;
