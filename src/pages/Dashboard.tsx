
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskList } from '@/components/tasks/TaskList';
import { Timer } from '@/components/timer/Timer';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  focusTime: number;
  breakTime: number;
  completed: boolean;
  createdAt: Date;
}

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Tarefa criada!",
      description: `"${taskData.title}" foi adicionada à sua lista.`,
    });
  };

  const handleSelectTask = (task: Task) => {
    if (!task.completed) {
      setSelectedTask(task);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
    toast({
      title: "Tarefa removida",
      description: "A tarefa foi excluída com sucesso.",
    });
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      toast({
        title: "Tarefa concluída! 🎉",
        description: `"${task.title}" foi marcada como concluída.`,
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TaskTimer
            </h1>
            {user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {user.name}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TaskForm onAddTask={handleAddTask} />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Suas Tarefas</h2>
              <TaskList
                tasks={tasks}
                selectedTaskId={selectedTask?.id}
                onSelectTask={handleSelectTask}
                onDeleteTask={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-6">
            <Timer task={selectedTask} />
          </div>
        </div>
      </main>
    </div>
  );
};
