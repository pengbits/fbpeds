export const ErrorMessage = (error) => {
  return (
  <div className="error" data-testid="error-message">
    <h4>An Error occurred</h4>
    <p>{error.message}</p>
  </div>
  )
}