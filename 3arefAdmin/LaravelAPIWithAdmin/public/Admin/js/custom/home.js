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

// *********** START HOME ***********
function indexC() {
    $.ajax({
        type: 'GET',
        url: url + "Clients",
        dataType: "JSON",
        success: function (data) {
            $("#usersCount").html(data.length);
        }, error: function (response) {
            console.log(response);
        }
    });

    $.ajax({
        type: 'GET',
        url: url + "Comments",
        dataType: "JSON",
        success: function (data) {
            $("#commentsCount").html(data.length);
        }, error: function (response) {
            console.log(response);
        }
    });
    $.ajax({
        type: 'GET',
        url: url + "Clients",
        dataType: "JSON",
        success: function (verified) {
            countV(verified);
            $("#verified").html(countV(verified))
        }, error: function (response) {
            console.log(response);
        }
    });
    $.ajax({
        type: 'GET',
        url: url + "Clients/showVerifiedRequest/1",
        dataType: "JSON",
        success: function (verified) {
            $("#requestsCount").html(verified.length)
        }, error: function (response) {
            console.log(response);
        }
    });
}

function countV(verified) {
    let countVerified = 0
    for (let i in verified) {
        if (verified[i].Verified == "1") {
            countVerified += 1
        }
    }
    return countVerified;
}
// *********** END HOME ***********
// *********** START USERS ***********
function getUsers() {
    $.ajax({
        type: 'GET',
        url: url + "Clients",
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            showUsers(data);
        }, error: function (response) {
            console.log(response);
        }
    });
}

function showUsers(data) {
    let usersHtml = '';

    for (var i in data) {
        usersHtml += `
            <tr id="${data[i].id}">
                <td>${data[i].FullName}</td>
                <td>${data[i].Phone}</td>
                <td>${data[i].Governorate}</td>
                <td>${data[i].City}</td>
                <td>${data[i].Job}</td>
                <td>${data[i].JobTitle}</td>
                <td class="d-flex justify-content-between">
                    <a class="btn btn-info btn-sm" onclick="getGallery(${data[i].id})">معرض الصور</a>
                    <button class="btn btn-danger btn-sm" onclick="getUserID(${data[i].id})"  data-toggle="modal" data-target="#flipFlop">X</button>
                </td>
            </tr>
            `
    }
    $("#UsersTableBody").html(usersHtml);
    $(function () {
        $('#example1').DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Arabic.json"
            }
        }, {
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false
        });
    });
    loader()
}

var normalUserId
function getGallery(id) {
    window.location.href = "userGallery.html?id=" + id
}
function getUserID(id) {
    normalUserId = id
}
function deleteUser() {
    $.ajax({
        type: 'DELETE',
        url: url + "Clients/" + normalUserId,
        dataType: "JSON",
        success: function (data) {
            document.getElementById("close").click();
            alert("تم حذف العميل")
            $("#" + normalUserId).remove()
        }, error: function (response) {
            console.log(response);
        }
    });
}
// })

// *********** END USERS ***********
// *********** START ADMINS ***********
function getAdmins() {
    $.ajax({
        type: 'GET',
        url: url + "Accounts",
        dataType: "JSON",
        success: function (data) {
            showAdmins(data);
        }, error: function (response) {
            console.log(response);
        }
    });

}
function showAdmins(data) {
    let AdminsHtml = '';

    for (var i in data) {
        AdminsHtml += `
        <tr id="${data[i].id}">
            <td>${data[i].UserName}</td>
            <td>${data[i].Role}</td>
            <td class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm mx-3" onclick="getAdminID(${data[i].id})"  data-toggle="modal" data-target="#update">تغيير كلمة المرور</button>
                <button class="btn btn-danger btn-sm" onclick="getAdminID(${data[i].id})"  data-toggle="modal" data-target="#delete">X</button>
            </td>
        </tr>
        `
    }
    $("#adminsTableBody").html(AdminsHtml);
    $(function () {
        $('#example2').DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Arabic.json"
            }
        }, {
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false
        });
    });

    loader()
}
var adId
function getAdminID(id) {
    adId = id

}

function updatePassword() {
    let nPassword = $("#password").val()
    let confirmNPassword = $("#confirmNewPassword").val()
    if (nPassword === confirmNPassword) {
        // use userID to change his password
    } else {
        alert('كلمة المرور غير متطابقة')
    }
}
function createAdmin() {
    let Role = document.querySelector('input[name="r3"]:checked').value;
    let UserName = $("#userName").val()
    let Password = $("#password").val()
    // console.log(type + FullName + Phone + password);

    let newUser = {
        "UserName": UserName,
        "Password": Password,
        "Role": Role,
    }
    console.log(newUser);
    $.ajax({
        type: 'POST',
        url: url + "Accounts",
        dataType: "JSON",
        data: newUser,
        success: function (data) {
            alert('تم اضافة المستخدم')
            location.reload()
        }, error: function (response) {
            console.log(response);
        }
    });

}
function deleteAdmin() {
    $.ajax({
        type: 'DELETE',
        url: url + "Accounts/" + adId,
        dataType: "JSON",
        success: function (data) {
            alert("تم حذف العميل")
            $("#" + adId).remove()
        }, error: function (response) {
            console.log(response);
        }
    });
}
// })

// *********** END ADMINS ***********
// *********** START Reported Comments ***********
function getReported() {
    $.ajax({
        type: 'GET',
        url: url + "Comments",
        dataType: "JSON",
        success: function (data) {
            rc(data);
        }, error: function (response) {
            console.log(response);
        }
    });
}
//CommentFlag

function rc(data) {
    let commentsHtml = '';

    for (var i in data) {
        commentsHtml += `
        <tr id="${data[i].id}">
        <td>${data[i].CommentText}</td>
            
            <td class="d-flex justify-content-end">
                <button class="btn btn-primary btn-sm mx-3" onclick="ignoreReport(${data[i].id})">  تجاهل البلاغ</button>
                <button class="btn btn-danger btn-sm" onclick="getCommentID(${data[i].id})"  data-toggle="modal" data-target="#flipFlop">حذف</button>
            </td>
        </tr>
        `
    }
    $("#tableBodyrc").html(commentsHtml);
    $(function () {
        $('#example3').DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Arabic.json"
            }
        }, {
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false
        });
    });
    loader()
}
let commentID
function getCommentID(id) {
    commentID = id
}
function ignoreReport() {
    $.ajax({
        type: 'PUT',
        url: url + "/Comments/ReportIgnore/" + commentID,
        dataType: "JSON",
        success: function (data) {
            alert('تم تجاهل البلاغ')
            $("#" + commentID).remove()
        }, error: function (response) {
            console.log(response);
        }
    });
    console.log('shit');
}
function deleteComment() {
    $.ajax({
        type: 'DELETE',
        url: url + "Comments/" + commentID,
        dataType: "JSON",
        success: function (data) {
            alert("تم حذف التعليق")
            $("#" + adId).remove()
        }, error: function (response) {
            console.log(response);
        }
    });
}
// *********** END Reported Comments ***********
// *********** Start Verification Requests ***********
function getRequests() {
    $.ajax({
        type: 'GET',
        url: url + "Clients",
        dataType: "JSON",
        success: function (data) {
            showRequests(data);
        }, error: function (response) {
            console.log(response);
        }
    });
}

function showRequests(data) {

    let requestsHtml = '';

    for (var i in data) {
        if (data[i].Verified != "1") {
            requestsHtml += `
            <tr>
            <td>${data[i].FullName}</td>
            <td>${data[i].Phone}</td>
            <td>${data[i].Governorate}</td>
            <td>${data[i].City}</td>
            <td>${data[i].Job}</td>
            <td>${data[i].JobTitle}</td>
                <td class="d-flex justify-content-between">
                    <a class="btn btn-info btn-sm" href = "showRequest.html?id=${data[i].id}">عرض الطلب</a>
                </td>
            </tr>
            `
        }
    }
    $("#requestsTableBody").html(requestsHtml);
    $(function () {
        $('#example4').DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Arabic.json"
            }
        }, {
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false
        });
    });
    loader()
}
// function showRequest(id){
//     window.location.href = "showRequest.html?id="+id
// }
// })

// *********** End Verification Requests ***********
// *********** Start Verified ***********
function getVerified() {
    $.ajax({
        type: 'GET',
        url: url + "Clients",
        dataType: "JSON",
        success: function (data) {
            showVerified(data);
        }, error: function (response) {
            console.log(response);
        }
    });
}

function showVerified(data) {
    let verifiedHtml = '';

    for (var i in data) {
        if (data[i].Verified == "1") {
            verifiedHtml += `
            <tr id="${data[i].id}">
            <td>${data[i].FullName}</td>
            <td>${data[i].Phone}</td>
            <td>${data[i].Governorate}</td>
            <td>${data[i].City}</td>
            <td>${data[i].Job}</td>
            <td>${data[i].JobTitle}</td>
                <td class="d-flex justify-content-between">
                    <a class="btn btn-info btn-sm" onclick="showGallery(${data[i].id})">معرض الصور</a>
                    <button class="btn btn-danger btn-sm" onclick="getVerifiedID(${data[i].id})"  data-toggle="modal" data-target="#flipFlop">X</button>
                </td>
            </tr>
            `
        }
    }
    $("#VerifiedTableBody").html(verifiedHtml);
    $(function () {
        $('#example5').DataTable({
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Arabic.json"
            }
        }, {
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": true,
            "info": true,
            "autoWidth": false
        });
    });
    loader()
}
var verifiedId

function showGallery(id) {
    window.location.href = "userGallery.html?id=" + id
}
function getVerifiedID(id) {
    verifiedId = id
}
function deleteVerified() {
    $.ajax({
        type: 'DELETE',
        url: url + "Clients/" + verifiedId,
        dataType: "JSON",
        success: function (data) {
            alert("تم حذف العميل")
            $("#" + verifiedId).remove()
        }, error: function (response) {
            console.log(response);
        }
    });
}
// *********** End Verified ***********
// *********** Start show Request ***********
function singleUser() {
    let pageUrl = window.location.search;
    let SingleClient = pageUrl.match(/id=([^&]+)/)[1];
    $.ajax({
        type: 'GET',
        url: url + "Clients/" + SingleClient,
        dataType: "JSON",
        success: function (data) {
            console.log(data);
            fillR_Data(data)
        }, error: function (response) {
            console.log(response);
        }
    });
}
function fillR_Data(user) {
    let sum1 =
        (user.Client.Rating5 * 5) +
        (user.Client.Rating4 * 4) +
        (user.Client.Rating3 * 3) +
        (user.Client.Rating2 * 2) +
        (user.Client.Rating1 * 1);
    let sum2 =
        (user.Client.Rating5) +
        (user.Client.Rating4) +
        (user.Client.Rating3) +
        (user.Client.Rating2) +
        (user.Client.Rating1);
    let percent = Math.round((sum1 / sum2) * 2) / 2;
    let attach = '';
    for (var i in user.Documents) {
        attach +=
            `<div class="col-sm-12">
                <div class="user-block">
                  <img class="img-responsive" src="${user.Documents[i].Document}" alt="Photo">
                </div>
                <p>
                  ${user.Documents[i].Brief}
                </p>
            </div>
            `
    }

    $("#attach").html(attach);

    $("#name").html(user.Client.FullName);
    $("#profilePhoto").attr("src", user.Client.ProfilePhoto);
    $("#job").html(user.Client.Job)
    $("#phone").html('<i class="fa fa-book margin-r-5 text-primary"></i> الهاتف: ' + user.Client.Phone)
    $("#location").html('<i class="fa fa-map-marker margin-r-5 text-primary"></i> الموقع: ' + user.Client.Governorate + '/' + user.Client.City + '/' + user.Client.Location)
    $("#rate").html('<i class="fa fa-star margin-r-5 text-warning"></i> متوسط التقييم: ' + percent)
    $("#bio").html('<i class="fa fa-file-text-o margin-r-5 text-primary"></i> السيرة: ' + user.Client.Bio)
    $("#workDays").html('<i class="fa fa-calendar margin-r-5 text-primary"></i> أيام العمل : ' + user.WorkingDays)
    $("#workNote").html('<i class="fa fa-file-text-o margin-r-5 text-primary"></i> ملاحظات العمل : ' + user.Client.NoteWork)
    $("#views").html('<i class="fa fa-eye margin-r-5 text-success"></i> اجمالي المشاهدات: ' + user.Client.CountOfViewers)
    $("#comments").html('<i class="fa fa-comment margin-r-5 text-success"></i> اجمالي التعليقات: ' + user.Client.CountOfComments)
    $("#calls").html('<i class="fa fa-phone margin-r-5 text-success"></i> اجمالي المكالمات: ' + user.Client.CountOfPhone)

    loader()
}
// *********** End show Request ***********
function acceptRequest() {
    let pageUrl = window.location.search;
    let userId = pageUrl.match(/id=([^&]+)/)[1];
    let acceptRequestUser = { "Verified": 1 }
    console.log(acceptRequestUser);
    $.ajax({
        type: 'PUT',
        url: url + "Clients/" + userId,
        dataType: "JSON",
        data: acceptRequestUser,
        success: function (data) {
            alert('تم التوثيق')
            window.location.href = 'verifyRequests.html'
        }, error: function (response) {
            console.log(response);
        }
    });
}
function denyRequest() {
    let pageUrl = window.location.search;
    let userId = pageUrl.match(/id=([^&]+)/)[1];
}