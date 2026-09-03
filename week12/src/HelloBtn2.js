// 이벤트 함수에 parameter가 있는 경우
function HelloBtn2() {
  const message = (name) => {
    alert("Hello " + name + " !!!");
  }

  return (
    <button onClick={() => {message("Sally")}}>Click Me</button>
  );
}

export default HelloBtn2;
