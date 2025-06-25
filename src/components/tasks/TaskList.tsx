
import React from 'react';
import { TaskItem } from './TaskItem';

interface Task {
  id: string;
  title: string;
  description: string;
  focusTime: number;
  breakTime: number;
  completed: boolean;
  createdAt: Date;
}

interface TaskListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  selectedTaskId?: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onSelectTask,
  onDeleteTask,
  onToggleComplete,
  selectedTaskId,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Nenhuma tarefa criada ainda.</p>
        <p className="text-sm mt-2">Comece adicionando uma nova tarefa!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isSelected={task.id === selectedTaskId}
          onSelect={() => onSelectTask(task)}
          onDelete={() => onDeleteTask(task.id)}
          onToggleComplete={() => onToggleComplete(task.id)}
        />
      ))}
    </div>
  );
};
