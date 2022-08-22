export const createFilmCommentEmojiTemplate = (comments) => {
  const emotionsItems = comments.map((item) =>`<div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${item.emotion}" value="${item.emotion}">
          <label class="film-details__emoji-label" for="emoji-${item.emotion}">
            <img src="./images/emoji/${item.emotion}.png" width="30" height="30" alt="${item.emotion}">
          </label>
        </div>`).join('');
  return `<form class="film-details__new-comment" action="" method="get">
  <div class="film-details__add-emoji-label"></div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>
        ${emotionsItems}
        </form>`;
};


