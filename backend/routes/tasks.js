var express = require('express');
var router = express.Router();
const fs = require('fs');
const fileName = 'Tasks.json';
const jsonParser = express.json();
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

express().use(jsonParser)

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Fetch all the data
// Get request
router.get('/', function (req, res) {
  res.send(data);
});

// Fetch single event data
// get Request
router.get('/:id', function (req, res) {
  const found = data.filter(task => task.Task_id==req.params.id)
  res.send(found[0])
  res.end()
});

// Post request
// Add a new task to data
router.post('/', (request, response) => {
  var len = data.length;
  console.log(request.body)
  const found = data.filter(tasks => tasks.Task == request.body.Task)
    if(found.length){
    return response.status(400).json({
      message:'Already exists'
    })
  }

  const ids = data.map(tasks => tasks.Task_id)
  let maxID = Math.max(...ids)
  console.log("maxID")
  console.log(maxID)
  if(maxID===-Infinity)
    maxID = 0
  console.log(maxID)
  let info = request.body;
  info.Task_id = maxID+1
  data.push(info);
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  response.end();
});

// Delete Request
// Delete Task

router.delete('/:id', function (req, res) {
  const found = data.filter(tasks => tasks.Task_id == req.params.id)[0]
  console.log(found)
  try{
    // delete data[req.params.id]
    data = data.filter((task) => task != found)
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    res.status(200).json({
      message:'Task deleted'
    })

  }
  catch{
    console.log("Unable to delete")
  }
});

//Put Request
// Update a sub task
 
router.put('/:id/:subTask', (req, res) => {
  console.log(req.params)
  const {id,subTask} = req.params
  console.log(parseInt(id))
  console.log(parseInt(subTask))
  // const id = req.params.id
  // const values = id.split("");
  // const task = parseInt(values[0])
  // const subTask = parseInt(values[1])
  const found = data.filter(taskID => taskID.Task_id==id)
  data.forEach(task => {
    if(task==found[0]){
      console.log("FOUND THE TASK")
      console.log(task.SubTask[subTask].done)
      task.SubTask[subTask].done = !task.SubTask[subTask].done
      fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    }
  });
  res.end()
});

module.exports = router;
