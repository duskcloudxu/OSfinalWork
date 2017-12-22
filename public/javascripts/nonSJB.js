/**
 * Created by duskcloud on 2017/12/18.
 */
/**
 * Created by duskcloud on 2017/12/12.
 */
$(document).ready(function () {
    console.log(1);
    let numPro;
    $("#NonSJB_pre").click(function () {
        numPro = $("#numPro").val();
        console.log(numPro);
        $("#dataContainer").find("div").remove();
        for (let i = 0; i < numPro; i++) {
            console.log($("#dataContainer"));
            $("#dataContainer").append('  <div class="row flex"> <div class="flex-grow">开始时间</div> <div class="flex-grow">持续时间</div> </div> <div class="row inputGroup"> <div class="col-xs-6 no_padding"> <input type="text" class="startTime form-control"> </div> <div class="col-xs-6 no_padding"> <input type="text" class="lastingTime form-control"> </div></div>')
        }
        $("#NonSJBcalculate").css("display", "block");
    })
    $("#numPro").click(function () {
    })
    $("#NonSJBcalculate").click(function () {
        let res = "";
        res += ("0 ");//flag
        res += (numPro);
        res += (" ");
        for (let i = 0; i < numPro; i++) {
            res += ($(".inputGroup").eq(i).find(".startTime").val());
            res += (" ");
            res += ($(".inputGroup").eq(i).find(".lastingTime").val());
            res += (" ");
        }
        console.log(res);
        $.ajax({
            url: 'http://localhost:3000/home',
            type: 'POST',
            data: {
                res: res,
            },
            success: function (data) {
                $("#viewContainer").find("div").remove();
                $("#identify").find("div").remove();
                $("#stringContainer").find("div").remove();

                let seqStr = data.seq;
                let seqArr = seqStr.split("|");
                let cur = 0;
                for (let item = 0; item < seqArr.length; item++) {
                    let itemArr = seqArr[item].split(",");
                    console.log(itemArr);
                    if (itemArr[0] === "0") continue;
                    $("#viewContainer").append('<div class="flex-grow flex-center alert alert-success">' + 'P' + itemArr[1] + '</div>');
                    $("#identify").append('<div class="flex-grow">' + cur + '</div>');
                    $("#viewContainer").find(".alert").eq(item).css("flex-grow", itemArr[0]);
                    $("#identify").find("div").eq(item).css("flex-grow", itemArr[0]);
                    cur += parseInt(itemArr[0]);
                }
                $("#identify").append('<div style="position: absolute; right: 0" >' + cur + '</div>');
                let stringArr = data.text.split("\n");
                console.log(stringArr);
                for (item in stringArr) {
                    $("#stringContainer").append('<div>' + stringArr[item] + '</div>');
                }
            },
            error: function () {
                console.log("fail");
            }
        });
    });

});

