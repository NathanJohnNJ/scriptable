const healthFields = [
    { label: 'Enough Sleep', color: '#10FC0C' },
    { label: 'Shower', color: '#10FC0C' },
    { label: 'Exercised', color: '#10FC0C' },
    { label: 'Vitamins', color: '#10FC0C' },
  ]
  const workFields = [
    { label: 'Job Hunt', color: '#FFCCCC' },
    { label: 'Upskill', color: '#FFCCCC' },
  ]
  const personalFields = [
    { label: 'Smart Home', color: '#CCCCFF' },
    { label: 'General Code', color: '#CCCCFF' },
    { label: 'Raspberry Pi', color: '#CCCCFF' },
  ];
  
  const DATE_TEXT_FORMAT = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short', 
    day: 'numeric',
    month: 'short', 
  });
  
  const SHORT_DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
    weekday: 'narrow', 
  })
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const Cache = importModule('Cache');
  const logs = importModule('DLFunc');

  const personalCache = new Cache('personalCache');
  const healthCache = new Cache('healthCache');
  const workCache = new Cache('workCache');
  
  const healthData = await fetchData(healthFields, healthCache);
  const workData = await fetchData(workFields, workCache);
  const personalData = await fetchData(personalFields, personalCache);

  async function fetchData(dataFields, cache) {
    let date = new Date();
    if (date.getHours() < 5) {
      date = date.addDays(-1);
    }
    const dateText = DATE_TEXT_FORMAT.format(date);
    const dateKey = `${padNumber(date.getDate())}_${padNumber(date.getMonth())}_${date.getFullYear()}`;
    const fields = [];
    for (let i = 0; i < 5; i++) {
      const dateCacheKey =  `${padNumber(date.getDate())}_${padNumber(date.getMonth())}_${date.getFullYear()}`;
      let dayData = await cache.read(dateCacheKey);
      if (!dayData) {
        if (i === 0) {
          console.log(`Cache miss for key=${dateCacheKey}, creating new log entry...`);
          dayData = initializeFields(dataFields);
          cache.write(dateCacheKey, dayData);
        } else {
          console.log(`Cache miss for key=${dateCacheKey}, breaking out of loop...`);
          break;
        }
      }
      fields.push(dayData);
      date = date.addDays(-1);
      console.log('dayData = ', dayData)
    }
    console.log(`Got ${fields.length} days of data`);
    return {
      today: fields[0],
      fields,
      dateText,
      dateKey,
    };
  }

  function initializeFields(dataFields) {
    console.log('hello from initialize fields for', dataFields)
    return dataFields.map((field) => ({
    label: field.label,
    color: field.color,
    value: '',
    }));
}
// dataFields.today dataFields.fields dataFields.dateText dataFields.dateKey passed to processData
  processData(healthData, healthCache);
  processData(workData, workCache);
  processData(personalData, personalCache);
  
  async function processData(data, cache){
  if (config.runsInApp) {
    const alert = createAlert(data.dateText, data.today);
    const response = await alert.present();
    if (response === 0) {
      console.log('Cancel was pressed... doing nothing');
    } else if (response === 1) {
        console.log('Submit was pressed');
        const updatedFields = [];
        for (let i = 0; i < data.fields.length; i++) {
            const value = alert.textFieldValue(i);
            updatedFields.push({
                label: data.fields[i].label, 
                color: data.fields[i].color, 
                value, 
            });
        }
        cache.write(data.dateKey, updatedFields);
        data.today = updatedFields;
        data.fields[0] = updatedFields;
    }
  }
}

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
  
  const widget = createWidget(healthData, workData, personalData);
  Script.setWidget(widget);
  Script.complete();

  function createWidget(healthData, workData, personalData) {
    const widget = new ListWidget();
    const bgColor = new LinearGradient();
    bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
    bgColor.locations = [0.0, 1.0];
    widget.backgroundGradient = bgColor;
    widget.setPadding(5, 5, 5, 5);
    const stack = widget.addStack();
    stack.layoutVertically();
    const topStack = stack.addStack();
    topStack.layoutHorizontally();
    const titleTextLine = topStack.addText(`Daily Logs`);
    titleTextLine.textColor = Color.dynamic(Color.white(),Color.black());
    titleTextLine.font = new Font('Menlo-Bold', 15);
    topStack.addSpacer(10);
    
    const bottomStack = stack.addStack();
    bottomStack.layoutVertically();
    const firstLabelStack = bottomStack.addStack();
    firstLabelStack.layoutHorizontally();
    addHeading(firstLabelStack, 'Health:')
    const dayStack = stack.addStack()
    // One column per day
  const dataByDay = healthData.fields.reverse();
    let date = parseDateFromKey(healthData.dateKey);
    date = date.addDays(-1 * (dataByDay.length - 1));
    dataByDay.forEach(dayData => {
      const columnData = [];
      columnData.unshift({
        value: `${SHORT_DATE_FORMAT.format(date)}`,
        isBold: true,
        align: 'center',  
      });
      addColumnToStack(dayStack, columnData);
      dayStack.addSpacer(2);
      date = date.addDays(1);
      })
    logs.addLogs(healthFields, bottomStack, healthData, date)
    addHeading(bottomStack, 'Coding - Work:')
    logs.addLogs(workFields, bottomStack, workData, date)
    addHeading(bottomStack, 'Coding - Personal:')
    logs.addLogs(personalFields, bottomStack, personalData, date)
    return widget;
  }
    function addHeading(stack, text){
        let textHandle = stack.addText(text);
        textHandle.font = Font.heavyMonospacedSystemFont(12);
        textHandle.textColor = Color.dynamic(Color.white(),Color.black());
        textHandle.leftAlignText();
        return textHandle;
    }
    function padNumber(num) {
        return num < 10 ? `0${num}` : num;
    }
    function parseDateFromKey(dateKey) {
        const dateParts = dateKey.split('_');
        return new Date(
        parseInt(dateParts[0]), // year
        parseInt(dateParts[1]), // month (0-indexed)
        parseInt(dateParts[2]), // day of month
        );
    }
    function addColumnToStack(stack, columnData) {
        const column = stack.addStack();
        column.layoutVertically();
        column.spacing = 5;
        columnData.forEach(cd => addCellToColumn(column, cd));
    }
    function addCellToColumn(column, data) {
        const cell = column.addStack();
        cell.layoutVertically();
        addTextToStack(cell, data);
    }
    function addTextToStack(stack, data) {
        const { value, color, isBold, align } = data;
        const textLine = stack.addText(value);
        textLine.font = new Font(`Menlo${isBold ? '-Bold' : ''}`, 12);
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
    