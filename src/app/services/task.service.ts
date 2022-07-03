import { Injectable } from '@angular/core';
import { __values } from 'tslib';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private idGen (arr: any) {
    arr.forEach((item: Task, index: number) => {
      item.id = index;
    });
  }


  getTasks() {
    const empty = JSON.stringify([]);

    if(localStorage.getItem('tasks') === null) {                //Empty array in new browser
      localStorage.setItem('tasks', empty)
    }

    const temp: any = localStorage.getItem('tasks');

    return JSON.parse(temp);
  }

  
  addTask(task:Task) {
    let tasks: Task[] = this.getTasks();
    tasks.push(task);

    this.idGen(tasks);

    const json: string = JSON.stringify(tasks);
    localStorage.setItem('tasks', json);
  }

  deleteTask(task: Task) {
    let tasks: Task[] = this.getTasks();
    tasks = tasks.filter((t) => t.id !== task.id);

    this.idGen(tasks);

    const json: string = JSON.stringify(tasks);
    localStorage.setItem('tasks', json);
  }

  taskReminder(task: Task) {
    let tasks: Task[] = this.getTasks();
    const index: number = tasks.findIndex(t => t.id === task.id);

    tasks[index].reminder = !tasks[index].reminder;
    
    const json: string = JSON.stringify(tasks);
    localStorage.setItem('tasks', json);
  }
}
