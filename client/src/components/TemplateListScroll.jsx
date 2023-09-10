import React from "react";

const TemplateListScroll = ({ pages }) => {
  const handleSelect = (event) => {
    const src = event.target.getAttribute("src");
    const type = event.target.getAttribute("name");
    const id = event.target.getAttribute("id");

    window.location.assign(
      `/templates/${type.toLowerCase()}?type=${type}&id=${id}&src=${src}`
    );
  };
  return (
    <div id="templateListScroll">
      {pages.map((page) => (
        <div
          id="templatelistd1"
          key={page.id}
          style={{
            height: `${page.type === "Footer" && "100%"}`,
          }}
        >
          <img
            src={page.src}
            name={page.type}
            id={page.id}
            onClick={handleSelect}
            alt={`${page.type} page image`}
          />
        </div>
      ))}
    </div>
  );
};

export default TemplateListScroll;
