import type { JokeResponse } from '../types/JokeResponse'
import API from '../util/config/axios.config'

export default function useJokesAPI() {
    return async (): Promise<JokeResponse> => await API.get('/', {
        validateStatus: function(status) {
            return status < 500
        }
    }).then(r => r.data as JokeResponse)
}