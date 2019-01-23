module.exports =function(register) {
    
    register('cap', function (value) {
        console.log(value);
        if (typeof value !== "string") return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    })

    register('up', function (value) {
        if (typeof value !== "string") return ''
        return value.toUpperCase() 
    })
}