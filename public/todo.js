
function addToDo(input) {// get user id and input of to do send to the server to save in the db
    $.ajax({
        method: "POST",
        url: '/users/' + user._id + '/trips/' + currentTripId + '/todos', //check the path to trip id
        data: { text: input },
        dataType: 'json',
        success: function (data) {
            console.log(`to do have saved`);
        },
        complete: function () {
            fetchUser(user.email, user.name);
            console.log(user);
            //renderToDo();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}

function renderToDo() {
    for (var i = 0; i < user.trips.length; i++) {
        if (user.trips[i]._id == currentTripId) {
            var source = $('#post-todo').html();
            var template = Handlebars.compile(source);
            $(".toDoUl").empty();
            var newHTML = template(user.trips[i]);
            $('.toDoUl').append(newHTML);
            //post-todo
            //handelbar
            break;
        }
    }

}


$('.submitToDo').on('click', function () { //click on the to do button get the data from the form 
    var toDoInput = $("#todoInput").val();
    
    if (toDoInput === "") {
        alert("please enter a valid To Do");
    } else {
        console.log('here2');
        addToDo(toDoInput);
        
    }
})

$('.toDoBtn').on('click', function () { //click on the to do button get the data from the form 
    $('.toDo').toggle();
    //renderToDo();//need to add when pushing a country
})

