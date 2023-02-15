import { IPerson } from "../../../../types/types"

export default async function loadData(cpf: string, register: string): Promise<{ msg: string, type: "fail" | "success", code: string }> {
    const cpfValue = cpf.replace(/\D/g, '') 
    register = register.toLowerCase()

    const res = await fetch(`http://localhost:5001/person?cpf=${cpfValue}`)

    const data: IPerson[] = await res.json()

    console.log(data)

    if (data[0].cpf === cpfValue && data[0].siape === register){
        return {msg: "Sucesso", type: "success", code: data[0].id}
    } else if (data[0].cpf !== cpfValue){
        return {msg: "Cpf inválido!", type: "fail", code: ""}
    } else if (data[0].siape !== register){
        return {msg: "Matrícula inválida!", type: "fail", code: ""}
    }

    return {msg: "", type: "fail", code: ""}
}