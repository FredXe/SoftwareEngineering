(() => {
    
    const lightThemeClassName = 'light-theme';
    const darkThemeClassName = 'dark-theme';

    let rootElement = document.querySelector(':root');
    if(!rootElement.classList.contains(lightThemeClassName) && !rootElement.classList.contains(darkThemeClassName)){
        rootElement.classList.add(lightThemeClassName);
    }

})();