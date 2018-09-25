(function(){
    let progressInputs = document.querySelectorAll('[data-type="progress"]');
    let progress = document.querySelector('#progress');
    progress.style.width = 0;

    progressInputs.forEach(function (element, index) {
        console.log(index);
        element.addEventListener('blur', function() {
            if(this.value !== '' && !this.classList.contains('filled')) {
                this.classList.add('filled');
                progress.style.width = parseFloat(progress.style.width) + 100/3 + '%';
            } else if(this.value == '' && this.classList.contains('filled')) {
                this.classList.remove('filled');
                progress.style.width = parseFloat(progress.style.width) - 100/3 + '%';
            }
        });
    });


    let percentInput = document.querySelector('#percent-input');
    let percentButton = document.querySelector('#percent-button');
    let progressPercent = document.querySelector('#progress-percent');

    percentButton.addEventListener('click', function() {
        if(percentInput.value >= 0 && percentInput.value <= 100) {
            progressPercent.style.width = percentInput.value + '%';
        }
    });

    let resumeButton = document.querySelector('#resume');
    resumeButton.addEventListener('click', function() {
        window.location.href = "https://donetsk.hh.ua/resume/1778b492ff01a318c80039ed1f616b686c7179";
    })
})();