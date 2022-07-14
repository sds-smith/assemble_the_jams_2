import { useContext } from 'react'

import TrackList from '../../reusable-components/track-list/track-list.component'
import Spinner from '../../reusable-components/spinner/spinner.component'

import { TrackContext } from '../../../contexts/track.context'
import { RecommendationsContainer } from './recommendations.styles'

const Recommendations = ({ onAdd, onPlay }) => {
        const { recommendations, searchLoading } = useContext(TrackContext)

        return (
            <RecommendationsContainer>
              <h2>Recommendations</h2>
              <Spinner loading={searchLoading} />
              <TrackList 
                 tracks={recommendations} 
                 onAdd={onAdd}
                 onPlay={onPlay}
                 trackType={'recommendations'}/> 
            </RecommendationsContainer>
        )
}

export default Recommendations