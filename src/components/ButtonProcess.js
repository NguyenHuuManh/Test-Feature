import React, { useState } from "react";
const ButtonProcess = (props) => {
  const { clickStart, process } = props;

  return (
    <div>
      <button onClick={clickStart} id="btn">
        {process}
      </button>
    </div>
  );
};

export default ButtonProcess;
