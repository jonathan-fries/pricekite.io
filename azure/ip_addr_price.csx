#r "Microsoft.IdentityModel.Clients.ActiveDirectory.dll"

using System.Security.Cryptography;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
//using Newtonsoft.Json;
using System.IO;
using System.Text;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

public static async Task<IActionResult> Run(HttpRequest req, ILogger log, ExecutionContext context)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    string tenantId =   Environment.GetEnvironmentVariable("TENANT_ID");
    string authorityUri = "https://login.microsoftonline.com/" + tenantId;
    AuthenticationContext authContext = new AuthenticationContext(authorityUri);

    log.LogInformation("authcontext created.");

    //Resource Uri for Data Catalog API
    string resourceUri = "https://datacatalog.azure.com";
    string clientId = Environment.GetEnvironmentVariable("CLIENT_ID");
    string clientSecret = Environment.GetEnvironmentVariable("SECRET_KEY");
    string redirectUri = "https://pricekite.io";

    ClientCredential clientCred = new ClientCredential(clientId, clientSecret);

    log.LogInformation("Client credential created.");

    log.LogInformation("Calling authentication.");

    AuthenticationResult authenticationResult = await authContext.AcquireTokenAsync(resourceUri,clientCred);

    log.LogInformation("Authentication finished, accessing token.");

    string token = authenticationResult.AccessToken;

    log.LogInformation("Token retrieved.  Token value:");
    log.LogInformation(token);

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

            log.LogInformation(requestURL);

            try
            {
                // Call the REST endpoint
                log.LogInformation("Calling RateCard service...");
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                log.LogInformation(String.Format("RateCard service response status: {0}", response.StatusDescription));
                Stream receiveStream = response.GetResponseStream();

                // Pipes the stream to a higher level stream reader with the required encoding format.
                StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
                var rateCardResponse = readStream.ReadToEnd();
                log.LogInformation("RateCard stream received.");

                log.LogInformation(rateCardResponse);
                //log.LogInformation("Raw output complete.  Now comes the JSON.");


                // Convert the Stream to a strongly typed RateCardPayload object.
                // You can also walk through this object to manipulate the individuals member objects.
                //RateCardPayload payload = JsonConvert.DeserializeObject<RateCardPayload>(rateCardResponse);
                //log.LogInformation(rateCardResponse.ToString());
                //log.LogInformation("JSON output complete.");

            }
            catch(Exception e)
            {
                log.LogInformation(String.Format("{0} \n\n{1}", e.Message, e.InnerException != null ? e.InnerException.Message : ""));
            }

    return request != null
        ? (ActionResult)new OkObjectResult("Yes, it worked.")
        : new BadRequestObjectResult("It didn't work.");
}
