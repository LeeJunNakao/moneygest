export function selectComponent(component){
    switch(component){
        case 'home':
            return { type: 'SELECT_COMPONENT', payload: {home: true}}
        case 'stock':
            return { type: 'SELECT_COMPONENT', payload: {stock: true}}
    }

}