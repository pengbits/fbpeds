export const ErrorMessage = ({error}) => {
  return (
  <div className="error" data-testid="error-message">
    <h4  className="error__title">An Error Occurred:</h4>
    <p className="error__message">{error.message}</p>
  </div>
  )
}