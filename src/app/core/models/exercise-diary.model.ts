export interface Exercise {
    name: string;
    value: number; // reps ou minutos
    type: 'reps' | 'time';
    series: number;
}

export interface DiaryEntry {
    id?: string;
    userId: string;
    date: string;
    exercises: Exercise[];
    notes: string;
    type: string;
}
