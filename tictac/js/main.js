// IEFE
!function(){
    const newGameBtn = document.getElementById('newgame--btn'),
            allTds = document.getElementsByTagName('td'),
            dwnTimerSpan = document.getElementById('downtimer--span'),
            statusSpan = document.getElementById('gamestatus--span'),
            thresholdTime = 5, // sec
            totalTdCount = allTds.length,
            player = {
                one: 'X',
                two: 'Y'
            },
            checkResult = {
                wise: '',
                which: -1,
                who: ''
            },
            wises = {
                row: 'row',
                column: 'col',
                diagonal: 'diag'
            },
            rowIndeces = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            columnIndeces = [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagIndeces = [
                [0, 4, 8], // 0
                [2, 4, 6]   // 1
            ];

        let timeIntervalHandle = null,
            currentPlayerisPlayerOne = true,
            gameHasStarted = false,
            tdDoneCount = 0;
            
    newGameBtn.addEventListener('click', function(){ // callback function
        let confirmation = confirm('For new game press OK else CANCEL')
        confirmation && window.location.reload();

    }, false);
    //console.log(allTds);

    let disableListeners = () => {
        for(let td of allTds)
            td.removeEventListener('click', tdClickCallback);
    }

    let stopTimer = () => {
        clearInterval(timeIntervalHandle);
    };

    let terminateGame = () => {
        if(currentPlayerisPlayerOne){
            // let player 2 win
            statusSpan.textContent = `Player ${player.two} has won.`;
        }
        else{
            // let player 2 win
            statusSpan.textContent = `Player ${player.one} has won.`;
        }

        disableListeners();
    }

    let startTimer = () => {
        ctr = thresholdTime;
        timeIntervalHandle = setInterval(() => {
            if(ctr == -1){
                stopTimer();
                terminateGame();
                return;
            }
            dwnTimerSpan.textContent = `00:0${ctr}`;
            --ctr;
        }, 1000);
    };

    let hasAnybodyWon = () => {
        let p1ctr = 0, p2ctr = 0, wise = '', which = -1, who = '';

        let checkRowWise = () => {
            wise = wises.row;
            for(let i=0; i<rowIndeces.length; ++i){
                which = i;
                for(let j=0; j<rowIndeces[i].length; ++j){
                    if(allTds[rowIndeces[i][j]].textContent == player.one)
                        ++p1ctr;
                    else if(allTds[rowIndeces[i][j]].textContent == player.two)
                        ++p2ctr;
                }

                if(p1ctr == 3){
                    who = player.one;
                    break;
                }
                else if(p2ctr == 3){
                    who = player.two;
                    break;
                }
                // going for next row
                p1ctr = p2ctr = 0;
            }
        };

        let checkColumnWise = () => {
            wise = wises.column;
            for(let i=0; i<columnIndeces.length; ++i){
                which = i;
                for(let j=0; j<columnIndeces[i].length; ++j){
                    if(allTds[columnIndeces[i][j]].textContent == player.one)
                        ++p1ctr;
                    else if(allTds[columnIndeces[i][j]].textContent == player.two)
                        ++p2ctr;
                }

                if(p1ctr == 3){
                    who = player.one;
                    break;
                }
                else if(p2ctr == 3){
                    who = player.two;
                    break;
                }
                // going for next row
                p1ctr = p2ctr = 0;
            }
        };


        let checkDiagonalWise = () => {
            wise = wises.diagonal;
            for(let i=0; i<diagIndeces.length; ++i){
                which = i;
                for(let j=0; j<diagIndeces[i].length; ++j){
                    if(allTds[diagIndeces[i][j]].textContent == player.one)
                        ++p1ctr;
                    else if(allTds[diagIndeces[i][j]].textContent == player.two)
                        ++p2ctr;
                }

                if(p1ctr == 3){
                    who = player.one;
                    break;
                }
                else if(p2ctr == 3){
                    who = player.two;
                    break;
                }
                // going for next row
                p1ctr = p2ctr = 0;
            }
        }

        checkRowWise();
        if(who != '')
            result = true;
        else{
            p1ctr = p2ctr = 0;
            checkColumnWise();
        }
        
        if(who != '')
            result = true;
        else{
            p1ctr = p2ctr = 0;
            checkDiagonalWise();
        }
        
        if(who != '')
            result = true;
        else
            result = false;

        checkResult.wise = wise;
        checkResult.which = which;
        checkResult.who = who;

        return result;
        
    }

    let whoWon = () => {
        return checkResult.who;
    }

    let hasGameCompleted = () => {
        if(tdDoneCount == totalTdCount)
            return true;
        return false;
    };

    let setWonColor = () => {
        let tdGroupIndeces = [];
        if(checkResult.wise == wises.row)
            tdGroupIndeces = rowIndeces[checkResult.which];
        else if(checkResult.wise == wises.column)
            tdGroupIndeces = columnIndeces[checkResult.which];
        else
            tdGroupIndeces = diagIndeces[checkResult.which];
        console.log('tdgroupindeces:', tdGroupIndeces, 'alltds:', allTds);
        for(let i=0; i<tdGroupIndeces.length; ++i){
            allTds[tdGroupIndeces[i]].classList.add('woncolor');
        }

    };

    let setGameOver = () => {
        stopTimer();
        disableListeners();
        statusSpan.textContent = 'The Game is Over!!!...please try again';
    };

    let tdClickCallback = (e) => {
        console.log('TD clicked');
        ++tdDoneCount;
        if(gameHasStarted){
             stopTimer();
             if(currentPlayerisPlayerOne){ // is player one
                e.target.textContent = player.one;
                currentPlayerisPlayerOne = false;     
                e.target.classList.add('player--one');
             }
             else{
                e.target.textContent = player.two;
                currentPlayerisPlayerOne = true;
                e.target.classList.add('player--two');
             }
             startTimer();
        }
        else{ // gamae has not started yet means its first time
            currentPlayerisPlayerOne = false;
            e.target.textContent = player.one;
            gameHasStarted = true;
            e.target.classList.add('player--one');
            startTimer();
        }
        if(hasAnybodyWon()){
            setWonColor();
            stopTimer();
            terminateGame();
            statusSpan.textContent = `Player ${whoWon()} has won.`; 
            console.log('Someone has won:', checkResult);
        }else{
            if(hasGameCompleted()){
                setGameOver();
            }
            console.log('Nobody has won yet!!:', checkResult);
        }
        e.target.removeEventListener('click', tdClickCallback);
    };

    for(let td of allTds)
        td.addEventListener('click', tdClickCallback, false);
    
}()
