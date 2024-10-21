import ls from 'localstorage-slim'

export enum LocalDBKey {
  OVERCOME = 'OVERCOME',
}

export const lsSlim = () => {
  ls.config.ttl = 259200 /* 3 days */
  ls.config.encrypt = true
  ls.flush()
  return ls
}
