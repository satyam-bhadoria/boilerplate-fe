function RoundedBox(props) {
  return (
    <div className={`${props.className} shadow rounded-4 m-2 p-3`}>
      {props.children}
    </div>
  );
}

export default RoundedBox;
