import Alert from "react-bootstrap/Alert";

function PopUp(props) {
  return (
    <>
      <Alert key={props.variant} variant={props.variant}>
        {props.message}
      </Alert>
    </>
  );
}

export default PopUp;
