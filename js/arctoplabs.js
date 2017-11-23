/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appName = "demo";
var url = 'https://api.masterdatanode.com/' + appName + '/survey/';
var access_token = '######access_token###########';  //'######access_token###########'
var content_type = 'application/json';
var html5survey = {};
html5survey.voteResult = function () {

    var SendInfo = {"aggregate": {
            "groupby": "Survey",
            "agg": [
                {
                    "type": "sum",
                    "column": "ecosystem"
                },
                {
                    "type": "sum",
                    "column": "dataoncloud"
                },
                {
                    "type": "sum",
                    "column": "restservice"
                }
            ]
        }};
    $.ajax({
        url: url + 'aggregate',
        type: 'post',
//                        data: {},
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type
        },
        dataType: 'json',
        success: function (data) {
            var count = 0;
            console.info(JSON.stringify(data));
            //$("#test_div").html(JSON.stringify(data));
//            $("#test_div").show();
            var obj = JSON.parse(JSON.stringify(data));
            /* for(var i = 0; i < obj.result.length; i++) {
             var obj1 = data[i];
             
             console.log(obj1.id);
             } */
            //var mytable =  $('#example').DataTable();
            var result = $.parseJSON(JSON.stringify(obj.result));
            console.info(JSON.stringify(obj.result));






            var resultArray = [];
            var color = [];
            var name = [];
            var label;
            $.each(result, function (k, jsonObject) {
                resultArray.push(jsonObject.sum_ecosystem);
                name.push("Ecosystem");
                resultArray.push(jsonObject.sum_dataoncloud);
                name.push("Data on Cloud");
                resultArray.push(jsonObject.sum_restservice);
                name.push("Rest Service");
//                color.push(jsonObject.color);
                label = jsonObject._id;
//                count++;

            });
//            alert(resultArray);
            var ctx = document.getElementById("myChart");
            var chartarea = document.getElementById("chart-area");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: name, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                            label: label,
                            data: resultArray, // [12, 19, 3, 5, 2, 3],
//                            backgroundColor: 
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                },
                options: {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                    }
                }
            });


            // Chart Area for Pie
            var mychartarea = new Chart(chartarea, {
                type: 'pie',
                data: {
                    labels: name, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
//                            label: '# of Votes',
                            data: resultArray, // [12, 19, 3, 5, 2, 3],
//                            backgroundColor: 
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                            label: label
                        }]
                },
                options: {
                    responsive: true
                }
            });


        }

    });
};


html5survey.reviewPositive = function () {

    var SendInfo = {"sort": {
            "rating": "desc"
        },
        "limit": "5"
    };
    $.ajax({
        url: url + 'find',
        type: 'post',
//                        data: {},
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type
        },
        dataType: 'json',
        success: function (data) {
            var count = 0;
            console.info(JSON.stringify(data));
            //$("#test_div").html(JSON.stringify(data));
//            $("#test_div").show();
            var obj = JSON.parse(JSON.stringify(data));
            /* for(var i = 0; i < obj.result.length; i++) {
             var obj1 = data[i];
             
             console.log(obj1.id);
             } */
            //var mytable =  $('#example').DataTable();
            var result = $.parseJSON(JSON.stringify(obj.result));
            console.info(JSON.stringify(obj.result));
            $('#positive').append('<div id="page0" class="col-md-6">Rating</div><div id="page0comment" class="col-md-6">Commnet</div>');
            
            $.each(result, function (k, jsonObject) {

                count++;
                // .... add all the values required
                console.info(jsonObject);
//                note_index = i;
                rating = jsonObject.rating;
                comment = jsonObject.Comment;
                // get color and rotation level
                $('#positive').append('<div id="page' + count + '" class="col-md-6">' + rating + '</div><div id="page' + count + 'comment" class="col-md-6">' + comment + '</div>');
               
            });


        }

    });




};


html5survey.reviewNegative = function () {

    var SendInfo = {"sort": {
            "rating": "asc"
        },
        "limit": "5"
    };
    $.ajax({
        url: url + 'find',
        type: 'post',
//                        data: {},
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type
        },
        dataType: 'json',
        success: function (data) {
            var count = 0;
            console.info(JSON.stringify(data));
            //$("#test_div").html(JSON.stringify(data));
//            $("#test_div").show();
            var obj = JSON.parse(JSON.stringify(data));
            /* for(var i = 0; i < obj.result.length; i++) {
             var obj1 = data[i];
             
             console.log(obj1.id);
             } */
            //var mytable =  $('#example').DataTable();
            var result = $.parseJSON(JSON.stringify(obj.result));
            console.info(JSON.stringify(obj.result));
            $('#negative').append('<div id="page0" class="col-md-6">Rating</div><div id="page0comment" class="col-md-6">Commnet</div>');

            $.each(result, function (k, jsonObject) {

                count++;
                // .... add all the values required
                console.info(jsonObject);
//                note_index = i;
                rating = jsonObject.rating;
                comment = jsonObject.Comment;
                // get color and rotation level
                $('#negative').append('<div id="page' + count + '" class="col-md-6">' + rating + '</div><div id="page' + count + 'comment" class="col-md-6"> ' + comment + '</div>')

            });


        }

    });




};


html5survey.showMessage = function (bgcolor, color, msg) {
    if (!$('#smsg').is(':visible'))
    {
        $('html, body').animate({
            scrollTop: 0
        }, 500, function () {
            if (!$('#smsg').length)
            {
                $('<div id="smsg">' + msg + '</div>').appendTo($('body')).css({
                    position: 'absolute',
                    top: 0,
                    left: 3,
                    width: '98%',
                    height: '50px',
                    lineHeight: '30px',
                    background: bgcolor,
                    color: color,
                    zIndex: 1000,
                    padding: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    opacity: 0.9,
                    margin: 'auto',
                    display: 'none'
                }).slideDown('show');
                setTimeout(function () {
                    $('#smsg').animate({'width': 'hide'}, function () {
                        $('#smsg').remove();
                    });
                }, 4000);
                $(".btn-primary").addClass('disabled');
                $(".btn-warning").removeClass('disabled');
            }
        });
    }
};

