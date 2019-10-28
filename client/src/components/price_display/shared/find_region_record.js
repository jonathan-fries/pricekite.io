export function findRegionRecords(regionId, records)
{
  var regionRecords = [];
  //var regionRecord = {provider: 'Not Found', daily: 0.00 };
  var i = 0;
  regionId = parseInt(regionId);

    for(i; i < records.length; i++)
    {
      if(records[i].pricekiteRegionId === regionId)
      {
        regionRecords.push(records[i]);
      }
    }

    if(regionRecords.length == 0)
    {
      var regionRecord = {provider: 'Not Found', daily: 0.00 };
      regionRecord.provider = records[0].provider;
      regionRecord.pricekiteRegion = "NA";
      regionRecord.pricePerUnit = 0.00;
      regionRecords.push(regionRecord);
    }

    return regionRecords;
}
