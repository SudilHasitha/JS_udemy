export default function Button({ children, textOnly, className, ...props }) {
    const cssClass = textOnly ? 'text-button' : 'button';
    className = className ? `${cssClass} ${className}` : cssClass;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}