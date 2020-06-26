import _ from 'lodash';

const initialState = [];

export default (state = initialState, action ) => {
    switch(action.type) {
        case 'ASSIGN_TABLE': 
            // Find the tableId in the store
            let table = _.find(state, (t) => t.id = action.tableId);
            if (table) {
                table = Object.assign({}, table, {
                    users: [...table.users, {
                        id: action.userId,
                        photo: action.photo
                    }]
                });
            } else {
                table = {
                    id: action.tableId,
                    users: [{
                        id: action.userId,
                        photo: action.photo
                    }]
                }
            }
            state = _.remove(state, (table) => table.id == action.tableId);
            state = [...state, table];
            return state;
        case 'UPDATE_MOVE':
            return state
        default:
            return state
    }
}