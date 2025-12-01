export const MainContentBody = ({ children, padding }) => (
  <div
    id="main-content-body"
    className={`${padding ? padding : "px-[2.074rem]"} my-[0.074rem]`}
  >
    {children}
  </div>
);

export const MainContentFooter = ({ children }) => (
  <div id="main-content-footer" className="px-[2.074rem] my-[0.833rem]">
    {children}
  </div>
);
