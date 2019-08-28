#r "Microsoft.IdentityModel.Clients.ActiveDirectory.dll"

using System.Security.Cryptography;
using System.Net;
using System.IO;
using System.Text;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    string tenantId =   Environment.GetEnvironmentVariable("TENANT_ID");
    string authorityUri = "https://login.microsoftonline.com/" + tenantId;

    log.Info("authorityUri: " + authorityUri);

    AuthenticationContext authContext = new AuthenticationContext(authorityUri);

    log.Info("authcontext created.");

    //Resource Uri for Data Catalog API
    string resourceUri = "https://management.azure.com/";
    string clientId = Environment.GetEnvironmentVariable("CLIENT_ID");
    string clientSecret = Environment.GetEnvironmentVariable("SECRET_KEY");

    log.Info("Client ID: " + clientId );
    log.Info("Client Secret:" + clientSecret);

    ClientCredential clientCred = new ClientCredential(clientId, clientSecret);

    log.Info("Client credential created.");

    log.Info("Calling authentication.");

    AuthenticationResult authenticationResult = await authContext.AcquireTokenAsync(resourceUri,clientCred);

    log.Info("Authentication finished, accessing token.");

    string token = authenticationResult.AccessToken;

    log.Info("Token retrieved.  Token value:");
    log.Info(token);

    if (token == null)
    {
        throw new InvalidOperationException("Failed to obtain the JWT token");
    }

    string requestURL = String.Format("{0}/{1}/{2}/{3}",
                       "https://management.azure.com",
                       "subscriptions",
                       Environment.GetEnvironmentVariable("SUBSCRIPTION_ID"),
                       "providers/Microsoft.Commerce/RateCard?api-version=2016-08-31-preview&filter=OfferDurableId=MS-AZR-0121p&Currency=USD&Locale=en-US&RegionInfo=US");
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(requestURL);

            // Add the OAuth Authorization header, and Content Type header
            request.Headers.Add(HttpRequestHeader.Authorization, "Bearer " + token);
            request.ContentType = "application/json";

            log.Info(requestURL);

            try
            {
                // Call the REST endpoint
                log.Info("Calling RateCard service...");
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                log.Info(String.Format("RateCard service response status: {0}", response.StatusDescription));
                Stream receiveStream = response.GetResponseStream();

                // Pipes the stream to a higher level stream reader with the required encoding format.
                StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
                var rateCardResponse = readStream.ReadToEnd();
                log.Info("RateCard stream received.");

                log.Info(rateCardResponse);
                //log.LogInformation("Raw output complete.  Now comes the JSON.");


                // Convert the Stream to a strongly typed RateCardPayload object.
                // You can also walk through this object to manipulate the individuals member objects.
                //RateCardPayload payload = JsonConvert.DeserializeObject<RateCardPayload>(rateCardResponse);
                //log.LogInformation(rateCardResponse.ToString());
                //log.LogInformation("JSON output complete.");

            }
            catch(Exception e)
            {
                log.Info(String.Format("{0} \n\n{1}", e.Message, e.InnerException != null ? e.InnerException.Message : ""));
            }

    return token == null
        ? req.CreateResponse(HttpStatusCode.BadRequest, "It borked.")
        : req.CreateResponse(HttpStatusCode.OK, "It didn't bork.");

}
