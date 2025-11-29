import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const API_URL = 'https://69180c9021a96359486e99d3.mockapi.io/todos';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => setTodo(data));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      navigate('/list');
    }
  };

  if (!todo) return <div className="container mt-4">데이터 없음</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">할 일 상세</h2>
      <div className="card">
        <div className="card-body">
          <h5>{todo.title}</h5>
          <p><strong>설명:</strong> {todo.description || '-'}</p>
          <p><strong>카테고리:</strong> {todo.category}</p>
          <p><strong>우선순위:</strong> <span className="badge bg-secondary">{todo.priority}</span></p>
          <p><strong>상태:</strong> <span className="badge bg-dark">{todo.status}</span></p>
          <p><strong>마감일:</strong> {todo.dueDate}</p>
        </div>
      </div>
      <div className="mt-3">
        <Link to="/list" className="btn btn-secondary me-2">목록</Link>
        <Link to={`/update/${id}`} className="btn btn-dark me-2">수정</Link>
        <button className="btn btn-danger" onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
};

export default Detail;
