import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Error() {
    useEffect(() => {
        document.title = '404 - Not Found';
    },[])
    return (
        <body style={{ backgroundColor: 'rgb(248, 240, 255)' }}>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                    <p className="lead">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <Link to="/" className="btn btn-outline-primary border-0 shadow-sm">
                        <b>Go Home</b>
                    </Link>
                </div>
            </div>
        </body>
    )
}
