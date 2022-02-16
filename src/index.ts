import fs from 'fs';
import { ParserOptionsArgs } from 'fast-csv';
import { readFilesFromDir, TParsedCSVRows, writeCSV } from './file';

const rawdata = fs.readFileSync('csv.config.json').toString();
const config: TConfig = JSON.parse(rawdata);
const inputConfig = config.inputConfig;
const parseConfig = config.parseConfig ?? {};
const outputConfig = {
  requiredColumns: [],
  addId: false,
  ...config.outputConfig,
};

const start = async (): Promise<void> => {
  console.log('Loaded Config ', config);

  // When specifying custom headers the header row needs to be removed too
  if (parseConfig.headers != null && parseConfig.skipLines != null) {
    parseConfig.skipLines++;
  }

  // Map 'null' to 'undefined', since json doesn't support 'undefined'
  if (Array.isArray(parseConfig.headers)) {
    parseConfig.headers = parseConfig.headers.map((v) =>
      v == null ? undefined : v,
    );
  }

  // Read to import csv files
  const parsedData = await readFilesFromDir(inputConfig.dirPath, parseConfig);

  // Merge parsed data rows
  const mergedRows: TParsedCSVRows = [];
  let currentId = 1;
  for (const key of Object.keys(parsedData)) {
    const data = parsedData[key];
    for (let row of data) {
      // Check that all required columns aren't empty in the rows
      if (
        outputConfig.requiredColumns.every(
          (item) => row[item] != null && row[item] !== '',
        )
      ) {
        // Note: Merging to have the id at the first pos of the object (good when export to csv file)
        if (outputConfig.addId) row = { id: currentId++, ...row };

        mergedRows.push(row);
      }
    }
  }

  // Write merged rows to a new csv file
  await writeCSV(outputConfig.fileName, outputConfig.path, mergedRows);
};

console.log('Info: Start Program');
start().then(() => {
  console.log('Info: End Program');
});

type TConfig = {
  inputConfig: {
    /**
     * Path to the to import csv files.
     * @default undefined
     */
    dirPath: string;
  };
  /**
   * Configuration object to configure the parsing.
   * @default {}
   */
  parseConfig: ParserOptionsArgs;
  outputConfig: {
    /**
     * Path where to save the generated file.
     * @default undefined
     */
    path: string;
    /**
     * Name of the generated file.
     * @default undefined
     */
    fileName: string;
    /**
     * Column names/keys that are required.
     * A row that doesn't contain a value for a required column is removed.
     * @default []
     */
    requiredColumns?: string[];
    /**
     * Whether to add an additional 'id' field that is incremented upwards.
     * @default false
     */
    addId?: boolean;
  };
};
