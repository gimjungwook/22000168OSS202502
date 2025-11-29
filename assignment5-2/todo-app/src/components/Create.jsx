import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'https://69180c9021a96359486e99d3.mockapi.io/todos';

const Create = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  // useState로 폼 데이터 관리
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    status: '대기중',
    dueDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // useRef로 유효성 체크
    if (!formData.title || !formData.category || !formData.dueDate) {
      alert('제목, 카테고리, 마감일은 필수입니다.');
      return;
    }

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert('추가되었습니다!');
    navigate('/list');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">새 할 일 추가</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">제목 *</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">설명</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
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
        <Link to="/list" className="btn btn-secondary me-2">취소</Link>
        <button type="submit" className="btn btn-dark">추가</button>
      </form>
    </div>
  );
};

export default Create;
