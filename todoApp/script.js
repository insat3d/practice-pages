/*
Todos-----------
strike thru on click - toggle - done
delete on trash can - done
trash can hover effect - done
add new on plus - done
add new on enter - done

Optional---------
move completed todos to the bottom - done
add new todos on the top - done
*/

init();

function init() {
	// click event - plus and enter - addNew
	$(".addNew").on("click", function() {
		addTodo();
	});
	$("#newTodo").on("keypress", function(e) {
		if (e.which === 13) {
			addTodo();
			return false;
		}
	});

	// click event - toggle Done
	$(".todoList").on("click", ".todoItem", function() {
		moveToDone($(this));
		$(this).toggleClass("done");
	});

	// click event - trash todo
	$(".todoList").on("click", ".trashBtn", function() {
		$(this).closest(".todoItem").fadeOut(400, function() {
			$(this).remove();
		});
	});

	// mouse over effects
	$(".todoList").on("mouseenter", ".todoItem", function() {
		var trashBtn = '<button class="trashBtn"><i class="material-icons">delete_forever</i></button>';
		$(this).prepend(trashBtn);
	});

	$(".todoList").on("mouseleave", ".todoItem", function() {
		$(".trashBtn").remove();
	});
}

function addTodo() {
	// add to the todo list
	var text = $("#newTodo").val();
	var preText = '<li class="todoItem"> <span class="todoText">';
	var postText = "</span></li>";
	if (text.length > 0) {
		var todo = preText + text + postText;
		$(".todoList").prepend(todo);
		$("#newTodo").val("");
	}
}

function moveToDone(obj) {
	if ($(".done").length === 0) {
		obj.insertAfter($(".todoItem:last-of-type"));
	}
	else {
		obj.insertBefore($(".todoItem.done").first());
	}
}
