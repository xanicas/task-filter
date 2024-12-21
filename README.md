# Task Filter

Task Filter is a React-based task management application that allows users to organize and filter tasks by their status. Built with TypeScript, Redux, and SCSS, the app provides a clean and efficient interface for task tracking, featuring a sidebar for filtering tasks, counters for each task status, and a dynamic task status update system.

---

## Features

### 1. Task Management
- View a list of tasks with their status.
- Add new tasks with a description and default status of "TODO."
- Change the status of tasks dynamically between:
  - TODO
  - IN PROGRESS
  - DONE

### 2. Sidebar Filtering
- Sidebar displays task categories (`ALL`, `TODO`, `PROGRESS`, `DONE`).
- Task counters show the number of tasks in each category.
- Easily filter tasks by clicking on the category in the sidebar.

### 3. Dynamic Updates
- Sidebar counters and task lists update in real-time when tasks are added or their statuses change.

### 4. Responsive Design
- The app is styled using SCSS to ensure a clean and responsive user interface.

---

## Tech Stack

### Frontend
- **React**: Used for building the component-based user interface.
- **TypeScript**: Ensures type safety and better development experience.
- **SCSS**: For styling with a modular and maintainable approach.

### State Management
- **Redux Toolkit**: Manages global state for tasks and filters efficiently.

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/xanicas/task-filter.git
cd task-filter
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
4. Open the app in your browser 

---

## How to Use

1. **Add Tasks**:
   - Enter a task description in the input field at the top of the page.
   - Click the "Add Task" button to create a new task.
   - Newly added tasks will have a default status of "TODO."

2. **Filter Tasks**:
   - Use the sidebar to filter tasks by their status:
     - `ALL`: Shows all tasks.
     - `TODO`: Shows tasks that are yet to be started.
     - `PROGRESS`: Shows tasks that are currently in progress.
     - `DONE`: Shows tasks that have been completed.
   - The task counters in the sidebar dynamically update to reflect the number of tasks in each category.

3. **Update Task Status**:
   - In the task list, each task has a dropdown menu next to it.
   - Use the dropdown to change the status of a task to `TODO`, `PROGRESS`, or `DONE`.
   - Tasks will automatically move to the corresponding category based on their status.

4. **View Task Details**:
   - Each task in the list displays its description and current status.
   - The interface updates instantly when any changes are made.

