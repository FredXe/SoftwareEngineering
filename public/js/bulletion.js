let contentBox = document.querySelector('#content-container');
let commentBox = document.querySelector('#comment-container');

let commentInput = document.querySelector('#postComment');

function updateViewingBulletion(){
    if(currentBulletionInd == -1) return;

    let contentStr = `\
        <div class="bulletion-content">\
            <h2>${bulletionData[currentBulletionInd].bb_title}</h2>\
            <p>Author : ${bulletionData[currentBulletionInd].housemaster_name}</p>\
            <p>${bulletionData[currentBulletionInd].bb_text}</p>\
        </div>\
    `;
    let content = new DOMParser().parseFromString(contentStr, 'text/html').body.firstElementChild;
    
    contentBox.replaceChildren(content);
    
    commentBox.replaceChildren();

    bulletionData[currentBulletionInd].comments.forEach(element => {
        let commentStr = `\
            <div class="bulletion-comment-card">\
                <span>${element.user_name}</span>\
                <p>${element.content}</p>\
                <p>${element.mes_time}</p>\
            </div>\
        `;
        let comment = new DOMParser().parseFromString(commentStr, 'text/html').body.firstElementChild;
        commentBox.appendChild(comment);
    });

    try{
        commentInput.parentElement.toggleAttribute('hidden', false);
        commentInput.setAttribute('action', `/bulletion/${bulletionData[currentBulletionInd].bb_ID}/comment`);
    }catch(err){
        
    }

    setTimeout(() => {
        commentBox.scrollTo(0, commentBox.scrollHeight);
    }, 300);

}

let titleBox = document.querySelector('#title-container');
for(let i = 0; i < bulletionData.length; ++i){
    let titleStr = `\
        <div title-card="${i}" class="bulletion-card">\
            <h3>${bulletionData[i].bb_title.substring(0, 17) + ((bulletionData[i].bb_title.length > 17)? '...' : '')}</h3>\
            <p>${bulletionData[i].bb_text.substring(0, 40)+ ((bulletionData[i].bb_text.length > 40)? '...' : '')}</p>\
        </div>\
    `;
    let title = new DOMParser().parseFromString(titleStr, 'text/html').body.firstElementChild;
    titleBox.appendChild(title);
}

let titleCards = document.querySelectorAll('[title-card]');
titleCards.forEach(element => {
    element.addEventListener('click', event => {
        currentBulletionInd = element.getAttribute('title-card');
        updateViewingBulletion();
    });
});

if(currentBulletionInd != -1){
    let ind = 0;
    for(ind; ind < bulletionData.length; ++ind){
        if(bulletionData[ind].bb_ID == currentBulletionInd){
            break;
        }
    }
    currentBulletionInd = ind;
    console.log(ind);
}
updateViewingBulletion();