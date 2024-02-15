//유저가 값을 입력한다.
//+버튼을 누르면, 할일이 추가된다.
//delete버튼을 누르면 할 일이 삭제된다.
//check버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
//1.check 누를 시 true를 false로
//2.true이면 끝난 걸로 보고 밑줄
//3.false이면 안끝났으니까 그대로
//진행 중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은 끝난 아이탬만, 진행중 탭은 진행중인 아이템만
//


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");//여러개를 가져와야하니까 querySelector사용함 , task-tabs밑의 div들을 모두 가져오겠다는 의미
let taskList = [];
let mode = "all";
let filterList = [];
addButton.addEventListener("click", addTask);//버튼에 이벤트 주고싶음 addEventListener이거 사용.


for (let i = 1; i < tabs.length; i++) {
	tabs[i].addEventListener("click", function (Event) {
		filter(Event);
	});
}
function addTask() {
	let taskContent = taskInput.value.trim(); // 입력된 텍스트를 양쪽의 공백을 제거하여 가져옴
	if (taskContent !== "") { // 텍스트가 비어 있지 않은 경우에만 처리
		let task = {
			id: randomIDGenerate(),
			taskContent: taskContent,
			isComplete: false
		};
		taskList.push(task);
		taskInput.value = ""; // 입력한 내용을 추가한 후에 input 요소의 값을 지움
		render();
	}
}


function render() {
	//1.내가 선택한 탭에 따라서
	let list = [];
	if (mode === "all") {
		list = taskList;
	} else if (mode === "ongoing" || mode === "done") {
		list = filterList;//전역변수가 되었으므로 접근 가능
	}
	//2.리스트를 달리 보여준다

	//3.all 선택시 taskList
	//4.ongoing, done 시 filterList
	let resultHTML = "";
	for (let i = 0; i < list.length; i++) {
		if (list[i].isComplete == true) {
			resultHTML += `<div class="task">
		<div class ="task-done">${list[i].taskContent}</div>
		<div>
			<i class="fa-regular fa-circle-check" onclick="taskComplete('${list[i].id}')"></i>
			<i class="fa-solid fa-trash-can" onclick="deleteTask('${list[i].id}')"></i> 
		</div>
	</div>`;
		} else {
			resultHTML += `<div class="task">
		<div>${list[i].taskContent}</div>
		<div>
		<i class="fa-regular fa-circle-check" onclick="taskComplete('${list[i].id}')"></i>
		<i class="fa-solid fa-trash-can" onclick="deleteTask('${list[i].id}')"></i> 
		</div>
	</div>`;
		}

	}
	document.getElementById("task-board").innerHTML = resultHTML;
}



function taskComplete(id) {

	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].id == id) {
			taskList[i].isComplete = !taskList[i].isComplete;//밑줄 그었다가 안그었다가니까 ! 사용
			break;
		}
	}
	render();
	console.log(taskList);
}

function deleteTask(id) {
	for (let i = 0; i < taskList.length; i++) {
		if (taskList[i].id == id) {
			taskList.splice(i, 1)
			break;
		}
	}
	render();//UI반드시 같이 업데이트 하기!!
}
function filter(Event) {
	mode = Event.target.id;
	filterList = [];
	if (mode === "all") {
		//전체 리스트를 보여준다
		render();
	} else if (mode === "ongoing") {
		//진행중인 리스트를 보여준다
		//task.isComplete=false
		for (let i = 0; i < taskList.length; i++) {
			if (taskList[i].isComplete === false) {
				filterList.push(taskList[i]);
			}
		}
		render();//UI에 표시해주기
		console.log("진행중", filterList);
	} else if (mode === "done") {
		//끝난 리스트를 보여준다
		//task.isComplete=true
		for (let i = 0; i < taskList.length; i++) {
			if (taskList[i].isComplete === true) {
				filterList.push(taskList[i]);
			}
		}
		render();
	}

}
function randomIDGenerate() {
	return '_' + Math.random().toString(36).substring(2, 9);/*데이터에 랜덤 아이디 값을 지정해준거야. */
}

document.querySelector("h1").addEventListener("click", function () {
	// 사용자에게 다짐을 입력받는 창을 띄웁니다.
	let affirmation = prompt("오늘의 다짐을 입력하세요");
	// 입력된 다짐이 비어있지 않은 경우에만 처리
	if (affirmation !== null && affirmation.trim() !== "") {
		alert("오늘의 다짐:  " + affirmation);
	} else {
		alert("오늘 하루도 화이팅 !!");
	}
});
// Enter 키 이벤트 처리
taskInput.addEventListener("keyup", function (event) {
	// Enter 키인 경우
	if (event.keyCode === 13) {
		event.preventDefault(); // 기본 이벤트 방지
		addTask(); // 할 일 추가 함수 호출
	}
});
