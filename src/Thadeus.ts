import { ICreateIntentBody, ICredentials, IUpdateIntentBody, IUpdateWorkspaceBody } from './interfaces';
import { getRequest } from './utils/getRequest';
import { parseError } from './utils/parseError';

export class Thadeus {
    private authorization: string;
    private workspaceId: string;

    constructor({ apiKey, apiSecret, workspaceId }: ICredentials) {
        if (!apiKey || !apiSecret) {
            throw Error('You have to provide apiUrl and apiSecret');
        }
        if (!workspaceId) {
            throw Error('You have to provide workspaceId')
        }
        this.workspaceId = workspaceId;
        this.authorization = Buffer.from(JSON.stringify({ key: apiKey, secret: apiSecret })).toString('base64');
    }

    public getWorkspace() {
        return new Promise(async(resolve: Function, reject: Function) => {
            try {
                const result = await getRequest(
                    `workspaces/${this.workspaceId}`,
                    this.authorization
                );
                resolve(JSON.parse(result));
            } catch (err) {
                reject(parseError(err));
            }
        })
    }

    public updateWorkspace({ name }: IUpdateWorkspaceBody) {
        return new Promise(async(resolve: Function, reject: Function) => {
            try {
                const result = await getRequest(
                    `workspaces/${this.workspaceId}`,
                    this.authorization,
                    'PATCH',
                    { name },
                );
                resolve(result);
            } catch (err) {
                reject(parseError(err));
            }
        })
    }

    public teachWorkspace() {
        return new Promise(async(resolve: Function, reject: Function) => {
            try {
                await getRequest(
                    `workspaces/${this.workspaceId}/teach`,
                    this.authorization,
                    'POST',
                );
                resolve();
            } catch (err) {
                reject(parseError(err));
            }
        })
    }

    public predictIntents(message: string) {
        return new Promise(async(resolve: Function, reject: Function) => {
            try {
                const result = await getRequest(
                    `workspaces/${this.workspaceId}/predict/intents`,
                    this.authorization,
                    'POST',
                    { message },
                );
                resolve(result);
            } catch (err) {
                reject(parseError(err));
            }
        })
    }

    public predictCommonEntities(message: string) {
        return new Promise(async(resolve: Function, reject: Function) => {
            try {
                const result = await getRequest(
                    `workspaces/${this.workspaceId}/predict/common_entities`,
                    this.authorization,
                    'POST',
                    { message },
                );
                resolve(result);
            } catch (err) {
                reject(parseError(err));
            }
        })
    }

    public getIntents() {
        return new Promise(async(resolve: Function, reject: Function) => {
            try {
                const result = await getRequest(
                    `workspaces/${this.workspaceId}/intents`,
                    this.authorization,
                    'GET',
                );
                resolve(JSON.parse(result));
            } catch (err) {
                reject(parseError(err));
            }
        })
    }

    public getIntent(intentId: string) {
        return new Promise(async(resolve: Function, reject: Function) => {
            try {
                const result = await getRequest(
                    `workspaces/${this.workspaceId}/intents/${intentId}`,
                    this.authorization,
                    'GET',
                );
                resolve(JSON.parse(result));
            } catch (err) {
                reject(parseError(err));
            }
        })
    }

    public createIntent({ name, examples }: ICreateIntentBody) {
        return new Promise(async(resolve: Function, reject: Function) => {
            try {
                if (examples.length < 5) {
                    reject('Too few examples. Minimum 5.')
                }
                const result = await getRequest(
                    `workspaces/${this.workspaceId}/intents`,
                    this.authorization,
                    'POST',
                    { name, examples },
                );
                resolve(result);
            } catch (err) {
                reject(parseError(err));
            }
        })
    }

    public updateIntent({ intentId, name, examples }: IUpdateIntentBody) {
        return new Promise(async(resolve: Function, reject: Function) => {
            try {
                if (examples?.length < 5) {
                    reject('Too few examples. Minimum 5.')
                }
                const result = await getRequest(
                    `workspaces/${this.workspaceId}/intents/${intentId}`,
                    this.authorization,
                    'PATCH',
                    { name, examples },
                );
                resolve(result);
            } catch (err) {
                reject(parseError(err));
            }
        })
    }

    public deleteIntent(intentId: string) {
        return new Promise(async(resolve: Function, reject: Function) => {
            try {
                await getRequest(
                    `workspaces/${this.workspaceId}/intents/${intentId}`,
                    this.authorization,
                    'DELETE',
                );
                resolve();
            } catch (err) {
                reject(parseError(err));
            }
        })
    }
}