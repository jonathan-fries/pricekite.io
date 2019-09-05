This is the GCP function code.

In it's current state it accesses the IpAddress Skus and flattens the JSON for US IPAddress pricing only.

This is a relatively straightforward operation.

Pricing for GCP products is expressed in 'Units' and 'Nanos' of the base currency, based around the base unit of time (hours in this case)  Since base currency for IP addresses is in US dollars this means:

1. Units are USD - 1 unit equals 1 US Dollar.
2. Nanos are billionths of a USD - 1 nano is equal to 1 billionth of a dollar.
3. 'Usage' unit of time is the hour - this is defined in the JSON.

Fractional amounts are always expressed in Nanos.

In order to understand hourly pricing you must divide the nanos by 1 billion.

For example, the current product (1 IP Address) is currently 15,000,000 nanos per hour.  This means that in order to figure out the per hour charge you must do the following:

    15,000,000/1,000,000,000 = .015 dollars/hour = $7.20/month

This is all current as of this writing, 8/30/2019.

Also according to the JSON, the 'base unit' of time is a second, and there is information included to convert, but all of the amounts included are based around the 'usageUnit' and not the 'baseUnit'.
