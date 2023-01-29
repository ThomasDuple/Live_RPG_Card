const progress_bars = document.getElementsByClassName('progress');

for (const bar of progress_bars) {
  bar.addEventListener('click', () => {
    const parent = bar.parentNode;
    console.log(bar);
    
    let value = bar.dataset.value;
    const max = bar.dataset.max;
    
    const container = document.createElement('div');
    container.classList.add('edit-progress');
    const slider = container.appendChild(document.createElement('input'));
    slider.type = 'range';
    slider.value = value;
    slider.max = max;
    let stat;
    if (parent.classList.contains('lvl-progress')) {
      stat = document.getElementById('lvl-perc-nb');
    } else {
      stat = container.appendChild(document.createElement('span'));
      stat.innerText = value;
      bar.classList.forEach(cl => {
        if (cl != 'progress') {
          stat.classList.add(cl);
        }
      });
    }
    const okBtn = container.appendChild(document.createElement('input'));
    okBtn.type = 'submit';
    okBtn.value = 'OK';
    
    slider.addEventListener('change', () => {
      value = slider.value;
      stat.innerText = value;
      bar.dataset.value = value;
      console.log(((value/max)*100) + '%', value, max)
      bar.style.setProperty('--fill-width', ((value/max)*100) + '%');
    });
    
    okBtn.addEventListener('click', () => {
      parent.replaceChild(bar, container);
    })
    
    parent.replaceChild(container, bar)
  });
}

function actionDownload() {
  const name = document.getElementById('name').innerText;
  html2canvas(document.querySelector("#content"), {backgroundColor: "#7c6691"}).then(canvas => {
    saveAs(canvas.toDataURL(), 'RPG_Character_' + name + '.png');
  });
}

function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}

document.getElementById("download").addEventListener('click', actionDownload);