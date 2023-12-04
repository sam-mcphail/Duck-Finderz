import request from 'superagent'
import { logError } from './utils.ts'
import { Preferences, PreferencesData } from '../../models/preferences.ts'

const rootUrl = '/api/v1'

interface GetPreferencesFunction {
  token: string
}
export async function getPreferences({
  token,
}: GetPreferencesFunction): Promise<Preferences | null> {
  return await request
    .get(`${rootUrl}/preferences`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.preferences ? res.body.preferences : null))
    .catch(logError)
}

interface AddPreferencesFunction {
  newPreferences: PreferencesData
  token: string
}
export async function addPreferences({
  newPreferences,
  token,
}: AddPreferencesFunction): Promise<Preferences> {
  return request
    .post(`${rootUrl}/preferences`)
    .set('Authorization', `Bearer ${token}`)
    .send(newPreferences)
    .then((res) => res.body.preferences)
    .catch(logError)
}
