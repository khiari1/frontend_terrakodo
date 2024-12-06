export interface Task {
    id?: number; // Optionnel pour les nouvelles tâches
    title: string;
    description: string;
    priority: number;
    due_date: string;
    is_completed?: boolean;
}
