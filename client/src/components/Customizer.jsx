import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
//color-picker
import { SketchPicker } from "react-color";

const Customizer = () => {
  const [color, setColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--primary-color"
    )
  );
  const [open, setOpen] = useState(false);
  const pickerStyle = {
    default: {
      picker: {
        borderRadius: "4px 4px 0px 0px",
      },
    },
  };
  console.log(color);
  console.log(typeof color);

  const handleSubmit = (e) => {
    e.stopPropagation();

    setOpen(false);
    document.documentElement.style.setProperty("--primary-color", color);
    sessionStorage.setItem(
      "customCode",
      JSON.stringify({ primaryColor: color })
    );
  };

  useEffect(() => {
    const customCode = JSON.parse(sessionStorage.getItem("customCode"));
    if (customCode && customCode.primaryColor !== null) {
      let storedValue = customCode.primaryColor;
      setColor(storedValue);
      document.documentElement.style.setProperty(
        "--primary-color",
        storedValue
      );
    }
  }, []);

  return (
    <Draggable>
      <div id="customizer">
        <div
          style={{
            backgroundColor: `${color}`,
          }}
          onClick={() => setOpen(true)}
          className="colorDiv"
        >
          {open && (
            <div className="sketchPickerClass">
              <SketchPicker
                styles={pickerStyle}
                color={color}
                onChange={(updatedColor) => setColor(updatedColor.hex)}
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default Customizer;
