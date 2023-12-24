$(document).ready(function () {

    sym_array = []
    // $('.select2:eq(0)').select2({
    //     theme: 'bootstrap4', // Use the Bootstrap 4 theme
    //     width: '100%',       // Set the width of the select box
    // });
    $('.select2').each(function (index) {
        // Generate a unique id for each select element (e.g., select2_1, select2_2, etc.)
        var uniqueId = 'select2_' + (index + 1);

        // Set the id attribute for the current select element
        $(this).attr('id', uniqueId);

        // Apply select2 initialization to the current select element
        $(this).select2({
            theme: 'bootstrap4', // Use the Bootstrap 4 theme
            width: '100%',
        });
    });
    // $('.select2:eq(1)').select2({
    //     theme: 'bootstrap4', // Use the Bootstrap 4 theme
    //     width: '100%',       // Set the width of the select box
    // });
    // $('.select2:eq(2)').select2({
    //     theme: 'bootstrap4', // Use the Bootstrap 4 theme
    //     width: '100%',       // Set the width of the select box
    // });
    // $('.select2:eq(3)').select2({
    //     theme: 'bootstrap4', // Use the Bootstrap 4 theme
    //     width: '100%',       // Set the width of the select box
    // });
    // $('.select2:eq(4)').select2({
    //     theme: 'bootstrap4', // Use the Bootstrap 4 theme
    //     width: '100%',       // Set the width of the select box
    // });
    // for (let i = 1; i <= 17; i++) {
    //     // Construct the selector for each select element
    //     let selector = '.select2:eq(' + (i - 1) + ')';

    //     // Apply select2 initialization to the current select element
    //     $(selector).select2({
    //         // Your select2 configuration options here
    //         theme: 'bootstrap4', // Use the Bootstrap 4 theme
    //         width: '100%',
    //     });
    // }

    $('select').each(function (i) {
        $('#select_22').select2({
            theme: 'bootstrap4', // Use the Bootstrap 4 theme
            width: '100%',       // Set the width of the select box
        });
        t = $(this)
        cls = t.attr('class');

        $(t).change(function () {


            // var cls = cls[i + 2];
            var currentClassName = $(this).attr('class').split(' ')[2];
            // alert(currentClassName)


            var match = currentClassName.match(/\d+/);
            if (match[0] == 17) {
                $('.predict_dept').show()
                alert("This is your last symptom select. You can not select more")
            }
            else {


                // alert(match)
                if (match) {
                    // Increment the number by 1
                    var incrementedNumber = parseInt(match[0]) + 1;
                    // alert(incrementedNumber)

                    // Replace the old number with the incremented number
                    var newContent = currentClassName.replace(/\d+/, incrementedNumber);
                    // alert(newContent)

                    // Set the updated content back to the element
                    // $('#example').text(newContent);
                }
                // alert('form_group' + incrementedNumber)

                if (incrementedNumber > 5) {
                    var userResponse = prompt('Do you want to give more symptoms? (y/n)', '');
                    // var confirmed = confirm('Do you want to give more symtomp');
                    if (userResponse == 'y') {
                        // alert("yes")
                        // alert('.form_group' + incrementedNumber)
                        $('.form_group' + incrementedNumber).show()
                        $('.predict_dept').hide()
                    }
                    else {
                        $('.predict_dept').show()
                        $('.form_group' + incrementedNumber).hide()
                    }
                }
                else {
                    $('.form_group' + incrementedNumber).show()

                }


                selectedOption = $('.select_box1').find('option:selected').text();
                selectedOption2 = $(this).find('option:selected').text();
                sym_array.push(selectedOption)
                sym_array.push(selectedOption2)


                $.ajax({
                    url: '/prediction/get_data/',
                    data: { selected_option: selectedOption },
                    dataType: 'json',
                    success: function (data) {
                        // Process the data as needed
                        console.log();
                        // var symptomData = data.data[0];
                        // console.log(symptomData)
                        var selectBox = $('.' + newContent);  // Replace with the actual ID of your select box
                        selectBox.empty();  // Clear previous options
                        // var yourVariable = "I don't have something";

                        // if (yourVariable.indexOf("I don't have") !== -1) {
                        //     // The string "I don't have" is present in yourVariable
                        //     console.log("The string is present.");
                        // } else {
                        //     // The string is not present in yourVariable
                        //     console.log("The string is not present.");
                        // }
                        selectBox.append($('<option>', {
                            value: '0',
                            text: "Select Another Symptom"
                        }));
                        for (i = 0; i < data.data.length; i++) {
                            var symptomData = data.data[i];

                            // console.log(symptomData)
                            for (j = 1; j < 18; j++) {
                                console.log(j)
                                var symptomValue = symptomData['symptom' + j];
                                if (symptomValue == selectedOption2 || symptomValue.indexOf("I don't have") !== -1 || $.inArray(symptomValue, sym_array) !== -1) {
                                    console.log("okay")
                                    continue;
                                }
                                else {
                                    // console.log(symptomValue)
                                    selectBox.append($('<option>', {
                                        value: symptomValue,
                                        text: symptomValue
                                    }));
                                }

                            }
                        }
                    },
                    error: function (error) {
                        console.error('Error:', error);
                    }
                });
            }
        });

    });

    $('.predict_dept').click(function (e) {
        e.preventDefault()
        var selectedValues = $(".select_box option:selected").map(function () {
            return $(this).text();
        }).get();
        console.log("select values", selectedValues)
        const resultString = selectedValues.join(";");
        console.log("select values str", resultString)
        var dataArray = [];
        dept_status = ''
        final_result = ''

        // Loop through selected values and create an object for each
        // $.each(selectedValues, function (index, value) {
        //     dataArray.push({ 'selectedValue': value });
        // });
        // console.log(dataArray)
        $.ajax({
            url: '/prediction/get_dept_data/',
            method: 'GET',
            data: { selectedValues: selectedValues },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                // Process the data as needed
                console.log(data.status);
                dept_status = data.status
                final_result = "Based on your selected symptom we would like to recommend you to visit the department: " + data.status
                $('.result_pred').show()
                $('.result_pred').text("Based on your selected symptom we would like to recommend you to visit the department: " + data.status)

                $.ajax({
                    url: '/prediction/send_history_data/',
                    method: 'GET',
                    data: { 'dept': resultString, 'depart_status': dept_status, 'final_result': final_result },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        // Process the data as needed
                        console.log(data.message);
                        // dept_status = data.status
                        // final_result = "Based on your selected symptom we would like to recommend you to visit the department: " + data.status
                        // $('.result_pred').show()
                        // $('.result_pred').text("Based on your selected symptom we would like to recommend you to visit the department: " + data.status)
                        // var symptomData = data.data[0];
                        // console.log(symptomData)
                        // var selectBox = $('.' + newContent);  // Replace with the actual ID of your select box
                        // selectBox.empty();  // Clear previous options
                        // var yourVariable = "I don't have something";

                        // if (yourVariable.indexOf("I don't have") !== -1) {
                        //     // The string "I don't have" is present in yourVariable
                        //     console.log("The string is present.");
                        // } else {
                        //     // The string is not present in yourVariable
                        //     console.log("The string is not present.");
                        // }

                        // for (i = 0; i < data.data.length; i++) {
                        //     var symptomData = data.data[i];
                        //     // console.log(symptomData)
                        //     for (j = 1; j < 18; j++) {
                        //         console.log(j)
                        //         var symptomValue = symptomData['symptom' + j];
                        //         if (symptomValue == selectedOption2 || symptomValue.indexOf("I don't have") !== -1 || $.inArray(symptomValue, sym_array) !== -1) {
                        //             console.log("okay")
                        //             continue;
                        //         }
                        //         else {
                        //             // console.log(symptomValue)
                        //             selectBox.append($('<option>', {
                        //                 value: symptomValue,
                        //                 text: symptomValue
                        //             }));
                        //         }

                        //     }
                        // }
                    },
                    error: function (error) {
                        $('.result_pred').hide()
                        console.error('Error:', error);
                    }
                });
                // var symptomData = data.data[0];
                // console.log(symptomData)
                // var selectBox = $('.' + newContent);  // Replace with the actual ID of your select box
                // selectBox.empty();  // Clear previous options
                // var yourVariable = "I don't have something";

                // if (yourVariable.indexOf("I don't have") !== -1) {
                //     // The string "I don't have" is present in yourVariable
                //     console.log("The string is present.");
                // } else {
                //     // The string is not present in yourVariable
                //     console.log("The string is not present.");
                // }

                // for (i = 0; i < data.data.length; i++) {
                //     var symptomData = data.data[i];
                //     // console.log(symptomData)
                //     for (j = 1; j < 18; j++) {
                //         console.log(j)
                //         var symptomValue = symptomData['symptom' + j];
                //         if (symptomValue == selectedOption2 || symptomValue.indexOf("I don't have") !== -1 || $.inArray(symptomValue, sym_array) !== -1) {
                //             console.log("okay")
                //             continue;
                //         }
                //         else {
                //             // console.log(symptomValue)
                //             selectBox.append($('<option>', {
                //                 value: symptomValue,
                //                 text: symptomValue
                //             }));
                //         }

                //     }
                // }
            },
            error: function (error) {
                $('.result_pred').hide()
                console.error('Error:', error);
            }
        });




    });
});