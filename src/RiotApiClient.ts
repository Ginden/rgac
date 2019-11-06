import { assertIsNotEmpty } from './assert';
import { CachedGetter } from './decorators';
import { ClientOptions } from './userInterfaces';
import { LeagueOfLegendsApi } from './lolApi';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isObject } from 'lodash';
import rateLimit = require('axios-rate-limit');
import _ = require('lodash');

const API_KEY = Symbol();

export class RiotApiClient {
    public static readonly dataDragonVersion: string = '9.22.1';
    private readonly [API_KEY]: string;
    private server: string;
    private axiosInstance: AxiosInstance;

    constructor(opts: ClientOptions) {
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
    get domain() {
        return `https://${this.server}.api.riotgames.com`;
    }

    @CachedGetter
    get leagueOfLegends(): LeagueOfLegendsApi {
        return new LeagueOfLegendsApi(this);
    }

    @CachedGetter
    get teamfightTactics(): never {
        throw new Error('Not implemented');
    }

    async doRequest<T = any>(opts: Partial<AxiosRequestConfig>): Promise<T> {
        return this.axiosInstance(
            _.defaultsDeep(
                {
                    baseURL: this.domain,
                    headers: {
                        'x-riot-token': this[API_KEY]
                    },
                    validateStatus: null
                },
                opts
            )
        ).then((res: AxiosResponse<T>) => {
            if (res.status >= 200 && res.status < 400) {
                return res.data;
            } else {
                throw Object.assign(
                    new Error(
                        `Endpoint ${opts.url} returned status code ${res.status}`
                    ),
                    opts,
                    {
                        data: res.data,
                        statusCode: res.status,
                        statusText: res.statusText
                    }
                );
            }
        });
    }
}
