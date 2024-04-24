import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../util'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function TaskDetail() {

const [task, setTask] = useState([])
const [show, setShow] = useState(false)

const {id} = useParams()
const navigate = useNavigate()


 useEffect(()=>{
    try{
    const getTask = async()=>{
        const {data} = await axios.get(`${BASE_URL}/api/task/${id}`)
        setTask(data)
    }
    getTask()
    } catch(err){
        console.log(err)
    }
 },[])

const handleDelete = async()=>{
  try{
    await axios.delete(`${BASE_URL}/api/task/${id}`)
    navigate('/yourtasks')
    } catch(err){
        console.log(err)
    }
  }
  let startingDate =new Date(task.startingDate);
let finalDate = new Date(task.finalDate)
let timeDifference = finalDate - startingDate
console.log(timeDifference/(360 * 12 * 24))

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dayFomat(date){
 return  `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}  ${date.getFullYear()} ${date.toTimeString().slice(0, 8)}`;
}

const startedAt =  dayFomat(startingDate)
const endAt = dayFomat(finalDate)


function notifyMe() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification('Hi there!', {
                body: 'How are you doing?',
                icon: 'https://bit.ly/2DYqRrh',
            });
            console.log(notify)
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification('Hi there!', {
                        body: 'How are you doing?',
                        // icon: 'https://bit.ly/2DYqRrh',
                    });
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}



  return (
    <div className='task-detail' onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
        <p><strong>Title:</strong>{task.task}</p>
        <p>Description:{task.description}</p>
        <p>Started at: {startedAt?startedAt:task.startingDate}</p>
        <p>End at: {endAt?endAt:task.finalDate}</p>
        <p>Taking time: {task.timeTaking}</p>
        <div className={`${show ? 'visible':'hidden'}`} >
            <button onClick={()=>handleDelete(task._id)}>Delete Task</button>
            <button className='see-analysis' onClick={()=>notifyMe()}>See Analysis</button>
            <button onClick={()=>navigate(`/editetask/${task._id}`)}>Edit Task</button>
        </div>

    </div>
  )
}

export default TaskDetail