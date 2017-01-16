import React from 'react';
import { connect } from 'react-redux';

const Button = ({action, children, dispatch}) => {
  return (<button onClick={() => dispatch(action)} >
    {children}
  </button>
  );
};
Button.propTypes = {
  action: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired
  }).isRequired,
  dispatch: React.PropTypes.func.isRequired
};

export default connect()(Button); // adds dispatch to props
