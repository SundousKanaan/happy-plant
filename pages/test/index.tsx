import React from "react";
import BudPopUp from "@/src/components/BudPopUp/BudPopUp";
import Button from "@/src/components/Button/Button";

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
            <div style={{ width: "4rem", height: "4rem", display: "block" }}>
              <Button
                icon="Xsignal"
                text="Button test 1"
                color="transparent"
                onClick={() => console.log("button 1")}
              />
            </div>

            <div style={{ width: "4rem", height: "4rem", display: "block" }}>
              <Button
                icon="Xsignal"
                text="Button test"
                color="transparent"
                onClick={() => console.log("button 1")}
              />
            </div>
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
