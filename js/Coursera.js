$(document).ready(() => {
    $('select').on('contentChanged', function () {
        $(this).formSelect();
        $('.select-dropdown').addClass('white-text');
        $('.dropdown-content').css('background', 'rgba(25, 28, 29, 0.95)');
    });

    $("#faculty").on('change', () => {
        getSchools();
    })

    $("#school").on('change', () => {
        getPrograms();
    })

    $("#name,#prn").on('focus', () => {
        $(".clogo").slideUp();
        $(".f2").slideDown();
        
    });
    $.getJSON("js/faculties.json", data => {
        data.forEach(element => {
            $("#faculty").append(`<option value='${element}'>${element}</option>`);
        });

        $('#faculty').trigger('contentChanged');
    });

    $("#reg-form").on('submit', (e) => {
        if (!validate()) {
            e.preventDefault();
        }
    })

    $('select').formSelect();
    $('.select-dropdown').addClass('white-text');
    $('.dropdown-content').css('background', 'rgba(25, 28, 29, 0.95)');
});

function getSchools() {

    $.getJSON("js/schools.json", data => {
        let faculty = $("#faculty").val();
        $("#school").html("");
        data[faculty].forEach((element, index) => {
            $("#school").append(`<option value="${element[0]}"  >${element[1]}</option>`);
        });

        $('#school').trigger('contentChanged');
    });

    getPrograms();

    $('.field').slideDown();


}

function getPrograms() {
    $.getJSON("js/programs.json", data => {
        let school = $("#school").val();
        $("#program").html("");
        data[school].forEach(element => {
            $("#program").append(`<option value="${element[0]}" >${element[1]}</option>`);
        });

        $('#program').trigger('contentChanged');
    })
}

function validate() {
    var res = true;

    if ($("#name").val().split(" ").length <= 1) {
        M.toast({ html: "Please enter full name" });
        res = false;
    }

    if ($("#faculty").val() == "") {
        M.toast({ html: "Please select Faculty" });
        res = false;
    }
    
    let phone=$("#phno").val();
    if (phone.length != 10 || phone.match(/^\d+$/)==null) {
        M.toast({html:"Please enter the correct phone number"});
        res=false;
    }
    
    let prn= $("#prn").val()
    if (prn.length != 10 || prn.match(/^\d+$/)==null) {
        M.toast({html:"Please enter the correct PRN"});
        res=false;
    }

    return res;
}

$("#reg-form").submit( e => {
    e.preventDefault();
    let validflag=true;
    validflag=validate();

    let emailContent=`PratikIsGay`;
    

    if (validflag) {
        data= {
            'name':$("#name").val(),
            'email':$("#email").val(),
            'phone':$("#phno").val(),
            'prn':$("#prn").val(),
            'faculty':$("#faculty").val(),
            'school':$("#school").val(),
            'program':$("#program").val(),
            'year':$("#year").val(),
            'emailContent':emailContent
        }
        $.post("https://hades.thescriptgroup.in/submit",
            data,
            (data,status) => {
                console.log(data);
                $("#reg-form").reset();
            }
        )
    }
})