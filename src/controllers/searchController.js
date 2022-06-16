const cubes = require('../db.json')


const getFiltered = (search = '', from = 0, to = 6) => {
    const result = cubes
                .filter(x =>{
                    if ( x.name.toLowerCase().includes(search.toLowerCase())) {
                        return x.name
                    }})
                .filter(x => {  
                    if((from || 1) <= x.difficultyLevel && (to || 6) >= x.difficultyLevel) {
                        return x.difficultyLevel
                    }})
                    
    return result;
}
const getDetailsPage = (id) => cubes.find(x => x.id == id)
exports.getDetailsPage = getDetailsPage;
exports.getFiltered = getFiltered;