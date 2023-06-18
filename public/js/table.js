document.querySelectorAll("#tableEdit").forEach(element => {
    const editStr = element.innerHTML.split('/')[0];
    const cancelStr = element.innerHTML.split('/')[1];

    element.innerHTML = editStr;
    
    element.addEventListener('click', event => {
        event.preventDefault();
        let rowInd = element.getAttribute('tableEditButton');

        let nodesToToggle = [];

        nodesToToggle.push(...document.querySelectorAll(`[tableText="${rowInd}"]`));
        nodesToToggle.push(...document.querySelectorAll(`[tableInput="${rowInd}"]`));
        nodesToToggle.push(...document.querySelectorAll(`[tableSubmitButton="${rowInd}"]`));
        nodesToToggle.push(...document.querySelectorAll(`[tableDeleteButton="${rowInd}"]`));

        document.querySelectorAll('[defaultText]').forEach(element => {
            element.value = element.getAttribute('defaultText');
        });

        nodesToToggle.forEach(element => {
            element.toggleAttribute('hidden');
        });
        
        element.innerHTML = (element.innerHTML == editStr)? cancelStr : editStr;
    });
});