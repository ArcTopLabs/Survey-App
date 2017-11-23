/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var appName = "demo";
var url = 'https://api.masterdatanode.com/' + appName + '/survey/';
var access_token = '######access_token###########';  //'######access_token###########'
var content_type = 'application/json';

Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";


var json = {
    pages: [
        {
            elements: [
                {
                    type: "radiogroup",
                    choices: [
                        {
                            value: "0",
                            text: "NO"
                        },
                        {
                            value: "1",
                            text: "YES"
                        }
                    ],
                    isRequired: true,
                    name: "ecosystem",
                    title: "MasterDataNode is an Ecosystem ?"
                },
                {
                    type: "radiogroup",
                    choices: [
                        {
                            value: "0",
                            text: "NO"
                        },
                        {
                            value: "1",
                            text: "YES"
                        }
                    ],
                    isRequired: true,
                    name: "dataoncloud",
                    title: "MasterDataNode is a Data On Cloud Solution ?"
                },
                {
                    type: "radiogroup",
                    choices: [
                        {
                            value: "0",
                            text: "NO"
                        },
                        {
                            value: "1",
                            text: "YES"
                        }
                    ],
                    isRequired: true,
                    name: "restservice",
                    title: "MasterDataNode uses Rest Service to connect on top of HTTP/HTTPS ?"
                },
                {
                    type: "rating",
                    isRequired: true,
                    name: "rating",
                    title: "Rate ease of doing transaction using webservice of MasterDataNode Ecosystem ?"
                },
                {
                    type: "comment",
                    name: "Comment",
                    title: "Comments : "
                }
            ],
            name: "Feedback"
        }
    ]
};

window.survey = new Survey.Model(json);


survey.onComplete.add(function (result) {
//    alert(result.data.comment);
    var postRequest = {};
    
    var resultArray = {};
    resultArray["Survey"] = "MasterDataNode";
    var keys = Object.keys(result.data);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key == "Comment") {
            resultArray[key] = result.data[key];

        } else {
            resultArray[key] = parseInt(result.data[key]);
        }
        console.log(key, result.data[key]);
    }
    postRequest["data"] = Array(resultArray);
    var data = JSON.stringify(result.data);

    var SendInfo = JSON.stringify(postRequest);
//    alert(SendInfo);
    $.ajax({
        url: url + 'save',
        type: 'post',
        data: SendInfo,
        headers: {
            "access_token": access_token, // '##############access_token#####################',
            "Content-Type": content_type

        },
        dataType: 'json',
        success: function (data) {
            console.info(JSON.stringify(data));
//            document.querySelector('#surveyResult').innerHTML = "Your data is been successfully recorded with us";
            $("#surveyResult").html("<h3>Your data is been successfully recorded with us</h3>");
        },
        error: function (xhr, thrownError) {
            alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            html5sticky.showMessage('#9BED87', 'black', 'Vote added successfully to ' + name + '.  <small>Click Vote Again to re-vote.</small>');
//            alert(thrownError);
        }
    });

});


$("#surveyElement").Survey({
    model: survey
});
