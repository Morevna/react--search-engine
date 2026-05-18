import { Component } from 'react';

interface State {
  hasError: boolean;
}

class TestErrorButton extends Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  handleClick = (): void => {
    this.setState({
      hasError: true,
    });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test Error');
    }

    return (
      <button
        onClick={this.handleClick}
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '20px',
          padding: '12px 16px',
          border: 'none',
          borderRadius: '8px',
          background: 'crimson',
          color: 'white',
          cursor: 'pointer',
          zIndex: 9999,
        }}
      >
        Test Error
      </button>
    );
  }
}

export default TestErrorButton;
