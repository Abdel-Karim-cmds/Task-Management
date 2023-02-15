
import React, { useState, useEffect } from 'react';
import {Table,Space, Button,Popconfirm,message} from 'antd'
// import qs from 'qs';
import '../Components/Pages/style.css';
function Cards(){
  
  const serverHost = 'http://localhost:4000/api';
  const [tasks, setTasks] = useState([]);

  const text = 'Are you sure to delete this task?';
  const confirm = () => {
    message.info('Clicked on Yes.');
  };

  const handleDelete = async(id) =>{
    fetch(serverHost + "/tasks/" + id, {
      method: 'DELETE',
    })
    .then(res => res.text())
    .then(res => console.log(res));
    
    getTask();
    // window.location.reload();
  }

  const columns = [
    {
      title:'ID',
      // render:(item, record, index)=>(<>{index+1}</>),
      key:'id',
      dataIndex:'Task_id',
      sorter: {
        compare: (a,b) => a.Task_id - b.Task_id
      },
    },
    {
      title: 'Task',
      dataIndex: 'Task',
      key: 'task',
      sorter: {
        compare: (a,b) => a.Task > b.Task
      },
    },
    {
      title: 'Priority',
      dataIndex: 'Priority',
      key: 'priority',
      onFilter: (value, record) => record.Priority.indexOf(value) === 0,
      filters: [
        { text: 'High', value: 'High' },
        { text: 'Medium', value: 'Medium' },
        { text: 'Low', value: 'Low' },
      ],
  
      sorter: {
        compare: (a,b) => a.Priority > b.Priority
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'Start',
      key: 'start',
      sorter: {
        compare: (a,b) => a.Start > b.Start
      },
    },
    {
      title: 'End Date',
      key: 'end',
      dataIndex: 'End',
      sorter: {
        compare: (a,b) => a.End > b.End
      },
    },
    {
      title: 'Action',
      key: 'action',
      
    render: (item,record,index) => (
      <Space size="middle">
        <Button href={`${record.Task_id}/taskInfo`}>More</Button>
        <Button onClick={()=>{handleDelete(record.Task_id)}}>Delete</Button>
      </Space>
    ),
    }
  ];

  async function getTask(){
    const response = await fetch(serverHost+'/tasks')
    const data = await response.json();
    setTasks(data)
    // console.log(tasks)
    }
  useEffect(() =>{
    
    getTask()
  },)

  

  return(
    <div>
      <Table 
      columns={columns} 
      dataSource={tasks}
      // pagination={tableParams.pagination}
      // onChange={handleTableChange}
      />
      
    <Popconfirm placement="bottom" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
        <Button>Bottom</Button>
      </Popconfirm>
    </div>

  )
}
export default Cards;