function parseError(err) {
    if (err.title == 'ValidationError') {
        return Object.values(err.errors).map(e=>e.properties.message).join('\n');
    }else {
        return err.message;
    }

}


module.exports = {
    parseError
};