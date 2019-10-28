#Azure Functions application

IMPORTANT: As currently written the rate card retrieval function must run on .Net Core v1 on Windows.  If you have v2 selected, it won't work.

Yes, your serverless function must have a server OS Selected!!!

Provisioning an Azure Function App appropriately and given the necessary permissions is involved.

I predominantly followed this tutorial in order to get through MOST of the setup:

https://codehollow.com/2016/12/export-azure-ratecard-data-csv-csharp-billing-api/

It uses an older version of Azure, but it is still largely correct as of this writing (8/28/2019).

In general the steps to enable the Azure function to work are:

1. Setting up the App Config.  This is done on Azure using the Functions App configuration. Though, depending on how you do it, you can also use an app.config from VS.  My function was coded directly in Azure, so I just used the config values in Azure funtions.

I created:

CLIENT_ID
TENANT_ID
SUBSCRIPTION_ID
SECRET_KEY

2. Add your Azure Function App to Azure AD, so that it can be given permissions to do stuff.

3. Add permissions in AD to the Function App so that it has access to the management API.

4. Give the application permission to access the subscription.

5. Create client secret.

The link explains all this in better detail, but just so you know what you're in for, those are the steps.

Additionally, you need to configure your application to use CORS.  Follow this guide (toward the end):

https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings

It is important to note, you may need to remove some entries from the CORS list to get it to work.
