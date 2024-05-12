import React from "react";
import BudPopUp from "@/src/components/BudPopUp/BudPopUp";

const Index = () => {
  return (
    <>
      <BudPopUp
        isOpen={true}
        pupUpType="page"
        title="Example Title"
        backgroundColor="white"
        buttonsChildren={
          <>
            <button>Close</button>
            <button>Close</button>
            <button>Close</button>
          </>
        }
      >
        <p>This is the content of the PopUp.</p>
      </BudPopUp>
    </>
  );
};

export default Index;
