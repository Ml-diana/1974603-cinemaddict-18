import {HttpMethod} from './utils/const.js';
import ApiService from './framework/api-service.js';

export default class CommentsApiService extends ApiService {
  getFilmsComments = (filmId) => this._load({url: `comments/${filmId}`}).then(ApiService.parseResponse);

  addComment = async (comment, film) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: HttpMethod.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  deleteComment = async (commentId) => {
    const response = await this._load({
      url: `comments/${commentId}`,
      method: HttpMethod.DELETE,
    });
    return response;
  };
}
