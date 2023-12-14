import * as React from "react";
import useDismiss from "./hooks/useDismiss";
import { Search } from "./Search";
import { SearchResults } from "./SearchResults";
import { MovieTileProps } from "./models/proptypes";

export interface SearchExtensionProps {
  MovieTile?: React.FC<MovieTileProps>;
}

const SearchExtension: React.FC<SearchExtensionProps> = ({ MovieTile }) => {
  const [searchUrl, setSearchUrl] = React.useState("");
  const [resultsVisible, setResultsVisible] = React.useState(false);
  const wrapperRef = React.useRef(null);

  useDismiss(() => setResultsVisible(false), wrapperRef);

  const performSearch = React.useCallback((url: string) => {
    setSearchUrl(url);
    setResultsVisible(!!url);
  }, []);

  return (
    <div ref={wrapperRef} className="search-container">
      <Search onSearchChange={performSearch} />
      {resultsVisible && (
        <SearchResults searchUrl={searchUrl} MovieTile={MovieTile} />
      )}
    </div>
  );
};

export default SearchExtension;
