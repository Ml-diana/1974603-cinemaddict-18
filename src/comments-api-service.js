//import {HttpMethod} from './utils/const.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {
  getFilmsComments = (filmId) => this._load({url: `comments/${filmId}`}).then(ApiService.parseResponse);
}
