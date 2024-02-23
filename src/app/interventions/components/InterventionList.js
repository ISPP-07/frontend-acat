import styles from '../styles/InterventionList.css';
import InterventionCard from './InterventionCard'

const MyComponent = ({ interventions }) => {
  return (
    <div className={"grid-container"}>
      {interventions.map(intervention => (
        <div className={"grid-item"} key={intervention.id}>
          <InterventionCard appointment={intervention} />
        </div>
      ))}
    </div>
  )
}

export default MyComponent