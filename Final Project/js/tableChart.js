class CountryData {
    constructor(type, id, avgAgr, avgCsn, avgEst, avgExt, avgInt, medAgr, medCsn, medEst, medExt, medInt, name, n) {
        this.type = type;
        this.id = id;
        this.avgAgr = avgAgr;
        this.avgCsn = avgCsn;
        this.avgEst = avgEst;
        this.avgExt = avgExt;
        this.avgInt = avgInt;
        this.medAgr = medAgr;
        this.medCsn = medCsn;
        this.medEst = medEst;
        this.medExt = medExt;
        this.medInt = medInt;
        this.name = name;
        this.n = n;

    }

    generateCountryData(data) {
        let big5Entry = big5Data.filter(d => d.Code === data.id)[0];

        if (big5Entry === undefined) {
            return new CountryData(
                data.type,
                data.id,
            );
        }

        return new CountryData(
            data.type,
            data.id,
            big5Entry.avgAgr,
            big5Entry.avgEst,
            big5Entry.avgEst,
            big5Entry.avgExt,
            big5Entry.avgInt,
            big5Entry.medAgr,
            big5Entry.medCsn,
            big5Entry.medEst,
            big5Entry.medExt,
            big5Entry.medInt,
            big5Entry.name,
            big5Entry.n
        );
    }
}