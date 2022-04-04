import styles from './errorhandler.module.scss';

interface Errors {
    message:string
}

function ErrorHandler({ message }:Errors) {
  const { errorContainer } = styles;
  return (
    <div className={errorContainer}>
      <h1>{message}</h1>
    </div>
  );
}

export default ErrorHandler;
