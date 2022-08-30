import { formatFullDate } from '../utils';

export const createFilmCommentTemplate = (comments) => {
  const commentsItems = comments.map((item) =>`<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${item.emotion}.png" width="55" height="55" alt="emoji-${item.emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${item.comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${item.author}</span>
              <span class="film-details__comment-day">${formatFullDate(item.date)}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`).join('');

  return `<ul class="film-details__comments-list">${commentsItems}</ul>`;
};

