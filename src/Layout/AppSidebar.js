import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/timer"}>Timer</Link>
        </li>
        <li>
          <Link to={"/social-posts"}>Social Posts</Link>
        </li>
        <li>
          <Link to={"/todos"}>To-Dos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
