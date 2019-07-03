$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
	saveData();
});

$("ul").on("click", "span",function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
		saveData();
	})
	event.stopPropagation();
});

$("#newToDo").keypress(function(event){
	if(event.which === 13){
		var todoText = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fas fa-minus'></i></span> " + todoText + "</li>");
		saveData();
	}
});

$("#minimize").on("click", function(){
	$("#newToDo").slideToggle(500);
	$("#minimize").toggleClass("fas fa-plus");
	$("#minimize").toggleClass("fas fa-minus");
})



/// save/cookie function /// (its longer than the code that makes the todo list work....)

var myCookie = getCookie("Cookie");
if(myCookie != null){ // if there exists a cookie
	console.log("cookie time");
	var arr = JSON.parse(myCookie);

	$("ul").empty();
	for (var i=0;i < arr.length; i++){ // adds from cookie into todolist depending if it's 'completed' or not
		if(arr[i][0] === "1"){		   // data format: "0 onion","1 hotdog" || 1 is 'completed' 0 is not
			$("ul").append("<li class='completed'><span><i class='fas fa-minus'></i></span> " + arr[i].slice(2) + "</li>");
		} else {										// string has to be sliced as first 2 characters is data format
			$("ul").append("<li><span><i class='fas fa-minus'></i></span> " + arr[i].slice(2) + "</li>");
		}
	}
}

function saveData(){ // saves the current state of the todos onto the cookie
					 // function is called whenever a change is made to the todo list
	var arr = [];
	var ul = document.querySelectorAll("li")

	for (var i=0;i < ul.length;i++){  // checks if its a 'completed' item and adds a marker
		var todoInfo = "0";
		if($(ul[i]).hasClass("completed")){
			todoInfo = "1";
		}
		arr.push(todoInfo + ul[i].textContent);
	}

	var json_str = JSON.stringify(arr); // saves data into cookie
	createCookie('Cookie', json_str, 31);
}

///////////////////////////////////////////////////////////
/////////// helper functions stole from the net ///////////
///////////////////////////////////////////////////////////

var createCookie = function(name, value, days){
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name){
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
}

//////////////////////////////////////////////////////////////