import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Button, List, Skeleton, Card, Progress } from 'antd';
import axios from 'axios';
import { red, green, yellow, orange } from '@ant-design/colors';

const TaskInfo = () => {
  const location = useLocation()
  const path = location.pathname.split('/')[1];
  const fakeDataUrl = 'http://localhost:4000/api/tasks/' + path;
  const [initLoading, setInitLoading] = useState(true);
  const [count,setCount] = useState(null)
  const [size,setSize] = useState(null)
  const [progress,setProgress] = useState(null)
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setList(res.SubTask);
        setData(res)
        let num = 0
        const subs = res.SubTask
        subs.forEach(element => {
            if(element.done){
                num++;
            }
        });
        setCount(num)
        setSize(subs.length)
        const prog = ((count/size)*100).toFixed(2)
        setProgress(prog)
      });
  }, [list]);

  const changeState = async (id) =>{
    console.log(id)
    // const response = await axios.put(fakeDataUrl + id)
    const response = await axios.put(`http://localhost:4000/api/tasks/${path}/${id}`)
  }

  const calculateProgress = (num) =>{
    if(num==='0.00'){
        return 'Not started'
    }
    if(num==='100.00'){
        return 'Completed'
    }
    else{
        return 'In Progress'
    }
  }


return (
    <div>
        <h1>{data.Task}</h1>
      
  <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item,index) => (
        <List.Item
        actions={[item.done? <Button onClick={() => changeState(index)}>Set as Incomplete</Button>:<Button onClick={() => changeState(index)}>Set as done</Button>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.sub_task}</a>}
              description={index+1}
            />
            <div className='textprog'>{item.done? 'Done':'Not done yet'}</div>
          </Skeleton>
        </List.Item>
      )}
    />
    <Card
      title="Progress"
      loading={initLoading}
      style={{
        width: 900,
      }}
    >
        <p>Number of tasks done {count}</p>
        <p>Percentage completed {progress}%</p>
    <Progress strokeWidth={50} percent={progress} steps={50} strokeColor={[red[6],red[6], red[6],red[6],red[6],red[6], red[5],red[5],red[5], red[4], red[4], red[4],red[4],orange[5],orange[5], orange[5],orange[5],orange[5], orange[5],orange[5],orange[4],orange[4],orange[4],orange[4],orange[4], yellow[5],yellow[5],yellow[5],yellow[5],yellow[5],yellow[5], yellow[4],yellow[4],yellow[4],yellow[4],yellow[4], yellow[4],green[4],green[4],green[4],green[4], green[5],green[5],green[5],green[5], green[6], green[6],green[6],green[6],green[6]]} />

    <p>Status: {calculateProgress(progress)}</p>
    </Card>
    </div>
    
  );
};
export default TaskInfo;