// 유저가 값을 입력한다.
//+ 버튼을 클릭하면, 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다. 
//check버튼을누르면 할일이끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안 끝난걸로 간주하고 그대로 
//진행중 끝남 탭을 누르면 ,언더바가 이동한다.
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만.
//전체탭을 누르면 다시 전체 아이템으로 돌아옴 

let userInput = document.getElementById("userInput")
let addButton = document.getElementById("insertButton")
let list = [];
let Tabs = document.querySelectorAll(".TaskTabs div")
let mode ="all"
let filterlist =[];
let underline = document.getElementById("line")


addButton.addEventListener("click",add)
userInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    add(event);
  }
});

for(let i=0;i<Tabs.length;i++){
  Tabs[i].addEventListener("click",
  function(event){
    filter(event)
  })
};



function add(){
  let task = {
    id:RandomId(),
    UserValue:userInput.value,
    isComplete :false
  };
  
  list.push(task)


  userInput.value = ""
  render()
}

function render(){
  let tasklist = [];
  if(mode == "all"){
    tasklist = list;
  }else if(mode == "Ongoing" || mode =="done") {
    tasklist = filterlist;
  };

  let resultHtml=""
  for(let i=0; i<tasklist.length; i++){
    if(tasklist[i].isComplete == true){
      resultHtml+=
    `<div class="task task-done" id="${tasklist[i].id}" >
    <div class="task-done">${tasklist[i].UserValue}</div>
    <div class="button-box">
      <button onclick="checkButton('${tasklist[i].id}')"><i class="fa fa-check"></i></button>
      <button onclick="DeleteButton('${tasklist[i].id}')"><i class="fa fa-trash"></i></button>
    </div>
  </div>`
    }else
    resultHtml+=
    `<div class="task" id="${tasklist[i].id}">
    <div>${tasklist[i].UserValue}</div>
    <div class="button-box">
      <button onclick="checkButton('${tasklist[i].id}')"><i class="fa fa-check"></i></button>
      <button onclick="DeleteButton('${tasklist[i].id}')"><i class="fa fa-trash"></i></button>
    </div>
  </div>`
  }
document.getElementById("taskboard").innerHTML = resultHtml;
}

function checkButton(id){
  for(let i=0; i<list.length; i++){
    if(list[i].id == id){
      list[i].isComplete = !list[i].isComplete
      break;
    }
  }
  render();

}

function DeleteButton(id){
  for(let i=0; i<list.length; i++){
    if(list[i].id == id){
      list.splice(i,1)
      break;
    }
  }
  render();
}

function filter(e) {
  if (e) {
    mode = e.target.id;
    underline.style.width = e.target.offsetWidth + "px";
    underline.style.left = e.target.offsetLeft + "px";
    underline.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }

  if(mode == "all"){
    render()
  }
  filterlist = [];
  if(mode == "Ongoing"){
    for(let i = 0; i<list.length;i++){
      if(list[i].isComplete == false){
        filterlist.push(list[i])
      }
    }
    render();
  }else if(mode == "done"){
    for(let i=0; i<list.length; i++){
      if(list[i].isComplete){
      filterlist.push(list[i])
      }
    }
  }render();
}


function RandomId(){
  return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}