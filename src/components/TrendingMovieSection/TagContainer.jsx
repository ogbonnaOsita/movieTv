/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Tags from "./Tags";
import { v4 as uuidv4 } from "uuid";

const TagContainer = (props) => {
  const { tagNames, handleFilter, storageKey } = props;

  // const handleStoreFilter = (id) => {
  //   const queryfilters = [];
  //   queryfilters.push(id);
  //   localStorage.setItem(storageKey, JSON.stringify(queryfilters));
  //   // localStorage.tags = JSON.stringify(queryfilters);
  // };

  return (
    <div className="tags flex flex-wrap gap-5 justify-center">
      {tagNames.map((tagName) => (
        <Tags
          key={uuidv4()}
          tagName={tagName}
          handleFilter={handleFilter}
          // storeFilter={handleStoreFilter}
        />
      ))}
    </div>
  );
};

export default TagContainer;
