/**
 * @link https://developer.riotgames.com/docs/lol#_routing-values
 */
export enum Servers {
    BR1 = `br1`,
    EUN1 = `eun1`,
    EUW1 = `euw1`,
    JP1 = `jp1`,
    KR = `kr`,
    LA1 = `la1`,
    LA2 = `la2`,
    NA1 = `na1`,
    OC1 = `oc1`,
    TR1 = `tr1`,
    RU = `ru`,
}

export enum RegionalServers {
    AMERICAS = 'americas',
    ASIA = 'asia',
    EUROPE = 'europe',
}

export const PlatformRegionServerMapping: Record<Servers, RegionalServers> = {
    br1: RegionalServers.AMERICAS,
    eun1: RegionalServers.EUROPE,
    euw1: RegionalServers.EUROPE,
    jp1: RegionalServers.ASIA,
    kr: RegionalServers.ASIA,
    la1: RegionalServers.AMERICAS,
    la2: RegionalServers.AMERICAS,
    na1: RegionalServers.AMERICAS,
    ru: RegionalServers.EUROPE,
    tr1: RegionalServers.EUROPE,
    oc1: RegionalServers.ASIA,
};
