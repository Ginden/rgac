import { assertIsNotEmpty } from './assert';
import { CachedGetter } from './decorators';
import { ClientOptions } from './userInterfaces';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isObject } from 'lodash';
import rateLimit from 'axios-rate-limit';
import _ = require('lodash');
import { Servers, PlatformRegionServerMapping } from './apiInterfaces';
import { LeagueOfLegendsApi } from './lolApi';
import { TeamfightTacticsApi } from './tftApi';

const API_KEY: unique symbol = Symbol();

export class RiotApiClient {
    public static readonly dataDragonVersion: string = `10.11.1`;
    private readonly [API_KEY]: string;
    public readonly server: Servers;
    private readonly axiosInstance: AxiosInstance;

    public constructor(opts: ClientOptions) {
        assertIsNotEmpty(opts.apiKey);
        this[API_KEY] = opts.apiKey;
        this.server = opts.server;
        if (opts.axios) {
            if (opts.axios.client) {
                this.axiosInstance = opts.axios.client;
            } else {
                this.axiosInstance = axios.create(opts.axios.requestOptions);
            }
        } else {
            this.axiosInstance = axios;
        }
        if (opts.rateLimit && isObject(opts.rateLimit)) {
            this.axiosInstance = rateLimit(this.axiosInstance, opts.rateLimit);
        }
    }

    @CachedGetter
    public get domain() {
        return `https://${this.server}.api.riotgames.com`;
    }

    @CachedGetter
    public get regionalDomain() {
        return `https://${PlatformRegionServerMapping[this.server]}.api.riotgames.com`;
    }

    @CachedGetter
    public get leagueOfLegends(): LeagueOfLegendsApi {
        return new LeagueOfLegendsApi(this);
    }

    public get lol(): LeagueOfLegendsApi {
        return this.leagueOfLegends;
    }

    @CachedGetter
    public get teamfightTactics(): TeamfightTacticsApi {
        return new TeamfightTacticsApi(this);
    }

    public get tft(): TeamfightTacticsApi {
        return this.teamfightTactics;
    }

    public async doRequest<T = any>(
        opts: Partial<AxiosRequestConfig> | string,
        target: 'region' | 'platform' = 'platform'
    ): Promise<T> {
        const options: Partial<AxiosRequestConfig> =
            typeof opts === 'string'
                ? {
                      url: opts,
                  }
                : opts;
        const domain = target === 'region' ? this.regionalDomain : this.domain;
        return this.axiosInstance(
            _.defaultsDeep(
                {
                    baseURL: domain,
                    headers: {
                        'X-Riot-Token': this[API_KEY],
                    },
                    validateStatus: null,
                },
                options
            )
        ).then((res: AxiosResponse<T>) => {
            if (res.status >= 200 && res.status < 400) {
                return res.data;
            } else {
                console.error(options.url, res.data);
                const riotMessage = _.get(res, `data.status.message`);
                let errorMessage = `Endpoint ${domain}/${options.url} returned status code ${res.status}`;
                if (riotMessage) {
                    errorMessage += ` ("${riotMessage}")`;
                }
                throw Object.assign(new Error(errorMessage), opts, {
                    data: res.data,
                    statusCode: res.status,
                    statusText: res.statusText,
                });
            }
        });
    }
}
