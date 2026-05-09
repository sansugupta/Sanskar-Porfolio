# Devodus Access Inventory

This file stores access references only. Do not put plaintext credentials here.

## Known Access References

| System | URL | Purpose | Credential Storage |
| --- | --- | --- | --- |
| Namecheap | `https://ap.www.namecheap.com/ProductList/HostingSubscriptions` | View/manage Devodus hosting subscriptions | Provided in chat; do not commit plaintext password |
| Public website | `https://devodus.com` | Current WordPress reference website | Public |

## Local Credential Handling

If credentials need to be kept on this machine, create an ignored local file:

```bash
clients/devodus/credentials.local.md
```

That file must stay untracked. Better long-term options:

- Apple Passwords / iCloud Keychain
- 1Password
- Bitwarden
- Namecheap delegated access, if available

## Rotation Note

Because credentials were pasted into chat, ask the client/account owner to rotate the Namecheap password after setup or once deployment access is stabilized.
