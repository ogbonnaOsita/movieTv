export const buttonStyle = {
  width: "20px",
  background: "none",
  border: "0px",
  position: "relative",
};

export const btnStyle1 = {
  left: "0px",
};

export const btnStyle2 = {
  right: "0px",
};

export const properties = {
  prevArrow: (
    <button
      style={{ ...buttonStyle, ...btnStyle1 }}
      className="left-0 right-0 md:left-[50px]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button
      style={{ ...buttonStyle, ...btnStyle2 }}
      className="left-0 right-0 md:right-[50px]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
      </svg>
    </button>
  ),
};
