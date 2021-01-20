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

})();

// 添加新任务
function addNewTask (taskName) {
  class Task {
    constructor({ name, message, starttime, deadline }) {
      this.id = new Date().getTime()
      this.name = name
      this.finished = 10 * Math.random() < 5 ? false : true
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
  let taskslist = JSON.parse(localStorage.getItem('tasks'))
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
    let str = `
    <li>
      <input class="check-input" type="checkbox">
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
    let str = `
    <li>
    <input class="check-input" type="checkbox" checked="checked">
    <span class=" title">${title}</span>
    <span class="time">${starttime || ''}</span>
    <button class="btn-del">删除</button>
  </li>
  `
    templateFinish += str
  })
  finishedDom.innerHTML = templateFinish
}