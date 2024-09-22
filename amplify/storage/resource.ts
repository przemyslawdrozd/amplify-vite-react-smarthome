import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'snapshot-storage',
  access: (allow) => ({
    'snapshots/*': [
      allow.authenticated.to(['read'])
    ]
  })
});