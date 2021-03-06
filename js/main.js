
// SVG drawing area

var margin = {top: 40, right: 10, bottom: 60, left: 60};

var width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

// Date parser to convert strings to date objects
var parseYear = d3.timeParse("%Y");

// Maps
var immigrationWorldMap;
var immigrationUsMap;

//Trendline
var trendline;
var trendline2;
var trendlineCountryData;


var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo, Republic", "Congo, the Democratic Republic of the","Cook Islands","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia, Federated States","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestinian Territory, Occupied","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre and Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts and Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela", "Vietnam","Virgin Islands, U.S.","Yemen","Zambia","Zimbabwe"];



// read work visa
queue()
    .defer(d3.csv,"cleaned-data/work_visa_trends_2007_2017/work_visa_total.csv")
    .defer(d3.csv,"cleaned-data/work_visa_trends_2007_2017/work_visa_edu.csv")
    .defer(d3.csv,"cleaned-data/work_visa_trends_2007_2017/work_visa_age.csv")
    .defer(d3.csv,"cleaned-data/work_visa_trends_2007_2017/work_visa_salary.csv")
    .defer(d3.csv,"cleaned-data/work_visa_trends_2007_2017/work_visa_occupation.csv")
    .defer(d3.csv,"cleaned-data/work_visa_trends_2007_2017/work_visa_industry.csv")
    .await(createWorkVis);

function createWorkVis(error, workTotal,eduTotal,ageTotal,salaryTotal,occupationTotal,industryTotal){
    if(error) { console.log(error); }


    //need to transpose the data
    dataTotal=transpose(workTotal,"Category");

    //metrics
    //work visa metrics
    // var workMetrics1 = [
    //     { key: "Education", title: "Education", data: transpose(eduTotal,"Education")},
    //     { key: "Age", title: "Age", data:transpose(ageTotal,"Age")}
    // ];
    //
    // var workMetrics2 = [
    //     { key: "Salary", title: "Salary", data: transpose(salaryTotal,"Salary")},
    //     { key: "Occupation", title: "Occupation" , data: transpose(occupationTotal,"Occupation")}
    // ];
    //
    // var workMetrics3 = [
    //     { key: "Industry", title: "Industry (Top 15)", data: transpose(industryTotal,"Industry")}
    // ];


    eduMetric = [
        { key: "Education", title: "Education", data: transpose(eduTotal,"Education")}
    ];
    ageMetric = [
        { key: "Age", title: "Age", data: transpose(ageTotal,"Age")}
    ];
    salaryMetric= [
        { key: "Salary", title: "Salary", data: transpose(salaryTotal,"Salary")}
    ];
    occupationMetric = [
        { key: "Occupation", title: "Occupation" , data: transpose(occupationTotal,"Occupation")}
    ];
    industryMetric = [
        { key: "Industry", title: "Industry (Top 15)", data: transpose(industryTotal,"Industry")}
    ];



    //make an area chart for total number of work visas
    areachart = new AreaChart("work_map_area", dataTotal);


    // make a bar chart for each variable in configs
    // barcharts1 = workMetrics1.map(function(name) {
    //     return new BarChart("work_details_area1", name.data, name.title);
    // })
    //
    // barcharts2 = workMetrics2.map(function(name) {
    //     return new BarChart("work_details_area2", name.data, name.title);
    // });
    //
    // barcharts3 = workMetrics3.map(function(name) {
    //     return new BarChart("work_details_area3", name.data, name.title);
    // });

    //barchart = new BarChart("work_details_area1",transpose(selValue.toLowerCase()+Total))
    //console.log(selValue.toLowerCase()+"Total");
    //make the Trump trendline Chart
    //console.log(dataTotal)
    //trendline= new TrendLine("trump_trendlines_area", dataTotal);

    //display default barchart
    userSelect("Education");
}

// update each time user selects a different value
function userSelect(value){
    //get user selected barchart
   // selValue = d3.select("#barChartArea").property("value");
    selValue= value;

    //console.log(ageMetric[0]);

    if(selValue === "Education"){
        selBarChart = eduMetric.map(function(name) {
            return new BarChart("work_details_area1", name.data, name.title);
        });
    }else if(selValue === "Age"){
        selBarChart = ageMetric.map(function(name) {
            return new BarChart("work_details_area1", name.data, name.title);
        });
    }else if(selValue === "Salary"){
        selBarChart = salaryMetric.map(function(name) {
            return new BarChart("work_details_area1", name.data, name.title);
        });
    }else if(selValue === "Occupation"){
        selBarChart = occupationMetric.map(function(name) {
            return new BarChart("work_details_area1", name.data, name.title);
        });
    }else if(selValue === "Industry"){
        selBarChart = industryMetric.map(function(name) {
            return new BarChart("work_details_area1", name.data, name.title);
        });
    }else{
        //remove all graphics
        d3.selectAll("#work_details_area1 > *").remove();
    }

    //display default
    selBarChart.forEach(function(d){
        d.selectionChanged(
            areachart.x.domain()
        )
    });

    //reset to remove brush
    d3.selectAll("#work_map_area").select("svg").remove();
    areachart = new AreaChart("work_map_area", dataTotal);
}

// React to 'brushed' event and update all bar charts
function brushed() {

    // * TO-DO *
    // Get the extent of the current brush
    var selectionRange = d3.brushSelection(d3.select(".brush").node());

    // Convert the extent into the corresponding domain values
    var selectionDomain = selectionRange.map(areachart.x.invert);

    var barCharts = [selBarChart];

    barCharts.forEach(function(barChart){
        barChart.forEach(function(barChartDisplay){
            barChartDisplay.selectionChanged(
                d3.event.selection === null  ?  areachart.x.domain() : selectionDomain
            );
        });
    });


    // barcharts1.forEach(function(barchart) {
    //     barchart.selectionChanged(
    //         d3.event.selection === null  ? areachart.x.domain() : selectionDomain
    //     );
    // })

}

//function for transposing (work visa trends) data
function transpose(data, category)
{
    var data_t=[];
    data.forEach(function(d,index){
        counter = 0;
        for (var key in d){
            var obj = {};
            if(key !== category) {
                if(index==0) {
                    obj.year = key;
                    obj[d[category]] = Number(d[key].replace(/,/g, ""));
                    data_t.push(obj);
                }else{
                    var obj_temp={};
                    obj_temp[d[category]] = Number(d[key].replace(/,/g, ""));
                    data_t[counter]=Object.assign(obj_temp, data_t[counter]);
                    counter++;
                }
            }
        }
    });
    return data_t;
}


var timelineData;


//this will become a queue when we all merge together
loadData();

function loadData() {

    d3.csv("data/immigration-policy.csv", function (data) {

        data.forEach(function (d) {
            d.Date = +d.Date;
        });

        timelineData = data;

    });

    // Maps
    queue()
        .defer(d3.json, 'data/world-110m.json')
        .defer(d3.tsv, 'data/world-country-names.tsv')
        .defer(d3.json, 'data/us-states.json')
        .defer(d3.csv, 'data/h1b-by-state-2016-2017.csv')
        .defer(d3.csv, 'cleaned-data/country-approvals-clean.csv')
        .defer(d3.csv, 'cleaned-data/h2a-country-approvals-clean.csv')
        .defer(d3.csv, 'cleaned-data/h2b-country-approvals-clean.csv')
        .defer(d3.csv, 'cleaned-data/countries-info-data.csv')
        .await(createVis)

}

function createVis(error, worldMapData, countryNames, usMapData, immigrationByState, immigrationByCountryData, h2aData, h2bData, countriesInfo) {

    //give the country names to the automplete var
  //  countryNamesAutomplete=countryNames;
    //console.log(countryNamesAutomplete)
    //create timeline chart
    timeline=new timelineChart("timeline_area", timelineData);

    immigrationWorldMap = new Map('world_map_area', [immigrationByCountryData, h2aData, h2bData, countriesInfo], {
        map: worldMapData,
        names: countryNames,
        mapType: 'world'
    });

    immigrationUsMap = new Map('states_map_area', [immigrationByState], {
        map: usMapData,
        mapType: 'us'
    });
}

function updateTimeline(value) {
    timeline.updateVis(value, timelineData)
}

function updateWorldMap() {
    immigrationWorldMap.updateVis();
}

function updateUsMap() {
    immigrationUsMap.updateVis();
}

queue()
    .defer(d3.csv,"cleaned-data/h1b-country-approvals-clean.csv")
    .defer(d3.csv,"cleaned-data/h2a-country-approvals-clean.csv")
    .defer(d3.csv,"cleaned-data/h2b-country-approvals-clean.csv")
    .await(countryTrendline);


function countryTrendline(error, h1aData, h2aData, h2bData) {

    h1aDatasetComplete=h1aData;
    h2aDatasetComplete=h2aData;
    h2bDatasetComplete=h2bData;

    var h1aDataset=[];
    var h2aDataset=[];
    var h2bDataset=[];


    //initialize with a random country
    country="World"

    //clean and process the datasets for display
    h1aDataset=wrangleCountryData(country, h1aData);
    h2aDataset=wrangleCountryData(country, h2aData);
    h2bDataset=wrangleCountryData(country, h2bData);


    trendline2= new CountryTrendLine("trump_country_trendlines_area", h1aDataset, h2aDataset, h2bDataset, country);

}


function wrangleCountryData(country, data) {

    //console.log(country, data)
    var parseDate = d3.timeParse("%Y");

    var values=[];

    //filter for user selection
    var currentCountry = data.filter(function (d) {
        return d.Country == country;
    })

    var keys = Object.keys(currentCountry[0]);


    keys.forEach(function (d) {

        if (d != 'Country' && d != 'Region') {
            value = currentCountry[0][d]
            //    console.log(d, value)
            datapoint = {}
            datapoint['year'] = parseDate(+d);
            datapoint['approvals'] = parseFloat(value.replace(/,/g, ''));
            values.push(datapoint)
        }
    })

    return values;
}


function updateTrendline() {

    var country = document.getElementById('myInput').value;

    var h1aDataset=[];
    var h2aDataset=[];
    var h2bDataset=[];


    h1aDataset=wrangleCountryData(country, h1aDatasetComplete);
    h2aDataset=wrangleCountryData(country, h2aDatasetComplete);
    h2bDataset=wrangleCountryData(country, h2bDatasetComplete);

    trendline2.updateVis(h1aDataset, h2aDataset, h2bDataset, country)

}

//global variables to store visa data
var h1aDatasetComplete=[];
var h2aDatasetComplete=[];
var h2bDatasetComplete=[];


//**************//
// AUTOCOMPLETE CODE from w3 schools //
// **************//
function autocomplete(inp, arr) {

    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

//mouse over effects for text and visualizations
function applicationsMouseOver(){
    $( ".trendline1" ).addClass( "activeLine" );
}

function approvalsMouseOver(){
    $( ".trendline2" ).addClass( "activeLine" );
}

function trendlineTextMouseOut(){
    $( ".trendline1" ).removeClass( "activeLine" );
    $( ".trendline2" ).removeClass( "activeLine" );
}

function H1BMouseOver(){
    $( ".countryline1" ).addClass( "activeLine" );
}

function H2AMouseOver(){
    $( ".countryline2" ).addClass( "activeLine" );
}

function H2BMouseOver(){
    $( ".countryline3" ).addClass( "activeLine" );
}

function VisaTrendlineMouseOut(){
    $( ".countryline1" ).removeClass( "activeLine" );
    $( ".countryline2" ).removeClass( "activeLine" );
    $( ".countryline3" ).removeClass( "activeLine" );
}

// Toggle for world maps
$("#world-map-toggle-btns input:radio").change(function() {
    var optionValue = $(this).val();
    immigrationWorldMap.currentlyDisplayedVisaType = optionValue;
    immigrationWorldMap.filterData(optionValue);
});

$('#world-map-selection-label').html('Year: ' + $('#world-map-selection').val());
$('#world-map-selection').on('input', function() {
    $('#world-map-selection-label').html('Year: ' + $('#world-map-selection').val());
})

$('#us-map-selection-label').html('Year: ' + $('#us-map-selection').val());
$('#us-map-selection').on('input', function() {
    $('#us-map-selection-label').html('Year: ' + $('#us-map-selection').val());
})