import styles from '../styles/InterventionList.css';
import InterventionCard from './InterventionCard'

const MyComponent = ({ appointments }) => {
  return (
    <div className={"grid-container"}>
      {appointments.map(appointment => (
        <div className={"grid-item"} key={appointment.id}>
          <InterventionCard appointment={appointment} />
        </div>
      ))}
    </div>
  )
}

export default MyComponent