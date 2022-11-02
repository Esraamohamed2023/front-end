// select element
var mycount = document.querySelector(".count span")
var mybullets = document.querySelector(".bullets .spans")
var bullets = document.querySelector(".bullets ")
var myquizarea = document.querySelector(".quiz_area")
var myanswerarea = document.querySelector(".answer_area")
var submitbtn = document.querySelector(".submit_answer")
var mycountdown = document.querySelector(".countdown")
var currentindex = 0;
var therightanswer;
var mycountlength;
var therightanswer = 0;
var myresult = document.querySelector(".results")

function getQuestion() {
    let myrequest = new XMLHttpRequest()
        // console.log(myrequest)
    myrequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // console.log(this.responseText)
            var myobject = JSON.parse(this.responseText)
                // console.log(myobject)
            mycountlength = myobject.length;
            // console.log(mycountlength)
            generatebullets(mycountlength)
                // clearInterval(setdowninterval)
            count_down(5, mycountlength)

            addQuestions(myobject[currentindex], mycountlength)
            submitbtn.onclick = () => {
                therightanswer = myobject[currentindex].right_answer
                console.log(therightanswer)
                    // currentindex++;
                clearInterval(setdowninterval)
                checkanswer(therightanswer, mycountlength)
                myquizarea.innerHTML = '';
                myanswerarea.innerHTML = '';
                currentindex++;
                // mybullets.innerHTML = '';
                getQuestion(myobject[currentindex], mycountlength)

                handelbullets();
                showresult()


            }

        }
    }
    myrequest.open("Get", "quation.json", true);
    myrequest.send();
}
getQuestion()

function generatebullets(num) {
    mycount.innerHTML = num;
    for (i = 0; i < num; i++) {
        let myspan = document.createElement("span")
        if (i === 0) {
            myspan.className = "one";
        }
        mybullets.appendChild(myspan)


    }

}

function addQuestions(obj, acount) {
    if (currentindex < mycountlength) {
        // console.log(obj, acount)
        let questiontitle = document.createElement("h2");
        let questiontext = document.createTextNode(obj.title);
        questiontitle.appendChild(questiontext)
        myquizarea.appendChild(questiontitle)
        for (let i = 1; i <= 4; i++) {
            var maindiv = document.createElement("div")
            maindiv.className = 'answer';
            var radioinput = document.createElement("input")
            radioinput.name = 'question'
            radioinput.type = 'radio'
            radioinput.id = `answer_${i}`;

            radioinput.dataset.answer = obj[`answer_${i}`]
            if (i === 1) {
                radioinput.checked = true;

            }
            var thelable = document.createElement("label")
            thelable.htmlFor = `answer_${i}`
            var thelabeltext = document.createTextNode(obj[`answer_${i}`])
            thelable.appendChild(thelabeltext);
            maindiv.appendChild(radioinput);
            maindiv.appendChild(thelable);
            myanswerarea.appendChild(maindiv)


        }
    }

}

function checkanswer(right, counted) {
    console.log(right)
    console.log(counted)
    let answers = document.getElementsByName("question")
    let thechooseanswer;
    for (let i = 0; i < 4; i++) {
        if (answers[i].checked) {
            thechooseanswer = answers[i].dataset.answer;
        }
    }
    console.log(`the right answer is:${right}`)
    console.log(`thechooseanswer is:${thechooseanswer}`)
    if (right === thechooseanswer) {
        therightanswer++;
        console.log("it's good answer")
    }
}

function handelbullets() {
    var bulletsspan = document.getElementsByClassName(".bullets .spans")
    var arryofspan = Array.from(bulletsspan)

    arryofspan.forEach((span, index) => {
        if (index === currentindex) {
            arryofspan[index].className = "one"
        }

    });

}

function showresult() {
    if (mycountlength === currentindex) {
        console.log("question is finshed ")
        myanswerarea.remove()
        myquizarea.remove()
        submitbtn.remove()
        bullets.remove()

        if (therightanswer === mycountlength) {
            theresult = `<span class="perfect">perfect</span>`
        } else if (therightanswer < mycountlength && therightanswer > mycountlength / 2) {
            theresult = `<span class="good">good</span>`

        } else {
            theresult = `<span class="bad">bad</span>`

        }
        myresult.innerHTML = theresult
    }
}

function count_down(durations, mycountlength) {
    if (currentindex < mycountlength) {
        let minutes, seconds;
        setdowninterval = setInterval(() => {
            minutes = parseInt(durations / 60)
            seconds = parseInt(durations % 60)

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            mycountdown.innerHTML = `${minutes}:${seconds}`
            if (--durations < 0) {
                clearInterval(setdowninterval)
                console.log("finished")
                submitbtn.click()

            }

        }, 1000);
    }
}