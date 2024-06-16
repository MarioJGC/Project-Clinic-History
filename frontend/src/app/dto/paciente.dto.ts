export class PacienteDTO {
    Id!: number;
    FechaHoraCreacion!: string;
    Nombre!: string;
    ApellidoPaterno!: string;
    ApellidoMaterno!: string;
    Sexo!: string;
    Lugar!: string;
    Domicilio!: string;
    FechaNacimiento!: Date;
    EstadoCivil!: string;
    NumeroCelular!: string;
    Correo!: string;
    Ocupacion!: string;
    Responsable!: string;
    DomicilioResponsable!: string;
    CelularResponsable!: string;
    MotivoConsulta!: string;
}