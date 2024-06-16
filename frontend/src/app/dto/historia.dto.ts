import { PacienteDTO } from "./paciente.dto";

export class HistoriaDTO {
    Id!: number;
    IdPaciente!: number;
    Paciente!: string;
    FechaCita!: string;
    EstadoCita!: string;
    Motivo!: string;
    //PacienteDTO;
}