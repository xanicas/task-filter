import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setFilter, addTask, Task, updateTaskStatus } from "../store/tasksSlice";
import "../styles/TaskList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons";

const TaskList: React.FC = () => {
	const { tasks, filter } = useSelector((state: RootState) => state.tasks);
	const dispatch: AppDispatch = useDispatch();

	const [newTaskDescription, setNewTaskDescription] = useState<string>("");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [dropdownOpenTaskId, setDropdownOpenTaskId] = useState<number | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Constants for pagination
	const tasksPerPage = 10;
	const totalPages = Math.ceil(tasks.length / tasksPerPage);

	// Task counters
	const taskCounts: Record<"ALL" | "TODO" | "PROGRESS" | "DONE", number> = {
		ALL: tasks.length,
		TODO: tasks.filter((task) => task.status === "TODO").length,
		PROGRESS: tasks.filter((task) => task.status === "PROGRESS").length,
		DONE: tasks.filter((task) => task.status === "DONE").length,
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
		setDropdownOpenTaskId(null);
	};

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(target) &&
				!target.closest(".dropdown-menu")
			) {
				setDropdownOpenTaskId(null);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const sortedTasks = [...tasks].sort((a, b) => b.id - a.id);

	// Filter and search tasks
	const filteredTasks =
		filter === "ALL" ? sortedTasks : sortedTasks.filter((task) => task.status === filter);
	const searchedTasks = filteredTasks.filter((task) =>
		task.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Paginate tasks
	const indexOfLastTask = currentPage * tasksPerPage;
	const indexOfFirstTask = indexOfLastTask - tasksPerPage;
	const currentTasks = searchedTasks.slice(indexOfFirstTask, indexOfLastTask);

	// Change page
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

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
							onClick={() => dispatch(setFilter(status as any))}
						>
							{status} ({taskCounts[status as "ALL" | "TODO" | "PROGRESS" | "DONE"]})
						</li>
					))}
				</ul>
			</aside>

			{/* Main Content */}
			<main className="main-content">
				<h1 className="heading">Task Manager</h1>

				{/* Add Task and Search Bar */}
				<div className="task-actions">
					<div className="add-task">
						<input
							type="text"
							value={newTaskDescription}
							onChange={(e) => setNewTaskDescription(e.target.value)}
							placeholder="Enter new task description"
						/>
						<button onClick={handleAddTask}>Add Task</button>
					</div>
					<div className="search-bar">
						<div className="search-input-wrapper">
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search tasks..."
							/>
							<FontAwesomeIcon icon={faSearch} className="search-icon" />
						</div>
					</div>
				</div>

				{/* Task List */}
				<table className="task-table">
					<thead>
						<tr>
							<th>Task</th>
							<th>Status</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{currentTasks.map((task) => (
								<tr key={task.id}>
									<td>{task.description}</td>
									<td>
										<div className={`status-badge status-${task.status.toLowerCase()}`}>
											{task.status}
										</div>
									</td>
									<td>
										<div className="action-menu" ref={dropdownRef}>
											<FontAwesomeIcon
												icon={faEllipsisVertical}
												onClick={() =>
													setDropdownOpenTaskId(
														dropdownOpenTaskId === task.id ? null : task.id
													)
												}
												className="action-icon"
											/>
											{dropdownOpenTaskId === task.id && (
												<div className="dropdown-menu">
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleStatusChange(task.id, "TODO");
														}}
													>
														TODO
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleStatusChange(task.id, "PROGRESS");
														}}
													>
														PROGRESS
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleStatusChange(task.id, "DONE");
														}}
													>
														DONE
													</button>
												</div>
											)}
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>

				{/* Pagination */}
				{searchedTasks.length > tasksPerPage && (
					<div className="pagination">
						<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
							Previous
						</button>
						<span>
							Page {currentPage} of {totalPages}
						</span>
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						>
							Next
						</button>
					</div>
				)}
			</main>
		</div>
	);
};

export default TaskList;
