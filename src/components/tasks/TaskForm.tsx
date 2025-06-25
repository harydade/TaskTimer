
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  focusTime: number;
  breakTime: number;
  completed: boolean;
  createdAt: Date;
}

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      focusTime,
      breakTime,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setFocusTime(25);
    setBreakTime(5);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Nova Tarefa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Tarefa</Label>
            <Input
              id="title"
              type="text"
              placeholder="Ex: Estudar matemática"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Descreva os detalhes da tarefa..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="focusTime">Tempo de Foco (min)</Label>
              <Input
                id="focusTime"
                type="number"
                min="1"
                max="120"
                value={focusTime}
                onChange={(e) => setFocusTime(Number(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="breakTime">Tempo de Descanso (min)</Label>
              <Input
                id="breakTime"
                type="number"
                min="1"
                max="60"
                value={breakTime}
                onChange={(e) => setBreakTime(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Tarefa
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
