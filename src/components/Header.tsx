import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-100 py-4 px-6">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/todo-redux"
              className="text-blue-500 hover:text-blue-700"
            >
              TODO (Redux)
            </Link>
          </li>
          <li>
            <Link
              to="/todo-react"
              className="text-blue-500 hover:text-blue-700"
            >
              TODO (React)
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
