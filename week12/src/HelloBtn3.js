// 이벤트 함수에 event object 사용
function HelloBtn3() {
  const message = (name, event) => {
    alert("[" + event.target.id + "] Hello " + name + " !!!");
  }

  return (
    <button id="btn1" onClick={(e) => {message("Sally", e)}}>Click Me</button>
  );
}

export default HelloBtn3;
