// formar petition json
import appjson from "../data/app.json"

export class callApi{

    protected async apifetchDb(body: any, method: string,schema: string, table: string,params: any) {
        try {
            
        let url = `${appjson.url_servers.Url_Db}/${schema}/${table}`

    // validar params y mandar la q=
    if(params){
        url = `${url}`+ params
        // add column
        // url = `${url}?q=${JSON.stringify(params)}&column=${JSON.stringify(column)}`
    }
        console.log(url)
        let headers = {
            "Content-Type": "application/json"
        }
        if(method === "POST" || method === "PUT"){
            console.log("body", body)
            try {
                const resp = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: JSON.stringify(body)
                })
                console.log(resp)

                return resp
            }
            catch (error) {
                return error
            }
        }else{
            console.log("GET entrooooo en el get")
            let resp =  await fetch(url, {
                method: method,
                headers: headers
            })

            
            if(resp.ok){
                let json = await resp.json()
                return json
            }else{
                return resp
            }

        }

        } catch (error) {
            return error
            
        }
    }
}