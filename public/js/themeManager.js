function updateTheme(){

    let rootElement = document.querySelector(':root');

    // prevent the transition on all child elements 
    rootElement.classList.add('noTransition');

    if(localStorage.theme == 'light'){
        rootElement.classList.remove('dark-theme');
        rootElement.classList.add('light-theme');
    }else{
        rootElement.classList.remove('light-theme');
        rootElement.classList.add('dark-theme');
    }

    // stop preventing the transition on all child elements 
    rootElement.classList.remove('noTransition');

}

if(!localStorage.theme){
    localStorage.theme = 'dark';
}
updateTheme();