import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import type { SectorType } from "./SectorDropdown";

interface Task {
  id: string;
  label: string;
  completed: boolean;
}

const sectorTasks: Record<SectorType, string[]> = {
  carga: ["Llamar Laredo 9AM", "Auditar GPS Bisonte", "Reporte proactivo"],
  personas: ["Inspección Traxi", "Encuesta pasajeros", "Ajuste ruta"],
  logistica: ["WMS Solistica", "Sensores Medistik", "Redpack milla"],
  otros: ["Contactar comercialmkt@traxion.global", "Agendar llamada", "Enviar propuesta"],
};

interface ActionChecklistProps {
  sector: SectorType;
}

export function ActionChecklist({ sector }: ActionChecklistProps) {
  const storageKey = `traxion-tasks-${sector}`;
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
    return sectorTasks[sector].map((label, i) => ({
      id: `${sector}-${i}`,
      label,
      completed: false,
    }));
  });

  useEffect(() => {
    const newTasks = sectorTasks[sector].map((label, i) => ({
      id: `${sector}-${i}`,
      label,
      completed: false,
    }));
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setTasks(JSON.parse(stored));
    } else {
      setTasks(newTasks);
    }
  }, [sector, storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  const handleToggle = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    const wasCompleted = task?.completed;

    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );

    if (!wasCompleted) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#1e3a8a", "#f59e0b", "#22c55e"],
      });
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <span className="text-sm font-bold text-foreground">
            PUNTO 80/20: PUNTUALIDAD
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{totalCount} HOY 👀
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg bg-card border border-border transition-all duration-300 animate-fade-slide-in",
              task.completed && "task-completed bg-muted"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Checkbox
              id={task.id}
              checked={task.completed}
              onCheckedChange={() => handleToggle(task.id)}
              className="border-primary data-[state=checked]:bg-status-green data-[state=checked]:border-status-green"
            />
            <label
              htmlFor={task.id}
              className={cn(
                "text-sm font-medium cursor-pointer flex-1",
                task.completed && "line-through opacity-60"
              )}
            >
              {task.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
