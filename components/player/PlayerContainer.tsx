import { usePlayer } from 'lib/hooks/use-player'
import FullPlayerSkeleton from './FullPlayerSkeleton'
import Queue from './Queue'
import FullPlayer from './FullPlayer'
import { MouseEvent, useState } from 'react'
import IconButton from 'components/ui/IconButton'
import ChevronDown from 'components/icons/ChevronDown'
import PlaylistPlay from 'components/icons/PlaylistPlay'

const PlayerContainer = ({
  onClick,
}: {
  onClick?: (event?: MouseEvent) => void
}) => {
  const { current } = usePlayer()

  const [showPlaylist, setShowPlaylist] = useState(false)

  if (!current) return <FullPlayerSkeleton />

  return (
    <>
      {onClick && (
        <div className="close-button" aria-label="Minimize Player">
          <IconButton
            onClick={onClick}
            ariaLabel="Minimize player"
            variant="secondary"
          >
            <ChevronDown fill="var(--secondary)" width="32" height="32" />
          </IconButton>
        </div>
      )}

      <button onClick={() => setShowPlaylist(!showPlaylist)}>
        {!showPlaylist ? (
          <div className="queue-button">
            Playing next
            <span>
              <PlaylistPlay />
            </span>
          </div>
        ) : (
          <div className="queue-button now-playing">
            Queue
            <span>
              <ChevronDown />
            </span>
          </div>
        )}
      </button>

      {!showPlaylist ? <FullPlayer /> : <Queue />}

      <style jsx>{`
        .close-button {
          z-index: 22;
          position: absolute;
          left: 1rem;
          top: 1.5rem;
        }
        .queue-button {
          z-index: 21;
          position: absolute;
          top: auto;
          bottom: 1rem;
          left: 3rem;
          right: 3rem;
          color: white;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          padding: 1rem 0 0.5rem;
          margin: 0;
          border-top: 1px solid var(--primary-80);
          transition: transform 0.1s;
        }
        .queue-button:hover {
          transform: scale(1.025);
        }
        .now-playing {
          border: none;
          bottom: auto;
          top: 1.5rem;
          left: 30%;
          right: 30%;
        }
        @media screen and (display-mode: standalone) {
          .queue-button {
            bottom: 2rem;
          }
        }
      `}</style>
    </>
  )
}

export default PlayerContainer