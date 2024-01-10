import levenshteinDistance from "./levenshtein";

const Search_Algorithm = (data, query, min_distance, keys, user_dt) => {
    const new_dt = [];

    data.forEach((dt) => {
        const distances = keys.reduce((acc, key) => {
            const subKeys = dt[key].toLowerCase().split(" ");
            let subDistances = subKeys.map((subKey) => {
                return levenshteinDistance(subKey, query.toLowerCase());
            });

            return acc.concat(subDistances);
        }, []);

        let max_distance = Math.max(...distances);

        const x = user_dt?.find(({ clicked }) => {
            return clicked.every((key, idx) => {
                return key === dt[keys[idx]]
            })
        })

        const every = x?.clicked?.every((key, idx) => {
            return key === dt[keys[idx]]
        })

        if (every) {
            max_distance += 0.1
        }

        if (max_distance >= min_distance) {
            new_dt.push({
                ...dt,
                score: max_distance,
            });
        }
    });

    new_dt.sort((a, b) => b.score - a.score);

    return new_dt;
};

export default Search_Algorithm;
