snmv = false;
let sanel = document.getElementsByClassName("sansara");
let sanind = 0;
let elind = 0;
let san = ["Делай вопреки, делай от руки,","Мир переверни, небо опрокинь.","В каждом наброске, в каждом черновике,","Учитель продолжается в своем ученике.","Всю мою жизнь я иду ко дну,","Всю мою жизнь я искал любовь,","Чтобы любить одну.","Они сказали – нас поздно спасать и поздно лечить.","Плевать, ведь наши дети будут лучше, чем мы.","Лучше, чем мы… Лучше, чем мы…","Когда меня не станет - я буду петь голосами","Моих детей и голосами их детей.","Нас просто меняют местами,","\
Таков закон сансары, круговорот людей.","О-о-ой, мама…","Когда меня не станет - я буду петь голосами","Моих детей и голосами их детей.","Нас просто меняют местами,","Таков закон сансары, круговорот людей.","О-о-ой, мама…","Нас не стереть, мы живем назло,","Пусть не везет, но мы свое возьмем.","Это небо вместо сцены, здесь всё вверх ногами.","И эти звезды в темноте – тобой зажжённый фонарик.","Тысяча меня до меня, и после меня будет,","Тысяча меня и в тысячах не меня, тысяча меня.","\
И мы снова вдребезги и нас не починить.","Плевать, ведь наши дети будут лучше, чем мы.","Лучше, чем мы… Лучше, чем мы…","Когда меня не станет - я буду петь голосами","Моих детей и голосами их детей.","Нас просто меняют местами,","Таков закон сансары, круговорот людей.","О-о-ой, мама…","Когда меня не станет - я буду петь голосами","Моих детей и голосами их детей.","Нас просто меняют местами,","Таков закон сансары, круговорот людей.","О-о-ой, мама…","Когда меня не станет - я буду петь голосами","\
Моих детей и голосами их детей.","Нас просто меняют местами,","Таков закон сансары, круговорот людей.","О-о-ой, мама…","Когда меня не станет - я буду петь голосами","Моих детей и голосами их детей.","Нас просто меняют местами,","Таков закон сансары, круговорот людей.","О-о-ой, мама…"];
let brd = document.getElementsByClassName("border"),
    now = new Date()
    hour = now.getHours()
let timer;
let scor = document.querySelector('.score');
let directx = direct = 0;
let fieldSizeX = Math.round(brd[0].clientHeight*0.8/(brd[0].clientHeight*0.05));
let fieldSizeY = Math.round(brd[0].clientWidth*0.70/(brd[0].clientHeight*0.05));
if (hour >3){
    brd[0].style.backgroundColor = "rgb(+"+Math.abs(255-hour*15)+","+(255-hour*10)+","+(255-hour*10)+")";
    scor.style.color = "rgb(+"+(hour*15)+","+(hour*10)+","+(hour*10)+")";
    for (let i = 0; i<sanel.length; i++)
    {
        sanel[i].style.color = "rgb(+"+(hour*15)+","+(hour*10)+","+(hour*10)+")";
    }
} else {
    brd[0].style.backgroundColor = "rgb(+"+Math.abs(hour*15)+","+(hour*10)+","+(hour*10)+")";
    scor.style.color = "rgb(+"+Math.abs(255-hour*15)+","+(255-hour*10)+","+(255-hour*10)+")";
    for (let i = 0; i<sanel.length; i++)
    {
        sanel[i].style.color = "rgb(+"+Math.abs(255-hour*15)+","+(255-hour*10)+","+(255-hour*10)+")";
    }
}
alert("Присутствует поддержка свайпов со смартфона!")
let KEY = {
    'left' : 37,
    'up' : 38,
    'right' : 39,
    'down' : 40
};

let direction = [
    [0,1],
    [1,0],
    [0,-1],
    [-1,0]];

let snake = {
    length : 3,
    body : [[1,1],[1,2],[1,3]],
    initialisationSnake : function (){
        for ( let i = 0; i < this.length; i++){
            let currentBodyPart = this.body[i];
            document.getElementById(currentBodyPart.join()).className = 'cell snake';
        }
    },
    move : function (){
        direct = directx;
        snmv = true;
        let body = this.body
        let head = this.body[this.length-1];
        let headCell = head.map(function(value, index){ return value + direction[direct][index] });
        compareEatOrGameOver(headCell, body);
        return headCell;
    }
};

window.addEventListener('keydown', keyHandler, false);
setTimeout(prepareGamePane,500,fieldSizeX,fieldSizeY);

function prepareGamePane (fieldSizeX, fieldSizeY){
    let rt = 12;
    for ( let x = 0; x < fieldSizeX; x++){
        let coordinateX = document.createElement('div');
        document.body.appendChild(coordinateX);
        coordinateX.className = 'field';
        coordinateX.style = "top: "+(rt+x*5)+"%";
        for (let y = 0; y < fieldSizeY; y++){
            let coordinateY = document.createElement('div');
            coordinateX.appendChild(coordinateY);
            coordinateY.className = 'cell';
            coordinateY.id = x+','+y;
            coordinateY.style = "width: "+coordinateY.clientHeight;
        }
    }
    setInterval(function(){
        let ys = document.getElementsByClassName("cell");
        for(let y=0; y<ys.length; y++){
            ys[y].style = "width: "+ys[y].clientHeight}
    },50);
    snake.initialisationSnake();
    makeFood(fieldSizeX, fieldSizeY);
}

function makeFood (fieldSizeX, fieldSizeY){
    let x = Math.round(Math.random() * (fieldSizeX-1));
    let y = Math.round(Math.random() * (fieldSizeY-1));
    let food = document.getElementById(x+','+y);
    if (food.className == 'cell'){
        food.className = "cell food";
    } else { 
        makeFood(fieldSizeX, fieldSizeY);
    }
    return food;
}


function keyHandler (event){
    switch (event.keyCode) {
        case KEY.left:
            if (direct != 0){
                directx = 2;
            }
            break;

        case 65:
            if (direct != 0){
                directx = 2;
            }
            break;

        case KEY.right:
            if (direct != 2){
                directx = 0;
            }
            break;
        
        case 68:
            if (direct != 2){
                directx = 0;
            }
            break;

        case KEY.up:
            if (direct != 1){
                directx = 3;
            }
            break;

        case 87:
            if (direct != 1){
                directx = 3;
            }
            break;

        case KEY.down:
            if (direct != 3){
                directx = 1;
            }
            break;

        case 83:
            if (direct != 3){
                directx = 1;
            }
            break;

        default :
            return;
    }
}
function swipefc(){
let     swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 80,
        restraint = 100,
        allowedTime = 5000,
        elapsedTime,
        startTime

window.addEventListener('touchstart', function(e){
    let touchobj = e.changedTouches[0]
    swipedir = 'none'
    dist = 0
    startX = touchobj.pageX
    startY = touchobj.pageY
    startTime = new Date().getTime()
    e.preventDefault()
}, false)

window.addEventListener('touchmove', function(e){
    e.preventDefault()
}, false)

window.addEventListener('touchend', function(e){
    let touchobj = e.changedTouches[0]
    distX = touchobj.pageX - startX 
    distY = touchobj.pageY - startY 
    elapsedTime = new Date().getTime() - startTime 
    if (elapsedTime <= allowedTime){ 
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ 
            swipedir = (distX < 0)? 'left' : 'right'
        }
        else if (Math.abs(distY) >= threshold  && Math.abs(distX) <= restraint){ 
            swipedir = (distY < 0)? 'up' : 'down'
        }
    }
    handleswipe(swipedir)
    e.preventDefault()
}, false)
}

    function handleswipe(swipe){
        switch (swipe){
            case 'left':
                if (direct != 0){
                    directx = 2;
                }
                break;

            case 'right':
                if (direct != 2){
                    directx = 0;
                }
                break;

            case 'up':
                if (direct != 1){
                    directx = 3;
                }
                break;

            case 'down':
                if (direct != 3){
                    directx = 1;
                }
                break;
        }
    }
        

function compareEatOrGameOver (headCell, body) {
    let tmp = document.getElementById(headCell.join());
    if (tmp == null ) {
      if (headCell[0] == -1)
        headCell[0] = fieldSizeX - 1;
      if (headCell[0] == fieldSizeX)
        headCell[0] = 0;
      if (headCell[1] == -1)
        headCell[1] = fieldSizeY - 1;
      if (headCell[1] == fieldSizeY)
        headCell[1] = 0;
      tmp = document.getElementById(headCell.join());
    }

    if ( tmp != null && tmp.className == 'cell' ){
        let removeTail = body.shift();
        body.push(headCell);
        document.getElementById(removeTail.join()).className = 'cell';
        document.getElementById(headCell.join()).className = 'cell snake';
    } else { 
        if ( tmp != null && tmp.className == 'cell food'){
            snake.length++;
            let scor = document.querySelector('.score');
            scor.innerHTML = 'Ваш счет: '+ (snake.length-3);
            body.push(headCell);
            if (sanind == san.length){
                sanind = 0;
                elind = 4;
            }
            if (elind == 4){
                elind = 0;
                for (let i = 0; i<sanel.length; i++){
                    sanel[i].innerHTML = '';
                }
            }
            sanel[elind].innerHTML = san[sanind];
            elind++;
            sanind++;
            document.getElementById(headCell.join()).className = 'cell snake';
            makeFood(fieldSizeX, fieldSizeY);
        } else { 
            if (tmp.className == 'cell snake'){
                clearInterval(timer);
                alert('Вы проиграли! Ваш счет: ' + (snake.length-3) + '. Нажмите кнопку «Обновить» для начала новой игры!');
                document.getElementById("reload").addEventListener('touchstart',reload,false)
            }
        }
    }
}

function EasyStart () {
    if (snmv == false){
        timer = setInterval(function(){
            snake.move();
        },300);
        swipefc();
    }
}
function MediumStart () {
    if (snmv == false){
        timer = setInterval(function(){
            snake.move();
        },200);
        swipefc();
    }
}
function HardStart () 
{
    if (snmv == false){
        timer = setInterval(function(){
            snake.move();
        },100);
        swipefc();
    }
}

function reload () 
{
    window.location.reload();
}