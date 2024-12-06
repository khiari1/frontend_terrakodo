import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../task.service'; // Vérifiez le chemin
import { Task } from '../task.model'; // Vérifiez le chemin
import { FormsModule } from '@angular/forms'; // Import du FormsModule pour ngModel
import { CommonModule } from '@angular/common'; // Si vous utilisez des directives Angular natives comme *ngFor, *ngIf

@Component({
  selector: 'app-tasks',
  standalone: true, // Important pour les standalone components
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  imports: [FormsModule, CommonModule] // Ajoutez ici FormsModule
})
export class TasksComponent implements OnInit {
    tasks: any[] = [];
    newTask = { title: '', description: '', priority: null, due_date: '', completed: false };
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.loadTasks();
    }
  
    // Load tasks from the backend
    loadTasks() {
      this.http.get('http://127.0.0.1:8000/tasks').subscribe(
        (response: any) => {
          this.tasks = response;
        },
        (error) => {
          console.error('Error loading tasks:', error);
        }
      );
    }
  
    // Add new task
    addTask() {
      this.http.post('http://127.0.0.1:8000/tasks', this.newTask).subscribe(
        (response) => {
          this.loadTasks();
          this.newTask = { title: '', description: '', priority: null, due_date: '', completed: false }; // Reset form
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
    }
  
    // Edit task
    editTask(task: any) {
      this.newTask = { ...task }; // Populate the form with the task's current values
    }
  
    // Delete task
    deleteTask(id: number) {
      this.http.delete(`http://127.0.0.1:8000/tasks/${id}`).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  
    // Toggle task completion
    toggleCompletion(task: any) {
      task.completed = !task.completed;
      this.http.put(`http://127.0.0.1:8000/tasks/${task.id}`, task).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Error updating task completion:', error);
        }
      );
    }
  }
