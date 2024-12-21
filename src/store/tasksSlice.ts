import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Task = {
	id: number;
	description: string;
	status: "TODO" | "PROGRESS" | "DONE";
};

type TasksState = {
	tasks: Task[];
	filter: "ALL" | "TODO" | "PROGRESS" | "DONE";
};

const initialTasks: Task[] = [
	{ id: 1, description: "Learn React", status: "TODO" },
	{ id: 2, description: "Build a project", status: "PROGRESS" },
	{ id: 3, description: "Read a book", status: "DONE" },
	{ id: 4, description: "Chores", status: "TODO" },
	{ id: 5, description: "Nothing", status: "TODO" },
];

const initialState: TasksState = {
	tasks: initialTasks,
	filter: "ALL",
};

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		setFilter(state, action: PayloadAction<TasksState["filter"]>) {
			state.filter = action.payload;
		},
		addTask(state, action: PayloadAction<Task>) {
			state.tasks.push(action.payload);
		},
		updateTaskStatus(state, action: PayloadAction<{ taskId: number; newStatus: Task["status"] }>) {
			const { taskId, newStatus } = action.payload;
			const task = state.tasks.find((t) => t.id === taskId);
			if (task) {
				task.status = newStatus;
			}
		},
	},
});

export const { setFilter, addTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
