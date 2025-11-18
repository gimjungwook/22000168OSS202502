import React, { useState, useEffect } from "react";

const ShowList = () => {
  const API_URL = "https://69180c9021a96359486e99d3.mockapi.io/todos";

  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    status: "대기중",
    dueDate: ""
  });

  // 데이터 로드
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  };

  // 새 할일 추가 모달 열기
  const handleAdd = () => {
    setEditMode(false);
    setCurrentTodo({
      id: "",
      title: "",
      description: "",
      category: "",
      priority: "Medium",
      status: "대기중",
      dueDate: ""
    });
    setShowModal(true);
  };

  // 수정 모드
  const handleEdit = (todo) => {
    setEditMode(true);
    setCurrentTodo(todo);
    setShowModal(true);
  };

  // 삭제
  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: "DELETE"
        });
        alert("할 일이 삭제되었습니다!");
        fetchTodos();
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("할 일 삭제에 실패했습니다.");
      }
    }
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        // 수정
        await fetch(`${API_URL}/${currentTodo.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(currentTodo)
        });
        alert("할 일이 수정되었습니다!");
      } else {
        // 추가
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(currentTodo)
        });
        alert("할 일이 추가되었습니다!");
      }
      setShowModal(false);
      fetchTodos();
    } catch (error) {
      console.error("저장 실패:", error);
      alert("할 일 저장에 실패했습니다.");
    }
  };

  // 입력 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTodo({
      ...currentTodo,
      [name]: value
    });
  };

  // Status badge 색상 (Assignment 4-2 스타일)
  const getStatusBadge = (status) => {
    if (status === "완료") return "bg-dark";
    if (status === "진행중") return "bg-secondary";
    return "bg-white text-dark border";
  };

  // Priority badge 색상 (Assignment 4-2 스타일)
  const getPriorityBadge = (priority) => {
    if (priority === "High") return "bg-dark";
    if (priority === "Medium") return "bg-secondary";
    return "bg-white text-dark border";
  };

  return (
    <div className="container mt-5">
      <header className="mb-4">
        <h1 className="text-center fw-bold">To-Do List Manager</h1>
        <p className="text-center text-muted">할 일을 체계적으로 관리하세요</p>
      </header>

      {/* 추가 버튼 */}
      <div className="mb-3">
        <button className="btn btn-dark" onClick={handleAdd}>
          + 새 할 일 추가
        </button>
      </div>

      {/* 할 일 목록 */}
      <div className="row mb-3">
        <div className="col-12">
          <h2 className="h4 mb-0">할 일 목록</h2>
        </div>
      </div>

      {/* Desktop View: Table */}
      <div className="table-responsive d-none d-md-block">
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
            {todos.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  등록된 할 일이 없습니다.
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id} style={{ cursor: "pointer" }}>
                  <th>{todo.id}</th>
                  <td>{todo.title}</td>
                  <td>{todo.category}</td>
                  <td>
                    <span className={`badge ${getPriorityBadge(todo.priority)}`}>
                      {todo.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(todo.status)}`}>
                      {todo.status}
                    </span>
                  </td>
                  <td>{todo.dueDate}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => handleEdit(todo)}
                    >
                      수정
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => handleDelete(todo.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Cards */}
      <div className="mobile-cards d-md-none">
        {todos.length === 0 ? (
          <p className="text-center text-muted">등록된 할 일이 없습니다.</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{todo.title}</h5>
                <p className="card-text">
                  <span className={`badge ${getPriorityBadge(todo.priority)} me-2`}>
                    {todo.priority}
                  </span>
                  <span className={`badge ${getStatusBadge(todo.status)} me-2`}>
                    {todo.status}
                  </span>
                  <small className="text-muted">~{todo.dueDate}</small>
                </p>
                <button
                  className="btn btn-sm btn-outline-dark"
                  onClick={() => handleEdit(todo)}
                >
                  수정
                </button>
                <button
                  className="btn btn-sm btn-outline-danger ms-2"
                  onClick={() => handleDelete(todo.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editMode ? "할 일 수정" : "새 할 일 추가"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="title" className="form-label">
                          제목 *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={currentTodo.title}
                          onChange={handleInputChange}
                          required
                          minLength="3"
                          maxLength="50"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="category" className="form-label">
                          카테고리 *
                        </label>
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                          value={currentTodo.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">선택하세요</option>
                          <option value="업무">업무</option>
                          <option value="개인">개인</option>
                          <option value="공부">공부</option>
                          <option value="기타">기타</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        설명
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="2"
                        value={currentTodo.description || ""}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="priority" className="form-label">
                          우선순위 *
                        </label>
                        <select
                          className="form-select"
                          id="priority"
                          name="priority"
                          value={currentTodo.priority}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">선택하세요</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="status" className="form-label">
                          상태 *
                        </label>
                        <select
                          className="form-select"
                          id="status"
                          name="status"
                          value={currentTodo.status}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">선택하세요</option>
                          <option value="대기중">대기중</option>
                          <option value="진행중">진행중</option>
                          <option value="완료">완료</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="dueDate" className="form-label">
                          마감일 *
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="dueDate"
                          name="dueDate"
                          value={currentTodo.dueDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      취소
                    </button>
                    <button type="submit" className="btn btn-dark">
                      {editMode ? "수정하기" : "추가하기"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}
    </div>
  );
};

export default ShowList;
