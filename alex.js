var myPythonScriptPath = 'seed.py';

// Use python shell
var {PythonShell} = require('python-shell');
var pyshell = new PythonShell(myPythonScriptPath);

function getDate(dateString) {
    var extractedDate = dateString.toString().split(' ')[0].replace(/\'/, "");
    return extractedDate;
}

function oneDayBigger(start, end) {
    var startSplit = start.split('-');
    var startYear = startSplit[0];
    var startMonth = startSplit[1];
    var startDate = parseInt(startSplit[2]);
    
    var endSplit = end.split('-');
    var endYear = endSplit[0];
    var endMonth = endSplit[1];
    var endDate = parseInt(endSplit[2]);

    return ((startYear == endYear)
        && (startMonth == endMonth)
        && ((startDate + 1) == endDate));
}

pyshell.on('message', function (seed) {
    // received a message sent from the Python script (a simple "print" statement)
    // store the seed record, ensure this can be iterated
    var arraySeed = seed.replace(/\[/, "").split(", ");

    //alex: remove the time 
    var arraySeedDate = new Array();
    var i = 0;
    arraySeed.forEach(element2 => {
        arraySeedDate[i] = getDate(element2);
        i++;
    });

    arraySeedDate.sort();
    
    var start = new Array();
    var end = new Array();
    var length = new Array();

    var rn = 0; // record number
    start[rn] = arraySeedDate[rn];
    end[rn] = arraySeedDate[rn];
    length[rn] = 1; // counter of consecutive days

    for(var i=1; i<arraySeedDate.length; i++)
    {
        if (end[rn] == arraySeedDate[i])
        {
            continue;
        }
        else if (oneDayBigger(end[rn], arraySeedDate[i]))
        {
            length[rn] = length[rn] + 1;
            end[rn] = arraySeedDate[i];
        }
        else
        {
            rn = rn + 1;
            start[rn] = arraySeedDate[i];
            end[rn] = arraySeedDate[i];
            length[rn] = 1;
        }
    }

    // result sorted by length descendingly
    console.log("START\t\tEND\t\tLENGTH")

    for(var i=0; i<=rn; i++)
    {
        console.log(start[i], '\t', end[i], '\t', length[i])
    }
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
    if (err){
        throw err;
    };

//    console.log('finished');
});
