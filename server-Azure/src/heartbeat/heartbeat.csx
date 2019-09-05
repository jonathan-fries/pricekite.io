#r "Newtonsoft.Json.dll"

using System.Net;
using Newtonsoft.Json;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    Status status = new Status();
    status.status = "Alive";

    return req.CreateResponse(HttpStatusCode.OK,JsonConvert.SerializeObject(status), "application/json");
}

public class Status
{
    public string status { get; set; }
}
