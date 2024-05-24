import React from "react";


function Container({children}) {

    //Container is a wrapper component that will wrap around the children components
  return (
    <div className="w-full max-w-7xl mx-auto px-4" >
       {children}
    </div>
  );
}

export default Container;