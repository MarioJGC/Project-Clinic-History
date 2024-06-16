export class HistoriaClinicaDTO {
    Id!: number;
    IdHistoria!: number;

    IdAnamnesis!: number;
    MotivoConsulta!: string;
    EnfermedadActual!: string;
    Ectoscopia!: string;
    Anamensis!: string;

    IdFuncionesBiologicas!: number;
    Apetito!: string;
    Deposiciones!: string;
    Sed!: string;
    Orina!: string;
    Suenio!: string;

    IdAntecedentes!: number;
    Personales!: string;
    Patologicos!: string;
    Alergias!: string;
    Familiares!: string;

    IdExamenClinico!: number;
    Peso!: string;
    Talla!: string;
    Biotipo!: string;
    Piel!: string;
    AnexoCabello!: string;
    AnexoUnias!: string;
    PresionArterial!: string;
    FrecuenciaRespiratoria!: string;
    Pulso!: string;
    Temperatura!: string;

    IdExamenClinicoEstomatologico!: number;
    Facie!: string;
    IdCraneo!: number;
    IdCara!: number;
    IdSimetria!: number;

    IdDolor!: number;
    Temporal!: string;
    Masetero!: string;
    PterigoideoInterno!: string;
    PterigoideoExterno!: string;
    Digastrico !: string;
    Esternocleidomastoideo!: string;

    IdAtm!: number;
    Trayectoria!: string;
    RuidosAtm!: string;
    Palpacion!: string;
    GradoApertura!: string;
    Ganglios!: string;

    IdExamenIntrabucal!: number;
    LabiosComisuralabial!: string;
    PaladarDuro!: string;
    Cigarrillos!: string;
    PisoBoca!: string;
    Lengua!: string;
    Orofaringe!: string;
    Frenillos!: string;
    Saliva!: string;

    IdResumen!: number;
    IdDiagnosticoDefinitivo!: number;
    DiagnosticoIngreso!: string;
    IdDiagnosticoPresuntivo!: number;
    ResumenAnamnesis!: string;
    DiagnosticoSalida!: string;
    IdExamenAuxiliar!: number;
    DetalleExamenAuxiliar!: string;

    IdPaciente!: number;
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
}