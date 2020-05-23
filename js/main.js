console.log('Running Main.js!!!!')

apiData = [];
cbArray = [];
sCurry = 115;
kThompson = 443;
dGreen = 185;

function render() {
  let playerList = document.querySelector('#output');
  // output.innerHTML = '';
  clearPlayerChart();
  for (let player of apiData) {
    let playerNm = getPlayerName(player.player_id);
    // let playerList = document.querySelector('#output');
    console.log('Player Name is', playerNm);
    createPlayerElement(player, playerNm);
    // let para = document.createElement('p');
    // para.textContent = getPlayerStats(player, playerNm); //playerNm + ' averaged ' + player.pts + 'pts in ' + player.season + '.';
    // playerList.appendChild(para);
  }
}

function doFetch() {
    let yearElement = document.querySelector('#year');
    let searchYear = yearElement.value;
    console.log('The year is', searchYear);
    if (searchYear > 0) {
      fetch('https://www.balldontlie.io/api/v1/season_averages?season=' + searchYear + '&player_ids[]=115&player_ids[]=443&player_ids[]=185')
          .then(response => response.json())
          .then(data => {
              console.log(data);
              apiData = data.data;
              render();
          });
    } else {
      // let playerList = document.querySelector('#output');
      // playerList.innerHTML = '';
    }
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

// function getPlayerStats(player, playerNm) {
//   let playerLine = playerNm + ' (' + player.season + ' Season Avg(s)/Gm): ';
//   let cbRebounds = document.querySelector('#cbRebounds');
//   let cbAssists = document.querySelector('#cbAssists');
//   console.log('Rebounds:',cbRebounds.checked, '; Assists:', cbAssists.checked);
//   if (cbPoints.checked) {
//     playerLine += ' ' + player.pts + 'pts';
//   }
//   if (cbRebounds.checked) {
//     playerLine += '; ' + player.reb + 'reb';
//   }
//   if (cbAssists.checked) {
//     playerLine += '; ' + player.reb + 'ast';
//   }
//   return playerLine;
// }

function createPlayerElement (player, playerNm) {
  let divWidth = getWidth();
  let cbCount = getCbCount();
  console.log(divWidth);
  console.log(cbCount);
  let parent = null;
  if (player.player_id === sCurry) {
    parent = document.querySelector('#divScurry');
  }
  else if (player.player_id === kThompson) {
    parent = document.querySelector('#divKthomson');
  }
  else {
    parent = document.querySelector('#divDgreen');
  }
  // parent.innerHTML = '';
  let div = null;
  for (let cb of cbArray) {
    console.log(cb.value);
    div = createDiv(cb, divWidth, player, playerNm);
    parent.appendChild(div);
  }
}

function getWidth() {
  console.log("getting width");
  return 100 / getCbCount()
  }

function getCbCount() {
  let count = 0;
  cbArray = [];
  let cbPoints = document.querySelector('#cbPoints');
  let cbRebounds = document.querySelector('#cbRebounds');
  let cbAssists = document.querySelector('#cbAssists');
  if (cbPoints.checked) {
    cbArray.push(cbPoints);
  }
  if (cbRebounds.checked) {
      cbArray.push(cbRebounds);
  }
  if (cbAssists.checked) {
      cbArray.push(cbAssists);
  }
  for (let cb of cbArray) {
      count ++;
  }
  return count;
}

function createDiv(cb, divWidth, player, playerNm) {
  let divHeight = '';
  let divLabel = '';
  let parentBarClass = 'chart__block'
  let barClass = '';
  if (cb.value === 'points') {
    divHeight = player.pts * 9;
    divLabel = player.pts + "pts";
    barClass += "chart__block--pts";
  }
  else if (cb.value === 'rebounds') {
    divHeight = player.reb * 9;
    divLabel = player.reb + "reb";
    barClass += "chart__block--rbs";
  } else {
    divHeight = player.ast * 9;
    divLabel = player.ast + "ast";
    barClass += "chart__block--ast";
  }
  let div = document.createElement('div');
  div.style.width = divWidth + "%";
  div.style.height = divHeight + "px";
  div.classList.add(parentBarClass);
  div.classList.add(barClass);
  div.textContent = playerNm + " - " + divLabel;
  return div;
}

function clearPlayerChart() {
  scParent = document.querySelector('#divScurry');
  ktParent = document.querySelector('#divKthomson');
  dgParent = document.querySelector('#divDgreen');
  scParent.innerHTML = '';
  ktParent.innerHTML = '';
  dgParent.innerHTML = '';
}
