import axios from "axios";


interface PyApiResponse {
  queryString: string
}

export class AccessPyApi{
    constructor(){}
    async getQuery(query: string, type: string){

        const response = await axios.post<PyApiResponse>(process.env.PYTHON_API_URL || "http://localhost:8000", {
            context: query, type: type},
        {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        return response.data.queryString
    }
    
}