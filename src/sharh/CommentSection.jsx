import { useState, useEffect } from 'react';
import './style.css';

const CommentSection = () => {
    const [name, setName] = useState('Automatic Name User');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(() => {
        const savedComments = localStorage.getItem('comments');
        return savedComments ? JSON.parse(savedComments) : [];
    });
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem('timeLeft');
        return savedTime ? JSON.parse(savedTime) : 300; // default to 5 minutes
    });
    const [canComment, setCanComment] = useState(timeLeft === 0); // Start with true if timer is expired

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    const newTime = prev - 1;
                    localStorage.setItem('timeLeft', newTime); // Save updated time to localStorage
                    if (newTime <= 0) {
                        setCanComment(true);
                        localStorage.setItem('timeLeft', 300); // Reset in localStorage
                        return 300; // Reset timer
                    }
                    return newTime;
                });
            }, 1000);
        } 
        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        // Save comments to localStorage whenever they change
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim().length > 0 && comment.split(' ').length <= 120 && canComment) {
            setComments([...comments, { name, comment }]);
            setComment('');
            setCanComment(false); // Prevent further comments
            setTimeLeft(300); // Reset timer to 5 minutes
            localStorage.setItem('timeLeft', 300); // Save reset timer to localStorage
            alert('Your comment has been accepted!');
        } else if (!canComment) {
            alert('Please wait for the timer to finish before submitting another comment.');
        }
    };

    return (
        <>
            <div className="comment-section">
                <h2>Leave a Comment</h2>
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your name (optional)"
                        onChange={(e) => setName(e.target.value || 'Automatic Name User')}
                        disabled={!canComment} // Disable input if timer is active
                    />
                    <textarea
                        placeholder="Write your comment (max 120 words)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={120}
                        disabled={!canComment} // Disable textarea if timer is active
                    />
                    <button type="submit" disabled={!canComment}>Submit</button>
                </form>
                <div className="timer">{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</div>
            </div>
            <div className="girdCom">
                <div className="comments">
                    {comments.map((c, index) => (
                        <div key={index} className="comment">
                            <strong>{c.name}</strong>: {c.comment}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CommentSection;
