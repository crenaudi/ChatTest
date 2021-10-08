import './mentions.style.scss'

export function Entry(props) {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line @typescript-eslint/no-unused-vars
    isFocused, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <div className="mentionSuggestionsEntryContainer">
        <div className="mentionSuggestionsEntryContainerLeft">
          <img
            src={mention.avatar}
            className="mentionSuggestionsEntryAvatar"
            role="presentation"
          />
        </div>

        <div className="mentionSuggestionsEntryContainerRight">
          <div className="mentionSuggestionsEntryText">
            {mention.name}
          </div>

          <div className="mentionSuggestionsEntryTitle">
            {mention.title}
          </div>
        </div>
      </div>
    </div>
  );
}