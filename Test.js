const healthFields = [
    { label: 'Enough Sleep', color: '#10FC0C' },
    { label: 'Shower', color: '#10FC0C' },
    { label: 'Exercised', color: '#10FC0C' },
    { label: 'Vitamins', color: '#10FC0C' },
  ]
  const workFields = [
    { label: 'Vegetables', color: '#FFCCCC' },
    { label: 'Caffeine', color: '#FFCCCC' },
  ]
  const personalFields = [
    { label: 'Happy', color: '#CCCCFF' },
    { label: 'Sad', color: '#CCCCFF' },
  ];
  
  const DAILY_LOG_CACHE_NAME = 'DailyLogs';
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
  const DAILY_LOG_CACHE = new Cache(DAILY_LOG_CACHE_NAME);
  let logs = importModule('DLFunc');
  
  const healthData = await fetchData(healthFields);
  const workData = await fetchData(workFields);
  const personalData = await fetchData(personalFields);
  processData(healthData)
  processData(workData)
  processData(personalData)
  
  const widget = createWidget(healthData, workData, personalData);
  Script.setWidget(widget);
  Script.complete();
  
  async function processData(data){
  if (config.runsInApp) {
    const alert = createAlert(data.dateText, data.today);
    const response = await alert.present();
    if (response === 0) {
      console.log('Cancel was pressed... doing nothing');
    } else if (response === 1) {
        console.log('Submit was pressed');
        const updatedFields = [];
        for (let i = 0; i < fields.length; i++) {
          const value = alert.textFieldValue(i);
          updatedFields.push({
            label: fields[i].label, 
            color: fields[i].color, 
            value, 
          });
        }
        DAILY_LOG_CACHE.write(data.dateKey, updatedFields);
        data.today = updatedFields;
        data.fields[0] = updatedFields;
    }
  }
  }
  
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
    addHeading(bottomStack, 'Health:')
    logs.addLogs(healthFields, bottomStack, healthData)
    addHeading(bottomStack, 'Coding - Work:')
    logs.addLogs(workFields, bottomStack, workData)
    addHeading(bottomStack, 'Coding - Personal:')
    logs.addLogs(personalFields, bottomStack, personalData)
    return widget;
  }
  
  function addHeading(stack, text){
      let textHandle = stack.addText(text);
      textHandle.font = Font.heavyMonospacedSystemFont(12);
      textHandle.textColor = Color.dynamic(Color.white(),Color.black());
      textHandle.leftAlignText();
      return textHandle;
  }
  
  async function fetchData(dataFields) {
      let date = new Date();
      if (date.getHours() < 5) {
        date = date.addDays(-1);
      }
      const dateText = DATE_TEXT_FORMAT.format(date);
      const dateKey = `${date.getFullYear()}_${padNumber(date.getMonth())}_${padNumber(date.getDate())}`;
      const fields = [];
      for (let i = 0; i < 5; i++) {
        const dateCacheKey = `${date.getFullYear()}_${padNumber(date.getMonth())}_${padNumber(date.getDate())}`;
        let dayData = await DAILY_LOG_CACHE.read(dateCacheKey);
        if (!dayData) {
          if (i === 0) {
            console.log(`Cache miss for key=${dateCacheKey}, creating new log entry...`);
            dayData = initializeFields(dataFields);
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
    function initializeFields(dataFields) {
      return dataFields.map((field) => ({
        label: field.label,
        color: field.color,
        value: '',
      }));
    }
    function padNumber(num) {
      return num < 10 ? `0${num}` : num;
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