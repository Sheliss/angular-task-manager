import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    this.tasks = (this.taskService.getTasks());



  }
  
  addTask(task: Task) {
    this.taskService.addTask(task);
    this.tasks.push(task);
  }
  
  deleteTask(task:Task) {
    this.taskService.deleteTask(task)

    let filter = () => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id)
    }

    filter();
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.taskReminder(task);
  }

}
