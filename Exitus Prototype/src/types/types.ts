//types
export type TDate = {
    day: number,
    month: number,
    year: number,
    hour: number,
    min: number
}

export type TDateForAge = {
    day: number,
    month: number,
    year: number,
}

export type TDateForLeave = {
    hour: number,
    min: number
}

export interface ILog {
    id: string,
    createdAt: TDate
}

//only the usable data
export interface IPerson {
    id: string,
    name: string,
    cpf: string,
    siape: string,
    dateOfBirth: TDate,
    email: string,
    city: string,
    permissionToLeaveEarly: boolean,
    permissionToEnterOnOtherShift: boolean,
    onSchool: boolean,
    shift: "morning" | "afternoon" | "night",
    qrCode: string,
    logs: ILog[]
}

export interface IOnChangeData {
    onSchool: boolean,
    log?: ILog[]
}