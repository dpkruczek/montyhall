import { useState } from 'react'
import { Door } from "./App.types"
import './App.css'

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}
function App() {
  const minNumberOfDoors = 3
  const maxNumberOfDoors = 999
  const minNumberOfSimulations = 1
  const maxNumberOfSimulations = 99
  const [numberOfDoors, setNumberOfDoors] = useState(3)
  const [numberOfSimulations, setNumberOfSimulations] = useState(20)
  const [doors, setDoors] = useState<Door[][]>([[]])

  const handleNumberOfDoorsChange = (value: number) => {
    if (!value) return setNumberOfDoors(minNumberOfDoors);
    else if (value < minNumberOfDoors) return setNumberOfDoors(minNumberOfDoors);
    else if (value > maxNumberOfDoors) return setNumberOfDoors(maxNumberOfDoors)
    setNumberOfDoors(value)
  }

  const handleNumberOfSimulationsChange = (value: number) => {
      console.log(value)
    if (!value) return setNumberOfSimulations(minNumberOfSimulations);
    else if (value < minNumberOfSimulations) return setNumberOfSimulations(minNumberOfDoors);
    else if (value > maxNumberOfSimulations) return setNumberOfSimulations(maxNumberOfDoors)
    setNumberOfSimulations(value)
  }

  const createDoors = () => {
      const doorsFromAllSimulations = []
      for(let i = 0; i < numberOfSimulations; i++) {
          const doorsFromOneSimulation = []
          const startDoor = getRandomInt(numberOfDoors)
          const doorWithPrize = getRandomInt(numberOfDoors)
          for(let j = 0; j < numberOfDoors; j++) {
              doorsFromOneSimulation.push({
                  startDoor: startDoor === j,
                  hasPrize: doorWithPrize === j
              })
          }
          doorsFromAllSimulations.push(doorsFromOneSimulation)
      }
      setDoors(doorsFromAllSimulations)
  }

  const renderDoors = () => {
      const simulatedDoors = <>
          {doors.map((doorRow: Door[]) => {
              return <div className="doorRow">{doorRow.map((door: Door) => {
                  return renderDoor(door)
              })}</div>
          })}
      </>
      return simulatedDoors
  }

  const renderDoor = (door: Door) => {
    const doorClassName = `door ${door.hasPrize ? "doorWithPrize" : ""} ${door.startDoor && "startDoor"}`;
    return <div className={doorClassName} />
  }

  return (
    <>
      <h1>Monty Hall</h1>
      <div className="card">
        <label>Number of doors</label><br/>
        <input type="number" value={numberOfDoors} onChange={event => handleNumberOfDoorsChange(parseInt(event.target.value))} /><br/><br/>
        <label>Number of doors to open</label><br/>
        <input type="number" value={numberOfDoors - 2} disabled /><br/><br/>
        <label>Number of simulations</label><br/>
        <input type="number" value={numberOfSimulations} onChange={event => handleNumberOfSimulationsChange(parseInt(event.target.value))} /><br/><br/>
        <button onClick={createDoors}>Simulate</button><br/><br/>
        {renderDoors()}
      </div>
    </>
  )
}

export default App
