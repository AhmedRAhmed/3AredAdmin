var url = 'https://laravel.3arefapp.com/public/api/';
let user = JSON.parse(localStorage.getItem("loggedUser"));

function checkLogin(func) {
    if (user == null || user == '') {
        window.location.href = 'login.html'
    }
    console.log(user);
    var loggedUser = user.UserName
    $("#loggedUser").html(loggedUser)
    func()

}
function logout() {
    localStorage.clear();
    window.location.href = 'login.html'
}
function loader() {
    document.onreadystatechange = function () {
        if (document.readyState !== "complete") {
            document.querySelector(".wrapper").style.visibility = "hidden";
            document.querySelector("#loader").style.visibility = "visible";
        } else {
            document.querySelector("#loader").style.display = "none";
            document.querySelector(".wrapper").style.visibility = "visible";
        }
    };
}
document.onreadystatechange = function () {
    document.onreadystatechange = function () {
        if (document.readyState !== "complete") {
            document.querySelector(".wrapper").style.visibility = "hidden";
            document.querySelector("#loader").style.visibility = "visible";
        } else {
            document.querySelector("#loader").style.display = "none";
            document.querySelector(".wrapper").style.visibility = "visible";
        }
    };
};

// *********** START Governs ***********
function getGovern() {
    $.ajax({
        type: 'GET',
        url: url + "Governorates",
        dataType: "JSON",
        success: function (data) {
            showGovern(data);
        }, error: function (response) {
            console.log(response);
        }
    });
}
function showGovern(data) {
    let governHtml = '';

    for (var i in data) {
        governHtml += `
        <tr id="${data[i].id}">
            <td>${data[i].Governorates}</td>
            <td class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm mx-3" onclick="getGovernId(${data[i].id})"  data-toggle="modal" data-target="#update">  تعديل</button>
                <button class="btn btn-danger btn-sm" onclick="getGovernId(${data[i].id})"  data-toggle="modal" data-target="#delete">X</button>
            </td>
        </tr>
        `
    }
    $("#governTableBody").html(governHtml);
    $(function () {
        $('#example1').DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Arabic.json"
            }
        }, {
            "paging": true,"lengthChange": false, "searching": false,"ordering": true,"info": true,"autoWidth": false
        });
    });

    loader()
}
var gdId
function getGovernId(id) {
    gdId = id

}

function updateGovern() {
    let governNewName = $("#governNewName").val()
    $.ajax({
        type: 'POST',
        url: url + "Governorates/"+gdId,
        dataType: "JSON",
        data: governNewName,
        success: function (data) {
            alert('تم  حفظ التغييرات')
            location.reload()
        }, error: function (response) {
            console.log(response);
        }
    });
}
function createGovern() {
    let governName = $("#governName").val()
    let newGovern = {"Governorates": governName}
    $.ajax({
        type: 'POST',
        url: url + "Governorates",
        dataType: "JSON",
        data: newGovern,
        success: function (data) {
            alert('تم اضافة المحافظة')
            location.reload()
        }, error: function (response) {
            console.log(response);
        }
    });

}
function deleteGovern() {
    $.ajax({
        type: 'DELETE',
        url: url + "Governorates/" + gdId,
        dataType: "JSON",
        success: function (data) {
            alert("تم حذف المحافظة")
            $("#" + gdId).remove()
        }, error: function (response) {
            console.log(response);
        }
    });
}
// *********** END Govern ***********

// *********** START City ***********
function geCities() {
    $.ajax({
        type: 'GET',
        url: url + "Cities",
        dataType: "JSON",
        success: function (data) {
            showCity(data);
        }, error: function (response) {
            console.log(response);
        }
    });
}
function showCity(data) {
    let cityHtml = '';
    for (var i in data) {
        cityHtml += `
        <tr id="${data[i].id}">
            <td>${data[i].GovernoratesCity}</td>
            <td class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm mx-3" onclick="getCityId(${data[i].id})"  data-toggle="modal" data-target="#update">  تعديل</button>
                <button class="btn btn-danger btn-sm" onclick="getCityId(${data[i].id})"  data-toggle="modal" data-target="#delete">X</button>
            </td>
        </tr>
        `
    }
    $("#cityTableBody").html(cityHtml);
    $(function () {
        $('#example2').DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Arabic.json"
            }
        }, {
            "paging": true,"lengthChange": false, "searching": false,"ordering": true,"info": true,"autoWidth": false
        });
    });

    loader()
    $.ajax({
        type: 'GET',
        url: url + "Governorates",
        dataType: "JSON",
        success: function (lis) {
            goversList(lis)
        }, error: function (response) {
            console.log(response);
        }
    });

}
function goversList(lis){
    let list = '';
    for (var i in lis) {
        list += ` <option value="${lis[i].id}">${lis[i].Governorates}</option> `
    }
    $(".goversList").html(list);  
       
}
var cId
function getCityId(id) {
    cId = id
    getGovern();
}

function updateCity() {
    let governNewName = $("#cityNewName").val()
    let governNew = $("#governNew").val()

    $.ajax({
        type: 'POST',
        url: url + "Cities/"+cId,
        dataType: "JSON",
        data: governNewName,
        success: function (data) {
            alert('تم  حفظ التغييرات')
            location.reload()
        }, error: function (response) {
            console.log(response);
        }
    });
}
function createCity() {
    let cityName = $("#cityName").val()
    let govern = $("#govern").val()
    let newCity = {"Cities": cityName,"GovernoratesId":govern}
    console.log(newCity);
    $.ajax({
        type: 'POST',
        url: url + "Cities",
        dataType: "JSON",
        data: newCity,
        success: function (data) {
            alert('تم اضافة المدينة')
            location.reload()
        }, error: function (response) {
            console.log(response);
        }
    });

}
function deleteGovern() {
    $.ajax({
        type: 'DELETE',
        url: url + "Cities/" + cId,
        dataType: "JSON",
        success: function (data) {
            alert("تم حذف المدينة")
            $("#" + cId).remove()
        }, error: function (response) {
            console.log(response);
        }
    });
}
// })

// *********** END City ***********
// *********** START Specialty ***********
function getSpecial() {
    $.ajax({
        type: 'GET',
        url: url + "Jobs",
        dataType: "JSON",
        success: function (data) {
            showJobs(data);
        }, error: function (response) {
            console.log(response);
        }
    });
}
function showJobs(data) {
    let jobsHtml = '';

    for (var i in data) {
        jobsHtml += `
        <tr id="${data[i].id}">
            <td>${data[i].JobName}</td>
            <td class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm mx-3" onclick="getJobId(${data[i].id})"  data-toggle="modal" data-target="#update">  تعديل</button>
                <button class="btn btn-danger btn-sm" onclick="getJobId(${data[i].id})"  data-toggle="modal" data-target="#delete">X</button>
            </td>
        </tr>
        `
    }
    $("#jobsTableBody").html(jobsHtml);
    $(function () {
        $('#example3').DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Arabic.json"
            }
        }, {
            "paging": true,"lengthChange": false, "searching": false,"ordering": true,"info": true,"autoWidth": false
        });
    });

    loader()
}
var jId
function getJobId(id) {
    jId = id

}
function updateJob() {
    let jobNewName = $("#jobNewName").val()
    let jobNewType = $("#jobNewType").val()
    let newJob = {"JobName": jobNewName,"JobType":jobNewType}
    $.ajax({
        type: 'POST',
        url: url + "Jobs/"+jId,
        dataType: "JSON",
        data: jobNewName,
        success: function (data) {
            alert('تم  حفظ التغييرات')
            location.reload()
        }, error: function (response) {
            console.log(response);
        }
    });
}
function createJob() {
    let jobName = $("#jobName").val()
    let jobType = $("#jobType").val()
    let newJob = {"JobName": jobName,"JobType":jobType}
    $.ajax({
        type: 'POST',
        url: url + "Jobs",
        dataType: "JSON",
        data: newJob,
        success: function (data) {
            alert('تم اضافة التخصص')
            location.reload()
        }, error: function (response) {
            console.log(response);
        }
    });
}
function deleteJob() {
    $.ajax({
        type: 'DELETE',
        url: url + "Jobs/" + jId,
        dataType: "JSON",
        success: function (data) {
            alert("تم حذف التخصص")
            $("#" + jId).remove()
        }, error: function (response) {
            console.log(response);
        }
    });
}
// *********** END Specialty ***********
// *********** START JobsTitle ***********
function getJobsTitle() {
    $.ajax({
        type: 'GET',
        url: url + "JobsTitle",
        dataType: "JSON",
        success: function (data) {
            showJobsTitle(data);
        }, error: function (response) {
            console.log(response);
        }
    });
}
function showJobsTitle(data) {
    let jobTitleHtml = '';
    for (var i in data) {
        jobTitleHtml += `
        <tr id="${data[i].id}">
            <td>${data[i].JobTitle}</td>
            <td class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm mx-3" onclick="getJobTitleId(${data[i].id})"  data-toggle="modal" data-target="#update">  تعديل</button>
                <button class="btn btn-danger btn-sm" onclick="getJobTitleId(${data[i].id})"  data-toggle="modal" data-target="#delete">X</button>
            </td>
        </tr>
        `
    }
    $("#jobTitleTableBody").html(jobTitleHtml);
    $(function () {
        $('#example4').DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Arabic.json"
            }
        }, {
            "paging": true,"lengthChange": false, "searching": false,"ordering": true,"info": true,"autoWidth": false
        });
    });

    loader()
    $.ajax({
        type: 'GET',
        url: url + "Jobs",
        dataType: "JSON",
        success: function (jo) {
            jobsList(jo)
        }, error: function (response) {
            console.log(response);
        }
    });

}
function jobsList(jo){
    let list = '';
    for (var i in jo) {
        list += ` <option value="${jo[i].id}">${jo[i].JobName}</option> `
    }
    $(".jobsList").html(list);  
       
}
var jTId
function getJobTitleId(id) {
    jTId = id
}

function updateJobTitle() {
    let newJobTitleName = $("#newJobTitleName").val()
    let newJob = $("#newJob").val()
    let newJobTitle = {"JobTitle": newJobTitleName,"JobId":newJob}
    $.ajax({
        type: 'POST',
        url: url + "JobsTitle/"+jTId,
        dataType: "JSON",
        data: newJobTitle,
        success: function (data) {
            alert('تم  حفظ التغييرات')
            location.reload()
        }, error: function (response) {
            console.log(response);
        }
    });
}
function createJobTitle() {
    let jobTitleName = $("#jobTitleName").val()
    let job = $("#job").val()
    let newJobTitle = {"JobTitle": jobTitleName,"JobId":job}
    console.log(newJobTitle);
    $.ajax({
        type: 'POST',
        url: url + "JobsTitle",
        dataType: "JSON",
        data: newCity,
        success: function (data) {
            alert('تم اضافة الوظيفة')
            location.reload()
        }, error: function (response) {
            console.log(response);
        }
    });

}
function deleteJobTitle() {
    $.ajax({
        type: 'DELETE',
        url: url + "JobsTitle/" + jTId,
        dataType: "JSON",
        success: function (data) {
            alert("تم حذف الوظيفه")
            $("#" + jTId).remove()
        }, error: function (response) {
            console.log(response);
        }
    });
}
// })

// *********** END JobsTitle ***********