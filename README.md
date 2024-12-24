# Task Filter

Task Filter is a React-based task management application that allows users to organize, filter, search, and update tasks by their status. Built with TypeScript, Redux, and SCSS, the app provides a clean and efficient interface for task tracking, featuring a sidebar for filtering tasks, a search functionality, counters for each task status, and a dynamic task status update system.

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

### 3. Search Functionality
- Search Bar: Locate tasks quickly by typing keywords in the search bar.
- Dynamic Filtering: Search results update instantly as you type, working alongside the filtering functionality.

### 5. Enhanced User Interface
- Unified Controls: Combined task creation input and search bar for a streamlined experience.
- Dropdown Menu: Update task status easily using a dropdown menu for each task.
- Responsive Design: Styled with SCSS to ensure a clean, responsive, and intuitive interface.

### 6. Pagination
- Paginated Task View: If there are many tasks, they are displayed in a paginated format to maintain a clutter-free interface.

---

## Tech Stack

### Frontend
- **React**: Used for building the component-based user interface.
- **TypeScript**: Ensures type safety and better development experience.
- **SCSS**: For styling with a modular and maintainable approach.

### State Management
- **Redux Toolkit**: Manages global state for tasks and filters efficiently.
- **redux-persist**: Ensures that task data is retained between browser sessions.

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
   - Enter a task description in the input field located on the left side of the page.
   - Click the **"Add Task"** button to create a new task.
   - Newly added tasks will have a default status of `TODO`.

2. **Search Tasks**:
   - Use the search bar on the right side of the page to locate tasks by their descriptions.
   - As you type, the list of tasks dynamically updates to show matching results.

3. **Filter Tasks**:
   - Use the sidebar to filter tasks by their status:
     - **ALL**: Displays all tasks.
     - **TODO**: Displays tasks that are yet to be started.
     - **PROGRESS**: Displays tasks that are currently in progress.
     - **DONE**: Displays tasks that have been completed.
   - The counters in the sidebar automatically update to reflect the number of tasks in each category.

4. **Update Task Status**:
   - Each task in the list has a dropdown menu next to it.
   - Use the dropdown to change the status of a task to `TODO`, `PROGRESS`, or `DONE`.
   - Tasks are automatically organized into their corresponding categories.

5. **Persist Tasks**:
   - All tasks and their statuses are saved even after a page refresh, ensuring your data is preserved.

6. **Paginate Tasks**:
   - If there are many tasks, use the pagination controls at the bottom of the task list to navigate through the pages.
