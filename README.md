![alt text][logo]

[logo]: https://thadeus.ai/images/logo.svg "Thadeus AI"

## How to use?

```
const thadeus = new Thadeus({ apiSecret: string, apiKey: string, workspaceId: string });
```

This package will allow you to use methods listed below. All are accessible from `Thadeus` instance. 

- `getWorkspace(): Promise<Workspace>`
- `updateWorkspace({ name: string }): Promise<Workspace>`
- `teachWorkspace(): Promise<void>`
- `predictIntents(message: string): Promise<IntentsPrediction[]>`
- `predictCommonEntities(message: string): Promise<CommonEntityPrediction[]>`
- `getIntents(): Promise<Intent[]>`
- `getIntent(intentId: string): Promise<Intent>`
- `createIntent({name: string, examples: string[]}): Promise<Intent>`
- `updateIntent({intentId: string, name?: string, examples?: string[]}): Promise<Intent>`
- `deleteIntent(intentId: string): Promise<void>`

### Workspace

    intents: Intent
    _id: string
    name: string
    createdAt: Date
    updatedAt: Date

### Intent

    name: string
    _id: string
    slug: string
    examples: string[]
    createdAt: Date
    updatedAt: Date

### IntentsPrediction

    intent: string
    probability: number

### CommonEntityPrediction

    char_end: number
    char_start: number
    slot: string
    text: string


For more info please visit our api docs: https://docs.thadeus.ai