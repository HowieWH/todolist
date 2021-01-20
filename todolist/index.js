;
(function () {
  const localStorage = window.localStorage

  class Task {
    constructor({ name, message, starttime, deadline }) {
      this.id = new Date().getTime()
      this.name = name
      this.message = message
      this.starttime = starttime
      this.deadline = deadline
    }
  }
  let task = new Task({
    name: '第一任务',
    message: '赶快搞完',
    starttime: '2021/01/22'
  })
  console.log(task);
  localStorage.setItem(task.id, JSON.stringify(task))
  // let finishedDom = document.querySelector("main finished-container")//已完成


})();
