//유저가 값을 입력한다.
//+버튼을 누르면, 할일이 추가된다.
//delete버튼을 누르면 할 일이 삭제된다.
//check버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
//진행 중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은 끝난 아이탬만, 진행중 탭은 진행중인 아이템만
//


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask);//버튼에 이벤트 주고싶음 addEventListener이거 사용.


function addTask() {
	let taskContent = taskInput.value
	taskList.push(taskContent);
}

function render() {
	let resultHTML = '';
	for (let i = 0; i < taskList.length; i++) {
		resultHTML += `<div class="task">
		<div>${taskList[i]}</div>
		<div>
			<button>Check</button>
			<button>delete</button>
		</div>
	</div>`;
	}

	document.getElementById("task-board").innerHTML = resultHTML;
}