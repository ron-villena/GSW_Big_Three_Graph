console.log('Running Main.js!!!!')

apiData = [];
sCurry = 115;
kThompson = 443;
dGreen = 185;

function render() {
  let playerList = document.querySelector('#output');
  output.innerHTML = '';
  for (let player of apiData) {
    let playerNm = getPlayerName(player.player_id);let playerList = document.querySelector('#output');
    console.log('Player Name is', playerNm);
    let para = document.createElement('p');
    para.textContent = getPlayerStats(player, playerNm); //playerNm + ' averaged ' + player.pts + 'pts in ' + player.season + '.';
    playerList.appendChild(para);
  }
}

function doFetch() {
    let yearElement = document.querySelector('#year');
    let searchYear = yearElement.value;
    console.log('The year is', searchYear);
    fetch('https://www.balldontlie.io/api/v1/season_averages?season=' + searchYear + '&player_ids[]=115&player_ids[]=443&player_ids[]=185')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            apiData = data.data;
            render();
        });
}

function getPlayerName(id) {
  if (id === sCurry) {
    return 'Steph Curry';
  }
  else if (id === kThompson) {
    return 'Klay Thompson';
  }
  else {
    return 'Draymond Green';
  }
}

function getPlayerStats(player, playerNm) {
  let playerLine = playerNm + ' (' + player.season + ' Season Avg(s)/Gm): ' + player.pts + 'pts';
  let cbRebounds = document.querySelector('#cbRebounds');
  let cbAssists = document.querySelector('#cbAssists');
  console.log('Rebounds:',cbRebounds.checked, '; Assists:', cbAssists.checked);
  if (cbRebounds.checked) {
    playerLine += '; ' + player.reb + 'reb';
  }
  if (cbAssists.checked) {
    playerLine += '; ' + player.reb + 'ast';
  }
  return playerLine;
}
