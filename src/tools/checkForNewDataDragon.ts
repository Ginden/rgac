import { RiotApiClient } from '..';
import axios from 'axios';

(async () => {
    const [major, minor, patch] = RiotApiClient.dataDragonVersion
        .split(`.`)
        .map(Number);
    const versionsToTest = [
        [major + 1, 0, 1],
        [major + 1, 1, 1],
        [major, minor + 1, 1],
        [major, minor + 1, 0],
        [major, minor, patch + 1]
    ].map(a => a.join(`.`));
    for (const patch of versionsToTest) {
        const url = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/item.json`;
        const isNewVersionPresent = await axios({
            url,
            validateStatus: () => true
        }).then(r => r.status === 200);
        if (isNewVersionPresent) {
            console.log(
                `There is version ${patch} of DataDragon, but we are using version ${RiotApiClient.dataDragonVersion}`
            );
            console.log(url);
            return;
        }
    }
    console.log(`Everything seems up to date (checked: ${versionsToTest})`);
})()
    .then(() => process.exit(0))
    .catch(e => {
        setImmediate(() => {
            throw e;
        });
    });
