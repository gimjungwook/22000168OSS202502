import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/list">To-Do List Manager</Link>
        <div>
          <Link className="btn btn-outline-light btn-sm me-2" to="/list">목록</Link>
          <Link className="btn btn-outline-light btn-sm" to="/create">새 할 일</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
