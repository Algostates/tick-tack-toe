// IEFE
!function(){
    let newGameBtn = document.getElementById('newgame--btn'),
        allTds = document.getElementsByTagName('td'),
        dwnTimerSpan = document.getElementById('downtimer--span'),
        statusSpan = document.getElementById('gamestatus--span'),
        player = {
            one: 'X',
            two: 'Y'
        },
        gameHasStarted = false,
        currentPlayerisPlayerOne = true,
        checkResult = {
            whatWise: '',
            which: -1,
            who: ''
        };

    newGameBtn.addEventListener('click', function(){ // callback function
        let confirmation = confirm('For new game press OK else CANCEL')
        confirmation && window.location.reload();
    }, false);
    console.log(allTds);
    let hasAnybodyWon = () => {
        let rowIndeces = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];
        let columnIndeces = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        let diagIndeces = [
            [0, 4, 8],
            [2, 4, 6],
        ];

        let p1ctr = 0, p2ctr = 0, whatWise = '', which = -1, who = '';

        let checkRowWise = () => {
            whatWise = 'row';
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

        };


        let checkDiagonalWise = () => {
            
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

        checkResult.whatWise = whatWise;
        checkResult.which = which;
        checkResult.who = who;

        return result;
        
    }

    let whoWon = () => {
        return checkResult.who;
    }

    let tdClickCallback = (e) => {
        console.log('TD clicked');
        if(gameHasStarted){
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
        }
        else{ // gamae has not started yet means its first time
            currentPlayerisPlayerOne = false;
            e.target.textContent = player.one;
            gameHasStarted = true;
            e.target.classList.add('player--one');
        }
        if(hasAnybodyWon()){
            statusSpan.textContent = `Player ${whoWon()} has won.`; 
            console.log('Someone has won:', checkResult);
        }else{
            console.log('Nobody has won yet!!:', checkResult);
        }
        e.target.removeEventListener('click', tdClickCallback);
    };


    for(let td of allTds)
        td.addEventListener('click', tdClickCallback, false);

    
    
}()
