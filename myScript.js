const score = document.querySelector(".score");
            const startScreen = document.querySelector(".startScreen");
            const gameArea = document.querySelector(".gameArea");
            
            startScreen.addEventListener('click', start);
            startScreen.addEventListener('touchstart', start);

            let player = { speed : 5, score : 0};
            let keys = { ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false}

            document.addEventListener('keydown', keyDown);
            document.addEventListener('keyup', keyUp);

            document.querySelector('.buttons').addEventListener('touchstart', );
            document.querySelector('.buttons').addEventListener('touchend', keyUp);

            function keyDown(e){
                keys[e.key] = true;
                e.preventDefault();
            }
            function keyUp(e){
                e.preventDefault();
                keys[e.key] = false;
            }

            function isCollide(a,b)
            {
                aRect = a.getBoundingClientRect();
                bRect = b.getBoundingClientRect();

                return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.left > bRect.right) || (aRect.right < bRect.left));
            }

            function moveLines(){

                let lines = document.querySelectorAll('.lines');
                player.speed = 5;
                lines.forEach(function(item){

                    if(item.y >= 1500)
                    {
                        item.y -= 1560;
                    }
                    item.y += player.speed;
                    item.style.top = (item.y) + "px";
                })

            }

            function endGame(){
                player.start = false;
                startScreen.classList.remove('hide');
                startScreen.innerHTML = "Game Over <br> Score :" + ((player.score)+1) + "<br>Press here to Restart";
            }

            function moveEnemy(car){
                player.speed = 5;
                let enemy = document.querySelectorAll('.enemy');

                enemy.forEach(function(item){

                if(isCollide(car,item))
                {  
                    console.log("Boom");
                    endGame();
                }
                if(item.y >= 1500)
                {
                    item.y = -300;
                    item.style.left = Math.floor(Math.random() * 350) + "px";  
                }
                item.y += player.speed;
                item.style.top = item.y + "px";
                })

            }

            function gamePlay()
            {
                player.speed = 5;
                let car = document.querySelector('.car');
                if(player.start)
                {
                    
                    moveLines();
                    moveEnemy(car);

                    if(keys.ArrowUp && player.y > 200){ player.y -= player.speed;}
                    if(keys.ArrowDown && player.y < 1100){ player.y += player.speed;}
                    if(keys.ArrowLeft && player.x > 0){ player.x -= player.speed;}
                    if(keys.ArrowRight && player.x < 350){ player.x += player.speed;}

                    car.style.left = player.x + "px";
                    car.style.top = player.y + "px";

                    window.requestAnimationFrame(gamePlay);

                    player.score++;
                    score.innerText = "Score : " + player.score;
                }
            }

            function start(){
                
                startScreen.classList.add('hide');
                score.classList.remove('hide');
                gameArea.innerHTML = "";


                player.start = true;
                player.score = 0;

                window.requestAnimationFrame(gamePlay);

                for(x=0; x<14; x++){

                    let roadLine = document.createElement('div');
                    roadLine.setAttribute('class', 'lines');
                    roadLine.y = x*120;
                    roadLine.style.top = roadLine.y + "px";
                    gameArea.appendChild(roadLine);

                }

                let car = document.createElement('div');
                car.setAttribute('class', 'car');
                gameArea.appendChild(car);

                player.x = car.offsetLeft;
                player.y = car.offsetTop;

                
                for(x=0; x<5; x++){

                    let enemyCar = document.createElement('div');
                    enemyCar.setAttribute('class', 'enemy');
                    enemyCar.y = ((x+1)*400)*-1;
                    enemyCar.style.top = enemyCar.y + "px";
                    enemyCar.style.backgroundColor= randomColor(); 
                    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";                
                    gameArea.appendChild(enemyCar);
                    
                }
            }

            function randomColor()
            {
                function c()
                {
                    let hex = Math.floor(Math.random() * 256).toString(16);
                    return ("0" + String(hex)).substr(-2);
                }
                return "#"+c()+c()+c();
            }

            function moveup(){
                player.speed = 5;
                if(player.y > 200){ player.y -= player.speed;}
            }

            function movedown(){
                player.speed = 5;
                if(player.y < 650){ player.y += player.speed;}
            }

            function moveleft(){
                player.speed = 50;
                if(player.x > 0){ player.x -= player.speed;}
            }

            function moveright()
            {
                 player.speed = 50;
                if(player.x < 350){ player.x += player.speed;}
            }

            function clearmove(){
                player.speed = 0;
            }