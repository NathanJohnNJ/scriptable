/**************************************
 * Configurations
 *************************************/

const DAILY_LOG_CACHE_NAME = 'DailyLogs';
const CATEGORY_CONFIGURATIONS = {
  SAMPLE_CAT_1: {
    color: '#10FC0C',
    name: 'Health',
  },
  SAMPLE_CAT_2: {
    color: '#FFCCCC',
    name: 'Coding - Work',
  },
  SAMPLE_CAT_3: {
    color: '#CCCCFF',
    name: 'Coding - Personal',
  },
};

const FIELDS = [
  { label: 'Enough Sleep', category: 'SAMPLE_CAT_1' },
  { label: 'Shower', category: 'SAMPLE_CAT_1' },
  { label: 'Exercised', category: 'SAMPLE_CAT_1' },
  { label: 'Medication', category: 'SAMPLE_CAT_1' },
  ];
const FIELDS2 = [
  { label: 'NJTD', category: 'SAMPLE_CAT_2' },
  { label: 'Job Hunt', category: 'SAMPLE_CAT_2' },];
const FIELDS3 = [
  { label: 'RPi 5', category: 'SAMPLE_CAT_3' },
  { label: 'Mango Pi', category: 'SAMPLE_CAT_3' },
];

const FIELDS_TO_AGGREGATE = [
   { label: 'Enough Sleep', category: 'SAMPLE_CAT_1' },
  { label: 'Shower', category: 'SAMPLE_CAT_1' },
  { label: 'Exercised', category: 'SAMPLE_CAT_1' },
  { label: 'Medication', category: 'SAMPLE_CAT_1' },];
const FIELDS_TO_AGGREGATE2 = [
  { label: 'NJTD', category: 'SAMPLE_CAT_2' },
  { label: 'Job Hunt', category: 'SAMPLE_CAT_2' },];
const FIELDS_TO_AGGREGATE3 = [
  { label: 'RPi 5', category: 'SAMPLE_CAT_3' },
  { label: 'Mango Pi', category: 'SAMPLE_CAT_3' },
];
const DATE_TEXT_FORMAT = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric', 
  month: 'short', 
});
const SHORT_DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  weekday: 'narrow', 
})
const NUM_DAYS = 5;
const PADDING = 5;
const TITLE_TEXT_SPACING = 10;
const TITLE_TEXT_SIZE = 15;
const VERTICAL_TEXT_SPACING = 5;
const VERTICAL_DATA_GRID_SPACING = 2;
const TEXT_SIZE = 10;

/**************************************
 * Initial Setups
 *************************************/
const Cache = importModule('Cache');
const DAILY_LOG_CACHE = new Cache(DAILY_LOG_CACHE_NAME);
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const data = await fetchData();

// Show alert with current data (if running script in app)
if (config.runsInApp) {
  const alert = createAlert(data.dateText, data.today);
  const response = await alert.present();
  if (response === 0) {
    console.log('Cancel was pressed... doing nothing');
  } else if (response === 1) {
      console.log('Submit was pressed');
//       const updatedFields = [];
let updatedFields = [];
finalFields.map((field) => {
      for (let i = 0; i < field.length; i++) {
        const value = alert.textFieldValue(i);
        updatedFields.push({
          label: field[i].label, 
          category: field[i].category, 
          value, 
        });
      }
      

      DAILY_LOG_CACHE.write(data.dateKey, updatedFields);
      data.today = updatedFields;
      data.fields[0] = updatedFields;
  
})}}

// Create widget with data
const widget = createWidget(data);

// Set widget
Script.setWidget(widget);
Script.complete();

/** Alert **/

function createAlert(dateText, fields) {
  const alert = new Alert();
  alert.title = `Daily Log for ${dateText}`;
  fields.forEach(field => {
    alert.addTextField(field.label, `${field.value}`);
  });
  alert.addAction('Cancel'); // 0
  alert.addAction('Submit'); // 1
  return alert;
}

/** Widget **/
function createWidget(data) {
  console.log(`Creating widget data=${JSON.stringify(data)}`);
  // Widget
  const widget = new ListWidget();
  const bgColor = new LinearGradient();
  bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
  bgColor.locations = [0.0, 1.0];
  widget.backgroundGradient = bgColor;
  widget.setPadding(PADDING, PADDING, PADDING, PADDING);

  // Main stack
  const stack = widget.addStack();
  stack.layoutVertically();

  // Top stack
  const topStack = stack.addStack();
  topStack.layoutHorizontally();

  // Title stack and text of widget
  const titleTextLine = topStack.addText(`Daily Logs`);
  titleTextLine.textColor = Color.white();
  titleTextLine.font = new Font('Menlo-Bold', TITLE_TEXT_SIZE);
  topStack.addSpacer(TITLE_TEXT_SPACING);

  // Main bottom stack
  // Data will be added column by column
  const bottomStack = stack.addStack();
  bottomStack.layoutHorizontally();

const fieldData = FIELDS_TO_AGGREGATE
      .map(field => ({
        value: field.label, 
        color: CATEGORY_CONFIGURATIONS[field.category].color,
      }))
      const fieldData2 = FIELDS_TO_AGGREGATE2
      .map(field => ({
        value: field.label, 
        color: CATEGORY_CONFIGURATIONS[field.category].color,
      }))
      const fieldData3 = FIELDS_TO_AGGREGATE3
      .map(field => ({
        value: field.label, 
        color: CATEGORY_CONFIGURATIONS[field.category].color,
      }))

  // Field label column
  addColumnToStack(bottomStack, [{ value: '' }]
      .concat(fieldData[0])
      .concat(fieldData[1])
      .concat(fieldData[2])
      .concat(fieldData[3])
      .concat(fieldData2[0])
      .concat(fieldData2[1])
      .concat(fieldData3[0])
      .concat(fieldData3[1])
      );
  bottomStack.addSpacer(VERTICAL_TEXT_SPACING);

  // Use to keep track of how many days each field was completed
  const fieldCompletionCounts = {};
  FIELDS_TO_AGGREGATE.forEach(field => fieldCompletionCounts[field.label] = 0);
  FIELDS_TO_AGGREGATE2.forEach(field => fieldCompletionCounts[field.label] = 0);
FIELDS_TO_AGGREGATE3.forEach(field => fieldCompletionCounts[field.label] = 0);
  // Collect data to format one column for each day's data
  const dataByDay = data.fields.reverse();

  let date = parseDateFromKey(data.dateKey);
  date = date.addDays(-1 * (dataByDay.length - 1));
  
  // One column per day
  dataByDay.forEach(dayData => {
    const columnData = [];

    // First cell: date label
    columnData.push({
      value: `${SHORT_DATE_FORMAT.format(date)}`,
      isBold: true,
      align: 'center',
    });
    
    // One cell per field data
    FIELDS_TO_AGGREGATE.forEach(field => {
      const fieldFromDay = dayData.find(d => d.label === field.label);
      if (fieldFromDay) {
        columnData.push({ value: fieldFromDay.value ? '✅' : '❌' });
        fieldCompletionCounts[fieldFromDay.label] += fieldFromDay.value ? 1 : 0;
      } else {
        columnData.push({ value: '?'});
      }
    });
    FIELDS_TO_AGGREGATE2.forEach(field => {
      const fieldFromDay = dayData.find(d => d.label === field.label);
      if (fieldFromDay) {
        columnData.push({ value: fieldFromDay.value ? '✅' : '❌' });
        fieldCompletionCounts[fieldFromDay.label] += fieldFromDay.value ? 1 : 0;
      } else {
        columnData.push({ value: '?'});
      }
    });
    FIELDS_TO_AGGREGATE3.forEach(field => {
      const fieldFromDay = dayData.find(d => d.label === field.label);
      if (fieldFromDay) {
        columnData.push({ value: fieldFromDay.value ? '✅' : '❌' });
        fieldCompletionCounts[fieldFromDay.label] += fieldFromDay.value ? 1 : 0;
      } else {
        columnData.push({ value: '?'});
      }
    });
    
    
    addColumnToStack(bottomStack, columnData);
    bottomStack.addSpacer(VERTICAL_DATA_GRID_SPACING);
    date = date.addDays(1);
  });
  
  // Vertical spacing between data grid column and completion percentage
  bottomStack.addSpacer(VERTICAL_TEXT_SPACING);

  // Column of percentage for each field
  const completionData = [{ value: ' '}];

  FIELDS_TO_AGGREGATE.forEach(field => {
    const completionCount = fieldCompletionCounts[field.label];
    let completionRate = (completionCount * 100 / data.fields.length).toFixed(0);

    // Add some left padding for numbers of 1 or 2 digits
    if (completionRate.length === 1) {
      completionRate = '  ' + completionRate;
    } else if (completionRate.length === 2) {
      completionRate = ' ' + completionRate;
    }

    completionData.push({
      value: `[${completionRate}%]`, 
      align: 'right',
      color: completionCount === data.fields.length ? '#66ff00' : '#ffffff',
    });
  });
  FIELDS_TO_AGGREGATE2.forEach(field => {
    const completionCount = fieldCompletionCounts[field.label];
    let completionRate = (completionCount * 100 / data.fields.length).toFixed(0);

    // Add some left padding for numbers of 1 or 2 digits
    if (completionRate.length === 1) {
      completionRate = '  ' + completionRate;
    } else if (completionRate.length === 2) {
      completionRate = ' ' + completionRate;
    }

    completionData.push({
      value: `[${completionRate}%]`, 
      align: 'right',
      color: completionCount === data.fields.length ? '#66ff00' : '#ffffff',
    });
  });
  FIELDS_TO_AGGREGATE3.forEach(field => {
    const completionCount = fieldCompletionCounts[field.label];
    let completionRate = (completionCount * 100 / data.fields.length).toFixed(0);

    // Add some left padding for numbers of 1 or 2 digits
    if (completionRate.length === 1) {
      completionRate = '  ' + completionRate;
    } else if (completionRate.length === 2) {
      completionRate = ' ' + completionRate;
    }

    completionData.push({
      value: `[${completionRate}%]`, 
      align: 'right',
      color: completionCount === data.fields.length ? '#66ff00' : '#ffffff',
    });
  });

  addColumnToStack(bottomStack, completionData);

  return widget;
}

function addColumnToStack(stack, columnData) {
  // console.log(`columnData: ${JSON.stringify(columnData)}`);

  const column = stack.addStack();
  column.layoutVertically();
  column.spacing = VERTICAL_TEXT_SPACING;
  columnData.forEach(cd => addCellToColumn(column, cd));
}

function addCellToColumn(column, data) {
  const cell = column.addStack();
  cell.layoutVertically();
  addTextToStack(cell, data);
}

function addTextToStack(stack, data) {
//   console.log(`addTextToStack, data: ${JSON.stringify(data)}`);
  const { value, color, isBold, align } = data;

  const textLine = stack.addText(value);

  textLine.font = new Font(`Menlo${isBold ? '-Bold' : ''}`, TEXT_SIZE);

  if (color) {
    textLine.textColor = new Color(color);
  }

  if (align === 'center') {
    textLine.centerAlignText();
  } else if (align === 'right') {
    textLine.rightAlignText();
  } else {
    textLine.leftAlignText();
  }
}

/**************************************
 * Fetch Data
 *************************************/

async function fetchData() {

  // Determine day
  let date = new Date();
  if (date.getHours() < 5) {
    date = date.addDays(-1);
  }

  // Format today's date for display
  const dateText = DATE_TEXT_FORMAT.format(date);
  const dateKey = `${date.getFullYear()}_${padNumber(date.getMonth())}_${padNumber(date.getDate())}`;

  const fields = [];

  for (let i = 0; i < NUM_DAYS; i++) {
    const dateCacheKey = `${date.getFullYear()}_${padNumber(date.getMonth())}_${padNumber(date.getDate())}`;
    let dayData = await DAILY_LOG_CACHE.read(dateCacheKey);

    if (!dayData) {
      if (i === 0) {
        // This means it's a new day, so we need to initialize field data and create a new log entry
        console.log(`Cache miss for key=${dateCacheKey}, creating new log entry...`);
        dayData = initializeFields();
        DAILY_LOG_CACHE.write(dateCacheKey, dayData);
      } else {
        console.log(`Cache miss for key=${dateCacheKey}, breaking out of loop...`);
        break;
      }
    }

    fields.push(dayData);

    date = date.addDays(-1);
  }

  console.log(`Got ${fields.length} days of data`);

  return {
    today: fields[0],
    fields,
    dateText,
    dateKey,
  };
}

function initializeFields() {
  const first = FIELDS.map((field) => ({
    label: field.label,
    category: field.category,
    value: '',
  }));
  const second = FIELDS2.map((field) => ({
    label: field.label,
    category: field.category,
    value: '',
  }));
  const third = FIELDS3.map((field) => ({
    label: field.label,
    category: field.category,
    value: '',
  }));
  const all = [first, second, third]
  return all
}

function padNumber(num) {
  return num < 10 ? `0${num}` : num;
}

/**************************************
 * Aggregate Data
 *************************************/

function parseDateFromKey(dateKey) {
  const dateParts = dateKey.split('_');

  return new Date(
    parseInt(dateParts[0]), // year
    parseInt(dateParts[1]), // month (0-indexed)
    parseInt(dateParts[2]), // day of month
  );
}