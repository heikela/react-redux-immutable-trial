import React from 'react';
import { connect } from 'react-redux';

const Button = ({action, children, dispatch}) => {
  return (<button onClick={() => dispatch(action)} >
    {children}
  </button>
  );
};

export default connect()(Button); // adds dispatch to props
