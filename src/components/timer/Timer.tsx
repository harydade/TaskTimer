
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
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

interface TimerProps {
  task: Task | null;
}

type TimerMode = 'focus' | 'break';
type TimerStatus = 'idle' | 'running' | 'paused';

export const Timer: React.FC<TimerProps> = ({ task }) => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  useEffect(() => {
    if (task) {
      const time = mode === 'focus' ? task.focusTime * 60 : task.breakTime * 60;
      setTimeLeft(time);
      setTotalTime(time);
      setStatus('idle');
    }
  }, [task, mode]);

  useEffect(() => {
    if (status === 'running' && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, timeLeft]);

  const handleTimerComplete = () => {
    setStatus('idle');
    
    if (mode === 'focus') {
      toast({
        title: "Tempo de foco concluído! 🎉",
        description: "Hora de fazer uma pausa. Você merece!",
      });
      setMode('break');
    } else {
      toast({
        title: "Pausa concluída! ⚡",
        description: "Pronto para mais um período de foco?",
      });
      setMode('focus');
    }
  };

  const handleStart = () => {
    setStatus('running');
  };

  const handlePause = () => {
    setStatus('paused');
  };

  const handleStop = () => {
    setStatus('idle');
    if (task) {
      const time = mode === 'focus' ? task.focusTime * 60 : task.breakTime * 60;
      setTimeLeft(time);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setMode('focus');
    if (task) {
      const time = task.focusTime * 60;
      setTimeLeft(time);
      setTotalTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  if (!task) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Selecione uma tarefa para começar</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">
          {task.title}
        </CardTitle>
        <div className="text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            mode === 'focus' 
              ? 'bg-primary/10 text-primary' 
              : 'bg-accent/10 text-accent'
          }`}>
            {mode === 'focus' ? 'Foco' : 'Descanso'}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-6xl font-mono font-bold ${
            status === 'running' && timeLeft <= 10 ? 'text-destructive animate-pulse' : ''
          }`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {mode === 'focus' ? `${task.focusTime} minutos` : `${task.breakTime} minutos`}
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex justify-center gap-3">
          {status === 'idle' && (
            <Button onClick={handleStart} size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Iniciar
            </Button>
          )}
          
          {status === 'running' && (
            <Button onClick={handlePause} variant="outline" size="lg" className="gap-2">
              <Pause className="h-4 w-4" />
              Pausar
            </Button>
          )}
          
          {status === 'paused' && (
            <>
              <Button onClick={handleStart} size="lg" className="gap-2">
                <Play className="h-4 w-4" />
                Continuar
              </Button>
              <Button onClick={handleStop} variant="outline" size="lg" className="gap-2">
                <Square className="h-4 w-4" />
                Parar
              </Button>
            </>
          )}
          
          {(status === 'running' || status === 'paused') && (
            <Button onClick={handleReset} variant="ghost" size="lg" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reiniciar
            </Button>
          )}
        </div>

        {status === 'running' && (
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse-ring"></div>
              <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full"></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
