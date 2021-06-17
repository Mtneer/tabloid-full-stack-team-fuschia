

export const TagDropdown = () => {

    if (showOptions && userInput) {
        if (filteredOptions.length) {
          optionList = (
            <ul className="options">
              {filteredOptions.map((optionName, index) => {
                let className;
                if (index === activeOption) {
                  className = 'option-active';
                }
                return (
                  <li className={className} key={optionName} onClick={onClick}>
                    {optionName}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          optionList = (
            <div className="no-options">
              <em>No Option!</em>
            </div>
          );
        }
      }
}