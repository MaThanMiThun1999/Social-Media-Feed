export const Input = ({
  icon: Icon,
  classNames = 'relative mb-6',
  classNamesForInputTag = 'h-10 pl-10 w-full',
  ...props
}) => {
  return (
    <div className={`relative mb-6 ${classNames}`}>
      
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-text-subdued" />
      </div>
      <input
        className={`block text-dark-text rounded-md border border-dark-background bg-black placeholder-shown:pl-10 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-dark-primary focus:ring-offset-1 duration-fast focus:ring-offset-dark-primary ${classNamesForInputTag}`}
        {...props}
      />
    </div>
  );
};
export default Input;
