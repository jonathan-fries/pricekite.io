
export function findRecordType(records, recordType){
  var i = 0;
  var record = { "name" : "N/A", "pricePerUnit" : 0, "unit" : "N/A", "unitsCharged": 0, "unitsConsumed" : 0, "cost" : 0 };
  for(i; i< records.length; i++)
  {
    if(records[i].name == recordType)
    {
      record = records[i];
    }
  }
  return record;
}
