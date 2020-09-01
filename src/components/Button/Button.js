import React from "react";

import "./Button.css";

const Button = ({ className, children, ...buttonProps }) => (
  <button className={`custom-button ${className}`} {...buttonProps}>
    {children}
  </button>
);

export default Button;
