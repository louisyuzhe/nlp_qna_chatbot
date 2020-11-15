let modelPromise = {};

async function answer_questions(question) {
    model = await modelPromise;
    // or you can specify the model url.
    //config = {modelUrl: 'https://yourown-server/qna/model.json'};
    //customModel = await qna.load(config);
    const passage = document.getElementById("passage").innerHTML ;
    //const question = "Who is the CEO of Google?"
    const answers = await model.findAnswers(question, passage);
    //alert(answers)
    if(answers[0].text){
      addReply(answers[0].text);
    } else {
      addReply("Answer not available");
    }
};

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

window.onload = function() {
  modelPromise = qna.load();
  document.getElementById("sendMsg").addEventListener("click", function(event){
    userInput = document.getElementById("userInput");
    addMessage(userInput.value);
    answer_questions(userInput.value);
    userInput.value='';
  });
}

function addReply(msg) {
  var sysMsg = document.createElement("p");
  sysMsg.className = "container left-chat";
  var text = document.createTextNode(msg);
  sysMsg.appendChild(text);
  document.getElementById("conversation").appendChild(sysMsg);
}

function addMessage(msg) {
  var userMsg = document.createElement("p");
  userMsg.className = "container right-chat";
  var text = document.createTextNode(msg);
  userMsg.appendChild(text);
  document.getElementById("conversation").appendChild(userMsg);
}
