import { Component } from 'react';

class ErrorFallback extends Component {
  render() {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <h1>Something went wrong.</h1>
      </div>
    );
  }
}

export default ErrorFallback;
