// 이벤트 함수에 parameter가 없는 경우
function HelloBtn() {
  const message = () => {
    alert("Hello World!!!");
  }

  return (
    <button onClick={message}>Click Me</button>
  );
}

export default HelloBtn;
