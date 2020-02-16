export default (form, callback) => {
    try {
        document.querySelector(form).addEventListener('submit', event => {
            event.preventDefault();
            const json = {};
            [...event.target.elements].forEach(el => {
                if (el['name']) {
                    json[el.name] = el.value
                }
            });
            callback(json);
        })
    }catch(e){
        return false
    }

}