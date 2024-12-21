import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setFilter, addTask, Task, updateTaskStatus } from "../store/tasksSlice";
import "../styles/TaskList.scss";

const TaskList: React.FC = () => {
	const { tasks, filter } = useSelector((state: RootState) => state.tasks);
	const dispatch: AppDispatch = useDispatch();
	const [newTaskDescription, setNewTaskDescription] = useState<string>("");

	// Task counters
	const taskCounts: Record<"ALL" | "TODO" | "PROGRESS" | "DONE", number> = {
		ALL: tasks.length,
		TODO: tasks.filter((task) => task.status === "TODO").length,
		PROGRESS: tasks.filter((task) => task.status === "PROGRESS").length,
		DONE: tasks.filter((task) => task.status === "DONE").length,
	};

	const handleFilterChange = (status: "ALL" | "TODO" | "PROGRESS" | "DONE") => {
		dispatch(setFilter(status));
	};

	const handleAddTask = () => {
		if (newTaskDescription.trim() !== "") {
			const newTask: Task = {
				id: tasks.length + 1,
				description: newTaskDescription,
				status: "TODO",
			};
			dispatch(addTask(newTask));
			setNewTaskDescription("");
		}
	};

	const handleStatusChange = (taskId: number, newStatus: "TODO" | "PROGRESS" | "DONE") => {
		dispatch(updateTaskStatus({ taskId, newStatus }));
	};

	const filteredTasks =
		filter === "ALL" ? tasks : tasks.filter((task) => task.status === filter);

	return (
		<div className="task-manager">
			{/* Sidebar */}
			<aside className="sidebar">
				<h2>Filter Tasks</h2>
				<ul>
					{["ALL", "TODO", "PROGRESS", "DONE"].map((status) => (
						<li
							key={status}
							className={filter === status ? "active" : ""}
							onClick={() => handleFilterChange(status as any)}
						>
							{status} ({taskCounts[status as "ALL" | "TODO" | "PROGRESS" | "DONE"]})
						</li>
					))}
				</ul>
			</aside>

			{/* Main Content */}
			<main className="main-content">
				<h1>Task Manager</h1>

				{/* Input and Button for Adding New Task */}
				<div className="add-task">
					<input
						type="text"
						value={newTaskDescription}
						onChange={(e) => setNewTaskDescription(e.target.value)}
						placeholder="Enter new task description"
					/>
					<button onClick={handleAddTask}>Add Task</button>
				</div>

				{/* Task List */}
				<ul className="task-list">
					{filteredTasks.map((task) => (
						<li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
							<span>{task.description}</span>
							<span className="status">
								{task.status}
								<select
									value={task.status}
									onChange={(e) =>
										handleStatusChange(task.id, e.target.value as "TODO" | "PROGRESS" | "DONE")
									}
								>
									<option value="TODO">TODO</option>
									<option value="PROGRESS">PROGRESS</option>
									<option value="DONE">DONE</option>
								</select>
							</span>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
};

export default TaskList;
