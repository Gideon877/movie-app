export default () => {

    return {
        add(_movie) {
            console.table(_movie, '\n\n add')
         },
        info(_movie) {
            console.table(_movie, '\n\n info')
         },
    }
}