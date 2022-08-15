import { faker } from '@faker-js/faker';
import { getMonthFromTimeStamp } from "../utils/date.helper";

const numberOfcustomers = 5;
const numberOfRecords = 50;

const customers = new Array(numberOfcustomers).fill(0).map((_) => {
    return faker.datatype.uuid();
});

console.log("customers", customers);

export const transactionMockData = new Array(numberOfRecords)
    .fill(0)
    .map((_) => {
        return {
            transactionId: faker.datatype.uuid(),
            customerId:
                customers[
                faker.datatype.number({ min: 0, max: numberOfcustomers - 1 })
                ],
            productId: faker.datatype.uuid(),
            createDate: faker.date.between("2022-05-01", "2022-07-30").getTime(),
            price: faker.datatype.number({ max: 200, min: 1, precision: 0.01 })

        };
    });

export const fetchTransactionMockRecord = () =>
    new Promise((res, rej) => {
        setTimeout(() => {
            res(transactionMockData);
        }, 2000);
    });

export const recordsGroupByMonth = (records) => {
    const recordsGroupByMonth = {};
    records.forEach((record) => {
        const month = getMonthFromTimeStamp(record.createDate);
        if (recordsGroupByMonth[month]) {
            recordsGroupByMonth[month].push(record);
        } else {
            recordsGroupByMonth[month] = [record];
        }
    });
    return recordsGroupByMonth;
};

export const recordsGroupByCustomer = (records) => {
    const recordsGroupByCustomer = {};
    records.forEach((record) => {
        const customerId = record.customerId;
        record.points = calculatePoints(record.price);
        if (recordsGroupByCustomer[customerId]) {
            recordsGroupByCustomer[customerId].totalPoints += record.points;
            recordsGroupByCustomer[customerId].records.push(record);
        } else {
            recordsGroupByCustomer[customerId] = {
                totalPoints: record.points,
                records: [record]
            };
        }
    });
    return recordsGroupByCustomer;
};

export const recordParser = (records) => {
    const dataGroupByMonth = recordsGroupByMonth(records);
    Object.entries(dataGroupByMonth).forEach(([key, value]) => {
        dataGroupByMonth[key] = recordsGroupByCustomer(value);
    });
    return dataGroupByMonth;
};



export const calculatePoints = (price, point1 = 1, point2 = 2) => {
    let pointsPrice = Math.floor(price);
    let pointPart1 = 0;
    if (pointsPrice > 100) {
        pointPart1 = 50 * point1;
    } else {
        pointPart1 = pointsPrice - 50 > 0 ? (pointsPrice - 50) * point1 : 0;
    }

    const pointPart2 = pointsPrice - 100 > 0 ? (pointsPrice - 100) * point2 : 0;
    return pointPart1 + pointPart2;
};
