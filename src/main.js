const rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
function handleFile(e) {
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = reader.result;
    if(!rABS) data = new Uint8Array(data);
    var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
    const rows =XLSX.utils.sheet_to_json(workbook.Sheets['General Ledger'], {header: ["", "Date", "Type", "Num", "Name", "Description", "Split", "Amount", "Balance"]});
    const desiredRows = rows.filter(row => row.Type && row.Type.includes('Check'));
    console.log(desiredRows);
    const recordType = "I";
    const finalRowRecordType = "T";
    const finalRowCommaSeparation = ",";
    const routingNumber = document.getElementById('routingNumber').value;
    const accountNumber = document.getElementById('accountNumber').value;
    let csvString = '';
    let totalBalance = 0;
    for(let row of desiredRows) {
      let checkNumber = row.Num;
      let issueDate = row.Date;
      let amount = -row.Amount;
      totalBalance += amount;
      let payeeName = row.Name.includes(',') ? '"' + row.Name + '"' : row.Name;
      let additionalData = (row.Description && row.Description.includes(',')) ? '"' + row.Description + '"' : row.Description;
      csvString += [recordType, routingNumber, accountNumber, checkNumber, issueDate, amount, payeeName, additionalData].join(',') + '</br>';
    }
    csvString += [finalRowRecordType, finalRowCommaSeparation, desiredRows.length, new Date().toLocaleDateString("en-US"), totalBalance.toFixed(2)].join(',');
    document.getElementById('resultCSV').innerHTML = csvString;
    let downloadCsvLink = document.getElementById('downloadCSV');
    downloadCsvLink.innerHTML = 'Download CSV';
    downloadCsvLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvString.replace(/<\/br>/g, '\n'));
    downloadCsvLink.download = 'result.csv';
  };
  if(rABS) reader.readAsBinaryString(e); else reader.readAsArrayBuffer(e);
}
