describe("Tasks", function() {

  beforeEach(function() {
    task = new Task();
  });

  it("return instance of Task", function() {
    expect(task).toEqual(jasmine.any(Task));
  });
  
  it("task has position property", function() {
    expect(task.position).toEqual(jasmine.any(Number));
  });
  
  it("task has marked property", function() {
    expect(task.marked).toEqual(false);
  });

  it("task has text", function() {
    expect(task.title).toEqual(jasmine.any(String));
  });


});

describe("Local Storage", function() {
  var storage = new LocalStorage();

  it("should be able to save tasks", function() {
    expect(storage.saveTasks).not.toThrow();
    var tasks = [];
    tasks.push(new Task());
    tasks.push(new Task());
    tasks.push(new Task());

    storage.saveTasks(tasks);

  });
  
  it("should be able to save empty array", function() {
    expect(storage.saveTasks).not.toThrow();
    var tasks = [];

    storage.saveTasks(tasks);
  });
  
  it("should be able to get tasks", function() {

    expect(storage.saveTasks).not.toThrow();
    var tasks = [];
    var task = new Task();
    task.title = 'Testing';
    tasks.push(task);

    storage.saveTasks(tasks);
    var nTasks = storage.getTasks();
    expect(nTasks[0].title).toEqual('Testing');

  });  

  it("should return undefined it no tasks", function() {

    expect(storage.saveTasks).not.toThrow();
    var nTasks = storage.getTasks();
    expect(nTasks).toEqual(undefined);

  });

});
