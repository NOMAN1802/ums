import React from "react";

type PropType = {
  selected: boolean;
  image: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, image, onClick } = props;

  return (
    <div
      className={"w-full thumbs_event_image".concat(
        selected ? " thumbs_event_image--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="thumbs_event_image__number"
      >
        <img src={image} alt="" />
      </button>
    </div>
  );
};
