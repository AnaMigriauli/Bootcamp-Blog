import PropTypes from "prop-types";
const Button = ({ children, className, onClick, disabled = true, type }) => {
  const buttonStyle = {
    backgroundColor: !disabled ? "var(--pale-purple)" : "var(--purple)",
  };
  return (
    <button
      disabled={!disabled}
      style={buttonStyle}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
export default Button;
