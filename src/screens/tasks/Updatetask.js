import React, {useEffect, useState } from 'react'
import './Tasks.css'
import axios from 'axios'

import { BASE_URL } from '../../util';
import { useNavigate, useParams } from 'react-router-dom';

function Updatetask() {

// const [task, setTask] = useState('');
// const [description, setDescription] = useState('');
// const [startingDate, setStartingDate] = useState();
// const [finalDate, setFinalDate] = useState();
// const [timeTaking, setTimeTaking] = useState(0);
// const [timeForm, setTimeForm] = useState('hr')
const [formData, setFormData] = useState([])

const navigate = useNavigate()
const {id} = useParams()

    useEffect(()=>{
    const getTask = async()=>{
        const {data} = await axios.get(`${BASE_URL}/api/task/${id}`)
    setFormData(data)
     console.log(new Date(data.startingDate).getSeconds())
    }
    getTask()
    }
    ,[id])

const updateDatas = async(e)=>{
 e.preventDefault()
try{

const {data} = await axios.put(`${BASE_URL}/api/task/${formData._id}`,
formData
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
        <form onSubmit={updateDatas}>
            <label>
                Your Task
                <input type='text' name='task' placeholder='task' value={formData.task}  onChange={(e)=>setFormData({...formData, task:e.target.value})}/>
            </label>
            <label>
            Task Description
                 <input type='text' name='description' placeholder='description' value={formData.description}  onChange={(e)=>setFormData({...formData,description:e.target.value})} />
            </label>
            <label>
                Start Task
                <input type='datetime-local' name='startDate' value={formData.startingDate}  onChange={(e)=>setFormData({...formData,startingDate:e.target.value})}/>
            </label>
            <label>
                 due Time
            <input type='datetime-local' name='finalDate' value={formData.finalDate}  onChange={(e)=>setFormData({...formData,finalDate:e.target.value})} />
            </label>
            <label>
                Time Taking
                <input type='number' name='timeTaking' placeholder='time' value={formData.timeTaking}  onChange={(e)=>setFormData({...formData,timeTaking:e.target.value})} />
            </label>
            {/* <select onChange={(e)=>setTimeForm(e.target.value)}>
            <option>hr</option>
            <option>min</option>
            </select> */}
            <button type='button' onClick={(e)=>updateDatas(e)}>Update Your Task</button>
        </form>
    </div>
  )
}

export default Updatetask