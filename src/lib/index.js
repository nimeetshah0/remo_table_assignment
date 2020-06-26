import TableConfig from '../components/tableConfig.json';
import _ from 'lodash';

export const findNextEmptyTable = (fsTables) => {
    let seatStatus = [];
    if (!fsTables || !fsTables.length) {
        return {
            tableId: TableConfig.tables[0].id,
            seat: 0
        }
    }

    // Find current user in fsTables
    let totalSeats = [];
    for (let i = 0; i < process.env.REACT_APP_MAX_PERSONS_PER_TABLE; i++) {
        totalSeats.push(i);
    }

    let idx = 0;
    let lowestNumberOfSeats = totalSeats.length;
    let tableToReturn = {};
    for (let table of TableConfig.tables) {
        // Check how many seats are occupied in this table
        let occupiedSeats = _.map(_.filter(fsTables, (obj) => obj.tableId == table.id), (o) => o.seat);
        if (occupiedSeats.length < 2) {
            let emptySeat = _.min(_.difference(totalSeats, occupiedSeats));
            return {
                tableId: table.id,
                seat: emptySeat
            }
        } else if(occupiedSeats.length >= totalSeats.length) {
            continue;
        } else {
            if (occupiedSeats.length < lowestNumberOfSeats) {
                let emptySeat = _.min(_.difference(totalSeats, occupiedSeats));
                lowestNumberOfSeats = occupiedSeats.length;
                tableToReturn = {
                    tableId: table.id,
                    seat: emptySeat
                }
            }
        }
    }

    return tableToReturn;
}


export const getEmptySeat = (newTable, fsTables, auth) => {
    // Find current user in fsTables
    let availableSeats = [];
    for (let i = 0; i < process.env.REACT_APP_MAX_PERSONS_PER_TABLE; i++) {
        availableSeats.push(i);
    }

    let currentSeatingArrangement = _.find(fsTables, (obj) => obj.userId == auth.uid);
    
    // Find next empty seat  in newTable
    let seatsOccupied = _.map(_.filter(fsTables, (obj) => obj.tableId == newTable.id), (o) => o.seat);
    let emptySeat = _.min(_.difference(availableSeats, seatsOccupied));

    return emptySeat;

}