import React, {useState } from 'react'
import './Tasks.css'
import axios from 'axios'

import { BASE_URL } from '../../util';
import { useNavigate } from 'react-router-dom';
function Tasks() {

const [task, setTask] = useState('');
const [description, setDescription] = useState('');
const [startingDate, setStartingDate] = useState();
const [finalDate, setFinalDate] = useState();
const [timeTaking, setTimeTaking] = useState(0);
const [timeForm, setTimeForm] = useState('hr')

const navigate = useNavigate()

const inputDatas = async(e)=>{
 e.preventDefault()
    const datas = {
     task,
     description,
     startingDate,
     finalDate,
     timeTaking
    }
try{

const {data} = await axios.post(`${BASE_URL}/api/task/createtask`,
datas
,{
     headers: {
   'Content-Type': 'application/json',
  },
})

// window.location.reload()   
navigate('/yourtasks')
} catch(err){
    console.log(err);
}
}

  return (
    <div className='tasks'>
        <form onSubmit={inputDatas}>
            <label>
                Your Task
                <input type='text' name='task' placeholder='task' value={task}  onChange={(e)=>setTask(e.target.value)}/>
            </label>
            <label>
            Task Description
                 <input type='text' name='description' placeholder='description' value={description}  onChange={(e)=>setDescription(e.target.value)} />
            </label>
            <label>
                Start Task
                <input type='datetime-local' name='startDate' value={startingDate}  onChange={(e)=>setStartingDate(e.target.value)}/>
            </label>
            <label>
                 due Time
            <input type='datetime-local' name='finalDate' value={finalDate}  onChange={(e)=>setFinalDate(e.target.value)} />
            </label>
            <label>
                Time Taking
                <input type='number' name='timeTaking' placeholder='time' value={timeTaking}  onChange={(e)=>setTimeTaking(e.target.value)} />
            </label>
            {/* <select onChange={(e)=>setTimeForm(e.target.value)}>
            <option>hr</option>
            <option>min</option>
            </select> */}
            <button type='button' onClick={(e)=>inputDatas(e)}>Save Your Task</button>
        </form>
    </div>
  )
}

export default Tasks