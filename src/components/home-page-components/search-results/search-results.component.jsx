import { useContext } from "react"

import TrackList from "../../reusable-components/track-list/track-list.component"
import Spinner from "../../reusable-components/spinner/spinner.component"

import { TrackContext } from "../../../contexts/track.context"
import { useMediaQuery } from '../../../utils/customHooks'
import { SearchResultsContainer } from "./search-results.styles"

const SearchResults = () => {
    const { searchResults, searchLoading } = useContext(TrackContext)
    const isMobile = useMediaQuery('(max-width: 1020px)')
    return (
        <SearchResultsContainer isMobile={isMobile} >
            <h2 >Search Results</h2>
            <Spinner loading={searchLoading} />
            <TrackList tracks={searchResults} trackType={'search-results'} />
        </SearchResultsContainer>
    )
}

export default SearchResults