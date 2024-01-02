module.exports = {
    filterByAttributes(collection, attributes) {
        let filteredCollection = [];
        
        for(i in collection) {
            let itemAttr = collection[i].attributes.split(";");
            let hasAll = true;
            for(j in itemAttr) {
                if(!attributes.includes(itemAttr[j])) {
                    hasAll = false;
                }
            }
            if(hasAll == true) {
                filteredCollection.push(collection[i]);
            }
        }

        return filteredCollection;
    }
}