import { ILog, IPerson } from "../../../../types/types";

export default async function loadLogs(code: string): Promise<{logs: ILog[], name: string}>{
    
    const res = await fetch(`http://localhost:5001/person/${code}`)

    const data: IPerson = await res.json()

    return { logs: data.logs, name: data.name }

}