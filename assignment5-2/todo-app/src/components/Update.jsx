import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'https://69180c9021a96359486e99d3.mockapi.io/todos';

const Update = () => {
  const { id } = useParams();
  const formRef = useRef(null);

  // useState로 폼 데이터 관리
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    status: '',
    dueDate: ''
  });

  // useState로 수정 횟수 관리
  const [editCount, setEditCount] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data));
  }, [id]);

  // onChange 시 즉시 PUT 호출 (과제 필수 요구사항)
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);

    // useRef로 유효성 체크
    if (!newData.title || !newData.category || !newData.dueDate) {
      return; // 필수 필드 비어있으면 저장 안함
    }

    // PUT 요청으로 즉시 API 반영
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });

    // 수정 횟수 증가
    setEditCount(prev => prev + 1);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>할 일 수정</h2>
        <span className="badge bg-info">수정 횟수: {editCount}회</span>
      </div>

      <div className="alert alert-info">
        입력 시 자동 저장됩니다. (총 {editCount}회 수정)
      </div>

      <form ref={formRef}>
        <div className="mb-3">
          <label className="form-label">제목 *</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">설명</label>
          <textarea className="form-control" name="description" value={formData.description || ''} onChange={handleChange}></textarea>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">카테고리 *</label>
            <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
              <option value="">선택</option>
              <option value="업무">업무</option>
              <option value="개인">개인</option>
              <option value="공부">공부</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label">우선순위</label>
            <select className="form-select" name="priority" value={formData.priority} onChange={handleChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label">상태</label>
            <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
              <option value="대기중">대기중</option>
              <option value="진행중">진행중</option>
              <option value="완료">완료</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">마감일 *</label>
          <input type="date" className="form-control" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        </div>
        <Link to="/list" className="btn btn-secondary me-2">목록</Link>
        <Link to={`/detail/${id}`} className="btn btn-dark">상세보기</Link>
      </form>
    </div>
  );
};

export default Update;
