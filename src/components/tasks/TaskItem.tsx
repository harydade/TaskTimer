
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Play, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  focusTime: number;
  breakTime: number;
  completed: boolean;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isSelected,
  onSelect,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md cursor-pointer",
      isSelected && "ring-2 ring-primary",
      task.completed && "opacity-60"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggleComplete}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0" onClick={onSelect}>
            <h3 className={cn(
              "font-medium truncate",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Foco: {task.focusTime}min
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Descanso: {task.breakTime}min
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!task.completed && (
              <Button
                size="sm"
                variant="outline"
                onClick={onSelect}
                className="transition-colors"
              >
                <Play className="h-3 w-3" />
              </Button>
            )}
            
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
