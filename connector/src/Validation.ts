const _ = require("underscore");
function validate(dataSet: any, percentage: number) {
    let doc: any = [];
    let num = 0;
    dataSet.forEach((dc: any) => {
        let interData = {
            ...dc.data()
        }
        for (var value in interData) {
            if (interData[value] !== '' || interData[value] !== 0 || interData[value] !== null) {
                num++;
            }
        }
        if (num > Math.round(_.size(interData) * (percentage / 100))) {
            doc.push(dc)
        }
    })
    return doc
}

export default validate;