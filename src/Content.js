import { useEffect, useState } from "react";

const tab = ['posts', 'comments', 'albums'];

function Content() {
    const [title, setTitle] = useState('title');
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState('posts');
    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        document.title = title;
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts);
            })
    }, [type])

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShowGoToTop(true);
            } else {
                setShowGoToTop(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <div>

            {tab.map(tab =>
                <button
                    key={tab}
                    style={tab === type ? {
                        color: '#fff',
                        backgroundColor: '#333'
                    } : {}}
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
            )}

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <ul>
                {posts.map(post =>
                    <li key={post.id}>{post.title || post.name}</li>
                )}
            </ul>
            {showGoToTop &&
                <button style={{
                    position: "fixed",
                    right: 20,
                    bottom: 20
                }}>Go To Top</button>
            }
        </div>
    )
}

export default Content