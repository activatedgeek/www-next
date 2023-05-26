import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"

const Rating = ({ value }) => {
  const rating = Math.floor(value)
  return (
    <div className="block overflow-hidden">
      {Array.apply(0, Array(rating)).map((_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
      ))}
      {value > rating ? (
        <FontAwesomeIcon icon={faStarHalf} className="text-yellow-400" />
      ) : null}
    </div>
  )
}

export default Rating
