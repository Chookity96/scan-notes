export interface Scan {
  id: number;
  date: string;
  type: string;
  patientName: string;
}

export interface Note {
  title: string;
  content: string;
}
