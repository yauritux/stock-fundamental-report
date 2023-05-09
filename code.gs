var cc = DataStudioApp.createCommunityConnector();

function isAdminUser() {
  return true;
}

function getAuthType() {
  var AuthTypes = cc.AuthType;
  return cc
    .newAuthTypeResponse()
    .setAuthType(AuthTypes.NONE)
    .build();
}

function getConfig(request) {
  var config = cc.getConfig();  

  config.newInfo()
    .setId('instructions')
    .setText('Enter the API-Key, Company Symbol on Stock Market, and the Report Type');

  config.newTextInput()
    .setId('apiKey')
    .setName('Enter the API Key')
    .setHelpText('e.g. Get your own API-key from alphavantage.co ');

  config.newTextInput()
    .setId('companySymbol')
    .setName('Enter the Company symbol as listed on the stock market')
    .setHelpText('e.g. IBM, MSFT, NFLX, IT')
    .setPlaceholder('IBM');

  config.newTextInput()
    .setId('reportType')
    .setName('Enter type of report')
    .setHelpText('e.g. annualReports, quarterlyReports')
    .setPlaceholder('annualReports');

  return config.build();
}

function getFields(request) {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;
  
  fields.newDimension()
    .setId('fiscalDateEnding')
    .setType(types.YEAR_MONTH_DAY);

  fields.newDimension()
    .setId('reportedCurrency')
    .setType(types.TEXT);

  fields.newMetric()
    .setId('grossProfit')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('totalRevenue')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('costOfRevenue')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('costofGoodsAndServicesSold')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('operatingIncome')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('sellingGeneralAndAdministrative')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);
  
  fields.newMetric()
    .setId('researchAndDevelopment')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('operatingExpenses')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('investmentIncomeNet')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('netInterestIncome')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('interestIncome')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('interestExpense')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('nonInterestIncome')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('otherNonOperatingIncome')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('depreciation')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('depreciationAndAmortization')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('incomeBeforeTax')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('incomeTaxExpense')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('interestAndDebtExpense')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('netIncomeFromContinuingOperations')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('comprehensiveIncomeNetOfTax')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('ebit')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('ebitda')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  fields.newMetric()
    .setId('netIncome')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);
      
  return fields;
}

function getSchema(request) {
  var fields = getFields(request).build();
  return { schema: fields };
}

function responseToRows(requestedFields, response) {  
  // Transform parsed data and filter for requested fields
  return response.map(function(data) {
    var row = [];
    requestedFields.asArray().forEach(function (field) {
      switch (field.getId()) {
        case 'fiscalDateEnding':
          return row.push(data.fiscalDateEnding.replace(/-/g, ''));
        case 'reportedCurrency':
          return row.push(data.reportedCurrency);
        case 'grossProfit':
          return row.push(data.grossProfit);
        case 'totalRevenue':
          return row.push(data.totalRevenue);
        case 'costOfRevenue':
          return row.push(data.costOfRevenue);
        case 'costofGoodsAndServicesSold':
          return row.push(data.costofGoodsAndServicesSold);
        case 'operatingIncome':
          return row.push(data.operatingIncome);
        case 'sellingGeneralAndAdministrative':
          return row.push(data.sellingGeneralAndAdministrative);
        case 'researchAndDevelopment':
          return row.push(data.researchAndDevelopment);
        case 'operatingExpenses':
          return row.push(data.operatingExpenses);
        case 'investmentIncomeNet':
          return row.push(data.investmentIncomeNet);
        case 'netInterestIncome':
          return row.push(data.netInterestIncome);
        case 'interestIncome':
          return row.push(data.interestIncome);
        case 'interestExpense':
          return row.push(data.interestExpense);
        case 'nonInterestIncome':
          return row.push(data.nonInterestIncome);
        case 'otherNonOperatingIncome':
          return row.push(data.otherNonOperatingIncome);
        case 'depreciation':
          return row.push(data.depreciation);
        case 'depreciationAndAmortization':
          return row.push(data.depreciationAndAmortization);
        case 'incomeBeforeTax':
          return row.push(data.incomeBeforeTax);
        case 'incomeTaxExpense':
          return row.push(data.incomeTaxExpense);
        case 'interestAndDebtExpense':
          return row.push(data.interestAndDebtExpense);
        case 'netIncomeFromContinuingOperations':
          return row.push(data.netIncomeFromContinuingOperations);
        case 'comprehensiveIncomeNetOfTax':
          return row.push(data.comprehensiveIncomeNetOfTax);
        case 'ebit':
          return row.push(data.ebit);
        case 'ebitda':
          return row.push(data.ebitda);
        case 'netIncome':
          return row.push(data.netIncome);
        default:
          return row.push('');
      }
    });
    return { values: row };
  });
}

function getData(request) {
  var requestedFieldIds = request.fields.map(function(field) {
    return field.name;
  });
  var requestedFields = getFields().forIds(requestedFieldIds);

  var url = ['https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=',
    request.configParams.companySymbol,
    '&apikey=',
    request.configParams.apiKey];
  Logger.log('calling ' + url);
  try {
    var response = UrlFetchApp.fetch(url.join(''));
    var parsedResponse = JSON.parse(response).annualReports;
    var rows = responseToRows(requestedFields, parsedResponse);

    Logger.log(rows);

    return {
      schema: requestedFields.build(),
      rows: rows
    };
  } catch (e) {
    DataStudioApp.createCommunityConnector()
      .newUserError()
      .setDebugText('Error fetching data from API. Exception details: ' + e)
      .setText('There was an error communicating with the service. Try again later, or file an issue if this error persists.')
      .throwException();
  }
}

