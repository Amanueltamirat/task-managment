import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { BASE_URL } from '../../util'
import { useNavigate } from 'react-router-dom'
function Tasklist() {

const [tasks, setTsks] = useState([])
const [timeForm, setTimeForm] = useState('hr')

const navigate = useNavigate()
useEffect(()=>{
   const getTaskData = async()=>{
     const {data} = await axios.get(`${BASE_URL}/api/task/gettasks`)
    setTsks(data)
   }
   getTaskData();
},[])

if('Notification' in window){
  Notification.requestPermission().then(function(pemission){
    if(Notification.permission !== 'granted'){
      alert('Please allow notification access!');
      window.location.reload()
    }
  })
}

  return (
     <div className='tasklist'>
        {tasks?.map((task)=>(
            <div key={task._id} onClick={()=>navigate(`/yourtask/${task._id}`)} >
                <h2>{task.task}</h2>
                <p>{task.description}</p>
                <div>
                <p><strong>Start at:</strong> {moment(task.startingDate).utc().format('YYYY-MM-DD')}</p>
                <p><strong>Final date:</strong> {moment(task.finalDate).utc().format('YYYY-MM-DD')}</p>
                </div>
                <p>{task.timeTaking}</p>
            </div>
        ))}

        </div>
  )
}

export default Tasklist