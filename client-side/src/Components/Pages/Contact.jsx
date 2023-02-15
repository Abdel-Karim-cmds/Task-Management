import { MinusCircleOutlined, PlusOutlined,SmileOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select,DatePicker, notification, message} from 'antd';
import React from 'react';
import {useState} from 'react';
import dateFormat from 'dateformat'
const { RangePicker } = DatePicker;

function Contact() {
    const serverHost = 'http://localhost:4000/api';
    const[data,setData] = useState({});
    const [values, setValues] = useState({})
    const [form] = Form.useForm();
    // const [api, contextHolder] = notification.useNotification();
    // const openNotification = () => {
    //   api.open({
    //     message: 'Notification Title',
    //     description:
    //       'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    //     icon: (
    //       <SmileOutlined
    //         style={{
    //           color: '#108ee9',
    //         }}
    //       />
    //     ),
    //   });
    // };
    
    const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Task inserted successfully',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Task already exists',
    });
  };

    async function addStudent(formInfo,subTask){
      let subArray = subTask.sub_tasks
      let taskArray = []
      subArray.forEach(element => {
          const newTask = {
            sub_task:element,
            done:false
          }
          taskArray.push(newTask)
      });
      
      const updatedTasks ={
        SubTask: taskArray
      }

      const updatedData = {
        ...data,
        ...updatedTasks
      }

      const url = serverHost + '/tasks'
      const options = {
          method:'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
      }
      const response = await fetch(url,options)
      if(response.status === 200)
        // alert("Inserted")
        {
        success()
        form.resetFields();
      }

      if(response.status === 400)
        error()
      }



    const handleSelect = (e) =>{
        const selectedOption = {
            "Priority": e
        }
        const updatedData = {
            ...data,
            ...selectedOption
        }
        setData(updatedData)
    }

    const handleDate = (e) =>{
        const selectedDate = {
            "Start": dateFormat( e[0]._d, "fullDate"),
            "End": dateFormat( e[1]._d, "fullDate")
        }
        const updatedData ={
            ...data,
            ...selectedDate
        }
        setData(updatedData)
    }

    const onChangeHandler = (name, value) =>{
      let data = values;
      data[name] = value;
   
      setValues(data)
   }

    const handleChange = (e) =>{
        const value = e.target.value;
        const user_information = e.target.name;

        //Create an object for the current input field
        const currentInputFieldData = {
            [user_information]: value
        }

        //Merge the data object with the current input field data object
        const updatedData = {
            ...data,
            ...currentInputFieldData
        }
        setData(updatedData)
    }

  const onFinish = (val) => {

    addStudent(data,val)

  };

  return (
    <>
    {contextHolder}
    <Form  onFinish={onFinish} form={form}>

      <Form.Item label="Task name" required={true}>
        <Input onChange={handleChange} name="Task" />
      </Form.Item>
        
      <Form.List
        name="sub_tasks"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 3) {
                return Promise.reject(new Error('At least 3 Sub Tasks'));
              }
            },
          },
        ]}
      >              
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => ( 
              <Form.Item
                {...(index === 0 )}
                label={index === 0 ? '' : ''}
                required={false}
                key={field.key}
              >
                
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input a task or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="Sub Task" style={{ width: '95%', }} name={field} onChange={(e) => onChangeHandler(e.target.id, e.target.value)}/>
                </Form.Item>
                    {fields.length > 3 ? (
                    <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                    />
                    ) : null}
              </Form.Item>
              
            ))}

            <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add SubTasks
            </Button>
            <Form.Item label="Priority" style={{
                    marginTop:'10px',
                }} required={true}>
                <Select name="Priops" onChange={handleSelect}>
                    <Select.Option value="Low">Low</Select.Option>
                    <Select.Option value="Medium">Medium</Select.Option>
                    <Select.Option value="High">High</Select.Option>
                </Select>
            </Form.Item>
            
            <Form.Item label="Dates" required={true} >
                <RangePicker onChange={handleDate} name="Start_date" className='table-ant-header'/>
            </Form.Item>
            <Form.Item>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>

      </Form.Item>
    </Form>
    {/* <Button type="primary" onClick={openNotification}>
        Open the notification box
      </Button> */}
    </>
  );
};
export default Contact;