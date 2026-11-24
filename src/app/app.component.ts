import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="container">
      <section class="card">
        <p class="eyebrow">Angular · GitHub Actions practice</p>
        <h1>Task board</h1>
        <p class="subtitle">Una pequeña aplicación para practicar pipelines CI/CD.</p>

        <form (submit)="addTask($event)">
          <label for="task-input">Nueva tarea</label>
          <div class="input-row">
            <input
              id="task-input"
              type="text"
              placeholder="Ej. Crear un workflow de CI"
              [value]="newTask"
              (input)="onInput($event)"
            />
            <button type="submit" [disabled]="!newTask.trim()">Añadir</button>
          </div>
        </form>

        <ul>
          @for (task of tasks; track task.id) {
            <li>
              <label class="task">
                <input type="checkbox" [checked]="task.done" (change)="toggleTask(task.id)" />
                <span [class.completed]="task.done">{{ task.title }}</span>
              </label>
              <button class="delete" type="button" (click)="deleteTask(task.id)" aria-label="Eliminar tarea">×</button>
            </li>
          } @empty {
            <li class="empty">No hay tareas. ¡Añade la primera!</li>
          }
        </ul>

        <footer>{{ remainingCount }} tarea(s) pendiente(s)</footer>
      </section>
    </main>
  `,
  styles: [`
    .container { max-width: 720px; margin: 0 auto; padding: 4rem 1.25rem; }
    .card { background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 8px 28px rgba(0,0,0,.06); }
    .eyebrow { color: #2563eb; font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
    h1 { margin: .4rem 0; font-size: 2.25rem; }
    .subtitle { color: #6b7280; margin-bottom: 2rem; }
    form label { display: block; font-weight: 600; margin-bottom: .5rem; }
    .input-row { display: flex; gap: .5rem; }
    input[type="text"] { flex: 1; padding: .75rem; border: 1px solid #d1d5db; border-radius: 8px; font: inherit; }
    button { border: 0; border-radius: 8px; padding: .7rem 1rem; background: #2563eb; color: white; font-weight: 600; cursor: pointer; }
    button:disabled { opacity: .45; cursor: not-allowed; }
    ul { list-style: none; padding: 0; margin: 1.5rem 0; }
    li { display: flex; align-items: center; justify-content: space-between; gap: .75rem; padding: .75rem 0; border-bottom: 1px solid #e5e7eb; }
    .task { display: flex; align-items: center; gap: .65rem; font-weight: 400; margin: 0; }
    .completed { color: #9ca3af; text-decoration: line-through; }
    .delete { background: transparent; color: #6b7280; font-size: 1.25rem; padding: .25rem .6rem; }
    .empty { color: #9ca3af; justify-content: center; }
    footer { color: #6b7280; font-size: .9rem; }
  `],
})
export class AppComponent {
  newTask = '';
  tasks = [
    { id: 1, title: 'Crear el repositorio en GitHub', done: true },
    { id: 2, title: 'Configurar el primer workflow', done: false },
    { id: 3, title: 'Ejecutar tests automáticamente', done: false },
  ];

  get remainingCount(): number {
    return this.tasks.filter((task) => !task.done).length;
  }

  onInput(event: Event): void {
    this.newTask = (event.target as HTMLInputElement).value;
  }

  addTask(event: Event): void {
    event.preventDefault();
    const title = this.newTask.trim();
    if (!title) return;

    const nextId = Math.max(0, ...this.tasks.map((task) => task.id)) + 1;
    this.tasks = [...this.tasks, { id: nextId, title, done: false }];
    this.newTask = '';
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
