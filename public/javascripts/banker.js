/**
 * Created by duskcloud on 2017/12/18.
 */
/**
 * Created by duskcloud on 2017/12/12.
 */
$(document).ready(function () {
    console.log(1);
    let numPro;
    let numRes;
    $("#bankerPre").click(function () {
        numPro = $("#numPro").val();
        numRes = $("#numRes").val();
        $("#remainRes").find(".panel-body").find("div").remove();
        $("#occupiedRes").find(".panel-body").find("div").remove();
        $("#maxRes").find(".panel-body").find("div").remove();
        $("#requestContainer").find(".row").eq(0).find("div").remove();
        $("#requestContainer").find(".row").eq(1).find("input").remove();
        $("#remainRes").find(".panel-body").append('<div class="flex row"></div>');
        $("#maxRes").find(".panel-body").append('<div class="flex row"></div>');
        $("#occupiedRes").find(".panel-body").append('<div class="flex row"></div>');

        $("#occupiedRes").find(".panel-body").find(".row").eq(0).append('<div class="flex-center flex-grow">' + " " + '</div>');
        $("#maxRes").find(".panel-body").find(".row").eq(0).append('<div class="flex-center flex-grow">' + " " + '</div>');

        for (let item = 1; item <= numRes; item++) {
            $("#remainRes").find(".panel-body").find(".row").eq(0).append('<div class="flex-center flex-grow remainRes">' + item + '</div>');
            $("#occupiedRes").find(".panel-body").find(".row").eq(0).append('<div class="flex-center flex-grow occuRes">' + item + '</div>');
            $("#maxRes").find(".panel-body").find(".row").eq(0).append('<div class="flex-center flex-grow">' + item + '</div>');
            $("#requestContainer").find(".row").eq(0).append('<div class="flex-center flex-grow">' + item + '</div>');

        }
        $("#remainRes").find(".panel-body").append('<div class="flex row"></div>');
        for (let item = 1; item <= numRes; item++) {
            $("#remainRes").find(".panel-body").find(".row").eq(1).append('<input class="flex-center radius flex-grow normal"/>');
            $("#requestContainer").find(".row").eq(1).append('<input class="flex-center radius flex-grow request"/>');

        }
        for (let i = 1; i <= numPro; i++) {
            $("#maxRes").find(".panel-body").append('<div class="flex row"></div>');
            $("#occupiedRes").find(".panel-body").append('<div class="flex row"></div>');
            $("#occupiedRes").find(".panel-body").find(".row").eq(i).append('<div class="flex-center flex-grow">' + "P" + i + '</div>');
            $("#maxRes").find(".panel-body").find(".row").eq(i).append('<div class="flex-center flex-grow">' + "P" + i + '</div>');
            for (let j = 1; j <= numRes; j++) {
                $("#occupiedRes").find(".panel-body").find(".row").eq(i).append('<input class="flex-center radius flex-grow normal"/>');
                $("#maxRes").find(".panel-body").find(".row").eq(i).append('<input class="flex-center radius flex-grow normal"/>');
            }

        }
        $("#bankerRandom").css("display", "block");
    });
    $("#bankerRandom").click(function () {
        for (let i = 2; i < $(".container").find('.normal').length; i++) {
            $("body").find('.normal').eq(i).val(Math.floor(Math.random() * (10 - 1) + 1));
        }
    })
    $("#bankerStandard").click(function () {
        let standArr = [5, 3, 3, 3, 2, 0, 1, 0, 2, 0, 0, 3, 0, 2, 2, 1, 1, 0, 0, 2, 7, 5, 3, 3, 2, 2, 9, 0, 2, 2, 2, 2, 4, 3, 3];
        for (let i = 0; i < $(".container").find('.normal').length; i++) {
            $("body").find('.normal').eq(i).val(standArr[i]);
        }
        $("#bankerPre").click();
        for (let i = 2; i < $(".container").find('.normal').length; i++) {
            $("body").find('.normal').eq(i).val(standArr[i]);
        }
    });
    $("#bankerRequest").click(function () {
        let targetPro = $("#requestID").val();
        for (let i = 0; i < numRes; i++) {
            let originRaw = $("#remainRes").find(".panel-body").find(".row").eq(1).find("input").eq(i).val();
            let add = $("#requestContainer").find(".row").eq(1).find("input").eq(i).val();
            let originOcu = $("#occupiedRes").find(".panel-body").find(".row").eq(targetPro).find("input").eq(i).val();
            let originMax = $("#maxRes").find(".panel-body").find(".row").eq(targetPro).find("input").eq(i).val();
            let sum = parseInt(originRaw) - parseInt(add);
            let newValue = parseInt(originOcu) + parseInt(add);
            if(parseInt(originMax)<newValue)
            {
                alert("超出最大需求");
                return;
            }
            if(parseInt(sum)<0){
                alert("现有资源无法满足请求");
                return
            }
            $("#remainRes").find(".panel-body").find(".row").eq(1).find("input").eq(i).val(sum);
            $("#occupiedRes").find(".panel-body").find(".row").eq(targetPro).find("input").eq(i).val(newValue);
        }

    })
    $("#bankerCalculate").click(function () {
        let res = "";
        for (let i = 0; i < $(".container").find('input').length; i++) {
            res += ($("body").find('.normal').eq(i).val() + " ");
        }
        console.log(res);
        $.ajax({
            url: 'http://localhost:3000/test',
            type: 'POST',
            data: {
                res: res,
            },
            success: function (data) {
                console.log(data);
                $("#stringContainer").find("div").remove();
                let stringArr = data.split("\n");
                console.log(stringArr);
                for (item in stringArr) {
                    if (item != stringArr.length - 1)
                        $("#stringContainer").append('<div class="alert alert-success">' + stringArr[item] + '</div>');
                }
                if (data === "") {
                    $("#stringContainer").append('<div>' + "安全序列不存在！" + '</div>');
                }
            },
            error: function () {
                console.log("fail");
            }
        });
    });

});

