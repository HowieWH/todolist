;
(function () {
  updateTaskList()
  // 获取到添加框和按钮，添加新任务
  const addBtn = document.querySelector('.nav-btn')
  addBtn.addEventListener('click', function (e) {
    let inputTask = document.querySelector('.nav-input')
    addNewTask(inputTask.value)
    inputTask.value = ''
  })

  // 因为需要给未来加载的DOM添加点击事件，因此这里使用事件委托
  let mainDom = document.querySelector('main')
  mainDom.addEventListener('click', function (e) {

    // 点击checkbox时，切换任务完成状态.
    if (e.target.type === 'checkbox') {
      let clickTaskId = e.target.previousElementSibling.innerText
      let taskList = JSON.parse(localStorage.getItem('tasks'))
      taskList.forEach(item => {
        if (item.id == clickTaskId) {
          item.finished = !item.finished
        }
      })
      localStorage.setItem('tasks', JSON.stringify(taskList))
      updateTaskList()
    }
    // 点击删除按钮，删除任务
    else if (e.target.className === 'btn-del') {
      let clickTaskId = e.target.parentElement.children[0].innerText
      let taskList = JSON.parse(localStorage.getItem('tasks'))
      taskList.forEach((item, index) => {
        if (item.id == clickTaskId) {
          taskList.splice(index, 1)
        }
      })
      localStorage.setItem('tasks', JSON.stringify(taskList))
      updateTaskList()
    }
  })




})();

// 添加新任务
function addNewTask (taskName) {
  class Task {
    constructor({ name, message, starttime, deadline }) {
      this.id = (new Date().getTime()) + ''
      this.name = name
      this.finished = false
      this.message = message
      this.starttime = starttime
      this.deadline = deadline
    }
  }
  let task = new Task({
    name: taskName,
    message: '',
    starttime: new Date().toLocaleDateString()
  })
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  updateTaskList() // 刷新列表
}

// 重新渲染任务列表
function updateTaskList () {
  let taskslist = JSON.parse(localStorage.getItem('tasks')) || []
  let planlist = []
  let finishedlist = []
  taskslist.forEach(item => {
    if (item.finished) {
      finishedlist.push(item)
    } else {
      planlist.push(item)
    }
  })
  // 渲染计划列表
  let plansDom = document.querySelector('.plantasks')
  let templatePlan = ''
  planlist.forEach((item) => {
    let title = item.name
    let starttime = item.starttime
    let id = item.id
    let str = `
    <li>
      <span style="display:none">${id}</span>    
      <input class="check-input" type="checkbox" />
      <span class=" title">${title}</span>
      <span class="time">${starttime || ''}</span>
      <button class="btn-editor">编辑</button>
      <button class="btn-del">删除</button>
    </li>
  `
    templatePlan += str
  })
  plansDom.innerHTML = templatePlan

  // 渲染已完成列表
  let finishedDom = document.querySelector('.finishedtasks')
  let templateFinish = ''
  finishedlist.forEach((item) => {
    let title = item.name
    let starttime = item.starttime
    let id = item.id
    let str = `
    <li>
    <span style="display:none">${id}</span>
    <input class="check-input" type="checkbox" checked="checked">
    <span class=" title"><del>${title}</del></span>
    <span class="time">${starttime || ''}</span>
    <button class="btn-del">删除</button>
  </li>
  `
    templateFinish += str
  })
  finishedDom.innerHTML = templateFinish
}