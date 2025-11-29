import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://69180c9021a96359486e99d3.mockapi.io/todos';

const List = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTodos(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchTodos();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">할 일 목록</h2>
      <Link to="/create" className="btn btn-dark mb-3">+ 새 할 일</Link>

      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>카테고리</th>
            <th>우선순위</th>
            <th>상태</th>
            <th>마감일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.category}</td>
              <td><span className="badge bg-secondary">{todo.priority}</span></td>
              <td><span className="badge bg-dark">{todo.status}</span></td>
              <td>{todo.dueDate}</td>
              <td>
                <Link to={`/detail/${todo.id}`} className="btn btn-sm btn-outline-secondary me-1">상세</Link>
                <Link to={`/update/${todo.id}`} className="btn btn-sm btn-outline-dark me-1">수정</Link>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(todo.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
