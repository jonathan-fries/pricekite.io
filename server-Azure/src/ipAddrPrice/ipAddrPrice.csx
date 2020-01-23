#r "Microsoft.IdentityModel.Clients.ActiveDirectory.dll"
#r "Newtonsoft.Json.dll"

using System.Security.Cryptography;
using System.Net;
using System.IO;
using System.Text;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    string tenantId =   Environment.GetEnvironmentVariable("TENANT_ID");
    string authorityUri = "https://login.microsoftonline.com/" + tenantId;

    log.Info("authorityUri: " + authorityUri);

    AuthenticationContext authContext = new AuthenticationContext(authorityUri);

    //Resource Uri for Data Catalog API
    string resourceUri = "https://management.azure.com/";
    string clientId = Environment.GetEnvironmentVariable("CLIENT_ID");
    string clientSecret = Environment.GetEnvironmentVariable("SECRET_KEY");


    ClientCredential clientCred = new ClientCredential(clientId, clientSecret);

    log.Info(clientCred.ToString());

    //authenticate
    AuthenticationResult authenticationResult = await authContext.AcquireTokenAsync(resourceUri,clientCred);

    string token = authenticationResult.AccessToken;

    log.Info(token);

    if (token == null)
    {
        throw new InvalidOperationException("Failed to obtain the JWT token");
    }

    string requestURL = String.Format("{0}/{1}/{2}/{3}",
                       "https://management.azure.com",
                       "subscriptions",
                       Environment.GetEnvironmentVariable("SUBSCRIPTION_ID"),
                       "providers/Microsoft.Commerce/RateCard?api-version=2016-08-31-preview&$filter=OfferDurableId eq 'MS-AZR-0003P' and Currency eq 'USD' and Locale eq 'en-US' and RegionInfo eq 'US'");
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(requestURL);

            // Add the OAuth Authorization header, and Content Type header
            request.Headers.Add(HttpRequestHeader.Authorization, "Bearer " + token);
            request.ContentType = "application/json";

            log.Info(requestURL);

        List<IpAddressItem> ipAddresses = new List<IpAddressItem>();

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

                //log.Info(rateCardResponse);
                log.Info("Raw output complete.  Now comes the JSON.");


                // Convert the Stream to a strongly typed RateCardPayload object.
                // You can also walk through this object to manipulate the individuals member objects.
                RateCardPayload payload = JsonConvert.DeserializeObject<RateCardPayload>(rateCardResponse);
                //log.Info(rateCardResponse.ToString());

                int i = 0;

                foreach(Resource resource in payload.Meters)
                {
                    //screening for known IP Address skus, excluding things in the subcategories we are not inerested in
                    if((resource.MeterSubCategory == "IP Addresses" || resource.MeterSubCategory == "Public IP Prefix") && (resource.MeterName != "Remaps" && resource.MeterName != "Dynamic Public IP"))
                    {
                        i++;
                        log.Info("We found another IP Address. Total: " + i.ToString());
                        IpAddressItem item = new IpAddressItem();
                        item.sku = resource.MeterId;
                        item.name = resource.MeterName;
                        item.hourly = resource.MeterRates[0];
                        item.monthly = item.hourly * 24 * 30;
                        ipAddresses.Add(item);
                    }
                }

                log.Info("JSON output complete.");

            }
            catch(Exception e)
            {
                log.Info("Something went wrong.  Here is what we got:");
                log.Info(String.Format("{0} \n\n Testing \n\n{1}", e.Message, e.InnerException != null ? e.InnerException.Message : ""));
            }

    return token == null
        ? req.CreateResponse(HttpStatusCode.BadRequest, "It borked.")
        : req.CreateResponse(HttpStatusCode.OK, JsonConvert.SerializeObject(ipAddresses), "application/json");

}

public class IpAddressItem
{
    public string sku { get; set; }
    public string name { get; set; }
    public double hourly { get; set; }
    public double monthly { get; set; }
}

public class Resource
{
        public string MeterId { get; set; }
        public string MeterName { get; set; }
        public string MeterCategory { get; set; }
        public string MeterSubCategory { get; set; }
        public string Unit { get; set; }
        public Dictionary<double, double> MeterRates { get; set; }
        public string EffectiveDate { get; set; }
        public List<string> MeterTags { get; set; }
        public string MeterRegion { get; set; }
        public double IncludedQuantity { get; set; }

}

public class RateCardPayload
{
    public List<object> OfferTerms { get; set; }
    public List<Resource> Meters { get; set; }
    public string Currency { get; set; }
    public string Locale { get; set; }
    public string RatingDate { get; set; }
    public bool IsTaxIncluded { get; set; }
}
