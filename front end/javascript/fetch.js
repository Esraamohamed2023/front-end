var theinput = document.querySelector(".get-reps input");
var thebtn = document.querySelector(".get-btn");
var thedata = document.querySelector(".show-data");
thebtn.onclick = () => { getreps() };

function getreps() {
    console.log("get reps ready")
    if (theinput.value == "") {

        thedata.innerHTML = "<span>please write the username</span>"



    } else {
        thedata.innerHTML = ""
        fetch("https://api.github.com/users/elzerowebschool/repos").then((response) => {
            return response.json()
        }).then((data) => {


            data.forEach(element => {

                console.log(element.name)
                let maindiv = document.createElement("div")
                let sediv = document.createTextNode(element.name)
                maindiv.appendChild(sediv)


                let lin = document.createElement("a")
                let lintext = document.createTextNode("visit")
                lin.appendChild(lintext)
                lin.href = `https://google.com`
                lin.setAttribute("target", "_blank")
                maindiv.appendChild(lin)
                let starspan = document.createElement("span")
                let spantext = document.createTextNode(`star${element.stargazers_count}`)
                starspan.appendChild(spantext)
                maindiv.appendChild(starspan)
                maindiv.className = 'element-box'
                thedata.appendChild(maindiv)

            });


        })
    }
};