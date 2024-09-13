const fs = require('fs');
const { parse } = require('csv-parse');

// Parameters
const chunkSize = 10000; // Number of rows per JSON file

const data = [];
let headers = ["date_time","trans_no","credit","debit","detail"];
let fileCount = 0;

const processChunk = (chunk, startIndex) => {
  const jsonData = chunk.map(row => {
    return headers.reduce((acc, header, index) => {
      if (index === 0) {
        acc[header] = row[index].split("_")[0];
        acc['code'] = row[index].split("_")[1];
      } else {
        acc[header] = row[index];
      }
      return acc;
    }, {});
  });

  // Write to JSON file
  fs.writeFileSync(`data/data_part_${fileCount + 1}.json`, JSON.stringify(jsonData, null, 2), 'utf8');
  fileCount += 1;
};

fs.createReadStream('chuyen_khoan.csv')
  .pipe(parse({
    delimiter: ',',
    trim: true,
    skip_empty_lines: true,
    relax_column_count: true,
    skip_records_with_error: true
  }))
  .on('data', (row) => {
    if (headers.length === 0) {
    } else {
      data.push(row); // Push data rows
      // Process the data in chunks
      if (data.length >= chunkSize) {
        const chunk = data.splice(0, chunkSize);
        processChunk(chunk, fileCount);
      }
    }
  })
  .on('end', () => {
    // Process any remaining data
    if (data.length > 0) {
      processChunk(data, fileCount);
    }
    console.log('Data has been written to JSON files');
  })
  .on('error', (err) => {
    console.error('Error parsing CSV:', err);
  });
