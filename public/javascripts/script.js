var input = getById('input');
var list = getById('list');
var taskTemp = getById('taskTemp');

input.addEventListener("keydown", InputHandler);

var app = new Todo();
app.init();


function InputHandler(event) {
  if (event.keyCode == 13) {
    app.addTask(this.value);
    this.value = '';
  }
}

//Controller
function Todo() {
  var view = new View();
  var storage = new LocalStorage();
  
  this.tasks = [];
  this.addTask = addTask;
  this.removeTask = removeTask;
  this.update = update;
  this.init = init;
  
  function init() {
    this.tasks = storage.getTasks() || [];
    this.update();
  }
  function update() {
    storage.saveTasks(this.tasks);
    view.render(this);
  }
  function removeTask(task) {
    this.tasks = this.tasks.filter(function(t) {
      return t != task;
    });
    this.update();
  }

  function addTask(text) {
    var task = new Task();
    task.title = text;
    task.position = this.tasks.length;
    this.tasks.push(task);
    this.update();
  }

}

//Storage Controller
function LocalStorage() {
  this.saveTasks = function(tasks){
    localStorage.setItem('tasks',JSON.stringify(tasks));
  };
  
  this.getTasks = function(){
   var json = localStorage.getItem('tasks');
   if(json=="undefined" || !json) return;
   var obj = JSON.parse(localStorage.getItem('tasks'));
   

   var tasks = [];
   obj.forEach(function(info){
     var task = new Task();
     task.title=info.title;
     task.marked=info.marked;
     task.position=info.position;
     tasks.push(task);
   });
   return tasks;
  };
}

function View() {

  this.render = function(app) {
    list.innerHTML = "";
    var frag = document.createDocumentFragment();

    app.tasks.forEach(function(task) {

      var taskEle = document.createElement('div');
      taskEle.innerHTML = taskTemp.outerHTML;
      taskEle = taskEle.firstChild;
      
      taskEle.className = 'task';
      taskEle.dataset.position = task.position;
      var title = taskEle.getElementsByClassName('title')[0];
      var box = taskEle.getElementsByClassName('box')[0];
      var deleteBtn = taskEle.getElementsByClassName('delete')[0];

      taskEle.getElementsByClassName('title')[0].innerText = task.title;
      if (task.marked) {
        box.className += ' checked';
        taskEle.className += ' crossed';
      }
      
      //events
      deleteBtn.addEventListener('click', function() {
        app.removeTask(task);
      });
      title.addEventListener('click', function(){
        task.toggleCrossOut();
        app.update();
      });
      box.addEventListener('click', function(){
        task.toggleCrossOut();
        app.update();
      });
      
      frag.appendChild(taskEle);

    });
    
    if (app.tasks.length<1) {
      var msg = document.createElement('p');
      msg.className = 'msg';
      msg.innerText = "There are no Todo Items Right Now!";
      frag.appendChild(msg);
    }

    list.appendChild(frag);
  }
}

// Task model
function Task() {
  this.position = 0;
  this.title = 'none';
  this.marked = false;
}

Task.prototype.toggleCrossOut = function() {
  this.marked = !this.marked;
};



//helper methods
function getById(id) {
  return document.getElementById(id);
}
