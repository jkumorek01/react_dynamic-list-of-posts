import React, { useState, useEffect } from 'react';
import type { Post } from '../types/Post';
import type { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import PropTypes from 'prop-types';

type Props = {
  selectedPost: Post;
  comments: Comment[] | null;
  isLoadingComments: boolean;
  commentsError: boolean;
  onDeleteComment: (commentId: number) => void;
  onAddComment: (comment: Comment) => void;
  deleteCommentError: boolean;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isLoadingComments,
  commentsError,
  onDeleteComment,
  onAddComment,
  deleteCommentError,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setIsFormVisible(false);
  }, [selectedPost.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost.id}: ${selectedPost.title}`}
        </h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        <p className="title is-4">Comments:</p>

        {isLoadingComments && <Loader />}

        {!isLoadingComments && commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoadingComments && !commentsError && comments !== null && (
          <>
            {comments.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {comments.map(comment => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => onDeleteComment(comment.id)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

            {!isFormVisible ? (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormVisible(true)}
              >
                Write a comment
              </button>
            ) : (
              <NewCommentForm
                postId={selectedPost.id}
                onAddComment={onAddComment}
              />
            )}
          </>
        )}

        {deleteCommentError && (
          <div className="notification is-danger">
            Could not delete comment.
          </div>
        )}
      </div>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,

  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      postId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ),

  isLoadingComments: PropTypes.bool.isRequired,
  commentsError: PropTypes.bool.isRequired,
  deleteCommentError: PropTypes.bool.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};
