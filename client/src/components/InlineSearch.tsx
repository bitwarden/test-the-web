import { useRef, useState, ChangeEvent } from "react";
import styled from "@emotion/styled";

type SearchResult = {
  color: string;
  name: string;
};

export function InlineSearch() {
  const [searchResults, setSearchResults] = useState(null);

  async function handleSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target?.value) {
      const response = await fetch("/search", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({ returnType: "json", q: event.target.value }),
      });

      if (!response.ok) {
        return;
      }

      const responseData = (await response.json()).data;

      setSearchResults(responseData);
    }

    return;
  }

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  function debouncedHandleSearchInputChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      handleSearchInputChange(event);
    }, 500);
  }

  function clearResults(): void {
    setSearchResults(null);
  }

  return (
    <>
      <SearchInput onChange={debouncedHandleSearchInputChange} />
      {searchResults && (
        <SearchResultsDropdown
          handleSelection={clearResults}
          searchResults={searchResults}
        />
      )}
    </>
  );
}

export function SearchInput({
  onChange,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      autoComplete="off"
      autoCorrect="off"
      className="col col--6"
      id="search"
      name="search"
      onChange={onChange}
      placeholder="e.g. 'cats playing keyboards'"
      required
      type="text"
    />
  );
}

export function SearchResultsDropdown({
  searchResults,
  handleSelection,
}: {
  searchResults: SearchResult[];
  handleSelection: () => void;
}) {
  const resultsCount = searchResults.length;

  return (
    <DropdownContainer>
      {resultsCount ? (
        searchResults.map(({ name, color }) => (
          <DropdownContainerRow tabIndex={0} onClick={handleSelection}>
            {color && <ColorCircle color={color} />}
            {name && <div>{name}</div>}
          </DropdownContainerRow>
        ))
      ) : (
        <DropdownContainerRow hasResults={false}>
          No results were found
        </DropdownContainerRow>
      )}
    </DropdownContainer>
  );
}

const ColorCircle = styled.div<{ color: string }>`
  border: 1px solid #eee;
  border-radius: 0.5rem;
  background-color: ${({ color }) => color};
  width: 1rem;
  height: 1rem;
`;

const DropdownContainerRow = styled.div<{ hasResults?: boolean }>`
  user-select: none;
  display: flex;
  flex-flow: row;
  align-items: center;
  border-radius: 0.25rem;
  padding: 2px 4px;
  font-size: 0.9rem;

  ${({ hasResults = true }) =>
    hasResults
      ? `
      cursor: pointer;

      :hover {
        background-color: lightslategray;
      }
    `
      : ""}

  ${ColorCircle} {
    margin-right: 4px;
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  margin-top: 4px;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: var(--ifm-pagination-nav-border-radius);
  background-color: var(--ifm-color-emphasis-100);
  padding: var(--ifm-navbar-item-padding-vertical)
    var(--ifm-navbar-item-padding-horizontal);
  min-width: 300px;
  max-width: max-content;
  max-height: 330px;
  overflow-y: auto;
  line-height: 1.5;
  color: var(--docsearch-text-color);
`;
