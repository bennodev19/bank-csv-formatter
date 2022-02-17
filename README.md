# 💲 Bank `.csv` Formatter

A simple NodeJs application, that formats `csv` files exported from banks, 
to a more readable and more reusable csv file.

## Get Started

### Step 1
Clone the `bank-csv-formatter` repository.

### Step 2
Create a `files` folder with two sub folders called `input` 
and `signs` on the root of the project.
```
bank-csv-formatter
│── files
│   ├── input
│   ├── output
|── src
.
```

**`input`**
`CSV` files to be formatted.

**`output`**
This folder will be created automatically after executing this program.
Here the formatted and combined `csv` fill will be located.

### Step 3
Configure the `csv.config.json` file to your needs.
```json
{
  "inputConfig": {
    /* Path to the csv files to import */
    "dirPath": "./files/input"
  },
  "parseConfig": {
    /* Skip the first 15 lines of the imported csv files */
    "skipLines": 15,
    /* Format the headers of the csv files. */
    /* Header columns titled with 'null' are removed */
    "headers": [
      "date",
      null,
      "purposeCode",
      null,
      "payee",
      null,
      "payeeIBAN",
      "payeeBLZ",
      "payeeBIC",
      "operation",
      null,
      "currency",
      "revenue",
      "depitCredit"
    ]
  },
  "outputConfig": {
    /* Path to the exported csv file */
    "path": "./files/output",
    /* Name of the exported csv file */
    "fileName": "parsedStuff.csv",
    /* Column names/keys that are required. */
    /* A row that doesn't contain a value for a required column is removed. */
    "requiredColumns": ["purposeCode"],
    /* Whether to add an additional 'id' field that is incremented upwards */
    "addId": true
  }
}
```

### Step 4
Run `yarn run serve` that automatically builds and executes the project.
If everything went right, the formatted and combined `csv` files
are located in the generated `output` folder.