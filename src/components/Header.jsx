/* eslint-disable react/prop-types */

const Header = ({ children }) => {
  return (
    <div className="w-screen  min-h-[10vh] h-fity px-[10%]y relative">
      {children}
    </div>
  );
};

export default Header;
